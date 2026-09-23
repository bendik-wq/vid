/* Forelesningsnotater fra HSM121, strukturert per kapittel.
   Samme blokktyper som modules.js: p, liste, tabell, boks, def.
   Kilde oppgis per forelesning; notatene er sammenfattet, ikke gjengitt ordrett. */
window.OT = window.OT || {};
window.OT.lectures = [

  /* =================== 1. Introduksjon =================== */
  {
    id: 'f1', modul: 'grunnlag', nr: 1,
    tittel: 'Introduksjon til emnet',
    kilde: 'HSM121 forelesning 1', foreleser: 'Reidar Hillesund', lysbilder: 51,
    litteratur: 'JT kap. 1',
    hovedpunkter: [
      'Faget har tre hensikter: forstå, forklare og forbedre',
      'Organisasjonen forstås som et produksjonssystem i samspill med omgivelsene',
      'Det vi vil forklare er atferd — holdninger, tenkning og handlinger',
      'Etikk ligger i sentrum av modellen, ikke på siden av den'
    ],
    seksjoner: [
      {
        tittel: 'Fagets tre hensikter',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Forståelse — å forstå hva som skjer.</strong> Teorien gir verktøy for å analysere: begreper, analytiske kategorier og modeller. Hva er likt, hva er forskjellig?',
            '<strong>Forklaring — å forklare hvorfor det skjedde.</strong> Hvordan henger fenomener og hendelser sammen? Finnes det en årsak–virkning-sammenheng?',
            '<strong>Forbedring — å gi råd om hvordan problemer kan løses.</strong> Hva er hensiktsmessig å endre i struktur, kultur eller prosesser?'
          ]},
          { t: 'p', tekst: 'Rekkefølgen er ikke tilfeldig. Rådet om forbedring har ingen verdi før forståelsen og forklaringen er på plass — og det er nettopp der de fleste organisasjoner hopper over et ledd.' }
        ]
      },
      {
        tittel: 'Hva er en organisasjon?',
        blokker: [
          { t: 'def', term: 'Organisasjon', tekst: '«Et sosialt system som er bevisst konstruert for å løse spesielle oppgaver og realisere bestemte mål» (Etzioni, gjengitt hos Jacobsen og Thorsvik 2025).' },
          { t: 'liste', tittel: 'De fire elementene, utdypet', punkter: [
            '<strong>Sosialt:</strong> kjernen består av mennesker. Vi søker innsikt i den relasjonelle samhandlingen.',
            '<strong>System:</strong> gjensidig avhengige elementer. Vi undersøker hvordan arbeidskraft, teknologi, ressurser, politikk og konkurrenter påvirker hverandre.',
            '<strong>Bevisst konstruert:</strong> ut fra hensikt, effektivitet og klokskap. Organisasjoner er en besluttet orden — noen har bestemt hvordan mennesker skal fungere sammen, enten det er en gründer eller Stortinget.',
            '<strong>Løse oppgaver og realisere mål:</strong> her kommer kvalitet, kostnad og effektivitet inn.'
          ]},
          { t: 'p', tekst: 'Definisjonen er formålsnøytral: den dekker bedriften, sykehuset, skolen og hjelpeorganisasjonen like godt. Spørsmålet den tvinger fram er alltid det samme — <em>hva er formålet med at vi er sammen?</em>' },
          { t: 'liste', tittel: 'Organisasjoner som produksjonssystemer', punkter: [
            'Henter inn ressurser: medarbeidere, råvarer, informasjon, kapital',
            'Produserer noe: et produkt, en tjeneste eller en beslutning',
            'Leverer det til noen som har nytte av det — og får tilbakemelding som styrer neste runde'
          ]}
        ]
      },
      {
        tittel: 'Rammemodellen for emnet',
        blokker: [
          { t: 'p', tekst: 'Hele emnet er organisert rundt én modell. Organisasjonen står i <strong>omgivelser</strong> preget av avhengighet, usikkerhet og ytre press (kap. 6). Innenfor den har den <strong>formelle trekk</strong> — mål og strategi (kap. 2) og struktur (kap. 3) — og <strong>uformelle trekk</strong> — kultur (kap. 4) og makt (kap. 5).' },
          { t: 'p', tekst: 'Disse virker gjennom <strong>organisasjonsatferd og prosesser</strong>: motivasjon og ytelse (kap. 7), kommunikasjon (kap. 8), beslutninger (kap. 9), læring (kap. 10) og endring (kap. 11). <strong>Ledelse</strong> (kap. 12) virker på det hele, og ressurser omformes til resultater med tilbakemelding tilbake til omgivelsene.' },
          { t: 'boks', tittel: 'Etikk i sentrum', tekst: 'I forelesningens versjon av modellen er etikk plassert i midten, sammen med ledelse — ikke som et vedheng. Det finnes neppe en organisasjon uten ledelse og etikk, men det finnes mange organisasjoner uten refleksjon om dem.' }
        ]
      },
      {
        tittel: 'Det vi vil forklare, er atferd',
        blokker: [
          { t: 'liste', tittel: 'Atferdens tre elementer', punkter: [
            'Menneskets <strong>holdninger</strong> — hva de mener og tror',
            'Hva menneskene <strong>tenker</strong> — hva de er opptatt av, og hvordan de forstår det de fokuserer på',
            'Menneskets <strong>handlinger</strong> — hva de faktisk gjør'
          ]},
          { t: 'p', tekst: 'Organisasjonen er forklaringsfaktoren: mål og strategi, formell struktur, kultur, uformelle maktforhold og ledelse. Atferdsprosessene er det som forklares: motivasjon, kommunikasjon, beslutninger, læring og endring.' },
          { t: 'boks', tittel: 'Hva slags kunnskap er dette?', tekst: 'Organisasjonsteori er samfunnsvitenskap, ikke naturvitenskap. Den gir ikke absolutte og evige sannheter, men viser hva som er sannsynlig og hvordan flertallet reagerer. Et mindretall avviker ofte — og mennesker lærer og tilpasser seg. Det er dynamiske prosesser, mønstre og utviklingstrekk, ikke to streker under svaret.' }
        ]
      },
      {
        tittel: 'Vare- og tjenesteproduksjon',
        blokker: [
          { t: 'p', tekst: 'Skillet er en glidende overgang, ikke to kategorier (JT tabell 1.1). Plasseringen har konsekvenser for struktur, ledelse og hva som kan standardiseres.' },
          { t: 'tabell', kolonner: ['', 'Vareproduksjon', 'Kombinasjon', 'Tjenesteproduksjon'], rader: [
            ['Hva produseres', 'Fysiske ting', 'Service og opplevelser knyttet til fysiske produkter', 'Immaterielle goder'],
            ['Konsum', 'Skjer uavhengig av produksjon', 'Deler av konsumet er tett knyttet til produksjon', 'Skjer samtidig med produksjon'],
            ['Kunderelasjon', 'Avstand, upersonlig, ikke direkte kontakt', 'Relasjon knyttet til service', 'Nærhet, direkte og personlig kontakt'],
            ['Innsatsfaktor', 'Maskiner, kapitalintensiv', 'Maskiner og mennesker like viktig', 'Mennesker, arbeidskraft- og kunnskapsintensiv']
          ]}
        ]
      },
      {
        tittel: 'Hva er ledelse?',
        blokker: [
          { t: 'liste', tittel: 'Fire definisjoner fra forelesningen', punkter: [
            'Ledelse er en påvirkningsprosess hvor lederen påvirker en gruppe til å nå et felles mål (Northouse 2007)',
            'Ledelse handler i hovedsak om å skape forståelse for mål og arbeidsoppgaver, og legge til rette for medarbeidernes målrettede arbeid (Yukl 2013)',
            'Ledelse er en prosess rettet mot å påvirke andres tenkning, holdning og atferd for å oppmuntre til innsats mot felles mål (Yukl 2013)',
            'Lederens hovedoppgaver er administrasjon, fag og ledelse (Martinsen 2016)'
          ]},
          { t: 'liste', tittel: 'Hvorfor studere ledelse?', punkter: [
            '<strong>Motivasjon:</strong> ledere har stor innflytelse på medarbeideres motivasjon',
            '<strong>Strategi:</strong> formelle ledere er involvert i organisasjoners retningsvalg',
            '<strong>Kultur:</strong> ledere er viktige for å forme den',
            '<strong>Endring og tilpasning:</strong> ledelse er sentralt for å lykkes med endringsprosesser',
            '<strong>Legitimitet og effektivitet:</strong> hvordan organisasjonen oppfattes utenfra, og hvor produktiv den er, avhenger blant annet av lederne',
            '<strong>Realisering av formål:</strong> ledere kan være avgjørende for å nå målene'
          ]},
          { t: 'p', tekst: 'Ledelsesfagets utvikling følger en linje: trekkteorier («great man»), atferdsorienterte teorier, makt- og innflytelsesteorier, situasjonsbestemt ledelse, transformasjonsledelse, og til slutt integrerte teorier som autentisk og tjenende ledelse.' }
        ]
      },
      {
        tittel: 'Etikk',
        blokker: [
          { t: 'def', term: 'Etikk og moral', tekst: 'Etikk handler om hva vi <em>bør</em> gjøre (teori). Moral handler om hva vi <em>faktisk</em> gjør (praksis). Begge kan beskrives deskriptivt (hva som skjer) eller normativt (hvordan vi mener det bør være).' },
          { t: 'liste', tittel: 'Fire etiske utgangspunkt', punkter: [
            '<strong>Konsekvensetikk:</strong> konsekvensen av våre handlinger avgjør',
            '<strong>Pliktetikk:</strong> allmenngyldige plikter avgjør',
            '<strong>Dydsetikk:</strong> det handler om å være et godt menneske',
            '<strong>Diskursetikk:</strong> det vi blir enige om i fellesskap, er det riktige'
          ]},
          { t: 'liste', tittel: 'Spørsmålene forelesningen stiller', punkter: [
            'Handler ledelse også om etikk?',
            'Har lederens mål en betydning?',
            'Hvordan behandler lederen andre?',
            'Bør ledelse og etikk integreres tettere?'
          ]}
        ]
      }
    ]
  },

  /* =================== 2. Mål og strategi =================== */
  {
    id: 'f2', modul: 'mal', nr: 2,
    tittel: 'Mål, strategi og effektivitet',
    kilde: 'HSM121 forelesning 2', foreleser: 'Reidar Hillesund', lysbilder: 27,
    litteratur: 'JT kap. 2',
    hovedpunkter: [
      'Mål har fire funksjoner: motivere, styre, evaluere og legitimere',
      'Strategi kommer enten utenfra og inn (Porter) eller innenfra og ut (ressursbasert)',
      'Produktivitet og effektivitet er ikke det samme',
      'Målforskyvning har tre gjenkjennelige former'
    ],
    seksjoner: [
      {
        tittel: 'Hvorfor studere mål og strategi?',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Motiverende</strong> på organisasjonsmedlemmene — skaper bevegelse og retning',
            '<strong>Styringsredskap</strong> — gir beslutningsgrunnlag og avgrensninger',
            '<strong>Evaluering og effektivitetskriterium</strong> — i hvor høy grad når organisasjonen sine mål, og med hvilken ressursbruk?',
            '<strong>Legitimitetsfaktor</strong> overfor omgivelsene — begrunnelsen for sin egen eksistens'
          ]},
          { t: 'boks', tittel: 'Ole Brumm-testen', tekst: '«Hvor skal vi gå i dag?» spurte Kristoffer Robin. «Ingen steder,» sa Ole Brumm. Og så gikk de dit. Poenget er at fravær av retning ikke er nøytralt — organisasjonen beveger seg uansett.' }
        ]
      },
      {
        tittel: 'Retning: fra hensikt til strategi',
        blokker: [
          { t: 'liste', tittel: 'Organisasjonens retning består av', punkter: [
            '<strong>Hensikt/misjon/mandat:</strong> hvorfor er vi til, og hva skal vi gjøre?',
            '<strong>Visjon:</strong> hvor vil vi? Et bilde av en ønsket framtid, den ideelle situasjonen',
            '<strong>Verdier:</strong> hva er viktig, og hvordan vil vi prioritere?',
            '<strong>Mål:</strong> hva måler vi, og hvordan måler vi det? Resultatmål og effektmål',
            '<strong>Strategi:</strong> hvordan velge riktig vei, og hvordan tenke neste steg?',
            '<strong>Filosofi:</strong> menneskesyn, ledelsessyn og organisasjonssyn'
          ]},
          { t: 'p', tekst: 'Målhierarkiet går fra visjon og formål, via hovedmål, til delmål og effekter — med verdier, struktur, kultur og strategiske veivalg som det som binder nivåene sammen.' },
          { t: 'boks', tittel: 'Eksempel fra forelesningen', tekst: 'Det norske oljeselskap (senere Statoil/Equinor) ble startet i 1972 med formålet: bevare kontrollen med Norges olje og gass på norske hender. Effekten, mange tiår senere, er Statens pensjonsfond utland.' }
        ]
      },
      {
        tittel: 'Hva er strategi?',
        blokker: [
          { t: 'def', term: 'Strategi', tekst: 'Veien mot målet og hvordan vi prioriterer. Den forteller hvordan en tenker for å realisere målene, og hvordan en posisjonerer seg i forhold til konkurrentene.' },
          { t: 'tabell', kolonner: ['Perspektiv', 'Retning', 'Kjerneidé'], rader: [
            ['Generiske strategier (Porter)', 'Utenfra og inn — fra marked til organisasjon', 'Kostnadsledelse (IKEA, H&amp;M), differensiering (Tesla, Apple) eller fokusering på et segment (DN, Finansavisen)'],
            ['Ressursbaserte strategier', 'Innenfra og ut — fra organisasjon til marked', 'Konkurransefortrinn kommer av ressurser som er viktige, knappe og vanskelige å kopiere']
          ]},
          { t: 'liste', tittel: 'Tre ressurstyper', punkter: [
            'Fysiske ressurser',
            'Menneskelige ressurser',
            'Organisatoriske ressurser'
          ]},
          { t: 'p', tekst: 'Forelesningens poeng er skarpt: kompetansen organisasjonen besitter er dens beste strategiske fortrinn, fordi den er vanskelig å kopiere eller kjøpe. <em>Man kan kopiere et belønningssystem, men ikke kulturen som får belønningssystemet til å fungere. Man kan kopiere en formell struktur, men ikke tilliten som gjør at strukturen fungerer så godt.</em>' },
          { t: 'liste', tittel: 'Miles og Snows fire strategigrupper', punkter: [
            '<strong>Oppfinnere:</strong> først ute, innovasjonsdrevet',
            '<strong>Analytikere:</strong> være en god nummer to',
            '<strong>Forsvarere:</strong> effektiv produksjon, høy markedsføring',
            '<strong>Etternølere:</strong> tilpasser seg først når de er tvunget til det'
          ]},
          { t: 'boks', tittel: 'Business Model Canvas', tekst: 'Verktøyet dekker viktigste partnere, aktiviteter og ressurser, verdi for kunder, kunderelasjoner, kundesegment, kanal for kundekontakt, kostnadsstruktur og inntektsstrøm.' }
        ]
      },
      {
        tittel: 'Effektivitet, produktivitet og kostnader',
        blokker: [
          { t: 'def', term: 'Produktivitet', tekst: 'De kostnadene som går med til å produsere en vare eller tjeneste av en gitt kvalitet.' },
          { t: 'def', term: 'Effektivitet', tekst: 'Forholdet mellom ressursbruk og måloppnåelse. I offentlig sektor skilles det mellom formålseffektivitet og kostnadseffektivitet — om ressursbruken faktisk gir de ønskede resultatene.' },
          { t: 'liste', tittel: 'To kostnadstyper', punkter: [
            '<strong>Produksjonskostnader:</strong> knyttet til innsatsfaktorene — råvarer, arbeidskraft, kapital',
            '<strong>Transaksjonskostnader:</strong> knyttet til å overvåke en relasjon mellom to eller flere aktører. De øker med avhengighet, usikkerhet og hyppighet — og avgjør spørsmålet om å gjøre oppgaven selv eller sette den ut'
          ]},
          { t: 'liste', tittel: 'Balansert målstyring — fire indikatorer', punkter: [
            'Finansielle indikatorer (inntjening og avkastning)',
            'Kundeperspektivet (tilfredshet)',
            'Interne produksjonsprosesser (kostnader)',
            'Evnen til læring og vekst (ansattes kompetanse)'
          ]},
          { t: 'p', tekst: 'Begrunnelsen for flere indikatorer er å balansere kortsiktig og langsiktig effektivitet. Måler man bare det finansielle, styrer man bare det kortsiktige.' }
        ]
      },
      {
        tittel: 'Strategi i offentlig sektor',
        blokker: [
          { t: 'liste', punkter: [
            'Strategien må i høy grad ivareta motstridende idealer',
            'Målene dreier seg ofte om komplisert tjenesteyting, og er ofte kontinuerlige framfor avsluttede',
            'Man kan ikke velge mål og strategier fritt'
          ]},
          { t: 'p', tekst: 'Det styrende spørsmålet blir derfor: hvordan oppnår vi størst mulig offentlig nytte — <em>public value</em> — med de midlene det offentlige har til rådighet?' },
          { t: 'liste', tittel: 'Virksomhetsstyring og samfunnsansvar', punkter: [
            '<strong>Virksomhetsstyring</strong> (corporate governance) er en styringsform som skal sikre eierinnflytelse',
            '<strong>Samfunnsansvar</strong> (CSR) understreker at organisasjoner har et ansvar utover det å tjene penger: økonomisk (hva folk har behov for), legalt (innenfor lover og regler), etisk (innenfor uformelle normer) og filantropisk (utover det de selv har nytte av)'
          ]}
        ]
      },
      {
        tittel: 'Når mål og strategi skaper problemer',
        blokker: [
          { t: 'p', tekst: 'Det sentrale spørsmålet er om det er samsvar mellom den <strong>intenderte</strong> (formelle, vedtatte) strategien og den <strong>realiserte</strong>. Mellomrommet fylles av <strong>fremvoksende strategi</strong> — den strategien organisasjonen faktisk har, men som aldri er vedtatt — og av strategi som rett og slett ikke blir realisert.' },
          { t: 'def', term: 'Målkonflikt', tekst: 'Konflikt mellom ulike målsettinger, mellom grupper eller personer, eller mellom middel og mål. Den kan håndteres ved kompromiss mellom målene, eller ved å forholde seg sekvensielt til dem — ett om gangen.' },
          { t: 'liste', tittel: 'Målforskyvning antar tre vanlige former', punkter: [
            '<strong>Suboptimalisering («silotenkning»):</strong> enheten optimaliserer sitt eget delmål på helhetens bekostning',
            '<strong>Overdreven regelfokusering («jeg fulgte bare reglene»):</strong> regelen blir viktigere enn formålet den skulle tjene',
            '<strong>Overmåling:</strong> det som er lett å måle, fortrenger det som er viktig. Lett å måle karakteren i betydningen tallet — vanskelig å måle karakteren i betydningen kvaliteten'
          ]},
          { t: 'boks', tittel: 'Teknologi og strategi: Nokia og Kodak', tekst: 'Nokia var verdensledende på mobiltelefoner i 1999, med 170 milliarder i omsetning og 55 000 ansatte, men klarte ikke den digitale omstillingen. Kodak dominerte verdensmarkedet for fotografisk film — og klarte den heller ikke. Paradokset er at Kodak var de første til å lage digitale kameraer.' }
        ]
      }
    ]
  },

  /* =================== 3. Organisasjonsstruktur =================== */
  {
    id: 'f3', modul: 'struktur', nr: 3,
    tittel: 'Organisasjonsstruktur',
    kilde: 'HSM121 forelesning 3', foreleser: 'Reidar Hillesund', lysbilder: 30,
    litteratur: 'JT kap. 3',
    hovedpunkter: [
      'Struktur svarer på fire spørsmål: fordeling, myndighet, koordinering og kontroll',
      'Syv koordineringsmekanismer, ikke bare hierarki og regler',
      'Fem strukturbegreper er nok til å beskrive enhver organisasjon',
      'Mintzbergs fem konfigurasjoner kobles til omgivelsenes stabilitet og kompleksitet'
    ],
    seksjoner: [
      {
        tittel: 'Hva er organisasjonsstruktur?',
        blokker: [
          { t: 'def', term: 'Organisasjonsstruktur', tekst: 'En fordeling av arbeidsoppgaver og ansvar som er relativt stabil over tid.' },
          { t: 'liste', tittel: 'De fire spørsmålene strukturen besvarer', punkter: [
            'Hvordan skal oppgavene fordeles?',
            'Hvordan skal myndighet til å fatte beslutninger fordeles?',
            'Hvordan skal oppgavene koordineres?',
            'Hvordan kan vi sikre oss at ansatte gjør det de er betalt for å gjøre?'
          ]},
          { t: 'liste', tittel: 'Hvorfor struktur er viktig', punkter: [
            'Legger til rette for <strong>spesialisering</strong> og stordriftsfordeler — med baksiden at arbeidet kan bli monotont og fremmedgjørende, og motivasjonen svekkes',
            'Bidrar til å <strong>koordinere</strong> aktiviteter',
            'Skaper <strong>stabilitet</strong>'
          ]},
          { t: 'p', tekst: 'Strukturen får konsekvenser langt utover organisasjonskartet: for effektivitet og produktivitet, arbeidsmiljø og motivasjon, kommunikasjon, beslutninger, makt og konflikt, og innovasjon.' }
        ]
      },
      {
        tittel: 'Arbeidsdeling og gruppering',
        blokker: [
          { t: 'p', tekst: 'Arbeidsdeling skjer både på individnivå og gruppenivå. På gruppenivå følger den i hovedsak to prinsipper:' },
          { t: 'liste', punkter: [
            '<strong>Funksjonsbasert:</strong> avdelinger for innkjøp, produksjon, intern service, salg og marked — likt samles med likt',
            '<strong>Markedsbasert:</strong> avdelinger for privatkunder, bedriftskunder, utenlandskunder — organisert etter hvem man betjener'
          ]},
          { t: 'p', tekst: '<strong>Matrisestruktur</strong> kombinerer begge: funksjon på den ene aksen (innkjøp, produksjon, salg) og marked eller geografi på den andre (Norge, Norden, Europa). Prisen er at medarbeideren får to ledere.' },
          { t: 'liste', tittel: 'Prosjektorganisering ved siden av basisorganisasjonen', punkter: [
            '<strong>Fordeler:</strong> spesialisering, fleksibilitet i bruken av ressurser, og koordinering mot bruker eller kunde',
            '<strong>Ulemper:</strong> delt lederskap, krysspress, lojalitetsproblemer, forvirring og frustrasjon'
          ]},
          { t: 'liste', tittel: 'Linje og stab', punkter: [
            '<strong>Linjeorganisasjonen</strong> er det formelle hierarkiet av beslutningsmyndighet',
            '<strong>Stabsorganisasjonen</strong> befinner seg på siden av hierarkiet, og fungerer enten som støttefunksjon til linjen eller som støtte til ledelsen (teknostruktur)'
          ]}
        ]
      },
      {
        tittel: 'Sentralisering og desentralisering',
        blokker: [
          { t: 'tabell', kolonner: ['', 'Sentralisering', 'Desentralisering'], rader: [
            ['Fordeler', 'Klare styringssignaler<br>Klart ansvar<br>Ensartet praksis<br>Forutsigbar praksis', 'Lokal tilpasning<br>Fleksibilitet<br>Motiverende<br>Hurtighet'],
            ['Ulemper', 'Lokal informasjon går tapt i hierarkiet<br>Lite fleksibelt<br>Demotiverende<br>Treghet', 'Manglende styring og suboptimalisering<br>Uklart ansvar<br>Ulik praksis<br>Uforutsigbarhet']
          ]},
          { t: 'p', tekst: 'Legg merke til at listene er speilbilder: hver fordel ved den ene er en ulempe ved den andre. Det er derfor spørsmålet aldri er <em>hvilken er best</em>, men <em>hvilke beslutninger hører hjemme hvor</em>.' },
          { t: 'def', term: 'Formaliseringsgrad', tekst: 'I hvor stor grad arbeidet er formalisert: krav til skriftlig saksbehandling, krav om å følge bestemte prosedyrer og regler, og klare regler for hvem eller hvilke organer som fatter beslutninger.' }
        ]
      },
      {
        tittel: 'Koordineringsmekanismer',
        blokker: [
          { t: 'liste', tittel: 'De syv mest sentrale', punkter: [
            '<strong>Gjensidig tilpasning</strong> — uformell kommunikasjon',
            '<strong>Direkte tilsyn og ordre</strong> — det formelle hierarkiet',
            '<strong>Standardisering av arbeidsoppgaver</strong> — regler, rutiner og prosedyrer; byråkrati, lean production, JIT',
            '<strong>Standardisering av resultater</strong> — formål, visjon, mål og strategier',
            '<strong>Standardisering av kunnskaper</strong> — profesjonell utdanning og opplæring',
            '<strong>Standardisering av normer</strong> — verdier og normer, altså kultur',
            '<strong>Horisontale ordninger for samarbeid</strong> — team og prosjektgrupper'
          ]},
          { t: 'p', tekst: 'Merk at kultur her står oppført som en koordineringsmekanisme på linje med regler og hierarki. Det er nettopp koblingen til kapittel 4: kultur er ikke bare et klima, det er et styringsverktøy.' }
        ]
      },
      {
        tittel: 'Fem sentrale strukturbegreper',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Vertikal differensiering</strong> — antall nivåer, bestemt av antall ansatte og kontrollspenn',
            '<strong>Horisontal differensiering</strong> — hvor mange avdelinger som ligger ved siden av hverandre på samme nivå, og dermed graden av spesialisering',
            '<strong>Sentraliseringsgrad</strong>',
            '<strong>Formaliseringsgrad</strong>',
            '<strong>Koordineringsmekanisme</strong>'
          ]},
          { t: 'p', tekst: 'Dette er analyseverktøyet: skal du beskrive en organisasjons struktur presist, holder det å svare på disse fem.' }
        ]
      },
      {
        tittel: 'Mintzbergs fem konfigurasjoner',
        blokker: [
          { t: 'liste', tittel: 'Fem hoveddeler i en organisasjon', punkter: [
            'Operativ kjerne', 'Mellomledelse', 'Toppledelse', 'Teknostruktur', 'Støttestruktur'
          ]},
          { t: 'p', tekst: 'Ved å variere sammensetningen av disse gruppene får vi fem organisasjonsformer.' },
          { t: 'tabell', kolonner: ['Konfigurasjon', 'Arbeidsdeling', 'Koordinering', 'Beslutning', 'Styring', 'Typisk'], rader: [
            ['Entreprenørorganisasjonen', 'Liten og uklar, ingen støttefunksjoner', 'Direkte overvåking', 'Sentralisert', 'Kontroll av atferd', 'Små virksomheter'],
            ['Maskinbyråkratiet', 'Funksjonell', 'Standardisering av arbeidsoppgaver', 'Mye makt plassert i stab', 'Kontroll av om reglene er fulgt', 'McDonalds, hotell'],
            ['Det profesjonelle byråkratiet', 'Funksjonell etter fag', 'Standardisering av kunnskap', 'Desentralisert, høy bruk av skjønn', 'Rekruttering', 'Sykehus, høyskoler'],
            ['Adhokratiet (den innovative)', 'Uklar styringsstruktur, stadig omdefinerte oppgaver', 'Gjensidig tilpasning', 'Desentralisert og åpen', 'Disiplinering gjennom resultatkrav', 'Prosjektorganisasjoner'],
            ['Divisjonalisert struktur', 'Marked eller produkt', 'Standardisering av resultater', 'Desentralisert', 'Disiplinering gjennom resultatkrav', 'Equinor, DNB']
          ]},
          { t: 'p', tekst: 'Konfigurasjonene kobles til omgivelsene (JT figur 6.4): i <strong>stabile og homogene</strong> omgivelser passer maskinbyråkratiet, i <strong>dynamiske og homogene</strong> entreprenørorganisasjonen, i <strong>stabile og heterogene</strong> den divisjonaliserte strukturen, og i <strong>dynamiske og heterogene</strong> det profesjonelle byråkratiet og adhokratiet.' }
        ]
      },
      {
        tittel: 'Systemer for styring og kontroll',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Rekruttering:</strong> passer inn mot best kvalifisert. Sterk profesjonalisering gir sterkere motstand mot styringsforsøk',
            '<strong>Sosialisering:</strong> den ansatte tilegner seg organisasjonens normer, verdier og grunnleggende antakelser, føler lojalitet og identifiserer seg. Forelesningen kaller dette <em>en skjult form for styring</em>',
            '<strong>Disiplinering:</strong> straff og belønning gjennom insentivsystemer',
            '<strong>Kontroll:</strong> kontrollere at handlingen som er utført, er i tråd med organisasjonens ønske'
          ]},
          { t: 'boks', tittel: 'Verdt å merke seg til eksamen', tekst: 'At sosialisering omtales som skjult styring er et poeng som kobler struktur, kultur og makt. Det som ser ut som kulturbygging, er samtidig et styringssystem — og det er nettopp derfor sterk kultur kan erstatte formalisering.' }
        ]
      }
    ]
  },

  /* =================== 4. Organisasjonskultur =================== */
  {
    id: 'f4', modul: 'kultur', nr: 4,
    tittel: 'Organisasjonskultur',
    kilde: 'HSM121 forelesning 4', foreleser: 'Reidar Hillesund', lysbilder: 39,
    litteratur: 'JT kap. 4, Bang (2023)',
    hovedpunkter: [
      'Tillit kan erstatte byråkratisk kontroll — og være mer effektivt',
      'Schein gir nivåene, Bang gir skillet mellom kulturuttrykk og kulturinnhold',
      'Sterk kultur har tre systematiske dysfunksjoner',
      'Kultur endres gjennom praksis og rekruttering, ikke gjennom verdiplakater'
    ],
    seksjoner: [
      {
        tittel: 'Hvorfor studere organisasjonskultur?',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Organisasjonens suksess:</strong> en kultur som samler medarbeiderne i felles opplevelser av tilhørighet kan være avgjørende',
            '<strong>Tilhørighet og fellesskap:</strong> vi-følelsen gir sterk identitetsdefinering og lojalitet, og kan gi lavere fravær',
            '<strong>Motivasjon:</strong> internalisering av verdier og mål gjennom sosialisering — det å jobbe mot noe større — har sterk motiverende effekt',
            '<strong>Tillit:</strong> en sunn kultur gir større tillit mellom ledere og ansatte, og dermed mindre behov for kontroll og overvåking',
            '<strong>Samarbeid og koordinering:</strong> man stoler på hverandre og jobber for fellesskapets mål framfor egeninteresser',
            '<strong>Styring:</strong> grunnleggende antakelser, verdier og normer avgrenser hva som oppfattes som relevant og viktig'
          ]},
          { t: 'boks', tittel: 'Tillit som styringsmiddel', tekst: 'Det klassiske eksempelet er Durkheims begrep om <em>organisk solidaritet</em> — fellesskap preget av sterk gjensidig tillit. Jacobsen og Thorsvik (2025) formulerer konsekvensen slik: «Organisasjoner med utstrakt tillit mellom ledere og medarbeidere kan være mer effektive enn organisasjoner hvor man bruker tradisjonelle byråkratisk-administrative styringsvirkemidler.»' }
        ]
      },
      {
        tittel: 'Definisjoner',
        blokker: [
          { t: 'def', term: 'Organisasjonskultur (Schein)', tekst: 'Et mønster av grunnleggende antakelser utviklet av en gitt gruppe etter hvert som den lærer å mestre sine problemer med ekstern tilpasning og intern integrasjon — som har fungert tilstrekkelig til at det blir betraktet som sant, og som derfor læres bort til nye medlemmer som den riktige måten å oppfatte, tenke og føle på i forhold til disse problemene.' },
          { t: 'def', term: 'Organisasjonskultur (Bang 2023)', tekst: 'De sett av felles delte normer, verdier og virkelighetsoppfatninger som utvikler seg i en organisasjon når medlemmene samhandler med hverandre og omgivelsene, og som kommer til uttrykk i medlemmenes handlinger og holdninger på jobben.' },
          { t: 'liste', tittel: 'Tre modeller for organisasjonskultur', punkter: [
            '<strong>Integrasjonsmodellen:</strong> én helhetlig kultur',
            '<strong>Differensieringsmodellen:</strong> ulike subkulturer',
            '<strong>Fragmenteringsmodellen:</strong> tvetydige og overlappende kulturer'
          ]}
        ]
      },
      {
        tittel: 'Scheins tre nivåer',
        blokker: [
          { t: 'p', tekst: '<strong>Artefakter → verdier og normer → grunnleggende antakelser.</strong> Artefaktene er lettest å observere; antakelsene er vanskeligst å få øye på og vanskeligst å endre.' },
          { t: 'liste', tittel: 'Artefaktene deles i tre', punkter: [
            '<strong>Fysiske:</strong> klær, beliggenhet, utformingen av kontorlokaler',
            '<strong>Atferdsmessige:</strong> tradisjoner, møtenes hyppighet og innhold, belønninger, sanksjoner',
            '<strong>Verbale:</strong> hvordan kommunikasjonen brukes — humor, historiefortelling, sjargong'
          ]},
          { t: 'def', term: 'Grunnleggende antakelser', tekst: 'Oppfatninger eller meninger om noe som nedfeller seg som sannheter gjennom felles fortolkning i sosiale grupper. De er ikke alltid bevisste, og derfor vanskelige å utfordre og endre.' },
          { t: 'def', term: 'Verdier', tekst: 'Hva som er ønskelig og godt, noe som verdsettes og som man er opptatt av å ivareta og fremme. Verdier innebærer at man har tatt et bevisst valg om at noe er godt og noe annet dårlig.' },
          { t: 'def', term: 'Normer', tekst: 'Uskrevne regler som angir hva som er passende å gjøre i ulike sosiale sammenhenger.' },
          { t: 'liste', tittel: 'Scheins syv dimensjoner for å skille kulturer', punkter: [
            'Hvordan forholdet mellom organisasjonen og omgivelsene oppfattes',
            'Hvilket syn man har på menneskets handlinger',
            'Hvordan organisasjonen kommer fram til «sannhet»',
            'Hvordan organisasjonen betrakter tid',
            'Hvilke antakelser man har om menneskelig natur',
            'Hvilket syn man har på relasjoner mellom mennesker',
            'Hvilket syn man har på konflikter'
          ]}
        ]
      },
      {
        tittel: 'Bang: kulturuttrykk og kulturinnhold',
        blokker: [
          { t: 'p', tekst: 'Bang (2023) skiller mellom <strong>kulturinnholdet</strong> — de levde verdiene, normene og virkelighetsoppfatningene — og <strong>kulturuttrykkene</strong>, som er det vi faktisk kan observere. Mellom dem ligger <em>fortolkning</em>: uttrykket må tolkes for å si noe om innholdet, og det er der analysen kan gå galt.' },
          { t: 'liste', tittel: 'Fire typer kulturuttrykk', punkter: [
            '<strong>Atferdsuttrykk:</strong> handlinger, uttrykte følelser, uttalte verdier og normer',
            '<strong>Verbale uttrykk:</strong> historier, myter, legender, språk, sjargong, humor',
            '<strong>Materielle uttrykk:</strong> objekter og ting, fysisk struktur og arkitektur',
            '<strong>Strukturelle uttrykk:</strong> ritualer, prosedyrer og seremonier, samt rekrutterings-, belønnings- og karrieresystemer'
          ]},
          { t: 'p', tekst: 'Artefakter har både et <strong>symbolsk</strong> og et <strong>instrumentelt</strong> innhold, og de kan plasseres langs en akse fra abstrakt og dårlig forstått til konkret og godt forstått: myter og historier og avslutningsseremonier i den symbolske enden, rutiner og belønninger i den instrumentelle.' },
          { t: 'liste', tittel: 'Artefaktenes fire funksjoner', punkter: [
            'De reflekterer organisasjonskulturen',
            'De påvirker tenkning og atferd ved å bringe fram internaliserte verdier og normer',
            'De gjør det enklere å dele erfaringer med kollegaer',
            'De gjør det klarere for folk hva de mener om organisasjonen, og kan integrere ulike oppfatninger'
          ]},
          { t: 'liste', tittel: 'Verdienes fire funksjoner (Rokeach, hos Bang 2023)', punkter: [
            'Verdiene er et <strong>styringsredskap</strong> — en standard eller veiviser for handlinger, vurderinger og holdninger',
            'Verdiene fungerer som <strong>plan for konfliktløsning og beslutninger</strong> — hvordan velge blant alternativer',
            'Verdiene gir <strong>motivasjon</strong>, og blir selve drivkraften bak atferd',
            'Verdiene er <strong>grunnpilar for selvaktelse</strong> og bidrar til å opprettholde selvfølelsen'
          ]},
          { t: 'p', tekst: 'Aadland og Askeland formulerer det kort: verdier danner intensjonsgrunnlaget for handling, skaper retning for handling, og utgjør fortolkningsgrunnlaget når handlingen skal vurderes. Motivasjon er bindeleddet mellom verdi og handling.' }
        ]
      },
      {
        tittel: 'Sterk kultur og dens dysfunksjoner',
        blokker: [
          { t: 'liste', tittel: 'Fem kjennetegn ved en sterk kultur', punkter: [
            'Klare og tydelige normer og regler',
            'Vektlegging av menneskelige ressurser',
            'Karismatiske ledere eller helter',
            'Ritualer og seremonier',
            'Klare forventninger om styring'
          ]},
          { t: 'liste', tittel: 'Dysfunksjonelle sider ved sterk og enhetlig kultur', punkter: [
            '<strong>Styringsproblemer</strong>',
            '<strong>Gruppetenkning</strong>',
            '<strong>Lite innovasjon og nytenkning</strong>'
          ]},
          { t: 'liste', tittel: 'Gruppetenkningens tre trekk', punkter: [
            'Medlemmene overvurderer gruppens makt og moral',
            'Medlemmene preges av trangsynthet og manglende evne eller vilje til å forstå kritikk og alternative synspunkter',
            'Medlemmene utvikler et kollektivt press i retning av ensartet tenkning'
          ]},
          { t: 'p', tekst: 'Cameron og Quinns typologi plasserer kulturer i fire kvadranter langs aksene fleksibilitet/kontroll og intern/ekstern fokus: <strong>klan</strong> (samarbeid), <strong>adhokrati</strong> (skape), <strong>hierarki</strong> (kontrollere) og <strong>marked</strong> (konkurranse).' }
        ]
      },
      {
        tittel: 'Subkulturer og konflikt',
        blokker: [
          { t: 'liste', tittel: 'Syv typiske subkulturkonflikter (Bang 2023)', punkter: [
            'Mellom <strong>funksjonsenheter</strong> — ulike avdelinger, divisjoner eller arbeidsgrupper',
            'Mellom <strong>sjikt</strong> i organisasjonen — ledere og medarbeidere',
            'Mellom <strong>yrkes- eller profesjonsgrupper</strong> — leger, psykologer, sykepleiere; økonomer, ingeniører, jurister',
            'Mellom <strong>fagideologier</strong> — ulike retninger innen samme fag',
            'Mellom <strong>aldersgrupper</strong> — de gamle og de unge, formell og uformell tone',
            'Mellom <strong>geografiske enheter</strong> — avdelinger mot hovedkontor, ulike datterselskaper',
            'Mellom <strong>sammenslåtte organisasjonskulturer</strong> — fusjon og oppkjøp, med stress, mistrivsel og usikkerhet'
          ]},
          { t: 'liste', tittel: 'Tre måter en enhet kan møte fellesverdiene på', punkter: [
            '<strong>Enhet i opprør:</strong> forkaster alle verdier og normer',
            '<strong>Skapende enhet:</strong> aksepterer bare de viktigste verdiene, og forkaster eller utfordrer de andre',
            '<strong>Tilpasset enhet:</strong> aksepterer alle verdier og normer'
          ]}
        ]
      },
      {
        tittel: 'Kulturendring og sosialisering',
        blokker: [
          { t: 'p', tekst: 'Organisasjonskultur er et relativt stabilt fenomen. Kulturendring skjer typisk ved konfrontasjon med overlevelseskriser: dramatiske kriser, nye ledere på toppen, eller i unge og små virksomheter der kulturen ennå er svak. Nyopprettede organisasjoner er langt mer mottakelige for forandring.' },
          { t: 'liste', tittel: 'Hva toppledere kan gjøre', punkter: [
            'Formidle nye historier',
            'Innføre nye ritualer',
            'Velge ut nøkkelpersonell som eksponerer de nye verdiene',
            'Bryte opp eksisterende subkulturer gjennom fusjon, oppsigelser eller forflytning'
          ]},
          { t: 'liste', tittel: 'Bangs syv råd til lederen som vil påvirke kulturen', punkter: [
            'Identifiser kulturen, og se hvilke deler som er dysfunksjonelle og hvilke som er funksjonelle',
            'Bli klar over hva slags kultur dere ønsker, og få den til å bli levende på alle nivåer',
            'Velg i første omgang <em>noen få</em> ønskede verdier å konsentrere oppmerksomheten rundt',
            'Sørg for at kulturuttrykkene stemmer med de verdiene og normene du vil fremme',
            'Etterlev den ønskede kulturen i handling — du er rollemodell',
            'Anvend bevisst og systematisk konsekvenser: belønninger og sanksjoner',
            'Rekrutter bevisst og selektivt. Omplasser eller skift ut sterke bærere av uønsket kultur'
          ]},
          { t: 'liste', tittel: 'Hvordan kultur utvikles', punkter: [
            'Bevisst rekruttering', 'Sosialisering og onboarding', 'Riter og seremonier', 'Historiefortelling', 'Språk og kommunikasjonsstrategi — slagord og logo'
          ]},
          { t: 'boks', tittel: 'Den nyansattes prosess', tekst: 'Feldmans modell deler sosialiseringen i tre faser: <em>getting in, breaking in, settling in</em>. Jacobsen (2003) peker på fire hovedområder den ansatte må mestre: oppgavene i arbeidsområdet, rolleområdet, kulturadoptering i gruppeområdet, og sosial integrasjon i organisasjonsområdet.' }
        ]
      }
    ]
  },

  /* =================== 5. Motivasjon =================== */
  {
    id: 'f5', modul: 'motivasjon', nr: 5,
    tittel: 'Motivasjon, ytelse og personlighet',
    kilde: 'HSM121 forelesning 5', foreleser: 'Reidar Hillesund', lysbilder: 43,
    litteratur: 'K&K kap. 4–5, JT kap. 7',
    hovedpunkter: [
      'Motivasjonskvartetten sorterer alle teoriene i fire familier',
      'Tre motivasjonstyper: ytre, indre og prososial',
      'Indre motivasjon har tre kilder: autonomi, kompetanse, tilhørighet',
      'Ytelsesbaserte belønningssystemer stiller harde krav for å virke'
    ],
    seksjoner: [
      {
        tittel: 'Hva er motivasjon?',
        blokker: [
          { t: 'def', term: 'Motivasjon (Jacobsen og Thorsvik)', tekst: 'En indre psykologisk prosess som får oss til å handle, som gir retning til handling, og som forsterker viljen til å handle.' },
          { t: 'def', term: 'Motivasjon (Kaufmann og Kaufmann)', tekst: 'Biologiske, psykologiske og sosiale faktorer som aktiverer, gir retning til og opprettholder atferd i ulike grader av intensitet for å nå et mål.' },
          { t: 'p', tekst: 'Ordet kommer av latin <em>movere</em> — å bevege. Motivasjonspsykologien spør hva som får oss til å bevege oss.' },
          { t: 'liste', tittel: 'Hvorfor studere motivasjon?', punkter: [
            'Operativ effektivitet', 'Økonomiske resultater', 'Varige konkurransefortrinn', 'Et godt arbeidsliv'
          ]}
        ]
      },
      {
        tittel: 'Ytre, indre og prososial motivasjon',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Ytre motivasjon:</strong> kilden ligger utenfor jobbaktiviteten — lønn og ytre goder, knyttet til resultatet av arbeidet',
            '<strong>Indre motivasjon:</strong> kilden ligger i selve utførelsen av arbeidet — mening, mestring, tilfredshet og glede',
            '<strong>Prososial motivasjon:</strong> ønsket om å hjelpe andre. Særlig relevant der oppgaveløsningen har stort innslag av mellommenneskelig samhandling — skole, helse, offentlig og frivillig sektor. Altruistiske verdier står gjerne høyt der prososial motivasjon er utbredt'
          ]},
          { t: 'liste', tittel: 'Tre skiller mellom indre og prososial motivasjon', punkter: [
            'Indre motivasjon er mer <strong>autonom</strong> enn prososial',
            'Indre motivasjon er ikke <strong>målrettet</strong> slik prososial motivasjon er',
            'Indre motivasjon er <strong>her-og-nå-fokusert</strong> på aktiviteten selv, mens prososial motivasjon er framtidsrettet og fokusert på det man oppnår ved aktiviteten'
          ]},
          { t: 'liste', tittel: 'Kilder til indre motivasjon', punkter: [
            'Selvbestemmelse (autonomi)', 'Kompetansebehov', 'Tilhørighet'
          ]},
          { t: 'p', tekst: 'Konsekvensene av indre motivasjon er dokumentert bredt: høyere ytelse, jobbtilfredshet, organisasjonsforpliktelse og kreativitet, og redusert turnoverintensjon. Kuvaas peker på jobbautonomi, støttende ledelse, medarbeiderinvestering, samhandling og kollegastøtte som det som bygger den — og på ekstrarolleatferd som en av effektene.' }
        ]
      },
      {
        tittel: 'Motivasjonskvartetten',
        blokker: [
          { t: 'p', tekst: 'Forelesningens hovedgrep er å sortere alle motivasjonsteoriene i fire familier. Kan du kvartetten, kan du plassere enhver teori du møter.' },
          { t: 'tabell', kolonner: ['Familie', 'Atferd utløses av', 'Teorier'], rader: [
            ['Behovsteorier', 'Grunnleggende behov eller drifter', 'Maslows behovshierarki, McClellands behov, prestasjonsbehov, selvreguleringsfokus (promoterings- og prevensjonsstrategier)'],
            ['Kognitive teorier', 'Tanker om forventninger til måloppnåelse, og vurdering av om det er bryet verdt', 'Kognitiv forventningsteori, målsettingsteori, kognitiv evalueringsteori'],
            ['Sosiale teorier', 'Opplevelse av likeverd og rettferdighet — vi sammenligner oss med noen', 'Likeverdsteori, rettferdighetsteori (fordelings- og prosedyrerettferdighet), prososial motivasjonsteori'],
            ['Situasjonsteorier', 'Elementer i selve jobben', 'Herzbergs tofaktorteori, Thorsrud-prosjektet, jobbkarakteristikamodellen']
          ]},
          { t: 'boks', tittel: 'Syntesemodellen', tekst: 'Kaufmann m.fl. (2023) samler familiene i én modell: indre og ytre påvirkningsfaktorer virker gjennom psykologiske prosesser — behov, aktivering, tankeprosesser, intendert atferd — og ender i ytelse, moderert av evner, kunnskap og ytre miljøforhold.' }
        ]
      },
      {
        tittel: 'Behovsteori: Maslow i arbeidslivet',
        blokker: [
          { t: 'p', tekst: 'Behovsteoriene antar at mennesker motiveres til å handle når de ser muligheter til å tilfredsstille sine behov, at behov varierer fra person til person, og at de varierer for samme person i ulike situasjoner. <em>Valens</em> — hva mennesker ønsker seg — er tett knyttet til behov.' },
          { t: 'tabell', kolonner: ['Behovsnivå', 'Organisasjonsmessige faktorer som motiverer', 'Behovstilfredsstillelse'], rader: [
            ['Fysiologiske behov', 'Lønn, arbeidstidsbestemmelser, materielle goder', 'Balanse mellom arbeid og fritid'],
            ['Sikkerhetsbehov', 'Arbeidsforhold', 'Fast ansettelse, sikker arbeidsplass'],
            ['Sosiale behov', 'Arbeidsgrupper, medarbeiderorientert ledelse', 'Tilhørighet'],
            ['Behov for anerkjennelse', 'Tilbakemelding på arbeidet, tittel og posisjon', 'Status og prestisje'],
            ['Behov for selvrealisering', 'Utfordrende oppgaver, mulighet til å være kreativ', 'Personlig utvikling, avansement, glede av å prestere']
          ]}
        ]
      },
      {
        tittel: 'Kognitive teorier: forventning og evaluering',
        blokker: [
          { t: 'p', tekst: 'Forventningsteorien sier at motivasjon er resultatet av en forventning om å oppnå det en ønsker i jobben. Den bygger på tre faktorer som virker <strong>multiplikativt</strong> — er én av dem null, blir motivasjonen null:' },
          { t: 'liste', punkter: [
            '<strong>Valens:</strong> belønningen må være noe man faktisk ønsker seg. Valens beskriver styrken i ønsket',
            '<strong>Instrumentalitet:</strong> personen må tro at et bestemt resultat faktisk fører til den ønskede belønningen',
            '<strong>Subjektiv forventning:</strong> det må være en klar kobling mellom innsats og resultat — tror jeg at innsatsen min gir resultatet?'
          ]},
          { t: 'p', tekst: 'Eksempelet fra forelesningen: en god karakter kan ha høy valens, men hvis du ikke tror at innsats er nok til å lykkes, er forventningen lav — og motivasjonen uteblir uansett hvor mye du ønsker karakteren.' },
          { t: 'def', term: 'Kognitiv evalueringsteori', tekst: 'Legger vekt på hvordan vi vurderer oppgavens evne til å motivere. Ytre motivasjon er atferd der kilden ligger utenfor jobbaktiviteten, knyttet til resultatet av den. Indre motivasjon er atferd utført med bakgrunn i indre belønninger som tilfredshet, interesse, glede eller mening ved oppgavene selv.' }
        ]
      },
      {
        tittel: 'Situasjonsteorier: Herzberg, Hackman og Oldham, Thorsrud',
        blokker: [
          { t: 'p', tekst: 'Herzberg skiller mellom to typer faktorer, og det avgjørende er asymmetrien mellom dem.' },
          { t: 'tabell', kolonner: ['Motivasjonsfaktorer (knyttet til oppgavene)', 'Hygienefaktorer (knyttet til miljøet)'], rader: [
            ['Arbeidsoppgavenes karakter — utfordrende, interessante, varierte', 'Bedriftens personalpolitikk og administrative systemer'],
            ['Ansvar for eget arbeid og kontroll over egen arbeidssituasjon', 'Ledernes kompetanse og måte å lede på'],
            ['Prestasjoner og tilfredshet ved å gjøre en god jobb', 'Mellommenneskelige forhold mellom over- og underordnede'],
            ['Anerkjennelse fra andre for vel utført arbeid', 'Arbeidsforhold omkring oppgavene'],
            ['Forfremmelse', 'Lønn og status'],
            ['Vekst', 'Sikkerhet i jobben, og forhold som påvirker fritid og privatliv']
          ]},
          { t: 'boks', tittel: 'Asymmetrien', tekst: 'Motivasjonsfaktorer skaper trivsel i den grad de er til stede, men ikke mistrivsel i den grad de mangler. Hygienefaktorer skaper mistrivsel i den grad de mangler, men ikke trivsel i den grad de er til stede. Derfor fjerner god lønn et hinder — den skaper ikke motivasjon.' },
          { t: 'liste', tittel: 'Jobbkarakteristikamodellen — fem kjennetegn (Hackman og Oldham)', punkter: [
            'Variasjon i ferdigheter', 'Oppgaveidentitet', 'Oppgavebetydning', 'Autonomi', 'Tilbakemelding'
          ]},
          { t: 'liste', tittel: 'Tre kritiske psykologiske tilstander', punkter: [
            'Følelsen av at jobben er <strong>meningsfull</strong>',
            'Følelsen av å ha <strong>personlig ansvar</strong> for resultater',
            'Å ha <strong>informasjon</strong> som gjør det mulig å evaluere om resultatene er bra'
          ]},
          { t: 'p', tekst: 'Modellen har tre <em>moderatorer</em> som avgjør om sammenhengen slår til: medarbeiderens kunnskap og ferdigheter, styrken på vekstbehovet, og hvor fornøyd man er med andre arbeidsforhold. Resultatene er høy jobbtilfredshet, høy ytelse og høy vilje til å yte.' },
          { t: 'liste', tittel: 'Thorsrud-programmets seks jobbkrav', punkter: [
            '<strong>Innhold:</strong> et rimelig nivå av utfordringer og et minimum av variasjon',
            '<strong>Læring:</strong> å kunne lære noe i jobben',
            '<strong>Beslutningsmyndighet:</strong> et minimum av myndighet i egen jobb',
            '<strong>Sosial støtte og anseelse</strong>',
            '<strong>Sammenheng:</strong> å kunne relatere det man gjør på jobben til det sosiale livet',
            '<strong>Framtid:</strong> personlig vekst, utvikling og karriereutvikling'
          ]}
        ]
      },
      {
        tittel: 'Belønningssystemer',
        blokker: [
          { t: 'liste', tittel: 'Tre grunnlag for belønning', punkter: [
            '<strong>Fastlønn</strong>, bestemt av trekk ved personen (utdanning, ansiennitet, erfaring, kompetanse), ved stillingen (hierarkisk nivå, antall ansatte, ansvar) og ved jobben (kompleksitet, viktighet, hvor vanskelig det er å tiltrekke seg kompetansen)',
            '<strong>Atferd</strong> — hva medarbeideren faktisk gjør på jobben',
            '<strong>Resultat</strong> — resultatlønn basert på måloppnåelse'
          ]},
          { t: 'liste', tittel: 'Krav til at ytelsesbaserte systemer skal virke', punkter: [
            'Kriteriene for å få stillingen eller belønningen må være helt klare, utvetydige og målbare',
            'Er de ikke det, kan systemet føre til fusk eller kortsiktig tenkning',
            'Er de ikke det, kan noen ta æren for resultater urettmessig',
            'Det må være klart at den som får belønningen, har gjort seg fortjent til den'
          ]},
          { t: 'boks', tittel: 'Eksamensrelevant kobling', tekst: 'Kravene over er samtidig forklaringen på hvorfor ytelsesbaserte systemer ofte feiler: de forutsetter målbarhet i arbeid som sjelden er entydig målbart. Her møtes motivasjonsteorien og målforskyvningen fra kapittel 2.' }
        ]
      }
    ]
  }
];
