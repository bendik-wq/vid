"""Underwrite tapsbringende selskaper etter Peter Löws modell: Z − V − L₁₅.

    python3 scripts/low.py --ut low.csv
    python3 scripts/low.py --kommune bergen --kun-konsern

Löw kjøpte tapsbringende datterselskaper under likvidasjonsverdi fra konsern
som ville stoppe kontantblødningen. Budet startet på:

    Z    likvidasjonsverdi av eiendelene
    V    gjeld som blir med videre etter closing
    L₁₅  kontantbehov gjennom 15 måneders restrukturering

    bud = Z − V − L₁₅

Er bud negativt, er utgangspunktet symbolsk pris — eller at selger betaler
deg for å overta. Selgers alternativ er å finansiere tapene videre, eller
betale for en nedleggelse selv.

VIKTIG OM V: I et datterselskap er mye av gjelden ofte konsernintern. Det er
nøyaktig den posten Löw forhandlet bort ("have the seller settle liabilities"),
så tallet som kommer ut her er verste fall, ikke forventet utfall.

VIKTIG OM L₁₅: Regnskapsregisteret gir kun siste år, så du kan ikke se om
tapet er kronisk eller en engangshendelse. L₁₅ er variabelen som avgjør hele
caset, og den er den du vet minst om. Behandle tallet som en åpning, ikke et
estimat.
"""

import argparse
import concurrent.futures
import csv
import re
import sys

import brreg
from krise import BAND, KRISEFLAGG, grunnfelt
from screen import KOMMUNER

# Haircuts ved tvangssalg. Anleggsmidler går for en brøkdel med mindre det er
# eiendom; omløpsmidler (fordringer, varelager, bank) henter mer inn.
HAIRCUT_ANLEGG = 0.45
HAIRCUT_OMLOEP = 0.70
BURN_MAANEDER = 15

# "<merke> NORGE AS" er det mest pålitelige signalet på et utenlandsk konsern
# som har en norsk enhet de kan tenkes å ville ut av.
UTENLANDSK = re.compile(r"\b(NORGE|NORWAY|NORDIC|SCANDINAVIA|SCANDINAVIAN|NORDEN)\b")

FELT = ["low_score", "navn", "orgnr", "nace", "nace_tekst", "ansatte", "sted", "kommune",
        "konserntype", "antatt_mor", "omsetning_mnok", "driftsresultat_mnok",
        "anleggsmidler_mnok", "omloepsmidler_mnok", "gjeld_mnok", "egenkapital_mnok",
        "Z_mnok", "V_mnok", "L15_mnok", "bud_mnok", "medgift_mnok",
        "anlegg_pr_ansatt_knok", "regnskapsaar", "brreg"]


def balanse(rad):
    """Hent balanse og resultat, og regn ut Z, V, L₁₅ og budet."""
    data = brreg.get(f"https://data.brreg.no/regnskapsregisteret/regnskap/{rad['orgnr']}")
    if not isinstance(data, list) or not data:
        return None
    siste = sorted(data, key=lambda r: r["regnskapsperiode"]["tilDato"])[-1]
    eiendeler = siste.get("eiendeler") or {}
    kapital = siste.get("egenkapitalGjeld") or {}
    gjeldsdel = kapital.get("gjeldOversikt") or {}
    drift = (siste.get("resultatregnskapResultat") or {}).get("driftsresultat") or {}

    anlegg = (eiendeler.get("anleggsmidler") or {}).get("sumAnleggsmidler") or 0
    omloep = (eiendeler.get("omloepsmidler") or {}).get("sumOmloepsmidler") or 0
    gjeld = gjeldsdel.get("sumGjeld")
    dr = drift.get("driftsresultat")
    oms = (drift.get("driftsinntekter") or {}).get("sumDriftsinntekter")
    if gjeld is None or dr is None or dr >= 0 or (anlegg + omloep) == 0:
        return None

    Z = anlegg * HAIRCUT_ANLEGG + omloep * HAIRCUT_OMLOEP
    V = gjeld
    L15 = abs(dr) * (BURN_MAANEDER / 12)
    bud = Z - V - L15
    ansatte = rad.get("ansatte") or 1

    rad.update({
        "regnskapsaar": siste["regnskapsperiode"]["tilDato"][:4],
        "omsetning_mnok": round((oms or 0) / 1e6, 1),
        "driftsresultat_mnok": round(dr / 1e6, 1),
        "anleggsmidler_mnok": round(anlegg / 1e6, 1),
        "omloepsmidler_mnok": round(omloep / 1e6, 1),
        "gjeld_mnok": round(gjeld / 1e6, 1),
        "egenkapital_mnok": round(((kapital.get("egenkapital") or {}).get("sumEgenkapital") or 0) / 1e6, 1),
        "Z_mnok": round(Z / 1e6, 1), "V_mnok": round(V / 1e6, 1), "L15_mnok": round(L15 / 1e6, 1),
        "bud_mnok": round(bud / 1e6, 1),
        "medgift_mnok": round(-bud / 1e6, 1) if bud < 0 else 0,
        "anlegg_pr_ansatt_knok": round(anlegg / ansatte / 1e3),
        "_anlegg": anlegg, "_oms": oms or 0, "_dr": dr, "_L15": L15,
        "_ek": (kapital.get("egenkapital") or {}).get("sumEgenkapital"),
    })
    return rad


