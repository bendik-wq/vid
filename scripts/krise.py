"""Finn norske selskaper i økonomisk knipe — formelt og reelt.

    python3 scripts/krise.py --formelt --ut konkurs.csv
    python3 scripts/krise.py --sliter --min-ansatte 10 --ut sliter.csv
    python3 scripts/krise.py --sliter --kommune bergen --hardcore

To helt ulike lister, og de krever ulike playbooks:

FORMELT   Selskaper flagget konkurs, under avvikling eller under
          tvangsavvikling. Her kjøper du eiendeler av et bo gjennom
          bostyrer — ikke aksjer av en selger. Ingen selgerfinansiering,
          ingen earnout, og du arver hverken kontrakter eller ansatte
          automatisk. Merk at ansatttallet nulles ut når konkursen
          registreres, så du kan ikke filtrere på størrelse.

SLITER    Selskaper som fortsatt lever, men har negativ egenkapital
          eller driftsunderskudd. Det er her selgerfinansiering faktisk
          virker — eieren trenger en utvei, ikke en pris.
"""

import argparse
import concurrent.futures
import csv
import sys

import brreg
from screen import KOMMUNER

# Enhetsregisteret kutter dyp paginering på 10 000 treff. Del opp på
# ansattintervall slik at hver spørring holder seg under taket.
BAND = [(10, 11), (12, 13), (14, 16), (17, 19), (20, 24), (25, 29), (30, 39),
        (40, 54), (55, 74), (75, 99), (100, 149), (150, 249), (250, 499), (500, 100000)]

KRISEFLAGG = ("konkurs", "underAvvikling", "underTvangsavviklingEllerTvangsopplosning")

FELT_FORMELT = ["navn", "orgnr", "nace", "nace_tekst", "ansatte", "sted", "kommune",
                "konkurs", "tvangsavvikling", "under_avvikling", "brreg"]
FELT_SLITER = ["alvor", "navn", "orgnr", "nace", "nace_tekst", "ansatte", "sted", "kommune",
               "omsetning_mnok", "driftsresultat_mnok", "egenkapital_mnok", "margin_pct",
               "ek_andel_pct", "regnskapsaar", "flagg", "brreg"]


def grunnfelt(e):
    adresse = e.get("forretningsadresse") or {}
    orgnr = e["organisasjonsnummer"]
    return {
        "navn": e["navn"], "orgnr": orgnr,
        "nace": (e.get("naeringskode1") or {}).get("kode"),
        "nace_tekst": (e.get("naeringskode1") or {}).get("beskrivelse"),
        "ansatte": e.get("antallAnsatte"),
        "sted": adresse.get("poststed"), "kommune": adresse.get("kommune"),
        "komnr": adresse.get("kommunenummer"),
        "brreg": f"https://virksomhet.brreg.no/nb/oppslag/enheter/{orgnr}",
    }


def formelt(kommune=None):
    """Alle AS med et kriseflagg satt i Enhetsregisteret."""
    ut = {}
    for flagg in KRISEFLAGG:
        for e in brreg.enheter(max_pages=200, organisasjonsform="AS", **{flagg: "true"}):
            if kommune and (e.get("forretningsadresse") or {}).get("kommunenummer") not in KOMMUNER[kommune]:
                continue
            rad = ut.setdefault(e["organisasjonsnummer"], grunnfelt(e))
            rad["konkurs"] = bool(e.get("konkurs"))
            rad["under_avvikling"] = bool(e.get("underAvvikling"))
            rad["tvangsavvikling"] = bool(e.get("underTvangsavviklingEllerTvangsopplosning"))
    return list(ut.values())


def levende(min_ansatte, kommune=None):
    """Alle AS uten kriseflagg, hentet båndvis rundt pagineringstaket."""
    ut = {}
    for lo, hi in BAND:
        if hi < min_ansatte:
            continue
        for e in brreg.enheter(max_pages=120, organisasjonsform="AS",
                               fraAntallAnsatte=max(lo, min_ansatte), tilAntallAnsatte=hi):
            if any(e.get(f) for f in KRISEFLAGG):
                continue
            if kommune and (e.get("forretningsadresse") or {}).get("kommunenummer") not in KOMMUNER[kommune]:
                continue
            ut[e["organisasjonsnummer"]] = grunnfelt(e)
    return ut


