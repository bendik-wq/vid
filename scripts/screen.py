"""Screen norske aksjeselskaper for generasjonsskifte-oppkjøp.

    python3 scripts/screen.py --nace 27.120 27.110 --min-ansatte 10 --ut kandidater.csv
    python3 scripts/screen.py --bransje elektro --kommune bergen --ut bergen.csv

Skriver CSV med personopplysninger (navn og fødselsår fra rolleregisteret).
Ikke sjekk resultatfilene inn i et offentlig repo.
"""

import argparse
import concurrent.futures
import csv
import sys

import brreg

# Næringskoder gruppert etter tesen de hører til. SN2025.
BRANSJER = {
    "elektro": ["27.110", "27.120", "27.330", "27.900", "33.140", "33.200", "26.110"],
    "testing": ["71.200", "71.121", "71.129"],
    "lagring": ["52.100", "46.810", "46.820"],
    "installasjon": ["43.210", "43.220", "43.290", "43.910"],
    "tjenester": ["69.201", "69.202", "81.210", "80.100", "96.011"],
    "helse": ["86.230", "86.901", "86.906", "86.907"],
    "avfall": ["38.110", "38.210", "38.320", "39.000"],
}

# Kommunenummer for Bergensregionen.
KOMMUNER = {
    "bergen": ["4601", "4627", "4626", "4624", "4631", "4630", "4623", "4625", "4628"],
}

FELT = [
    "score", "navn", "orgnr", "nace", "nace_tekst", "ansatte", "stiftet", "sted", "kommune",
    "omsetning_mnok", "driftsresultat_mnok", "margin_pct", "egenkapital_mnok", "regnskapsaar",
    "eierprofil", "alder_topp", "daglig_leder", "dl_alder", "styreleder", "styre_snitt",
    "styre_antall", "brreg",
]


def vurder(enhet, aar):
    """Hent roller og regnskap for én enhet og gi den en score."""
    orgnr = enhet["organisasjonsnummer"]
    adresse = enhet.get("forretningsadresse") or {}
    rad = {
        "navn": enhet["navn"],
        "orgnr": orgnr,
        "nace": (enhet.get("naeringskode1") or {}).get("kode"),
        "nace_tekst": (enhet.get("naeringskode1") or {}).get("beskrivelse"),
        "ansatte": enhet.get("antallAnsatte"),
        "stiftet": enhet.get("stiftelsesdato"),
        "sted": adresse.get("poststed"),
        "kommune": adresse.get("kommune"),
        "brreg": f"https://virksomhet.brreg.no/nb/oppslag/enheter/{orgnr}",
    }

    personer, korporativ = brreg.roller(orgnr, aar)
    styre = [p for p in personer if p["rolle"] in ("LEDE", "NEST", "MEDL")]
    daglig = next((p for p in personer if p["rolle"] == "DAGL"), None)
    leder = next((p for p in personer if p["rolle"] == "LEDE"), None)
    aldre = [p["alder"] for p in styre] + ([daglig["alder"]] if daglig else [])

    rad["daglig_leder"] = f"{daglig['fornavn']} {daglig['etternavn']}".strip() if daglig else None
    rad["dl_alder"] = daglig["alder"] if daglig else None
    rad["styreleder"] = f"{leder['fornavn']} {leder['etternavn']}".strip() if leder else None
    rad["styre_antall"] = len(styre)
    rad["styre_snitt"] = round(sum(p["alder"] for p in styre) / len(styre)) if styre else None
    rad["alder_topp"] = max(aldre) if aldre else None

    etternavn = [p["etternavn"] for p in styre + ([daglig] if daglig else [])]
    familie = max((etternavn.count(n) for n in set(etternavn)), default=0) >= 2

    if korporativ or enhet.get("overordnetEnhet"):
        rad["eierprofil"] = "konsern"
    elif familie:
        rad["eierprofil"] = "familie"
    elif daglig and leder and rad["daglig_leder"] == rad["styreleder"]:
        rad["eierprofil"] = "eierdrevet"
    else:
        # Brreg kan ikke svare. Aksjonærregisteret hos Skatteetaten kan.
        rad["eierprofil"] = "ukjent"

    tall = brreg.regnskap(orgnr) or {}
    oms = tall.get("omsetning")
    dr = tall.get("driftsresultat")
    margin = dr / oms if (oms and dr is not None and oms > 0) else None
    rad["regnskapsaar"] = tall.get("aar")
    rad["omsetning_mnok"] = round(oms / 1e6, 1) if oms else None
    rad["driftsresultat_mnok"] = round(dr / 1e6, 1) if dr is not None else None
    rad["egenkapital_mnok"] = round(tall["egenkapital"] / 1e6, 1) if tall.get("egenkapital") else None
    rad["margin_pct"] = round(margin * 100, 1) if margin is not None else None

    alder = rad["alder_topp"] or 0
    score = 0
    if alder >= 65:
        score += 40
    elif alder >= 60:
        score += 32
    elif alder >= 56:
        score += 20
    # Et styre på to eller tre i den aldersgruppen er det reneste
    # generasjonsskiftesignalet registerdata kan gi.
    if styre and len(styre) <= 3 and alder >= 56:
        score += 10
    if familie:
        score += 10
    if margin is not None:
        if margin >= 0.15:
            score += 22
        elif margin >= 0.08:
            score += 14
        elif margin > 0:
            score += 5
    if oms and oms >= 15e6:
        score += 10
    if tall.get("egenkapital") and oms and oms > 0 and tall["egenkapital"] / oms >= 0.3:
        score += 8
    if rad["eierprofil"] == "konsern":
        score -= 45
    rad["score"] = score
    return rad


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--nace", nargs="+", help="Næringskoder, f.eks. 27.120")
    ap.add_argument("--bransje", choices=sorted(BRANSJER), help=f"Ferdig gruppe: {', '.join(sorted(BRANSJER))}")
    ap.add_argument("--kommune", choices=sorted(KOMMUNER), help="Avgrens til region")
    ap.add_argument("--min-ansatte", type=int, default=10)
    ap.add_argument("--maks-ansatte", type=int, default=250)
    ap.add_argument("--aar", type=int, default=2026, help="Referanseår for aldersberegning")
    ap.add_argument("--ut", default="kandidater.csv")
    args = ap.parse_args()

    koder = args.nace or (BRANSJER[args.bransje] if args.bransje else None)
    if not koder:
        ap.error("oppgi --nace eller --bransje")

    enheter = {}
    for kode in koder:
        for e in brreg.enheter(naeringskode=kode, organisasjonsform="AS",
                               fraAntallAnsatte=args.min_ansatte,
                               tilAntallAnsatte=args.maks_ansatte):
            if e.get("konkurs") or e.get("underAvvikling"):
                continue
            if args.kommune:
                komnr = (e.get("forretningsadresse") or {}).get("kommunenummer")
                if komnr not in KOMMUNER[args.kommune]:
                    continue
            enheter[e["organisasjonsnummer"]] = e

    print(f"{len(enheter)} selskaper i universet", file=sys.stderr)
    if not enheter:
        return

    with concurrent.futures.ThreadPoolExecutor(12) as pool:
        rader = list(pool.map(lambda e: vurder(e, args.aar), enheter.values()))
    rader.sort(key=lambda r: -r["score"])

    with open(args.ut, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=FELT, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rader)

    kvalifisert = [r for r in rader if r["score"] >= 70 and r["eierprofil"] != "konsern"]
    print(f"skrev {len(rader)} rader til {args.ut} ({len(kvalifisert)} over terskel)", file=sys.stderr)


if __name__ == "__main__":
    main()