def konsern(rad, navneindeks):
    """Gjett om selskapet tilhører et konsern, fra navnet.

    To mønstre: "<merke> NORGE AS" for utenlandske konsern, og et norsk
    selskap hvis navn er et ekte prefiks av datterselskapets.
    """
    navn = re.sub(r"\s+(AS|ASA|A/S)$", "", rad["navn"].upper().strip())
    tokens = navn.split()
    if UTENLANDSK.search(navn) and len(tokens) >= 2:
        return "utenlandsk konsern (navn)", " ".join(t for t in tokens if not UTENLANDSK.match(t))
    for i in range(len(tokens) - 1, 1, -1):
        base = " ".join(tokens[:i])
        for variant in (base, base + " AS", base + " ASA", base + " HOLDING AS", base + " GROUP AS"):
            mor = navneindeks.get(variant)
            if mor and mor["orgnr"] != rad["orgnr"] and mor["ansatte"] >= (rad.get("ansatte") or 0):
                return "norsk konsern (prefiks)", base
    return None, None


def poeng(rad):
    """Rangér etter hvor godt caset passer modellen.

    Poenget er ikke størst tap, men mest eiendeler å monetisere i forhold til
    det tapet koster å bære gjennom restruktureringen.
    """
    anlegg, dr, oms = rad["_anlegg"], rad["_dr"], rad["_oms"]
    ansatte = rad.get("ansatte") or 0
    score = 0
    if anlegg >= 20e6:
        score += 35
    elif anlegg >= 8e6:
        score += 25
    elif anlegg >= 3e6:
        score += 12
    if rad["anlegg_pr_ansatt_knok"] >= 500:
        score += 15
    if oms >= 30e6:
        score += 15
    elif oms >= 10e6:
        score += 8
    if ansatte >= 30:
        score += 12
    elif ansatte >= 20:
        score += 6
    # Tapet må ikke spise opp eiendelene i løpet av restruktureringen.
    if anlegg > 0 and abs(dr) / anlegg < 0.5:
        score += 15
    if rad.get("_ek") is not None and rad["_ek"] < 0:
        # Negativ egenkapital utløser styrets handleplikt. Eieren har en frist.
        score += 10
    if anlegg > 0 and rad["_L15"] < anlegg * 0.6:
        score += 8
    if rad.get("konserntype"):
        score += 25
    return score


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--kommune", choices=sorted(KOMMUNER))
    ap.add_argument("--min-ansatte", type=int, default=10)
    ap.add_argument("--kun-konsern", action="store_true", help="Bare selskaper med konsernsignal")
    ap.add_argument("--ut", default="low.csv")
    args = ap.parse_args()

    selskaper = {}
    navneindeks = {}
    for lo, hi in BAND:
        if hi < args.min_ansatte:
            continue
        for e in brreg.enheter(max_pages=120, organisasjonsform="AS",
                               fraAntallAnsatte=max(lo, args.min_ansatte), tilAntallAnsatte=hi):
            rad = grunnfelt(e)
            navneindeks[rad["navn"].upper().strip()] = rad
            if any(e.get(f) for f in KRISEFLAGG):
                continue
            if args.kommune and rad.get("komnr") not in KOMMUNER[args.kommune]:
                continue
            selskaper[rad["orgnr"]] = rad
    print(f"{len(selskaper)} selskaper å underwrite", file=sys.stderr)

    with concurrent.futures.ThreadPoolExecutor(16) as pool:
        rader = [r for r in pool.map(balanse, selskaper.values()) if r]
    for rad in rader:
        rad["konserntype"], rad["antatt_mor"] = konsern(rad, navneindeks)
        rad["low_score"] = poeng(rad)
    if args.kun_konsern:
        rader = [r for r in rader if r["konserntype"]]
    rader.sort(key=lambda r: -r["low_score"])

    with open(args.ut, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=FELT, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rader)
    konsernsignal = len([r for r in rader if r["konserntype"]])
    print(f"{len(rader)} med driftsunderskudd og balanse, {konsernsignal} med konsernsignal "
          f"→ {args.ut}", file=sys.stderr)


if __name__ == "__main__":
    main()