def vurder(rad):
    """Hent regnskap og sett flagg og alvorsgrad."""
    tall = brreg.regnskap(rad["orgnr"]) or {}
    oms, dr, ek = tall.get("omsetning"), tall.get("driftsresultat"), tall.get("egenkapital")
    margin = dr / oms if (oms and dr is not None and oms > 0) else None
    ek_andel = ek / oms if (ek is not None and oms and oms > 0) else None

    flagg = []
    if ek is not None and ek < 0:
        flagg.append("negativ egenkapital")
    if dr is not None and dr < 0:
        flagg.append("driftsunderskudd")
    if ek_andel is not None and 0 <= ek_andel < 0.05:
        flagg.append("tynn egenkapital")
    if margin is not None and 0 <= margin < 0.02:
        flagg.append("margin under 2%")

    alvor = 0
    if ek is not None and ek < 0:
        alvor += 50
    if dr is not None and dr < 0:
        alvor += 30
        # Et underskudd på over 15 % av omsetningen tærer på egenkapitalen
        # raskt nok til at selskapet har måneder, ikke år.
        if oms and oms > 0 and abs(dr) / oms > 0.15:
            alvor += 20
    if ek_andel is not None and 0 <= ek_andel < 0.05:
        alvor += 15
    if margin is not None and 0 <= margin < 0.02:
        alvor += 10
    if (rad.get("ansatte") or 0) >= 30:
        alvor += 8

    rad.update({
        "regnskapsaar": tall.get("aar"),
        "omsetning_mnok": round(oms / 1e6, 1) if oms is not None else None,
        "driftsresultat_mnok": round(dr / 1e6, 1) if dr is not None else None,
        "egenkapital_mnok": round(ek / 1e6, 1) if ek is not None else None,
        "margin_pct": round(margin * 100, 1) if margin is not None else None,
        "ek_andel_pct": round(ek_andel * 100, 1) if ek_andel is not None else None,
        "flagg": "; ".join(flagg), "alvor": alvor,
        "_hardcore": (ek is not None and ek < 0) and (dr is not None and dr < 0),
    })
    return rad


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--formelt", action="store_true", help="Konkurs, avvikling, tvangsavvikling")
    ap.add_argument("--sliter", action="store_true", help="Lever, men taper penger eller egenkapital")
    ap.add_argument("--hardcore", action="store_true",
                    help="Kun negativ egenkapital OG driftsunderskudd — den harde kjernen")
    ap.add_argument("--kommune", choices=sorted(KOMMUNER))
    ap.add_argument("--min-ansatte", type=int, default=10)
    ap.add_argument("--ut", default="krise.csv")
    args = ap.parse_args()

    if not (args.formelt or args.sliter):
        ap.error("velg --formelt eller --sliter")

    if args.formelt:
        rader = formelt(args.kommune)
        rader.sort(key=lambda r: (-(r.get("ansatte") or 0), r["navn"]))
        felt = FELT_FORMELT
        print(f"{len(rader)} selskaper i formell krise", file=sys.stderr)
    else:
        selskaper = levende(args.min_ansatte, args.kommune)
        print(f"{len(selskaper)} levende AS å sjekke", file=sys.stderr)
        with concurrent.futures.ThreadPoolExecutor(16) as pool:
            rader = list(pool.map(vurder, selskaper.values()))
        rader = [r for r in rader if r["flagg"]]
        if args.hardcore:
            rader = [r for r in rader if r["_hardcore"]]
        rader.sort(key=lambda r: (-r["alvor"], -(r.get("ansatte") or 0)))
        felt = FELT_SLITER
        print(f"{len(rader)} selskaper med minst ett kriseflagg", file=sys.stderr)

    with open(args.ut, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=felt, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rader)
    print(f"skrev {args.ut}", file=sys.stderr)


if __name__ == "__main__":
    main()
