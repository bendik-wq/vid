"""Felles klient mot Brønnøysundregistrenes åpne API-er.

Ingen nøkler, ingen konto. Alle endepunktene her er offentlige og
rate-limit-vennlige så lenge du holder deg under ~12 samtidige kall.
"""

import json
import time
import urllib.parse
import urllib.request

BASE_ENHET = "https://data.brreg.no/enhetsregisteret/api/enheter"
BASE_REGNSKAP = "https://data.brreg.no/regnskapsregisteret/regnskap"

# Roller som faktisk sier noe om eierskap og kontroll. REVI (revisor) og
# REGN (regnskapsfører) er IKKE i denne listen med vilje: de fleste selskaper
# har Deloitte, PwC eller BDO registrert som korporativ rolleinnehaver, og
# leser du dem som morselskap blir hele eierklassifiseringen feil.
STYREROLLER = ("LEDE", "NEST", "MEDL", "DAGL")


def get(url, retries=3, timeout=45):
    """GET med enkel backoff. Returnerer None om alle forsøk feiler."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=timeout) as response:
                return json.load(response)
        except Exception:
            if attempt == retries - 1:
                return None
            time.sleep(1.2 * (attempt + 1))


def enheter(max_pages=40, **params):
    """Hent alle enheter som matcher filtrene, side for side.

    Vanlige filtre: naeringskode, organisasjonsform, kommunenummer,
    fraAntallAnsatte, tilAntallAnsatte.

    Merk: Norge gikk over til SN2025. Engroskodene er renummerert, så
    46.5x og 46.6x gir null treff — bruk 46.8x. Sjekk alltid en kjent
    aktør i bransjen før du stoler på en næringskode.
    """
    out = []
    page = 0
    while page < max_pages:
        query = urllib.parse.urlencode({**params, "size": 100, "page": page})
        data = get(f"{BASE_ENHET}?{query}")
        if not data or "_embedded" not in data:
            break
        out.extend(data["_embedded"]["enheter"])
        page += 1
        if page >= data["page"]["totalPages"]:
            break
    return out


def roller(orgnr, aar=2026):
    """Personer i styre og ledelse, med utledet alder.

    Returnerer (personer, har_korporativ_kontroll). Den andre verdien er
    True bare når en *annen enhet* sitter i en av STYREROLLER — ikke når
    den er revisor.
    """
    data = get(f"https://data.brreg.no/enhetsregisteret/api/enheter/{orgnr}/roller") or {}
    personer = []
    korporativ = False
    for gruppe in data.get("rollegrupper", []):
        for rolle in gruppe.get("roller", []):
            if rolle.get("avregistrert"):
                continue
            kode = rolle["type"]["kode"]
            if kode not in STYREROLLER:
                continue
            if rolle.get("enhet"):
                korporativ = True
                continue
            person = rolle.get("person")
            if not person or not person.get("fodselsdato") or person.get("erDoed"):
                continue
            navn = person["navn"]
            personer.append({
                "rolle": kode,
                "fornavn": navn.get("fornavn", ""),
                "etternavn": navn.get("etternavn", ""),
                "fodt": int(person["fodselsdato"][:4]),
                "alder": aar - int(person["fodselsdato"][:4]),
            })
    return personer, korporativ


def regnskap(orgnr):
    """Siste innleverte årsregnskap.

    API-et leverer KUN siste år. Flerårig trend må hentes fra Proff, Enin
    eller årsregnskapene enkeltvis — ikke herfra.
    """
    data = get(f"{BASE_REGNSKAP}/{orgnr}")
    if not isinstance(data, list) or not data:
        return None
    siste = sorted(data, key=lambda r: r["regnskapsperiode"]["tilDato"])[-1]
    drift = (siste.get("resultatregnskapResultat") or {}).get("driftsresultat") or {}
    egenkapital = (siste.get("egenkapitalGjeld") or {}).get("egenkapital") or {}
    return {
        "aar": siste["regnskapsperiode"]["tilDato"][:4],
        "valuta": siste.get("valuta"),
        "omsetning": (drift.get("driftsinntekter") or {}).get("sumDriftsinntekter"),
        "driftsresultat": drift.get("driftsresultat"),
        "egenkapital": egenkapital.get("sumEgenkapital"),
    }
