"""Bygg en graf over styremedlemmer i en region, og ranger dem per styresete.

    python3 scripts/styregraf.py --kommune bergen --min-ansatte 20 --ut styrekandidater.csv

Hvorfor rolleregisteret og ikke LinkedIn: styreerfaring i Brønnøysund er
verifisert, ikke selvrapportert. LinkedIn-data for norske regioner er dessuten
tynn — et søk på relevante styretitler ga 15 treff i hele Norge.

Skriver CSV med navn og fødselsår. Ikke sjekk resultatet inn i et offentlig repo.
"""

import argparse
import concurrent.futures
import csv
import sys
from collections import defaultdict

import brreg
from screen import KOMMUNER

# Fagprofil utledes av næringskoden til selskapene personen har verv i.
JURIDISK = {"69.100"}
FINANS = {"69.201", "69.202", "64.190", "64.201", "64.202", "64.209", "64.301", "66.190", "70.220"}
SEKTOR = {
    "27.110", "27.120", "27.330", "27.900", "33.140", "33.200", "26.110", "26.200",
    "35.110", "35.130", "35.140", "42.220", "43.210", "43.220", "71.200", "71.121",
    "52.100", "46.810", "46.820", "28.250", "33.120", "30.110", "33.150",
}

# Firmaer å hente inn i tillegg til de store arbeidsgiverne: advokat-,
# revisjons- og investeringsmiljøene er små, men det er der finans- og
# jussetene sitter.
FAGMILJO = ["69.100", "69.201", "69.202", "64.202", "64.301", "66.190", "70.220"]

FELT = ["score", "navn", "fodt", "alder", "styreverv", "styrelederverv", "sum_ansatte",
        "bransjer", "juridisk", "finans", "sektor", "kommuner", "selskaper"]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--kommune", choices=sorted(KOMMUNER), default="bergen")
    ap.add_argument("--min-ansatte", type=int, default=20)
    ap.add_argument("--aar", type=int, default=2026)
    ap.add_argument("--ut", default="styrekandidater.csv")
    args = ap.parse_args()

    komnr = KOMMUNER[args.kommune]
    selskaper = {}

    for k in komnr:
        for e in brreg.enheter(kommunenummer=k, organisasjonsform="AS",
                               fraAntallAnsatte=args.min_ansatte):
            selskaper[e["organisasjonsnummer"]] = e

    for kode in FAGMILJO:
        for e in brreg.enheter(naeringskode=kode, organisasjonsform="AS", fraAntallAnsatte=2):
            if (e.get("forretningsadresse") or {}).get("kommunenummer") in komnr:
                selskaper[e["organisasjonsnummer"]] = e

    print(f"{len(selskaper)} selskaper i grafen", file=sys.stderr)

    def skann(orgnr):
        e = selskaper[orgnr]
        personer, _ = brreg.roller(orgnr, args.aar)
        nace = (e.get("naeringskode1") or {}).get("kode", "")
        adresse = e.get("forretningsadresse") or {}
        return [(p, e.get("navn"), nace, e.get("antallAnsatte") or 0, adresse.get("kommune")) for p in personer]

    folk = defaultdict(lambda: {"verv": []})
    with concurrent.futures.ThreadPoolExecutor(12) as pool:
        for treff in pool.map(skann, list(selskaper)):
            for person, selskap, nace, ansatte, kommune in treff:
                navn = f"{person['fornavn']} {person['etternavn']}".strip()
                nokkel = (navn, person["fodt"])
                folk[nokkel]["navn"] = navn
                folk[nokkel]["fodt"] = person["fodt"]
                folk[nokkel]["alder"] = person["alder"]
                folk[nokkel]["verv"].append({
                    "rolle": person["rolle"], "selskap": selskap,
                    "nace": nace, "ansatte": ansatte, "kommune": kommune,
                })

    rader = []
    for data in folk.values():
        verv = data["verv"]
        styre = [v for v in verv if v["rolle"] in ("LEDE", "NEST", "MEDL")]
        leder = [v for v in verv if v["rolle"] == "LEDE"]
        if not verv:
            continue
        koder = {v["nace"] for v in verv}
        ansatte = sum(v["ansatte"] for v in verv)
        alder = data["alder"]

        score = 0
        # 60–72 er målgruppen: erfaren nok til å gi troverdighet mot bank og
        # selger, og som regel ute av en operativ rolle som ville blokkert.
        if 60 <= alder <= 72:
            score += 30
        elif 56 <= alder <= 75:
            score += 22
        elif 50 <= alder <= 79:
            score += 10
        score += min(len(styre), 8) * 7
        score += min(len(leder), 5) * 8
        if ansatte >= 300:
            score += 16
        elif ansatte >= 120:
            score += 10
        elif ansatte >= 50:
            score += 5
        if koder & SEKTOR:
            score += 14
        if koder & JURIDISK:
            score += 6
        if koder & FINANS:
            score += 6
        if len({k[:2] for k in koder}) >= 3:
            score += 8

        rader.append({
            "score": score, "navn": data["navn"], "fodt": data["fodt"], "alder": alder,
            "styreverv": len(styre), "styrelederverv": len(leder), "sum_ansatte": ansatte,
            "bransjer": len({k[:2] for k in koder}),
            "juridisk": bool(koder & JURIDISK), "finans": bool(koder & FINANS),
            "sektor": bool(koder & SEKTOR),
            "kommuner": "; ".join(sorted({v["kommune"] or "" for v in verv})),
            "selskaper": "; ".join(sorted({f"{v['selskap']} ({v['rolle']})" for v in verv})),
        })

    rader.sort(key=lambda r: -r["score"])
    with open(args.ut, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=FELT, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rader)
    print(f"{len(rader)} unike personer skrevet til {args.ut}", file=sys.stderr)


if __name__ == "__main__":
    main()
