# Organisasjonsteori – interaktiv oppgaveplattform

En selvstendig nettapp for å lære **hvordan organisasjoner fungerer**: tolv kapitler
organisasjonsteori med hovedteoriene og definisjonene, og fire oppgavetyper å øve med.

## Kom i gang

Ingen avhengigheter og ingen byggesteg. Åpne `index.html` i en nettleser.

Skal du kjøre den fra en lokal server (anbefalt hvis nettleseren begrenser
`localStorage` på `file://`):

```bash
python3 -m http.server 8000
# åpne http://localhost:8000
```

## Innhold

| Del | Omfang |
|---|---|
| Kapitler | 12 |
| Hovedteorier | 63 |
| Definisjoner | 189 |
| Quizspørsmål | 122 |
| Caseoppgaver | 12 |

### Kapitler

1. Hva er en organisasjon? – definisjoner, åpne systemer, fagets historiske retninger
2. Mål, strategi og effektivitet – målhierarki, målforskyvning, strategiperspektiver
3. Organisasjonsstruktur – arbeidsdeling, koordinering, Mintzbergs konfigurasjoner, betingelsesteori
4. Organisasjonskultur – Scheins nivåer, kulturtypologier, subkulturer
5. Organisasjonens omgivelser – ressursavhengighet, populasjonsøkologi, nyinstitusjonell teori
6. Motivasjon og ytelse – behovsteorier, kognitive teorier, jobbdesign
7. Kommunikasjon – kommunikasjonsprosessen, kanalrikhet, nettverk
8. Beslutningsprosesser – begrenset rasjonalitet, garbage can, skjevheter, gruppetenkning
9. Makt og konflikt – maktbaser, maktens tre ansikter, konflikthåndtering, forhandling
10. Ledelse – trekk-, atferds-, situasjons- og relasjonsteorier, destruktiv ledelse
11. Endring – Lewin, Kotter, motstand, punktert likevekt
12. Læring, kunnskap og innovasjon – Argyris & Schön, SEKI, Senge, March, Christensen

### Oppgavetyper

- **Quiz** – flervalgsspørsmål per kapittel eller på tvers, med forklaring på hvert svar.
  Både enkeltvalg og spørsmål med flere riktige alternativer.
- **Flashcards** – begrep på forsiden, definisjon på baksiden. Marker «kan» eller
  «må repeteres», og få et eget puggesett av det du sliter med.
- **Koblingsoppgaver** – par teori med opphavsperson, teori med kjerneidé, eller
  begrep med definisjon. Teller feilforsøk.
- **Caseoppgaver** – realistiske situasjoner med delspørsmål, plass til eget skriftlig
  svar, og et veiledende svar til sammenligning.
- **Eksamensmodus** – 40 tilfeldige spørsmål fra hele pensum.

## Fremgang

Alt lagres i `localStorage` i nettleseren under nøkkelen `ot-progresjon-v1`:
besvarte spørsmål, quizresultater, flashcard-markeringer og caseutkast. Ingenting
sendes til noen server, og fremgangen følger ikke med til en annen maskin eller
nettleser. Den kan nullstilles under **Fremgang**.

## Struktur

```
index.html            Skall, meny og skriptinnlasting
css/styles.css        Designsystem, lyst og mørkt tema
data/modules.js       Kapittelinnhold (blokktyper: p, liste, tabell, boks, def)
data/theories.js      Teoribank: opphav, kjerneidé, hovedpunkter, kritikk
data/glossary.js      Begrepsbank med definisjoner og kilder
data/questions.js     Quizspørsmål med forklaringer
data/cases.js         Caseoppgaver med veiledende svar
js/store.js           Fremgang og localStorage
js/ui.js              Escaping, DOM-hjelpere, felles visningsbiter
js/quiz.js            Quizmotor
js/flashcards.js      Flashcardmotor
js/match.js           Koblingsoppgaver
js/cases.js           Casevisning
js/app.js             Hash-router, sider og søk
```

Innholdet i `data/` er ren data og kan utvides uten å røre logikken. Et nytt kapittel
krever en oppføring i `modules.js`; spørsmål, begreper, teorier og case knyttes til det
via `modul`-feltet.

Tekstfeltene i datafilene kan bruke `<em>` og `<strong>` for utheving. Alt annet markup
escapes bort før innsetting (`js/ui.js`).

## Faglig grunnlag

Strukturen følger den vanlige oppbygningen i norsk innføringspensum i organisasjonsteori,
med Jacobsen og Thorsviks *Hvordan organisasjoner fungerer* som ryggrad. Teoribanken
oppgir opphavsperson og årstall, og hver teori har et eget avsnitt om kritikk og
begrensninger – det er som regel der eksamensbesvarelser skiller seg ut.
