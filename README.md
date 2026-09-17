# Flaskehalsen

Oppkjøpstese og screeningverktøy for elektroteknisk kapasitet på Vestlandet.

**Siden:** https://bendik-wq.github.io/vid/

Ledetiden på en høyspenttransformator er 128 uker. På koblingsanlegg opptil tre
år. Den som eier kapasiteten i mellomtiden, setter prisen. Samtidig er
eierleddet i de norske bedriftene som *har* den kapasiteten i ferd med å gå av
med pensjon, og de priser bedriftene sine på fjorårets tall.

Dette repoet inneholder analysen og verktøyene som kartlegger det.

## Verktøyene

Alt går mot Brønnøysundregistrenes åpne API-er. Ingen nøkler, ingen konto,
ingen betalte kilder.

```bash
# Screen en bransje for generasjonsskifte-kandidater
python3 scripts/screen.py --bransje elektro --ut kandidater.csv

# Avgrens til Bergensregionen
python3 scripts/screen.py --bransje elektro --kommune bergen --ut bergen.csv

# Egne næringskoder
python3 scripts/screen.py --nace 27.110 27.120 33.140 --min-ansatte 12

# Bygg styrekandidatgrafen for en region
python3 scripts/styregraf.py --kommune bergen --ut styrekandidater.csv
```

Krever Python 3.9+. Ingen avhengigheter utover standardbiblioteket.

| Fil | Hva den gjør |
|---|---|
| `scripts/brreg.py` | Klient mot Enhetsregisteret, rolleregisteret og Regnskapsregisteret |
| `scripts/screen.py` | Selskapsscreening med scoring på eieralder, margin og soliditet |
| `scripts/styregraf.py` | Bygger personnettverk fra rolleregisteret og rangerer styrekandidater |
| `index.html` | Selve analysen |

## Tre fallgruver i Brønnøysunddataene

Disse kostet tid å finne, og de er ikke dokumentert noe sted:

1. **Korporative roller er revisorer, ikke eiere.** De aller fleste selskaper har
   Deloitte, PwC eller BDO registrert som rolleinnehaver av typen `REVI` eller
   `REGN`. Leser du dem som morselskap, får du en eierklassifisering som er helt
   feil. Filtrer på `LEDE`, `NEST`, `MEDL`, `DAGL`.

2. **Regnskapsregisteret gir kun siste år.** Det finnes ingen årsparameter som
   virker. Flerårig trend må hentes fra Proff, Enin eller årsregnskapene enkeltvis.

3. **SN2025 renummererte næringskodene.** Engroshandel ligger ikke lenger på
   46.5x/46.6x — de gir null treff. Sjekk alltid en kjent aktør i bransjen før
   du stoler på en kode.

I tillegg: `overordnetEnhet` er nesten aldri utfylt, så konserntilhørighet kan
ikke screenes fra registeret. Og **Aksjonærregisteret er ikke åpne data** — det
må bestilles fra Skatteetaten og leveres på fil innen fem virkedager. Uten det
er eierskap en kvalifisert antakelse, ikke et faktum.

## Om dataene

Skriptene produserer CSV-filer som inneholder **navn og fødselsår på
identifiserbare personer**, hentet fra offentlige registre. Slike filer er
utelatt fra dette repoet med vilje, og `.gitignore` er satt opp for å holde dem
ute.

At kildene er offentlige gjør ikke en aggregert, profilert og kommentert liste
offentlig. Kjører du disse skriptene, er det ditt ansvar å behandle resultatet
deretter.

## Kilder

- [Brønnøysundregistrenes åpne API-er](https://data.brreg.no/enhetsregisteret/api/dokumentasjon)
- [Skatteetaten — Aksjonærregisteret](https://www.skatteetaten.no/deling/aksjonarregisteret/)
- [Thommessen — M&A på Vestlandet i 2026](https://www.thommessen.no/aktuelt/m-a-pa-vestlandet-i-2026-drivere-muligheter-og-forutsigbare-transaksjonsprosesser)
