"""Kryss oppdateringsfeeden mot en målliste: hvem er i bevegelse?

    python3 scripts/bevegelse.py --fra 2026-06-01 --orgnr-fil maal.txt

Hver registerendring i Enhetsregisteret får en dato og en endringstype.
Krysser du feeden mot selskapene du følger, ser du hvem som har rørt på seg —
ny daglig leder, nytt styre, ny adresse — før det blir kjent andre steder.

Vær tålmodig med vinduet. Seks uker ga treff på 7 av 4 215 selskaper. Det er
et signal som trenger måneder, ikke dager.
"""

import argparse
import sys
from collections import defaultdict

import brreg

FEED = "https://data.brreg.no/enhetsregisteret/api/oppdateringer/enheter"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--fra", required=True, help="Startdato, ÅÅÅÅ-MM-DD")
    ap.add_argument("--orgnr-fil", required=True, help="Fil med ett organisasjonsnummer per linje")
    ap.add_argument("--maks-sider", type=int, default=400)
    args = ap.parse_args()

    with open(args.orgnr_fil) as f:
        maal = {line.strip() for line in f if line.strip().isdigit()}
    print(f"følger {len(maal)} selskaper", file=sys.stderr)

    treff = defaultdict(list)
    page = 0
    while page < args.maks_sider:
        data = brreg.get(f"{FEED}?dato={args.fra}T00:00:00.000Z&size=1000&page={page}")
        if not data or "_embedded" not in data:
            break
        for endring in data["_embedded"]["oppdaterteEnheter"]:
            orgnr = endring["organisasjonsnummer"]
            if orgnr in maal:
                treff[orgnr].append((endring["dato"][:10], endring["endringstype"]))
        page += 1
        if page >= data["page"]["totalPages"]:
            break

    for orgnr, endringer in sorted(treff.items(), key=lambda kv: -len(kv[1])):
        datoer = ", ".join(f"{d} {t}" for d, t in endringer)
        print(f"{orgnr}\t{len(endringer)}\t{datoer}")
    print(f"{len(treff)} av {len(maal)} har endringer siden {args.fra}", file=sys.stderr)


if __name__ == "__main__":
    main()
