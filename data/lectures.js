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
  },

  /* =================== 6. Jobbholdninger =================== */
  {
    id: 'f6', modul: 'motivasjon', nr: 6,
    tittel: 'Jobbholdninger og psykososialt arbeidsmiljø',
    kilde: 'HSM121 forelesning 6', foreleser: 'Reidar Hillesund', lysbilder: 63,
    litteratur: 'K&K kap. 9',
    hovedpunkter: [
      'Arbeidsmiljø kan studeres fra to sider: belastning og berikelse',
      'Holdninger har tre komponenter — tanke, følelse og handlingstendens',
      'Jobbforpliktelse finnes i tre former, med ulike konsekvenser',
      'Konflikt er normalt, og håndtering er ikke det samme som løsning'
    ],
    seksjoner: [
      {
        tittel: 'Arbeidsmiljø og HR',
        blokker: [
          { t: 'def', term: 'Arbeidsmiljø', tekst: 'Det fysiske, sosiale og psykologiske miljøet vi møter på jobb. <strong>Psykososialt arbeidsmiljø</strong> er kvaliteten i de personlige og menneskelige relasjonene på jobben.' },
          { t: 'liste', tittel: 'To hovedfokus', punkter: [
            '<strong>Belastningsperspektivet:</strong> vektlegger de negative, nedbrytende faktorene',
            '<strong>Berikelsesperspektivet:</strong> vektlegger de positive, oppbyggende faktorene'
          ]},
          { t: 'boks', tittel: 'Arbeidsmiljøloven § 4-3', tekst: 'Loven navngir de psykososiale faktorene eksplisitt: uklare eller motstridende krav og forventninger, emosjonelle krav i arbeid med mennesker, arbeidsmengde og tidspress som gir ubalanse mellom oppgaven og tiden til rådighet, og støtte og hjelp i arbeidet. Arbeidet skal legges til rette slik at arbeidstakerens integritet og verdighet ivaretas, og ingen skal utsettes for trakassering eller annen utilbørlig opptreden.' },
          { t: 'liste', tittel: 'HR og HRM', punkter: [
            '<strong>HR</strong> — de menneskelige ressursene i organisasjonen, og samspillet mellom organisasjonen og medarbeiderne',
            '<strong>HRM</strong> — ledelse av de menneskelige ressursene: evner, egenskaper, kunnskaper, erfaringer og ferdigheter, gjennom planlegging, ansettelser, utvikling og avvikling'
          ]},
          { t: 'liste', tittel: 'Personalpolitikkens områder', punkter: [
            'Arbeidsmiljø, medarbeidersamtale og kompetanseutvikling',
            'Lederutvikling og rekruttering',
            'Lønnspolitikk — for å rekruttere, beholde og utvikle',
            'Livsfasepolitikk — balanse mellom arbeid og privatliv i ulike livsfaser',
            'Sykefravær — forebygge og følge opp',
            'Mangfold og likestilling'
          ]}
        ]
      },
      {
        tittel: 'Holdninger og jobbholdninger',
        blokker: [
          { t: 'def', term: 'Holdning', tekst: 'Evaluerende, vurderende reaksjoner på noe — en summarisk evaluering av et psykologisk objekt (god–dårlig, like–mislike). En generell evaluerende innstilling til mennesker og sosiale situasjoner.' },
          { t: 'liste', tittel: 'Holdningens tre komponenter (ABC)', punkter: [
            '<strong>Kognitiv komponent</strong> — hva du tror',
            '<strong>Affektiv komponent</strong> — hva du føler',
            '<strong>Handlingskomponent</strong> — hvordan du er tilbøyelig til å handle'
          ]},
          { t: 'p', tekst: 'Verdier er abstrakte idealer uten referanse til bestemte personer eller objekter, og de påvirker holdningene våre. Stereotyper, fordommer og diskriminering er holdninger som slår negativt ut.' },
          { t: 'def', term: 'Jobbholdninger', tekst: 'Relativt konsistente tanker, følelser og handlingsintensjoner tilknyttet ulike sider ved jobben. De to viktigste er jobbtilfredshet og jobbforpliktelse.' }
        ]
      },
      {
        tittel: 'Jobbtilfredshet',
        blokker: [
          { t: 'def', term: 'Jobbtilfredshet', tekst: 'En evaluerende tilstand som uttrykker ens forventninger, tilfredshet og positive følelser i relasjon til jobben.' },
          { t: 'liste', tittel: 'Historisk utvikling', punkter: [
            '<strong>Taylor, 1920-tallet:</strong> medarbeidere vil trives best i jobber som gir god lønn for liten innsats',
            '<strong>Hawthorne-studiene, 1930-tallet:</strong> lønn spiller mindre rolle for tilfredshet enn sosial anerkjennelse'
          ]},
          { t: 'liste', tittel: 'To typer teorier', punkter: [
            '<strong>Innholdsteorier:</strong> handler om faktorene som påvirker holdningen — forventninger, behov og verdier. Maslow og Herzberg hører hjemme her',
            '<strong>Prosessteorier:</strong> handler om hvordan slike faktorer i samspill med selve jobben utvikler tilfredshet. Diskrepansteorier forklarer mistrivsel som forskjellen mellom det man ønsker og det man faktisk erfarer'
          ]},
          { t: 'p', tekst: 'Det er sammenheng mellom jobbtilfredshet og produktivitet, og jobbatferd som turnover, nærvær og fravær har stor betydning for ytelsen.' }
        ]
      },
      {
        tittel: 'Jobbforpliktelse og psykologisk kontrakt',
        blokker: [
          { t: 'def', term: 'Jobbforpliktelse', tekst: 'Individets grad av tilknytning til, identifikasjon med og engasjement for jobben og organisasjonen. Sterk forpliktelse innebærer tro på organisasjonens mål og verdier, og vilje til å yte mer på organisasjonens vegne.' },
          { t: 'liste', tittel: 'Tre former for jobbforpliktelse', punkter: [
            '<strong>Basert på kontinuitet:</strong> jeg blir fordi det koster for mye å slutte',
            '<strong>Affektiv:</strong> jeg blir fordi jeg vil — følelsesmessig tilknytning',
            '<strong>Normativ:</strong> jeg blir fordi jeg bør — opplevd forpliktelse'
          ]},
          { t: 'def', term: 'Psykologisk kontrakt', tekst: 'En medarbeiders oppfatning av utvekslingsforholdet mellom seg selv og organisasjonen. <strong>Transaksjonskontrakten</strong> er kortvarig med få løfter og forpliktelser; <strong>relasjonskontrakten</strong> innebærer utstrakte psykologiske forpliktelser og løfter begge veier.' },
          { t: 'boks', tittel: 'Hvorfor dette er eksamensrelevant', tekst: 'Den psykologiske kontrakten er nøkkelen til å forstå endringsmotstand: en omorganisering som endrer arbeidsoppgaver eller forventninger, bryter en kontrakt som aldri ble skrevet ned — men som medarbeideren opplever som reell.' }
        ]
      },
      {
        tittel: 'Belastningsperspektivet: stress',
        blokker: [
          { t: 'def', term: 'Stress', tekst: 'Av latin <em>stringere</em>, å stramme til. Brukes om en overbelastning påført utenfra som overstiger toleransegrensen. Psykologisk stress er opplevelsen av manglende samsvar mellom mestringsevne og de utfordringene man står overfor.' },
          { t: 'p', tekst: 'Stress i vid forstand er opplevelsen av muligheter og trusler som oppfattes som viktige, men som man ikke klarer å håndtere. Oppleves det som en <strong>mulighet</strong>, gir det positivt stress; oppleves det som en <strong>trussel</strong>, gir det negativt stress.' },
          { t: 'liste', tittel: 'McGraths transaksjonsmodell — fire elementer', punkter: [
            '<strong>Krav</strong> — de objektive kravene, kalt belastninger',
            '<strong>Tolking</strong> — hvordan personen oppfatter kravene',
            '<strong>Responser</strong> — fysiologiske, psykologiske eller atferdsmessige',
            '<strong>Konsekvenser</strong> — for individet og for organisasjonen'
          ]},
          { t: 'liste', tittel: 'Reaksjonsmønstre på stress', punkter: [
            '<strong>Fysiologiske:</strong> høyt blodtrykk, immunreaksjoner, svette',
            '<strong>Atferdsmessige:</strong> lavere ytelse, flere feilhandlinger, høyere sykefravær, isolering',
            '<strong>Psykologiske:</strong> misnøye, bekymring, angst, irritabilitet',
            '<strong>Kognitive:</strong> svekket oppmerksomhet, konsentrasjonsvansker, svekket hukommelse',
            '<strong>Utbrenthet:</strong> fysisk, mental og følelsesmessig utmattelse'
          ]},
          { t: 'liste', tittel: 'Stressorer i arbeidslivet', punkter: [
            '<strong>Arbeidsarenaen:</strong> jobbkrav, rollekrav, sosiale relasjoner, karriereutvikling, organisasjonsstruktur og -klima',
            '<strong>Hjem- og sosial arena</strong>',
            '<strong>Individet</strong>',
            '<strong>Manifestasjonsarenaen</strong>'
          ]},
          { t: 'liste', tittel: 'Hvordan organisasjonen kan motvirke stress', punkter: [
            'Organisatoriske mestringsstrategier',
            '<strong>Sosial støtte</strong> i fire former: følelsesmessig, oppgavestøtte, informasjonsstøtte og praktisk støtte',
            'På individnivå: hardførhet, resiliens og mestring'
          ]},
          { t: 'p', tekst: '<strong>Psykologisk kapital</strong> består av mestringstro, optimisme, håp og resiliens, og henger sammen med jobbengasjement gjennom vigør, dedikasjon og absorpsjon.' }
        ]
      },
      {
        tittel: 'Konflikt i arbeidslivet',
        blokker: [
          { t: 'p', tekst: 'Konflikt er en uoverensstemmelse med utgangspunkt i forskjeller — i mål, ønsker, preferanser, interesser, kommunikasjon og atferd. Konflikter er normalt og en naturlig del av organisasjonslivet. Bolman og Deal formulerer poenget skarpt: <em>en rolig, harmonisk organisasjon kan godt være en apatisk, ikke-kreativ, stagnert, rigid og urokkelig organisasjon.</em>' },
          { t: 'liste', tittel: 'Årsaker på organisatorisk nivå', punkter: [
            'Kamp om knappe ressurser', 'Uklare ansvarsforhold', 'Belønningssystemer som er uklare eller oppleves urettferdige'
          ]},
          { t: 'liste', tittel: 'Årsaker i mellommenneskelig samspill', punkter: [
            'Psykologisk sabotasje',
            '«Tap av ansikt» — man bærer siden nag',
            'Feilkommunikasjon, for eksempel ved korrektive tilbakemeldinger',
            'Personlighetsstil — men dette bør ikke overdrives; konflikter får lett personlige konsekvenser når de får pågå over tid',
            'Attribueringsprosesser — hvordan vi tilskriver egne og andres handlinger motiver'
          ]},
          { t: 'liste', tittel: 'Fire konflikttyper', punkter: [
            '<strong>Intrapersonell</strong> — med meg selv',
            '<strong>Interpersonell</strong> — med andre',
            '<strong>Person/funksjon</strong> — med min rolle',
            '<strong>Person/organisasjon</strong> — med min organisasjon'
          ]},
          { t: 'tabell', kolonner: ['Overflatestruktur', 'Konflikttype', 'Fokus i håndteringen', 'Nøkkelspørsmål'], rader: [
            ['Misforståelser', 'Begrepskonflikt', 'Språk', 'Har partene et felles språk?'],
            ['Misforståelser', 'Fortolkningskonflikt', 'Forståelse', 'Har de svært ulik fortolkning av konflikten?'],
            ['Saklig uenighet', 'Argumentasjonskonflikt', 'Begrunnelse', 'Er de opptatt av svært ulike argumenter?'],
            ['Opplevd rett til å handle', 'Verdikonflikt', 'Normer', 'Har partene uforenlige verdier?'],
            ['Opplevd rett til å handle', 'Interessekonflikt', 'Mål', 'Har partene motstridende interesser?'],
            ['Opplevd rett til å handle', 'Rollekonflikt', 'Grenseoppganger', 'Er de uenige om ansvar og rollefordeling?'],
            ['Personlighetstrekk', 'Personkonflikt', 'Væremåte', 'Står personlighetstrekk i veien for samhandling?']
          ]},
          { t: 'liste', tittel: 'Konfliktens stadier', punkter: [
            'Latent konflikt', 'Oppfattet konflikt', 'Følt konflikt', 'Manifest konflikt', 'Etterkonflikt'
          ]},
          { t: 'p', tekst: 'Opptrappingen går fra uoverensstemmelse, via personifisering, at problemet vokser, at man gir opp å samtale, fiendebilder og polarisering, til full krig. Poenget med stadiemodellen er at en manifest konflikt kan bringe en langvarig latent konflikt fram i dagen — slik at den endelig kan håndteres.' },
          { t: 'def', term: 'Konflikthåndtering', tekst: 'Hva man faktisk velger å gjøre, eller ikke gjøre, når man blir klar over at en konflikt eksisterer (Einarsen og Pedersen). Det er ikke det samme som konfliktløsning: å håndtere i positiv forstand er å ta tak i konflikten og utnytte kraften som har oppstått ut fra ulikheten.' },
          { t: 'liste', tittel: 'Positive effekter av konflikt', punkter: [
            'Konflikten er et varsel — den gjør endring nødvendig',
            'Den er en drivkraft for forandring, og kan «rense luften»',
            'Den øker forståelsen for motpartens syn og bringer problemet ut i åpenhet',
            'Den kan føre til bedre beslutninger og økt gruppelojalitet'
          ]}
        ]
      },
      {
        tittel: 'Berikelsesperspektivet: det gode arbeidsmiljøet',
        blokker: [
          { t: 'liste', tittel: 'Ivaretakelse av behov knyttet til jobbinnhold', punkter: [
            'Utfordringer og variasjon',
            'Beslutningsmyndighet og ansvar',
            'Sosial støtte og anseelse',
            'Hensyn til generell livssituasjon',
            'Jobbengasjement',
            'Stressforebygging'
          ]},
          { t: 'p', tekst: 'Listen er gjenkjennelig fra Thorsrud-programmets jobbkrav i forelesning 5 — og det er poenget: det som motiverer, og det som gir et forsvarlig psykososialt arbeidsmiljø, er i stor grad det samme.' }
        ]
      }
    ]
  },

  /* =================== 7. Beslutningsprosesser =================== */
  {
    id: 'f7', modul: 'beslutning', nr: 7,
    tittel: 'Beslutningsprosesser i organisasjoner',
    kilde: 'HSM121 forelesning 7', foreleser: 'Reidar Hillesund', lysbilder: 39,
    litteratur: 'JT kap. 9',
    hovedpunkter: [
      'Idealene for rasjonell beslutning brytes systematisk av realitetene',
      'Seks beslutningsmodeller, fra rasjonell aktør til organisert anarki',
      'Struktur, kultur og makt er beslutningspremisser',
      'Iverksetting er et eget problem, ikke en formalitet'
    ],
    seksjoner: [
      {
        tittel: 'Hva er en beslutning?',
        blokker: [
          { t: 'def', term: 'Beslutning', tekst: 'Et valg mellom ulike alternativer, der valget innebærer en forpliktelse til handling. Beslutningen er også det endelige utfallet av en prosess.' },
          { t: 'def', term: 'Beslutningsprosess', tekst: 'Hele rekken av handlinger eller vurderinger som fører fram til vedtak og iverksetting: identifikasjon av et problem eller en mulighet, innsamling og vurdering av informasjon, valg mellom alternativer, og iverksetting.' },
          { t: 'liste', tittel: 'Hvorfor studere beslutninger?', punkter: [
            'Effektivitet — hvordan fattes gode beslutninger?',
            'Hvordan mål, strategier og struktur faktisk utformes',
            'Organisasjonskultur — beslutninger er viktige symboler',
            'Maktforhold — hvem som deltar, og hvem som ikke gjør det',
            'Ledelse'
          ]},
          { t: 'p', tekst: 'Forholdet går begge veier: den organisatoriske konteksten — mål og strategi, formell struktur, kultur og maktforhold — påvirker beslutningsprosessene og dermed beslutningsinnholdet, og beslutningene former i sin tur konteksten.' }
        ]
      },
      {
        tittel: 'Rasjonell beslutningsatferd — ideal og realitet',
        blokker: [
          { t: 'liste', tittel: 'Den rasjonelle modellen forutsetter at aktøren', punkter: [
            'Har klar forståelse av situasjonen og et klart mål',
            'Har informasjon om alternative løsninger',
            'Kan rangere alle alternativer etter hva som gir best resultat',
            'Velger det alternativet som gir best resultat i forhold til målet'
          ]},
          { t: 'p', tekst: 'Forelesningens hovedtabell setter idealet mot realiteten. Dette er kjernen i kapitlet, og den mest siterte figuren til eksamen.' },
          { t: 'tabell', kolonner: ['Ideal', 'Realitet'], rader: [
            ['Fanger opp alle viktige problemer og siler viktige fra uviktige', 'Vi legger stort sett bare merke til problemer vi kjenner igjen fra før. Nye problemer fanges ofte ikke opp, uansett hvor viktige de er'],
            ['Klar og objektiv oppfatning av problemet', 'Hvordan problemet forstås avhenger av hvordan det formuleres. Formuleres det som en trussel, oppfattes det slik — selv om det burde vært sett som en mulighet'],
            ['Klare mål og preferanser', 'Mål er ofte uklare, vage og motstridende. Mål utvikles i mange tilfeller <em>etter</em> at beslutningen er fattet, for å legitimere den'],
            ['Samler inn all relevant informasjon', 'Man leter der informasjonen er lettest å finne, gjerne i nærheten av tidligere løsninger på liknende problemer'],
            ['Velger det beste alternativet', 'Man unngår ofte å velge, fordi valg skaper konflikt eller negative følelser. Valget avhenger av hvordan alternativene er formulert, og vi velger bort risiko og alternativer som kan bety tap'],
            ['Beslutninger iverksettes slik de var intendert', 'Beslutninger blir ofte ikke iverksatt, men «lagt i skuffen»']
          ]},
          { t: 'boks', tittel: 'Konklusjonen', tekst: 'Mennesket er ikke rasjonelt, men <strong>begrenset rasjonelt</strong>. Den rasjonelle modellen er normativ — den sier hvordan det burde vært, ikke hvordan det er.' }
        ]
      },
      {
        tittel: 'Seks beslutningsmodeller',
        blokker: [
          { t: 'liste', tittel: '1. Organisasjonen som rasjonell aktør', punkter: [
            'Organisasjonen er etablert for å oppnå bestemte mål',
            'Modellen er normativ',
            'Bestemte arbeidsoppgaver fokuserer og begrenser arbeidet',
            'Klare forventninger til hvordan oppgaver løses styrer og koordinerer atferden'
          ]},
          { t: 'liste', tittel: '2. Regelmodellen', punkter: [
            'Kjennetegner byråkratiske organisasjoner',
            'Regler og prosedyrer spesifiserer hva beslutningstakeren skal gjøre i ulike situasjoner',
            'Beslutningen blir et spørsmål om å finne riktig regel, ikke om å veie konsekvenser'
          ]},
          { t: 'liste', tittel: '3. Forhandlingsmodellen', punkter: [
            'Håndterer interessekonflikt ved at partene møtes for å finne en løsning',
            'Partene kan opptre opportunistisk, eller preges av informasjonsdeling og tillit',
            'Situasjonen kan gi vinn–tap eller vinn–vinn',
            'Underliggende felles interesser er en fordel',
            'Alle forhandlinger har både saklige og følelsesmessige sider'
          ]},
          { t: 'liste', tittel: 'Råd for en gunstig forhandlingssituasjon', punkter: [
            'Legg vekt på åpen kommunikasjon, felles mål og nytte, og tillitsbygging',
            'Vær villig til å foreta innrømmelser',
            'Analyser personlige fiendskap som kan påvirke forhandlingene',
            'Utform forhandlingspakker som åpner for kompromiss på tvers av saker'
          ]},
          { t: 'liste', tittel: '4. Kommunikativ rasjonalitet', punkter: [
            'Handler om utvikling av <em>intersubjektivitet</em> — i hvilken grad aktørene klarer å komme til forståelse av hverandre',
            'Forutsetter felles møteplasser for diskusjon',
            'Deltakerne må forstå hverandre, ha felles språk og være åpne',
            'Deltakerne må være sannferdige, og ingen må tvinges til å bytte mening',
            'Man må samtidig ønske å komme fram til en riktig forståelse',
            'Passer best med enkel struktur, få nivåer, desentralisert makt og stabile sosiale relasjoner'
          ]},
          { t: 'liste', tittel: '5. Inkrementell handling', punkter: [
            'Små, ukoordinerte handlinger der mål og alternativvurdering skjer samtidig',
            'Man velger tiltaket de fleste er enige i',
            'Ufullstendig analyse av situasjon, alternativer og konsekvenser',
            'Endringene skjer som små skritt, men kan koples sammen slik at de gir store endringer',
            'Valgene påvirkes av det som er gjort før, ikke av nøye konsekvensvurdering',
            'Reduserer konflikt fordi endringene er små og gradvise — brukes derfor hyppigere der interessemotsetningene er store, som ved offentlige budsjetter',
            'Kan være rasjonelt dersom utgangssituasjonen er fornuftig'
          ]},
          { t: 'liste', tittel: '6. Organisert anarki (søppelkassemodellen)', punkter: [
            'Problemer, løsninger, deltakere og beslutningsanledninger ses som uavhengige strømmer',
            'Utfallet er resultatet av uavhengige beslutningstakere, og muligheten til å påvirke er begrenset',
            'Individuelle strategier framfor en samlet form',
            'Sammenkoplingen av strømmene bestemmes av organisasjonsstrukturen (formell og uformell), av <strong>tid</strong> — når problemet kommer opp og hva annet som er oppe samtidig — og av hvilken <strong>energi</strong> deltakerne har til rådighet'
          ]}
        ]
      },
      {
        tittel: 'Organisatoriske forhold som beslutningspremisser',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Mål og strategier</strong> gir signaler om fokus og hvilken informasjon som er nyttig. Jo mer konkrete mål, desto sterkere beslutningspremiss',
            '<strong>Formell struktur:</strong> arbeidsområdene begrenser oppmerksomhetsområdene. Spesialisering øker kapasiteten til å behandle informasjon, men gjør samtidig at noe fokuseres og annet overses',
            '<strong>Organisasjonskultur</strong> sorterer bort informasjon som oppfattes som en trussel, og søker informasjon som passer kulturen. Vage regler og uklare mål gir rom for personlig skjønn som er sterkt kulturelt preget',
            '<strong>Maktforhold:</strong> kontroll over informasjon, dagsorden og hvilke premisser som legges til grunn'
          ]},
          { t: 'liste', tittel: 'Tre idealtypiske beslutningsprosesser', punkter: [
            '<strong>Usegmentert:</strong> alle deltakere har legitim tilgang til beslutningsarenaen',
            '<strong>Spesialisert:</strong> spesialister løser problemer på de områdene der de er legitime som spesialister',
            '<strong>Hierarkisk:</strong> deltakelsesrettigheter bestemmes av posisjon i hierarkiet'
          ]},
          { t: 'p', tekst: 'De vanligste deltakelseskriteriene er hierarkisk posisjon og spesialistkompetanse. I tillegg spiller trekk ved oppgaven, organisasjonsmessig slakk, tidspress og krav om medbestemmelse inn.' }
        ]
      },
      {
        tittel: 'Deltakelse og iverksetting',
        blokker: [
          { t: 'liste', tittel: 'Grader av ansattes deltakelse — fra ingen til full', punkter: [
            'Ledelsen fatter beslutninger uten å informere de ansatte',
            'Ledelsen informerer før beslutningen fattes',
            'Ansatte kan uttale seg om saken før beslutningen fattes',
            'Ansatte er med og fatter beslutningen',
            'Ansatte kan nedlegge veto',
            'Ansatte fatter selv beslutningen'
          ]},
          { t: 'liste', tittel: 'Iverksettingsproblemer', punkter: [
            'Kunnskapsgrunnlaget for beslutningen kan være utilstrekkelig',
            'Ressursene som stilles til rådighet kan være utilstrekkelige',
            'Kombinasjonen av ressurser kan være feil',
            'Politisk motstand kan gjøre iverksettingen problematisk',
            'Beslutningene er ofte uklare og gir rom for flere fortolkninger',
            'Iverksetterne vet ikke nøyaktig hva som skal gjøres, eller hva som forventes'
          ]},
          { t: 'boks', tittel: 'Deskriptiv og normativ', tekst: 'Skillet går igjen i hele kapitlet. <strong>Deskriptiv</strong> beskriver hvordan noe faktisk er, uten å vurdere om det er bra eller dårlig. <strong>Normativ</strong> fastsetter eller foreslår hvordan noe bør være, ut fra regler eller verdier. Den rasjonelle modellen er normativ; begrenset rasjonalitet er deskriptiv.' }
        ]
      }
    ]
  },

  /* =================== 8. Omgivelser =================== */
  {
    id: 'f8', modul: 'omgivelser', nr: 8,
    tittel: 'Organisasjonens omgivelser',
    kilde: 'HSM121 forelesning 8', foreleser: 'Reidar Hillesund', lysbilder: 23,
    litteratur: 'JT kap. 6',
    hovedpunkter: [
      'Tekniske omgivelser handler om effektivitet, institusjonelle om legitimitet',
      'To dimensjoner: kompleksitet og endringstakt — og hver kombinasjon har sin struktur',
      'Ni strategier for å håndtere tekniske omgivelser',
      'De tre institusjonelle søylene forklarer hvorfor organisasjoner blir like'
    ],
    seksjoner: [
      {
        tittel: 'Hva er omgivelser?',
        blokker: [
          { t: 'def', term: 'Omgivelser', tekst: 'Alle samfunnsøkonomiske, sosiale og kulturelle forhold, nasjonale politikker og politisk styring, demografiske forhold og aktører som organisasjonen samhandler med (Jacobsen og Thorsvik 2025, s. 173).' },
          { t: 'liste', tittel: 'Hvorfor studere omgivelser?', punkter: [
            '<strong>Avhengighet og usikkerhet</strong> — markedssituasjon og samfunnsendringer',
            '<strong>Press</strong> — markedspress, press om å bli noe annet',
            '<strong>Legitimitet</strong> — lover og normer i samfunnet',
            '<strong>Strategi</strong> — omgivelsene former struktur, kultur og interne maktforhold',
            '<strong>Endringer</strong> — organisasjonens evne til å fange opp, forstå og tilpasse seg'
          ]},
          { t: 'p', tekst: 'Omgivelsene kan tegnes i tre ringer: <strong>domenet</strong> med de spesielle forholdene nærmest organisasjonen — kunder, leverandører, konkurrenter, regulerende organer; <strong>nasjonale forhold</strong> som økonomi, politikk, kultur, demografi og media; og <strong>internasjonale forhold</strong> som internasjonal økonomi, overnasjonale politiske organer og teknologisk utvikling.' }
        ]
      },
      {
        tittel: 'Tekniske omgivelser',
        blokker: [
          { t: 'def', term: 'Tekniske omgivelser', tekst: 'Forhold som har direkte betydning for organisasjonens ressurstilgang, produksjon eller resultater — kunder, konkurrenter og samarbeidspartnere. Perspektivet setter effektivitet og produktivitet i fokus; utfordringen er å finne optimal strategi og struktur i forhold til dem.' },
          { t: 'liste', tittel: 'To dimensjoner', punkter: [
            '<strong>Grad av kompleksitet:</strong> homogene (ensartede, enkle) mot heterogene (komplekse) omgivelser',
            '<strong>Grad av endring:</strong> stabile mot dynamiske omgivelser'
          ]},
          { t: 'tabell', kolonner: ['', 'Stabile omgivelser', 'Dynamiske omgivelser'], rader: [
            ['<strong>Homogene</strong>', 'Maskinbyråkrati — strategi ofte kostnadseffektivitet', 'Entreprenørorganisasjon — strategi ofte ett enkelt segment eller marked'],
            ['<strong>Heterogene</strong>', 'Divisjonalisert struktur — strategi ofte diversifisering i ulike markeder', 'Profesjonelt byråkrati og adhokrati — strategi ofte å mestre usikkerhet, både endring og kompleksitet']
          ]},
          { t: 'liste', tittel: 'To konsekvenser for struktur', punkter: [
            'Jo mer <strong>heterogene</strong> omgivelsene er, desto flere enheter må organisasjonen etablere — avdelinger, kontorer, seksjoner. Det reduserer usikkerheten fordi hver enhet forholder seg til relativt like fenomener, slik et sykehus deler opp etter typer skader og sykdommer',
            'Jo mer <strong>dynamiske</strong> omgivelsene er, desto mer må beslutningsmyndighet desentraliseres. Beslutninger tas lenger ned, noe som gir fleksibilitet til å tilpasse seg raskt'
          ]},
          { t: 'liste', tittel: 'Ni strategier for å håndtere tekniske omgivelser', punkter: [
            'Opprette buffer mot omgivelsene',
            'Glatte ut topper i arbeidsbelastningen',
            'Forutse svingninger i belastningen',
            'Vokse',
            'Integrere vertikalt — kontrollere eller kjøpe opp underleverandører',
            'Integrere horisontalt — slå seg sammen',
            'Diversifisere — få flere ben å stå på',
            'Samarbeide',
            'Kooptere — rekruttere fra andre'
          ]}
        ]
      },
      {
        tittel: 'Institusjonelle omgivelser',
        blokker: [
          { t: 'p', tekst: 'De institusjonelle omgivelsene handler om oppfatninger, verdier, normer og forventninger. De setter organisasjoner under press for å gjøre noe bestemt, for å sikre <strong>legitimitet</strong>.' },
          { t: 'tabell', kolonner: ['', 'Regulativ søyle', 'Normativ søyle', 'Kognitiv søyle'], rader: [
            ['Grunnlag for press', 'Lovgivning', 'Verdier og forventninger', '«Tatt for gitt»-oppfatninger om hva som bør gjøres'],
            ['Grunnlag for tilpasning', 'Tvang', 'Sosial forpliktelse', 'Ønske om å etterligne'],
            ['Grunnlag for legitimitet', 'Formell godkjenning', 'Moralsk aksept', 'Man gjør det som oppfattes som riktig'],
            ['Eksempel', 'Regulering og kontroll av forurensning', 'Standarder for personellbehandling', 'Organisasjonsoppskrifter, for eksempel balansert målstyring']
          ]},
          { t: 'def', term: 'Isomorfi', tekst: 'Organisasjoner som befinner seg innenfor samme type institusjonelle omgivelser, blir stadig likere hverandre.' },
          { t: 'p', tekst: 'Organisasjoner påvirkes ulikt av de to typene omgivelser. Banker og sykehus står sterkt i begge; mindre produksjonsbedrifter og helsestudio står sterkt i tekniske og svakt i institusjonelle; skoler og kirker omvendt. Plasseringen forklarer mye av hvorfor de styres så ulikt.' }
        ]
      },
      {
        tittel: 'Hvorfor er ikke alle tilpasset omgivelsene sine?',
        blokker: [
          { t: 'liste', punkter: [
            'Strukturer og strategier «vedtas» — bare delvis rasjonelt',
            'Beslutningsprosessene preges lett av maktkamp, forhandlinger, kompromisser, følelser, feiloppfatninger og manglende endringsvilje',
            'Organisasjoner står ikke alltid fritt til å tilpasse seg, fordi de er avhengige av andre',
            'Det er ikke bare tekniske forhold som bestemmer strukturen',
            'En organisasjon kan befinne seg i flere ulike tekniske omgivelser samtidig, ved å produsere flere varer eller tjenester'
          ]},
          { t: 'boks', tittel: 'Digitalisering og disrupsjon', tekst: 'Sosiale medier er blitt en global maktfaktor, og netthandelen har endret domenet for hele bransjer. Nokia og Kodak forsto ikke at ny teknologi skulle ødelegge forutsetningene for deres egen suksess. Airbnb traff hotellene, Uber drosjene, Vipps bankene — og KI treffer nå konsulenttjenestene.' }
        ]
      }
    ]
  },

  /* =================== 9. Læring og innovasjon =================== */
  {
    id: 'f9', modul: 'laering', nr: 9,
    tittel: 'Læring og innovasjon',
    kilde: 'HSM121 forelesning 9', foreleser: 'Reidar Hillesund', lysbilder: 32,
    litteratur: 'JT kap. 10',
    hovedpunkter: [
      'Læring i organisasjonen formes av struktur, kultur og makt',
      'Enkel- og dobbeltkretslæring skiller mellom å endre atferd og å endre målene',
      'SEKI-modellen forklarer hvordan taus kunnskap blir felles',
      'Suksessfellen: de som har lyktes lengst, endrer seg vanskeligst'
    ],
    seksjoner: [
      {
        tittel: 'Hva er læring?',
        blokker: [
          { t: 'def', term: 'Læring', tekst: 'En prosess der mennesker og organisasjoner tilegner seg ny kunnskap og endrer sin atferd på grunnlag av dette. Tilegnelse og utvikling av kunnskaper og ferdigheter med utgangspunkt i erfaring, som fører til relativt varige endringer i tenkesett og atferd.' },
          { t: 'liste', tittel: 'Læring skjer i organisasjonen når man', punkter: [
            'Erfarer noe man mener det bør gjøres noe med — for eksempel at etterspørselen avtar',
            'Foretar en problemanalyse — hvorfor har dette skjedd?',
            'Utvikler og iverksetter tiltak for å løse problemet, og dermed endrer atferd'
          ]},
          { t: 'liste', tittel: 'Hvorfor læring?', punkter: [
            'Tilpasning til omgivelsene', 'Utvikle langsiktige konkurransefortrinn', 'Økt innovasjonsevne', 'Effektivisering', 'Endring og endringsprosesser'
          ]},
          { t: 'p', tekst: 'Erfaringslæring beskrives som en sirkel: konkrete erfaringer, observasjon og refleksjon, utvikling av abstrakte begreper og generalisering, og uttesting av handlingsimplikasjoner i en ny situasjon.' }
        ]
      },
      {
        tittel: 'Konteksten former læringen',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Struktur:</strong> plasseringen i strukturen påvirker læringen. Fokus blir læring innenfor det ansvarsområdet strukturen angir',
            '<strong>Kultur:</strong> påvirker hvilken informasjon som oppfattes som viktig, og hvilken som ikke gjør det',
            '<strong>Makt:</strong> kontroll over informasjon og intern kommunikasjon kan påvirke læringen — gjennom å skjule, selektere eller styre dagsordenen'
          ]},
          { t: 'liste', tittel: 'To læringsteoretiske utgangspunkt', punkter: [
            '<strong>Kognitiv læringsteori:</strong> mennesker har begrenset kognitiv kapasitet, velger ut informasjon de antar er viktig, ignorerer resten, og lagrer det i kognitive skjemaer i korttids- eller langtidsminnet',
            '<strong>Sosial læringsteori:</strong> mennesker kan lære uten selv å erfare. Læring skjer gjennom imitasjon — man overtar handlemåter andre har utviklet fordi man tror de vil fungere hos oss. Avhenger av tillit til kilden'
          ]}
        ]
      },
      {
        tittel: 'Enkel- og dobbeltkretslæring',
        blokker: [
          { t: 'p', tekst: 'Man registrerer feil eller dårlige resultater. <strong>Enkelkretslæring</strong> endrer atferden — man forbedrer innenfor gjeldende mål. <strong>Dobbeltkretslæring</strong> endrer målene eller verdiene selv, ved å stille spørsmål ved dem.' },
          { t: 'liste', tittel: 'Argyris om hva som må til for å utvikle læring', punkter: [
            'Få sann informasjon',
            'La valget av handlingsplan basere seg på kunnskap',
            'Kontinuerlig vurdere konsekvensene av handlingene vi gjør'
          ]},
          { t: 'p', tekst: 'All intendert atferd er motivert av noe vi ønsker å oppnå. Derfor holder det ikke å lære <em>hvordan</em> — man må også lære <em>hvorfor</em>.' }
        ]
      },
      {
        tittel: 'Taus og eksplisitt kunnskap',
        blokker: [
          { t: 'liste', tittel: 'Læring i organisasjoner innebærer', punkter: [
            'At flere mennesker i organisasjonen lærer',
            'At organisasjonen handler som en enhet på grunnlag av den nye kunnskapen'
          ]},
          { t: 'p', tekst: 'Dette kompliseres av at læringen ofte skjer hos ett individ, og at kunnskapen er skjult for andre. <strong>Taus kunnskap</strong> er vanskelig å sette ord på; <strong>eksplisitt kunnskap</strong> er erfaringer og forhold vi kan formulere.' },
          { t: 'tabell', kolonner: ['Fra ↓ / Til →', 'Taus kunnskap', 'Eksplisitt kunnskap'], rader: [
            ['<strong>Taus kunnskap</strong>', 'Sosialisering', 'Eksternalisering'],
            ['<strong>Eksplisitt kunnskap</strong>', 'Internalisering', 'Kombinering']
          ]},
          { t: 'liste', tittel: 'De fire formene', punkter: [
            '<strong>Sosialisering</strong> (taus til taus): kunnskap overføres ubevisst, gjennom felles praksis',
            '<strong>Eksternalisering</strong> (taus til eksplisitt): kunnskapen blir skriftlig- eller muntliggjort og tilgjengelig for alle',
            '<strong>Kombinering</strong> (eksplisitt til eksplisitt): kunnskap spres ved at man setter sammen åpne informasjonskilder',
            '<strong>Internalisering</strong> (eksplisitt til taus): den ansatte bruker eksplisitt kunnskap, tilpasser sin egen tause kunnskap og får ny kunnskap'
          ]},
          { t: 'boks', tittel: 'Kompetansebeholdning (Linda Lai)', tekst: 'Den samlede kompetansebeholdningen er større enn den anvendte kompetansen. Avstanden mellom dem er <em>mobiliseringspotensialet</em>. Avstanden mellom beholdningen og de definerte kompetansekravene er <em>læringsbehovet</em>. Mange organisasjoner har derfor et mobiliseringsproblem, ikke et kompetanseproblem.' }
        ]
      },
      {
        tittel: 'Den lærende organisasjonen',
        blokker: [
          { t: 'p', tekst: 'Organisasjonen må kunne lære og tilpasse seg endringer i eksisterende handlingsbetingelser, på samme måte som en levende organisme. Vi må forstå både <em>læringsprosessen</em> — hvordan organisasjonen lærer — og <em>læringsinnholdet</em> — hva den lærer.' },
          { t: 'liste', tittel: 'Kjennetegn på en lærende organisasjon', punkter: [
            '<strong>Systemtenkning</strong> — leting etter rotproblemet framfor symptomet',
            '<strong>Kunnskapsproduksjon</strong>',
            '<strong>Absorptiv kapasitet</strong> — evnen til å fange opp, vurdere, tilegne seg, innpasse eller endre, og ta i bruk',
            '<strong>Praksisfellesskap og læring</strong> — for eksempel kollegaveiledning'
          ]},
          { t: 'tabell', kolonner: ['Nivå', 'Hvorfor?', 'Tiltak på tilsvarende nivå'], rader: [
            ['Synlig problem', 'Det ligger olje på gulvet', 'Tørk opp oljen'],
            ['Hvorfor 1', 'Maskinen lekker olje', 'Reparer maskinen'],
            ['Hvorfor 2', 'Pakningen er utslitt', 'Skift pakningen'],
            ['Hvorfor 3', 'Vi har kjøpt pakninger av for dårlig kvalitet', 'Endre kravene til pakningskvalitet'],
            ['Hvorfor 4', 'Pakningene ble valgt fordi prisen var gunstig', 'Endre innkjøpspraksis og kriterier'],
            ['Hvorfor 5', 'Innkjøperne vurderes primært på kortsiktige kostnadsbesparelser', 'Endre evaluerings- og styringskriteriene']
          ]},
          { t: 'p', tekst: 'Poenget med Toyotas hvorfor-analyse er å ikke stoppe ved symptomet. Gjentatte hvorfor flytter oppmerksomheten fra symptom, via dypere årsak, til systemnivå — til underliggende insentiver og styring.' },
          { t: 'liste', tittel: 'Kunnskapsmedarbeideren er', punkter: [
            '<strong>Proaktiv:</strong> tar initiativ, involverer seg, søker aktivt informasjon og forbedringer',
            '<strong>Strategisk:</strong> ser etter bedre løsninger i møte med kunder og medarbeidere, og kjenner virksomhetens mål',
            '<strong>Lærende:</strong> søker ny kunnskap, deler den, finner skjult kunnskap i organisasjonen og hos kundene, og tør prøve og feile',
            '<strong>Kulturbærende:</strong> etterlever verdiene, styrker samhandlingen og bygger «vi-et»'
          ]}
        ]
      },
      {
        tittel: 'Innovasjon',
        blokker: [
          { t: 'liste', tittel: 'Typer innovasjon', punkter: [
            'Produkt- og tjenesteinnovasjon, og prosessinnovasjon',
            'Etter omfang: radikal, modulær, arkitektonisk og inkrementell innovasjon'
          ]},
          { t: 'boks', tittel: 'Suksessfellen', tekst: 'Organisasjoner som har opplevd lange perioder med suksess, har ofte størst problemer med å endre måten de har gjort tingene på. Når alt fungerer bra, blir produktet, tjenesten, prosessen, markedet, distribusjonen og kundene lett tatt for gitt — og omstillingen kan ende i fiasko.' },
          { t: 'liste', tittel: 'Effektivitet eller innovasjon?', punkter: [
            '<strong>Exploitation:</strong> kunnskap knyttet til å forbedre eksisterende produkter, tjenester, markeder og arbeidsmåter — bedre ressursutnyttelse',
            '<strong>Exploration:</strong> kunnskap knyttet til å utvikle nye produkter, tjenester og markeder — utforske, lære noe nytt, se nye muligheter og trusler',
            'Begge deler er nødvendig. Utfordringen er balansen'
          ]},
          { t: 'p', tekst: 'Forelesningen bruker også bildet av komfortsonen: fra komfortsone, via fryktsone og læringssone, til vekstsone. Poenget er at læring krever at man forlater det trygge — og at fryktsonen, der man finner unnskyldninger og er opptatt av andres meninger, er stedet de fleste stopper.' }
        ]
      }
    ]
  },

  /* =================== 10. Endring =================== */
  {
    id: 'f10', modul: 'endring', nr: 10,
    tittel: 'Endring i organisasjoner',
    kilde: 'HSM121 forelesning 10', foreleser: 'Reidar Hillesund', lysbilder: 45,
    litteratur: 'JT kap. 11',
    hovedpunkter: [
      'Endring handler om formaliteter og følelser samtidig',
      'Ti navngitte årsaker til motstand — og motstand kan være positivt',
      'Lewin og Kotter besvarer ulike deler av samme problem',
      'Fire endringsstrategier, avhengig av tempo og maktgrunnlag'
    ],
    seksjoner: [
      {
        tittel: 'Hva slags endring?',
        blokker: [
          { t: 'p', tekst: 'Ved omorganisering og omstilling kommer to forhold til uttrykk samtidig: <strong>formaliteter</strong> og <strong>følelser</strong>. Behandler man bare det første, får man ikke gjennomført det andre.' },
          { t: 'liste', tittel: 'Endring kan gi nye eller endrede', punkter: ['Produkter og tjenester', 'Markeder', 'Produksjonsmetoder'] },
          { t: 'liste', tittel: 'Endringer klassifiseres ofte etter om de er', punkter: [
            'Radikale eller inkrementelle',
            'Planlagte og hierarkisk styrt, eller ikke'
          ]},
          { t: 'liste', tittel: 'Fem perspektiver på endring', punkter: [
            'Planlagt endring',
            'Endring som livssykluser',
            'Endring som evolusjon',
            'Endring som dialektisk prosess og maktprosess',
            'Endring som tilfeldighet'
          ]},
          { t: 'liste', tittel: 'Måter å forstå en endringsprosess på', punkter: [
            'Offensiv eller defensiv', 'Grad av frivillighet mot tvang', 'Planlagt eller ikke planlagt', 'Transaksjonsbasert eller transformasjonsbasert'
          ]}
        ]
      },
      {
        tittel: 'Organisasjonsutvikling og Lewins faser',
        blokker: [
          { t: 'def', term: 'Organisasjonsutvikling (OU)', tekst: 'En egen strategi for endring, som forankrer endringsarbeidet i demokratiske prosesser. Strategien forutsetter at det ikke er noen grunnleggende interessekonflikt i organisasjonen, at alle parter kan samarbeide om en forbedring, og at alle ønsker å utvikle seg og lære.' },
          { t: 'liste', tittel: 'Lewins tre faser', punkter: [
            '<strong>Opptining (mobilisere):</strong> skape motivasjon for endring og forberede de ansatte',
            '<strong>Endring:</strong> tiltakene iverksettes, og ny atferd og nye holdninger skapes. Det er her drivkreftene og motkreftene gjør seg gjeldende. Endringslederen må holde trykket og repetere. Støtte, trening og kompetanseutvikling er avgjørende',
            '<strong>Nedfrysing (stabilisering):</strong> de nye tiltakene stabiliseres og rutiniseres, slik at organisasjonen ikke faller tilbake til gamle mønstre'
          ]},
          { t: 'p', tekst: 'Lewins grunntanke er at endring er resultatet av <em>motstridende krefter</em> som må håndteres. Fasene kan også leses som en kompetansereise: fra ubevisst inkompetanse, via bevisst inkompetanse og bevisst kompetanse, til ubevisst kompetanse.' },
          { t: 'liste', tittel: 'Kotters åtte steg', punkter: [
            'Skape en opplevelse av at noe er prekært — kriseforståelse',
            'Sette sammen et styringsteam med kompetanse, troverdighet, autoritet og nettverk',
            'Lage en stimulerende visjon og strategi',
            'Kommunisere visjonen gjennom ord, handling og symboler',
            'Istandsette organisasjonen til å handle — fjerne hindringer',
            'Skape synlige symboler på framgang gjennom raske seire',
            'Holde seg til prosessen og ikke gi opp når det røyner på',
            'Dyrke og forme en ny kultur som støtter det nye som vokser fram'
          ]}
        ]
      },
      {
        tittel: 'Motstand mot endring',
        blokker: [
          { t: 'liste', tittel: 'Ti årsaker til motstand', punkter: [
            'Frykt for det ukjente',
            'Brudd på den psykologiske kontrakten',
            'Tap av identitet',
            'Den symbolske ordenen endres',
            'Maktforholdene endres',
            'Krav om nyinvestering',
            'Dobbeltarbeid i en periode',
            'Sosiale bånd brytes',
            'Utsikter til personlig tap',
            'Eksterne aktører ønsker stabilitet'
          ]},
          { t: 'liste', tittel: 'Slik det oppleves innenfra', punkter: [
            'Frykt for det ukjente, og ønsket om å bli i komfortsonen',
            'Endring i rutiner — vi er vanemennesker',
            '«What is in it for me»',
            'Sikkerhet — frykt for å miste jobben eller utviklingsmulighetene',
            'Trussel mot egen posisjon — sosial status, anerkjennelse, nedrykk i hierarkiet',
            'Forstyrrelse av det sosiale nettverket, som ofte veier tyngre enn den tekniske endringen',
            'Endring i kultur og normer'
          ]},
          { t: 'p', tekst: 'Forelesningens diagnose av hvorfor endringer feiler er skarp: <em>mer fokus på drivkreftene enn på å ta hensyn til det som skaper frykt.</em>' },
          { t: 'liste', tittel: 'Motstand kan reduseres ved', punkter: [
            'Å gå tidlig ut med saklig informasjon og god kommunikasjon med de berørte',
            'Å involvere medarbeidere i beslutningsprosessen',
            'Å bygge positive relasjoner og tillit mellom endringsagenter og ansatte',
            'Rettferdighet i gjennomføringen av tiltakene',
            'Å fremme erkjennelsen av at partene har sammenfallende interesse i at endringen lykkes'
          ]},
          { t: 'boks', tittel: 'Kan motstand være positivt?', tekst: 'Motstand holder samtalen om endringen i gang. Medarbeidere med gjennomtenkte motforestillinger kan bli de mest motiverte om de skifter standpunkt, og de som yter motstand har ofte sterkere engasjement enn de som aksepterer alt. Konflikt knyttet til endring bidrar dessuten til at endringene blir varige. Vanskeligheten er å skille funksjonelle fra dysfunksjonelle konflikter.' }
        ]
      },
      {
        tittel: 'Å lykkes med endring',
        blokker: [
          { t: 'liste', tittel: 'Forutsetninger for vellykket endring', punkter: [
            'Opplevd behov for endring',
            'Organisasjonen har kapasitet til å gjennomføre den',
            'Forskningsbasert tilnærming',
            'Klar visjon for hva som skal oppnås',
            'En prosess kjennetegnet av prosedural rettferdighet',
            'Strukturelle trekk som hindrer endring fjernes',
            'Åpenhet for eksperimentering og utforsking',
            'Framdriften følges tett',
            'Forbedringer konsolideres underveis og forankres i kulturen'
          ]},
          { t: 'liste', tittel: 'Hva øker sannsynligheten for å lykkes?', punkter: [
            'Utvikle en felles virkelighetsforståelse og forklare hvorfor endringen er nødvendig',
            'Sette klare mål med en bestemt tidsramme',
            'Involvere medarbeiderne',
            'Topplederens engasjement',
            'Jobbe med mange små forbedringer',
            'Skape tidlige og synlige suksesser',
            'Ha en eksperimenterende holdning til hele prosessen',
            'Utvikle kultur og struktur som støtter prosessen',
            'Evaluere kontinuerlig og lære av det',
            'Kommunisere, kommunisere, kommunisere'
          ]},
          { t: 'tabell', kolonner: ['Grunnlag', 'Revolusjon', 'Evolusjon'], rader: [
            ['Orden og tvang', 'Diktatorisk omforming', 'Tvungen utvikling'],
            ['Samarbeid og konsultasjon', 'Karismatisk omforming', 'Deltakende utvikling']
          ]},
          { t: 'p', tekst: 'Omstillingskurven beskriver den individuelle reisen gjennom endringen: benektning («sjokk»), reaksjon («motstand»), undersøkelse («bearbeiding») og tilpasning («satsing») — fra å oppleve endringen som en trussel til å se den som en mulighet.' },
          { t: 'liste', tittel: 'Endringsplanens fem steg', punkter: [
            'Erkjenne og forstå behovet for endring',
            'Analysere endringsutfordringen',
            'Lage endringsplanen',
            'Implementere planen',
            'Følge opp og sikre varig endring'
          ]},
          { t: 'boks', tittel: 'The knowing–doing gap', tekst: 'Utfordringen i praksis er gapet mellom nåsituasjonen og ønsket posisjon — og mellom det vi vet og det vi gjør (Pfeffer og Sutton). Endringsplaner strander sjelden på manglende kunnskap om hva som burde gjøres.' }
        ]
      },
      {
        tittel: 'Makt i endringsprosesser',
        blokker: [
          { t: 'p', tekst: 'Forelesningen avslutter med makt, fordi endring alltid flytter på den. «Makt er det samme for organisasjoner som oksygen er for å puste.» Makt er en sosial relasjon, alle har en viss grad av den, og den er dynamisk.' },
          { t: 'liste', tittel: 'Åpen og skjult maktbruk', punkter: [
            '<strong>Åpen:</strong> byttemakt, overtalelse, tvangsmakt',
            '<strong>Skjult:</strong> manipulering, strukturmakt, normativ makt, meningsmakt'
          ]},
          { t: 'liste', tittel: 'Syv maktbaser', punkter: [
            'Hierarkisk posisjon',
            'Kontroll over dagsordenen',
            'Kontroll over informasjon',
            'Kontroll over arbeidsoppgaver og kunnskap',
            'Kontroll over sosiale prosesser',
            'Personlige ressurser',
            'Allianser og nettverk'
          ]},
          { t: 'p', tekst: 'Et sentralt poeng: <strong>autoritet er noe de underordnede gir til ledelsen</strong> — den kommer ikke ovenfra. Og en organisasjon uten konflikt er sannsynligvis i stagnasjon, fordi innovasjon og utvikling som regel skaper konflikt.' },
          { t: 'liste', tittel: 'Bemyndiggjøring (empowerment)', punkter: [
            'Delegering av myndighet',
            'Deltakelsesrettigheter i beslutningsprosesser',
            'Tilgang til informasjon',
            'Systemer for å fange opp maktmisbruk',
            'Opprettelse av nettverk på tvers'
          ]},
          { t: 'boks', tittel: 'Kotter gjennom fire fortolkningsrammer', tekst: 'Forelesningen kobler Kotters stadier til Bolman og Deals rammer. Samme steg ser helt ulikt ut avhengig av rammen: å skape kriseforståelse er å involvere folk og be om innspill (HR), å drive nettverksarbeid mot viktige aktører (politisk), eller å fortelle en overbevisende historie (symbolsk). Å fjerne hindringer er å endre strukturer og prosedyrer (strukturell), sørge for opplæring og støtte (HR), eller iscenesette offentlige oppgjør med motstanderne (politisk).' }
        ]
      }
    ]
  },

  /* =================== 11. Sentrale ledelsesteorier =================== */
  {
    id: 'f11', modul: 'ledelse', nr: 11,
    tittel: 'Sentrale ledelsesteorier',
    kilde: 'HSM121 forelesning 11', foreleser: 'Reidar Hillesund', lysbilder: 70,
    litteratur: 'JT kap. 12',
    hovedpunkter: [
      'Ledelse virker direkte og indirekte — gjennom formelle og uformelle elementer',
      'Lederstiltabellen fra den sterke mann til den tjenende lederen er forelesningens røde tråd',
      'Situasjonsbestemt ledelse kobler fire lederstiler til fire utviklingsnivåer',
      'Institusjonell ledelse (Selznick) handler om å skape et felles verdigrunnlag'
    ],
    seksjoner: [
      {
        tittel: 'Hva er ledelse?',
        blokker: [
          { t: 'liste', tittel: 'Tre kjennetegn', punkter: [
            'Ledelse er en type atferd som utøves av én eller flere personer',
            'Ledelse har til hensikt å få andre mennesker til å gjøre noe',
            'Ledelse skal bidra til at organisasjonen når sine mål på best mulig måte'
          ]},
          { t: 'liste', tittel: 'Direkte og indirekte ledelse', punkter: [
            '<strong>Direkte ledelse:</strong> lederens atferd påvirker medarbeiderens atferd umiddelbart',
            '<strong>Indirekte gjennom formelle elementer:</strong> lederen utformer mål, struktur, rutiner og systemer',
            '<strong>Indirekte gjennom uformelle elementer:</strong> lederen påvirker kultur, normer og maktforhold'
          ]},
          { t: 'p', tekst: 'Poenget med skillet er at mye av det en leder faktisk gjør, virker på medarbeiderne uten at lederen er til stede — og at de indirekte virkemidlene ofte er de sterkeste.' }
        ]
      },
      {
        tittel: 'Ledelse og administrasjon',
        blokker: [
          { t: 'p', tekst: '<strong>Administrasjon</strong> skaper forutsigbarhet og orden og bidrar til de kortsiktige målene — å «gjøre ting riktig». <strong>Ledelse</strong> skaper forandring, ofte store forandringer, og har potensial til å gi langsiktige resultater og konkurransefortrinn — å «gjøre de riktige tingene». Flere nyere studier indikerer at forskjellen mellom de to er blitt overdrevet.' },
          { t: 'tabell', kolonner: ['Administrasjon', 'Ledelse'], rader: [
            ['Gjøre tingene riktig', 'Gjøre de riktige tingene'],
            ['Effektivitet gjennom styring og kontroll', 'Klokskap gjennom grensekryssing'],
            ['Søken etter «beste praksis»', 'Søken etter «neste praksis»'],
            ['Vitenskap', 'Kunst'],
            ['Oppsyn med reisen', 'Skaper tanken og reisen'],
            ['Effektivitetsfokus', 'Resultatfokus'],
            ['Får ting til å fortsette å skje', 'Får ting til å skje'],
            ['Fullfører prosjekter', 'Starter prosjekter']
          ]},
          { t: 'liste', tittel: 'Ledelse mot styring, langs flere akser', punkter: [
            'Endring, relasjon og transformasjon mot administrasjon og forvaltning',
            'Personorientert, relasjonsdrevet og uformell mot systemorientert, strukturdrevet og formell',
            'Skjønn mot regler',
            'Forandring og utvikling mot standardisering og stabilitet',
            'Verdier mot regler — med sosiale normer og kultur i mellomposisjonen',
            'Transformasjon mot transaksjon — med rolle, fag og mandat i mellom'
          ]}
        ]
      },
      {
        tittel: 'Fire innfallsvinkler og fem ledelsesnivåer',
        blokker: [
          { t: 'liste', tittel: 'Fire måter å studere ledelse på', punkter: [
            '<strong>Lederstil</strong> — hva slags stil bør velges for å få mest mulig ut av medarbeiderne?',
            '<strong>Relasjoner</strong> mellom leder og medarbeidere — hvilken relasjon er mest hensiktsmessig?',
            '<strong>Gi retning, mening og endre</strong> — ofte omtalt som institusjonell eller verdibasert ledelse',
            '<strong>Lederroller</strong> — hva ledere faktisk gjør, og hvilke oppgaver de har (rolleteorier)'
          ]},
          { t: 'p', tekst: 'Personlighetstrekk er tatt ut som egen innfallsvinkel, fordi ledelse i dag oppfattes som en <em>relasjon</em> mellom ledere og følgere, ikke som en egenskap ved lederen.' },
          { t: 'tabell', kolonner: ['Nivå', 'Virker på', 'Oppgave'], rader: [
            ['Ideologisk ledelse', 'Samfunnsnivå', 'Utvikle virksomhetens oppdrag, visjon og lederfilosofi'],
            ['Strategisk ledelse', 'Organisasjon og samfunn', 'Tilpasse seg og påvirke omgivelsene for å realisere visjonen'],
            ['Administrativ ledelse', 'Organisasjonsnivå', 'Sikre at valgt strategi følges — struktur, lønnssystem, ansvarsområder'],
            ['Operativ ledelse', 'Gruppenivå', 'Det daglige samarbeidet: ros og ris, motivering, konfliktløsning, tilbakemelding'],
            ['Selvledelse', 'Individnivå', 'Lede medarbeiderne til å lede seg selv — styre egne tanker, atferd og følelser']
          ]}
        ]
      },
      {
        tittel: 'Lederstil: fra den sterke mann til den tjenende lederen',
        blokker: [
          { t: 'p', tekst: 'Denne tabellen går igjen gjennom hele forelesningsrekken, og er verdt å kunne utenat.' },
          { t: 'tabell', kolonner: ['', 'Den sterke mann', 'Transaksjonslederen', 'Den visjonære helt', 'Transformasjonslederen', 'Tjenende leder'], rader: [
            ['<strong>Fokus</strong>', 'Ordre', 'Belønning', 'Visjoner', 'Selvledelse', 'Den andre'],
            ['<strong>Maktgrunnlag</strong>', 'Posisjon og autoritet', 'Belønning', 'Inspirasjon og relasjon', 'Delt makt', 'Forvalter'],
            ['<strong>Kunnskapskilde</strong>', 'Leder', 'Leder', 'Leder', 'Medarbeidere og leder', 'Medarbeider og leder'],
            ['<strong>Grunnlag for medarbeiders atferd</strong>', 'Fryktbasert', 'Kalkulert og forpliktet', 'Emosjonelt, basert på lederens visjon', 'Forpliktelse basert på psykologisk eierskap', 'Tillit og myndiggjøring']
          ]},
          { t: 'tabell', kolonner: ['Retning', 'Kjerne'], rader: [
            ['<strong>Transformasjonsledelse</strong>', 'Lederens evne til å få medarbeiderne til å yte ut over det som kan forventes, gjennom de fire I-ene: idealisert innflytelse, inspirerende motivasjon, intellektuell stimulering og individuelle hensyn'],
            ['<strong>Autentisk ledelse</strong>', 'Ledere som er svært opptatt av moral, og som av andre oppfattes som bevisste på egne og andres moralske perspektiver, kunnskaper og styrker. Gir høy motivasjon, jobbtilfredshet og ytelse'],
            ['<strong>Etisk ledelse</strong>', 'Ledere som er opptatt av å gjøre de riktige tingene og opptre etisk i lederskapet og ellers i livet. Moralsk ledelse, åpenhet og transparens'],
            ['<strong>Tjenende lederskap</strong>', 'Ledere som setter medarbeidernes og andre interessenters behov foran sine egne, og myndiggjør andre slik at de kan utvikle seg. Tillitsbasert, ydmyk, autentisk — forvalter og veileder']
          ]},
          { t: 'liste', tittel: 'To hovedkategorier lederstil', punkter: [
            '<strong>Oppgaveorientert (autoritær):</strong> organisere aktiviteter, klargjøre roller og arbeidsdeling, skaffe ressurser, klargjøre hvordan arbeidet skal utføres og overholde tidsfrister. Omfatter transaksjonsledelse, strukturerende ledelse og kontakt utover teamets grenser',
            '<strong>Relasjonsorientert (demokratisk):</strong> å bry seg om og ta vare på medlemmene. Verdsetter godt utført arbeid, vektlegger jobbtrivsel, ivaretar underordnedes selvrespekt og spør om råd. Omfatter transformasjonsledelse, støttende ledelse, myndiggjøring og motiverende ledelse'
          ]},
          { t: 'liste', tittel: 'Fire lederstiler i kunnskapsarbeid', punkter: [
            '<strong>Direkte ledelse:</strong> koordinering og delegering av arbeidsoppgaver',
            '<strong>Transaksjonsledelse:</strong> instrumentelt betinget transaksjon mellom leder og medarbeider',
            '<strong>Transformasjonsledelse:</strong> kommuniserer en visjon om en attraktiv framtid, slik at det utløses emosjonelle responser og et ønske om å oppfylle visjonen',
            '<strong>Myndiggjørende ledelse:</strong> legger til rette for selvledelse, der medarbeiderne selv kan ha innflytelse og lede seg mot bedriftens mål'
          ]}
        ]
      },
      {
        tittel: 'Situasjonsbestemt ledelse',
        blokker: [
          { t: 'liste', tittel: 'Tre ferdigheter en situasjonsbasert leder trenger (Blanchard)', punkter: [
            '<strong>Diagnostisering av utviklingsnivå</strong> — hvor er medarbeideren? Det finnes ingen beste form for lederskap; den avhenger av nivået til den du skal lede',
            '<strong>Fleksibilitet</strong> i utøvelsen av lederstil',
            '<strong>Samarbeid</strong> for å få fram høy prestasjon — omdanne entusiasme til prestasjon'
          ]},
          { t: 'tabell', kolonner: ['Utviklingsstadium', 'Medarbeideren', 'Lederstil', 'Kjennetegn ved stilen'], rader: [
            ['Forventning', 'Entusiastisk nybegynner: høy entusiasme og selvtillit, lav erfaring og kompetanse', '<strong>Instruerende</strong> — sterkt styrende, lite støttende', 'Bestemmer mål, planlegger, setter i gang, tar avgjørelser. Enveiskommunikasjon. Sier tydelig hva, hvor, hvem og når'],
            ['Frustrasjon', 'Desillusjonert medarbeider: lav entusiasme, erfaring, selvtillit og kompetanse', '<strong>Coachende</strong> — sterkt styrende og sterkt støttende', 'Viser vei, tar avgjørelser i samråd. Toveiskommunikasjon. Berømmer initiativ, bygger selvtillit og mestringstro'],
            ['Optimisme', 'Kapabel, forsiktig prøvende: økende entusiasme og erfaring, periodevis høy selvtillit', '<strong>Deltakende</strong> — sterkt støttende, mindre styrende', 'Spør hvordan medarbeideren vil løse oppgaven, gir oppmuntring og hjelp ved behov. Lytter og legger til rette'],
            ['Effektivitet', 'Kompetent utøver: høy entusiasme, erfaring, selvtillit og kompetanse', '<strong>Delegerende</strong> — lite støttende, lite styrende', 'Medarbeideren planlegger og bestemmer selv. Lederen holder kontakt og gir tilbakemelding']
          ]},
          { t: 'p', tekst: 'Hver stil har også en <em>bør ikke brukes</em>-regel: instruerende ikke med høy kompetanse og komplekse oppgaver, coachende ikke med dyktige medarbeidere med lang fartstid, deltakende ikke når medarbeideren mangler kunnskap, delegerende ikke før opplæringen og erfaringen er på plass.' },
          { t: 'liste', tittel: 'Fiedlers tre situasjonstrekk', punkter: [
            '<strong>Forholdet mellom leder og medarbeider</strong> — aksept og kvaliteten på samarbeidsklimaet',
            '<strong>Oppgavestruktur</strong> — er målet klart formulert og kjent, kan man avgjøre om resultatet er godt, finnes det prosedyrer, og finnes det én eller flere løsninger?',
            '<strong>Stillingsmakt</strong> — graden av formell autoritet'
          ]},
          { t: 'p', tekst: 'Fiedlers spørsmål er presist: hvorfor er noen ledere effektive i én situasjon og ineffektive i en annen, selv med samme formelle kvalifikasjoner? Svaret er at innflytelse ikke er en personlig egenskap, men en sosial relasjon.' }
        ]
      },
      {
        tittel: 'Institusjonell og verdibasert ledelse',
        blokker: [
          { t: 'p', tekst: 'Ifølge <strong>Selznick</strong> er ledelse først og fremst å skape et felles verdigrunnlag i organisasjonen. Ledelsesbegrepet knyttes da til verdier, normer, legitimitet og tillit.' },
          { t: 'liste', tittel: 'Fire oppgaver for den institusjonelle lederen', punkter: [
            'Utforme visjon, mål og verdier',
            'Institusjonalisere formålet — støtte opp om oppgaveløsning og sosiale samhandlingsmønstre',
            'Forsvare institusjonell integritet — verne verdigrunnlaget mot indre og ytre utfordringer',
            'Mestre intern konflikt'
          ]},
          { t: 'p', tekst: 'Bakgrunnen er at større turbulens i omgivelsene og en arbeidsstokk med høyere kompetanse tvinger ledere til å dele myndighet og innflytelse med underordnede. At en ledelsesteori er <em>verdibasert</em>, betyr at verdiene i lederskapet er retningsgivende, motiverende, fellesskapsdannende og utviklende — og at de fungerer som hjelpemiddel ved beslutninger og rettesnor i konfliktløsning.' },
          { t: 'liste', tittel: 'Distribuert eller delt ledelse', punkter: [
            'Ledelse forstås som noe leder og medarbeidere gjør sammen',
            'Både som planlagt ordning og som framvoksende prosess',
            'Finnes særlig i profesjonsbyråkratier — skoler, universiteter, sykehus — der organisasjonsmakten allerede er desentralisert'
          ]}
        ]
      },
      {
        tittel: 'Fullspektrumsmodellen og hva forskningen viser',
        blokker: [
          { t: 'tabell', kolonner: ['Transaksjonsledelse', 'Transformasjonsledelse'], rader: [
            ['<strong>Betinget belønning:</strong> avtaler belønning etter innsats, anerkjenner gode resultater', '<strong>Idealisert innflytelse:</strong> skaper visjon og følelse av et overordnet mål'],
            ['<strong>Ledelse ved unntak, aktiv:</strong> følger med, leter etter avvik fra regler og rutiner, korrigerer', '<strong>Inspirerende motivasjon:</strong> kommuniserer høye forventninger, bruker symboler, uttrykker mål'],
            ['<strong>Ledelse ved unntak, passiv:</strong> griper bare inn dersom regler ikke blir fulgt', '<strong>Intellektuell stimulering:</strong> understøtter rasjonalitet og grundig problemløsning, gir nye utfordringer'],
            ['<strong>Laissez-faire:</strong> unngår ansvar, unngår å ta avgjørelser', '<strong>Individuelle hensyn:</strong> gir oppmerksomhet, behandler ansatte individuelt, instruerer og gir råd']
          ]},
          { t: 'liste', tittel: 'Hva som får det beste ut av de fleste (Kuvaas)', punkter: [
            'Indre motivasjon, jobbengasjement og mestringsorientering framfor ytre motivasjon og prestasjonsorientering',
            'Autonomi og psykologisk empowerment framfor kontroll og styring',
            'Sosiale bytterelasjoner til leder og organisasjon framfor økonomiske',
            'Affektiv og normativ organisasjonsforpliktelse framfor kalkulerende',
            'Rettferdige prosedyrer, utfall og ledere',
            'Opplevelse av organisatorisk støtte'
          ]},
          { t: 'boks', tittel: 'Prestasjonsfremmende klima', tekst: 'Ledelsesforskningen peker i samme retning: transformasjonsledelse er mer effektfullt enn transaksjonsledelse; relasjonelle psykologiske kontrakter slår transaksjonelle; gode relasjoner preget av tillit og rettferdighet betyr mye; empowerment og jobbautonomi slår måling og kontroll; og indre motivasjon slår ytre.' }
        ]
      }
    ]
  },

  /* =================== 12. Tjenende lederskap =================== */
  {
    id: 'f12', modul: 'ledelse', nr: 12,
    tittel: 'Tjenende lederskap',
    kilde: 'HSM121 forelesning 12', foreleser: 'Reidar Hillesund', lysbilder: 42,
    litteratur: 'Eva m.fl. (2019), Liland (2021, 2024)',
    hovedpunkter: [
      'Tjenende ledere setter andres behov foran sine egne — og myndiggjør systematisk',
      'van Dierendoncks seks kjennetegn er kjernepensum',
      'Southwest Airlines viser at kulturen er det vanskeligste å kopiere',
      'Norsk forskning: sterk effekt på engasjement og endringsvilje, ingen målbar på lønnsomhet'
    ],
    seksjoner: [
      {
        tittel: 'Hva er tjenende lederskap?',
        blokker: [
          { t: 'p', tekst: 'Det avgjørende trekket er at tjenende ledere setter andre foran seg selv. Det primære er å legge til rette for at ikke bare medarbeiderne skal utvikle seg positivt, men også at interessene til kunder, brukere og andre interessenter ivaretas og fremmes. Tjenende ledere arbeider konstant med å myndiggjøre andre (Jacobsen og Thorsvik 2025).' },
          { t: 'liste', tittel: 'Greenleafs opprinnelige definisjon (1970)', punkter: [
            'Et ønske om å tjene andre',
            'Ikke-materialistisk orientering',
            'Ikke fokusert på makt og kontroll',
            'Fokusert på å utvikle mennesker',
            'Ønske om å gi de vanskeligstilte en stemme og hjelpe dem å lykkes'
          ]},
          { t: 'p', tekst: 'Begrepet kommer fra Robert Greenleafs essay <em>The Servant as Leader</em> (1970), og er siden tatt i bruk som ledelsesfilosofi i selskaper som Starbucks, Walmart og Southwest Airlines. De siste årene har det fått økt interesse også i akademia.' },
          { t: 'liste', tittel: 'W. Wrights fem prinsipper', punkter: [
            'Påvirkning og betjening',
            'Visjon og håp',
            'Karakter og tillit',
            'Relasjon og makt',
            'Avhengighet og ansvarlighet'
          ]},
          { t: 'boks', tittel: 'Blanchards formulering', tekst: 'Tjenende ledere forstår at alle trenger å bli hørt, rost, oppmuntret, tilgitt, akseptert — og ledet tilbake til riktig kurs når de har kommet ut av drift.' }
        ]
      },
      {
        tittel: 'van Dierendoncks seks kjennetegn',
        blokker: [
          { t: 'p', tekst: 'Dette er den mest eksamensrelevante listen i forelesningen (van Dierendonck, gjengitt hos Liland 2024, s. 71).' },
          { t: 'tabell', kolonner: ['Kjennetegn', 'Konkret innhold'], rader: [
            ['<strong>Myndiggjør og utvikler mennesker</strong><br>(empowering and developing people)', 'Coaching og trening. Se potensialet i mennesker. Oppmuntre og dele informasjon'],
            ['<strong>Ydmykhet</strong> (humility)', 'Lydhørhet. Erkjenner feil. Kjenner sine begrensninger'],
            ['<strong>Autentisitet</strong> (authenticity)', 'Holder det en lover. Ærlig og integrert. Ser mennesker'],
            ['<strong>Mellommenneskelig aksept</strong> (interpersonal acceptance)', 'Empati. Tilgivelse og nåde. Atmosfære av tillit'],
            ['<strong>Gir retning</strong> (providing direction)', 'Skreddersyr og plasserer ansvar. Innovasjon basert på verdier'],
            ['<strong>Forvaltning</strong> (stewardship)', 'Tar overordnet ansvar. Opplevelse av forpliktelse til det gode']
          ]},
          { t: 'p', tekst: 'Modellen for tjenende lederskap går fra <strong>forløpere</strong> — kontekst og kultur, lederens egenskaper, medarbeidernes egenskaper — via <strong>tjenende lederatferd</strong> — sette medarbeideren først, hjelpe folk å vokse, etisk atferd, myndiggjøre, skape verdi for de rundt seg — til <strong>utfall</strong>: medarbeidernes prestasjoner og vekst, organisasjonens prestasjoner, og betydning for samfunnet.' },
          { t: 'tabell', kolonner: ['Styrker', 'Svakheter'], rader: [
            ['Altruismen står sterkt', 'Virker ikke i miljøer der medarbeidere ikke er åpne for å bli veiledet, støttet eller myndiggjort'],
            ['Innflytelse og makt er reversert', 'Kvaliteten ved å «tjene» kan skape forvirring om lederrollen'],
            ['Det finnes tilgjengelige måleverktøy som gjør effektene enkle å undersøke', 'Altruismen kan gå på bekostning av det praktiske']
          ]}
        ]
      },
      {
        tittel: 'Hva forskningen viser',
        blokker: [
          { t: 'p', tekst: 'Kuvaas peker på at sammenhengen mellom tjenende lederskap og ledereffektivitet er <em>sterkere</em> enn mellom transformasjonsledelse og ledereffektivitet. Det betyr at tjenende lederskap forklarer medarbeidernes ytelse, engasjement, jobbtilfredshet, lojalitet, tillit og relasjonskvalitet bedre enn transformasjonsledelse gjør. Det er kanskje ikke enkelt å opptre slik — men det er effektivt.' },
          { t: 'boks', tittel: 'Norsk studie av regnskapsbedrifter', tekst: 'Aulie og Sundnes (NHH 2016) undersøkte 148 regnskapsbedrifter med 751 respondenter, både ledere og medarbeidere. Tjenende ledelse hadde klar positiv sammenheng med jobbengasjement, tillit til ledelsen, ansattes ekstra ytelse og engasjement, kreativitet og endringsvilje — og ekstrarolleatferden forsterket forholdet mellom tjenende ledelse og endringsvilje. <strong>Men: undersøkelsen viste ingen sammenheng mellom tjenende ledelse og lønnsomhet.</strong>' },
          { t: 'p', tekst: 'En SINTEF-studie av fem store nordiske selskap, basert på intervjuer med 60 ledere og ansatte gjennom hjemmekontoråret, fant at de lederne som lyktes best, var de som allerede før pandemien hadde lagt om til tjenende lederskap — en stil der sjefene i en viss forstand gjør seg selv overflødige.' },
          { t: 'liste', tittel: 'Lederrollen i en nettverksorganisasjon — seks råd', punkter: [
            'Skape arenaer der ansatte kan bygge nettverk',
            'Utforme oppgaver slik at folk jobber sammen og ikke alene',
            'Gripe inn når det oppstår flaskehalser i nettverkene',
            'Tilrettelegge for god teknologistøtte — standardisering av teknologi blir ofte feil, fordi ulike samhandlingsmønstre krever ulike verktøy',
            'Kjenne nettverkene godt, så man ikke tar uheldige valg når folk flyttes',
            'Hjelpe innleide inn i nettverkene — verdens beste på et felt hjelper lite om vedkommende blir sittende alene'
          ]}
        ]
      },
      {
        tittel: 'Southwest Airlines',
        blokker: [
          { t: 'p', tekst: 'Southwests suksess forklares med sammenhengen mellom selskapets verdier og de organisatoriske systemene og HR-tiltakene som brukes for å implementere strategien: lave kostnader, lavere bemanning, kortere tid på bakken og høy kundetilfredshet. Medarbeiderne ønsker å gi «det lille ekstra» — og det er nettopp holdningene som har vært vanskelige å kopiere.' },
          { t: 'liste', tittel: 'Strategi og HR i Southwest', punkter: [
            'Strategi: korte flygninger, morsomt å fly, lave kostnader, kort tid på bakken',
            'Jobbsikkerhet og langsiktig relasjon',
            'Selektiv rekruttering',
            'Selvstyrte team og desentralisering som grunnleggende organisasjonsprinsipp — teamene erstatter mye av behovet for hierarkisk kontroll, noe som gir mer autonom jobbdesign og dermed indre motivasjon',
            'Relativt høye lønninger basert på organisatorisk prestasjon',
            'Stor investering i trening og utvikling',
            'Små statusforskjeller mellom ansatte, og mellom ansatte og ledelse',
            'Utpreget deling av informasjon i hele organisasjonen'
          ]},
          { t: 'liste', tittel: 'Forpliktelsesbasert HR (Pfeffer og Veiga)', punkter: [
            'Medarbeiderne jobber <strong>hardere</strong> på grunn av sterkere involvering og engasjement, som skyldes høy grad av medbestemmelse og egen kontroll',
            'De jobber <strong>smartere</strong> fordi de oppfordres til å utvikle og bruke ferdighetene sine',
            'De jobber <strong>mer ansvarlig</strong> fordi ansvaret er plassert i deres hender'
          ]},
          { t: 'p', tekst: 'Andre virksomheter forelesningen trekker fram som preget av tjenende lederskap: Max Havelaar / Fairtrade Norge, Umoe Catering, Starbucks og AT&T.' }
        ]
      },
      {
        tittel: 'Røtter og lederlogikker',
        blokker: [
          { t: 'liste', tittel: 'Tjenende lederskap hos Jesus — trekkene forelesningen framhever', punkter: [
            'Bygger relasjon og jobber teambasert',
            'Utruster gjennom å gå sammen med folk i praksis',
            'Myndiggjør etterfølgerne til samme oppdrag som seg selv, og sender dem ut',
            'Tydelig visjon og misjon',
            'Frigjøring, omsorg for fattige og syke, og likeverd',
            'Maktgrunnlaget er tjeneren, og lederskapet modelleres ved å vaske føttene til medarbeiderne'
          ]},
          { t: 'tabell', kolonner: ['Lederstil E (Jacobsen) / Maxwell 1', 'Lederstil O (Jacobsen) / Maxwell 2'], rader: [
            ['Kartlegger motstand og støtte, kartlegger maktbaser, knytter allianser', 'Ser den enkelte, tilfører ressurser og energi, motiverer den enkelte'],
            ['Identifiserer sentrale slagmarker, definerer brohoder og kamper, overvåker prosessen', 'Benytter delegasjon og støttende atferd, fungerer som bindeledd og som lærer'],
            ['Jakter på makt og prestasjon, ser andre som fiender og konkurrenter, er villig til å bruke trussel og tvang', 'Jakter på kjærlighet og tjeneste for andre, ser andre som utfyllende, motiveres av å møte behov og jobbe for saken'],
            ['Gir større velstand og status som leder', 'Gir større velferd til folket']
          ]},
          { t: 'boks', tittel: 'Mor Teresas to spørsmål', tekst: '«Kjenner du folkene dine? Elsker du dem?» Forelesningens kommentar: du kan ikke lede folk du ikke kjenner — men du kan administrere dem.' }
        ]
      }
    ]
  },

  /* =================== 12a. Hans Nielsen Hauge =================== */
  {
    id: 'f12a', modul: 'ledelse', nr: 12,
    tittel: 'Hans Nielsen Hauge som leder og samfunnsbygger',
    kilde: 'HSM121 forelesning 12a', foreleser: 'Reidar Hillesund', lysbilder: 27,
    litteratur: 'Liland (2021, 2024)',
    hovedpunkter: [
      'Haugianismen regnes som Norges første landsomfattende folkebevegelse',
      'Hauge kombinerte kall, næringsutvikling og folkeopplysning',
      'Menneskesyn som ledelsesprinsipp: potensialet før posisjonen',
      'Forløper for den norske samarbeidsmodellen'
    ],
    seksjoner: [
      {
        tittel: 'Hvem var han?',
        blokker: [
          { t: 'liste', tittel: 'Hovedtrekk (1771–1824)', punkter: [
            'Født i Tune i Østfold, nummer fem av ti barn',
            'Åndelig gjennombrudd 5. april 1796',
            'Gikk til fots gjennom mesteparten av Norge, primært i perioden 1797–1804',
            'Satt omtrent ti år i fengsel fra 1804 til 1814, arrestert etter konventikkelplakaten',
            'Forfattet mellom 33 og 40 bøker og skrifter',
            'Startet eller restartet minst 30 bedrifter'
          ]},
          { t: 'boks', tittel: 'Historikerens vurdering', tekst: '«Det er vanlig å regne haugianismen som den aller første landsomfattende folkebevegelse i Norge. Skapt på et tidspunkt hvor all folkelig organisering var forbudt» (Trygve Riiser Gundersen).' },
          { t: 'p', tekst: 'Konteksten: 80–90 % av befolkningen bodde på landsbygda og levde av jordbruk. Utover 1800-tallet skjøt industrialiseringen fart, med skipsfart, fiske og fangst, trelast, industri og bergverk som de viktigste eksportnæringene.' }
        ]
      },
      {
        tittel: 'Hvorfor startet han virksomheter?',
        blokker: [
          { t: 'liste', punkter: [
            'Drevet av et kall: «Mitt kallsbrev er å elske Gud og min neste»',
            'Et brennende samfunnsengasjement',
            'Folkeopplysning, utvikling av talent og forvalterskap',
            'Lindre nød og lidelse, og bekjempe fattigdom',
            'Skaper- og virketrang, evne til å se muligheter og potensial i andre'
          ]},
          { t: 'p', tekst: 'Metoden var å se ressurser der andre så landskap: så han en foss, så han vannkraft, og slik ble møllene til. På reisene sine så han at noen steder hadde overskudd på det andre steder manglet — og slik ble handelsbedriftene født. Det ble papirmøller, kornmøller, benmøller, garveri, støpeverk, strømpeveving i Trondheim, pottaskanlegg i Bardu, fiskevær med gjestgiveri i Nord-Trøndelag og gruvedrift i Nord-Østerdal.' },
          { t: 'boks', tittel: 'Økonomisk betydning', tekst: 'Ola Grytten ved NHH har anslått at Hauge gjennom sitt nettverk direkte eller indirekte bidro til å skape mellom 7 000 og 8 000 arbeidsplasser i Norge i perioden 1801–1828, og at han sto for omtrent 1,5–2 % av landets samlede investeringer i 1804.' },
          { t: 'p', tekst: 'Dag Kullerud (1996) omtaler ham som «vekkelsespredikant, organisator, kjøpmann, skipsreder, ekteskapsformidler, vår første store industrigründer, vår første forfatter med masseopplag, og vår første store forlegger».' }
        ]
      },
      {
        tittel: 'Ledelsesprinsippene',
        blokker: [
          { t: 'liste', tittel: 'Frigjøring av potensial', punkter: [
            'Satte i gang omfattende opplæring og utdannelse, ofte ved å formidle lærlingplasser',
            'Var flink til å se potensialet i mennesker, og sørget for at de fikk muligheter',
            'Valgte ut ledere etter egnethet — og krevde at gode holdninger og ansvar for andre var vist i praksis',
            'Gjorde ikke forskjell på kvinner og menn, gamle eller unge, fattige eller rike',
            'Satte ofte sammen grupper av mennesker som utfylte hverandre'
          ]},
          { t: 'boks', tittel: 'Kommunist eller kapitalist?', tekst: 'Hauge tenkte først at bedriftene skulle eies i fellesskap av «det kristelige samfunn», men det viste seg nødvendig med private, spesifiserte eiere. Bedriftene sto derfor med konkrete haugianere som eiere. De oppfattet seg likevel som et fellesskap: overskuddet ble brukt til å starte nye bedrifter, ofte eid av andre haugianere, og de etablerte samarbeid på tvers av bransjer og geografi — strategiske allianser som økte konkurranseevnen.' },
          { t: 'p', tekst: 'Sporene finnes fortsatt: Devold, som etablerte det første telenettet i Europa, Möllers Tran, som var først i verden med å framstille medisintran av fiskelever, og boktrykkeriet Grøndahl & Søn.' }
        ]
      },
      {
        tittel: 'Samtidig og etterpå',
        blokker: [
          { t: 'boks', tittel: 'Robert Owen (1771–1858)', tekst: 'Hauges britiske samtidige kjøpte en bomullsfabrikk i New Lanark i 1799 og gjorde den til en mønsterfabrikk: høyere lønn, kortere arbeidstid, bedre boliger, skole for barna som ble tatt ut av fabrikken, forbud mot fysisk avstraffelse — og samtidig høy lønnsomhet. Men ingen ville tro at det å investere i mennesker kunne gi større utbytte enn å investere i maskiner.' },
          { t: 'liste', tittel: 'Kjennetegn på norsk og skandinavisk arbeidsliv', punkter: [
            'Høy produktivitet og lav arbeidsledighet',
            'Lik representasjon av begge kjønn på de fleste felt',
            'En rekke lov- og avtalefestede velferdsordninger — sykelønn, foreldrepermisjon, fravær ved barns sykdom',
            'Høy organisasjonsgrad, både fagforening og arbeidsgiverforening',
            'Lavt nivå av streik og konflikt',
            'Høy lønn og små lønnsforskjeller i hierarkiet'
          ]},
          { t: 'liste', tittel: 'Samarbeidsmodellens fem trekk', punkter: [
            'Gruppe- eller teamarbeid i selvstyrte grupper',
            'Partnerskap — medvirkning og tett samarbeid mellom ledelse og tillitsvalgte, framfor ren forhandling',
            'Representativ medvirkning, med ansatte i styret',
            'Arbeidsmiljølov med tilrettelegging, sosioteknisk tenkning og økt egenkontroll',
            'Demokratisk ledelse med sterkt fokus på medvirkning i det daglige arbeidet'
          ]},
          { t: 'p', tekst: 'Trepartssamarbeidet hviler på tre grunnpilarer: offentlig velferd, organisert arbeidsliv og økonomisk styring.' }
        ]
      }
    ]
  },

  /* =================== 13. Etikk og ledelse =================== */
  {
    id: 'f13', modul: 'ledelse', nr: 13,
    tittel: 'Etikk og ledelse',
    kilde: 'HSM121 forelesning 13', foreleser: 'Reidar Hillesund', lysbilder: 41,
    litteratur: 'Yukl kap. 9, Northouse kap. 15',
    hovedpunkter: [
      'Fire etiske teorier svarer på fire ulike spørsmål',
      'Etisk ledelse hviler på personlig integritet — konsistens mellom uttalte verdier og atferd',
      'Regelstyrt og målstyrt ledelse er pliktetikk og konsekvensetikk i praksis',
      'Den giftige triangelen: destruktiv ledelse krever også følgere og et gunstig miljø'
    ],
    seksjoner: [
      {
        tittel: 'Hvorfor ledelse og etikk?',
        blokker: [
          { t: 'p', tekst: 'Gini (2004) formulerer kjernen: det handler ikke om hvorvidt ledere <em>vil</em> bruke makt, men om de vil bruke den klokt og godt.' },
          { t: 'liste', tittel: 'Etisk ledelse', punkter: [
            'Involverer først og fremst <strong>personlig integritet</strong>, som topper lister over kriterier på tvers av kulturer',
            'Basisdefinisjonen legger vekt på ærlighet og konsistens mellom en persons uttalte verdier og faktiske oppførsel',
            'Moralsk anerkjent atferd inkluderer å følge de samme reglene som andre, ærlighet og åpenhet, å holde løfter og forpliktelser, og å erkjenne ansvar for feil og søke å korrigere dem'
          ]},
          { t: 'p', tekst: 'Bedømmelsen er krevende fordi den involverer subjektiv vurdering, og den må omfatte tre ting: <strong>hensikten</strong> (målet), <strong>konsistensen mellom oppførsel og moral</strong> (middelet), og <strong>konsekvensene for seg selv og andre</strong> (resultatet).' },
          { t: 'def', term: 'Etikk og moral', tekst: '<strong>Etikk</strong> er læren om moral — moralfilosofi. Formålet er å studere hvordan man bør handle, og å forstå begrepene vi bruker når vi evaluerer handlinger, personer og utfall. <strong>Moral</strong> brukes deskriptivt om det settet av normer, verdier og holdninger som faktisk aksepteres og praktiseres, og normativt om normer som har gyldighet.' },
          { t: 'p', tekst: 'Etikk handler ikke bare om regler og prinsipper, men også om hvordan mennesker inngår i relasjoner og avhengighetsforhold og utvikler dem på en god måte. Etikken er forankret i den moralske personligheten.' }
        ]
      },
      {
        tittel: 'De fire etiske teoriene',
        blokker: [
          { t: 'tabell', kolonner: ['Teori', 'Spørsmål den stiller', 'Kjerne'], rader: [
            ['<strong>Konsekvensetikk</strong> (nytteetikk, utilitarisme)', 'Hva er konsekvensen av valget?', 'Handlingen vurderes etter hva den fører til. Varianter: etisk egoisme (profittmaksimerende), utilitarisme (nytte for flest mulig), altruisme'],
            ['<strong>Pliktetikk</strong> (regeletikk, deontologi)', 'Hva er rett å gjøre?', 'Visse midler kan aldri rettferdiggjøres, selv med et godt mål. Kants kategoriske imperativ: handle bare etter den regelen du kan ville skal bli allmenn lov'],
            ['<strong>Dydsetikk</strong>', 'Hvilke dyder og egenskaper er viktige?', 'Dydene er forankret i personen, formes gjennom øvelse, og hører selv med til det gode livet — ikke bare som middel'],
            ['<strong>Diskursetikk</strong>', 'Hvilke normer oppstår i dialog mellom alle berørte?', 'Habermas: en norm kan bare kreve gyldighet dersom konsekvensene av å følge den kan få utvungen tilslutning fra alle berørte parter gjennom praktisk diskurs']
          ]},
          { t: 'p', tekst: 'Plikt har tre kjennetegn: den er <strong>absolutt</strong>, den er vanligvis formulert som en <strong>regel eller norm</strong>, og den skal hjelpe oss å gjøre det som er <strong>rett</strong> — ikke først og fremst det som er godt eller best. Pliktetikken hevder at det gode følger av at vi gjør det rette.' },
          { t: 'p', tekst: 'Forskjellen mellom dydsetikk og konsekvensetikk er verdt å merke seg: konsekvensetikken er bare opptatt av hva handlingen fører til, mens dydsetikken er opptatt av hva handlingen uttrykker om den som handler, og hvordan den utvikler oss som mennesker og fellesskap.' },
          { t: 'p', tekst: 'I diskursetikken er den moralske aktøren ikke det enkelte mennesket alene, men mennesker som gjennom fellesskap og dialog har funnet fram til gode løsninger de deler (Henriksen og Vetlesen 2017).' }
        ]
      },
      {
        tittel: 'Etikk i praktisk ledelse',
        blokker: [
          { t: 'liste', tittel: 'Kvalnes seks spørsmål å stille før du handler', punkter: [
            '<strong>Jus:</strong> er det lovlig?',
            '<strong>Identitet:</strong> er det i samsvar med verdiene våre?',
            '<strong>Moral:</strong> er det riktig?',
            '<strong>Etikk:</strong> lar det seg begrunne?',
            '<strong>Omdømme:</strong> beholder vi troverdigheten?',
            '<strong>Økonomi:</strong> lønner det seg?'
          ]},
          { t: 'p', tekst: 'Etikk er et fag som gir oss et språk og prinsipper vi kan bruke når vi fatter beslutninger (Kvalnes 2006). Teoriene skal gi oss både nærhet og distanse til problemet, og de er et alternativ til tradisjonsstrategien, følelsesstrategien og den dogmatiske strategien (Føllesdal).' },
          { t: 'tabell', kolonner: ['Ledelsesform', 'Etisk grunnlag', 'Hvordan det virker'], rader: [
            ['<strong>Regelstyrt ledelse</strong>', 'Pliktetikk (Weber)', 'Moralsk verdi tillegges handlingen, ikke konsekvensen. Den ideelle byråkrat beslutter <em>sine ira et studio</em> — uten sinne eller glede. Lager man gode nok regler, behandles alle likt fordi avgjørelsene ikke er subjektive. Dette er den vanligste formen for delegering'],
            ['<strong>Målstyrt ledelse</strong>', 'Konsekvensetikk (Hume)', 'Organisasjonens mål og underliggende verdier kommuniseres, slik at beslutningsmyndighet og ansvar for delmål kan desentraliseres. Ledere får fullmakt til selv å gjøre strategiske valg ved å bedømme konsekvensene mot målet. Drucker og McGregor er pionerer']
          ]},
          { t: 'boks', tittel: 'Regel eller konsekvens — det klassiske eksempelet', tekst: 'Løwendahl og Wenstøp (BI) leser fortellingen om helbredelsen på sabbaten som det første skrevne eksempelet på konflikten mellom regelstyrt og målstyrt ledelse: fariseernes regel kan etterleves ved å holde seg til lovens bokstav, uten å bli emosjonelt involvert, mens Jesus setter opp et mål — du skal gjøre det gode — som krever at man først bedømmer hva som er godt, og dermed involverer seg. For å bedømme hva som er godt, må man ha en idé om konsekvensene.' },
          { t: 'liste', tittel: 'Hva kjennetegner en etisk robust virksomhet?', punkter: [
            '<strong>Kunnskap</strong> om lover, regler, mål og rammer',
            '<strong>Kultur</strong> — etisk bevisst atferd, gode prinsipper, og arenaer og enkle verktøy for å håndtere dilemmaer',
            '<strong>Arbeidsrutiner</strong> som er dokumenterte og etterprøvbare, en åpen organisasjon og god intern og ekstern kommunikasjon'
          ]}
        ]
      },
      {
        tittel: 'Dydene og etisk lederskap',
        blokker: [
          { t: 'tabell', kolonner: ['Klassisk dyd', 'Hva den består i'], rader: [
            ['<strong>Klokskap</strong>', 'Situasjonsbevissthet og bevisst tilstedeværelse. Kompetanse til å utøve godt skjønn i konkrete og komplekse situasjoner'],
            ['<strong>Rettferdighet</strong>', 'Relasjonsbevissthet. Framstår troverdig og pålitelig'],
            ['<strong>Måtehold</strong> (selvbesinnelse)', 'Årvåkenhet og selvbevissthet — blikket rettes mot en selv'],
            ['<strong>Mot</strong>', 'Besluttsomhet, kraft og vilje til å handle. Hva hjelper all verdens innsikt om lederen ikke våger å beslutte? (Brunstad 2009)']
          ]},
          { t: 'p', tekst: 'Dyder omtales gjerne som <strong>kjerneverdier</strong> i en organisasjon, og kjerneverdier kan igjen forstås som normer for atferd og samhandling. Motstykket er de syv lastene — stolthet, grådighet, lyst, misunnelse, fråtseri, sinne og latskap — som ifølge tradisjonen medfører tiltakende mental og moralsk isolering.' },
          { t: 'liste', tittel: 'Fem prinsipper for etisk lederskap (Northouse)', punkter: [
            '<strong>Respekt for andre:</strong> Kants plikt til å behandle andre med respekt, aldri bare som middel. Krever aktiv lytting, empati og toleranse',
            '<strong>Tjeneste:</strong> altruisme synlig som mentoring, utrustning og teambygging. Å gi næring til organisasjonens visjon (Senge) og bry seg om dem som ikke har noe (Greenleaf)',
            '<strong>Rettferdighet:</strong> ingen bør motta spesiell behandling med mindre situasjonen krever det. Å fremme gruppens felles interesser (Rawls). Krevende, fordi ressurser er begrensede',
            '<strong>Ærlighet:</strong> når vi lyver, sier vi i praksis at vi er villige til å manipulere relasjonen på egne premisser. Handler også om transparens',
            '<strong>Bygger fellesskap:</strong> lederen må skape en overenskomst mellom sin egen og følgernes hensikt, og arbeide for det felles gode framfor å presse egne mål på medarbeiderne'
          ]},
          { t: 'liste', tittel: 'Psykologiske forutsetninger for etisk atferd', punkter: [
            'Desentrering og evne til refleksjon',
            'Empati og emosjonell intelligens',
            'Sårbarhet og tillit',
            'Overordnet fleksibilitet',
            'Personlig integritet, og å unngå dobbeltbudskap',
            'Evne til å skape tillit',
            'Evne og vilje til å ta ansvar'
          ]},
          { t: 'p', tekst: 'Yrkesetisk ansvar er personlig: moralsk integritet er knyttet til fritt å kunne handle i tråd med sine overbevisninger. En person som er bevisst den etiske dimensjonen i egen yrkesutøvelse, kan derfor aldri gjemme seg bak andre og unndra seg sin del av ansvaret for det virksomheten gjør.' }
        ]
      },
      {
        tittel: 'Samfunnsansvar og destruktiv ledelse',
        blokker: [
          { t: 'liste', tittel: 'Samfunnsansvarets fire nivåer', punkter: [
            '<strong>Økonomisk</strong> — å levere det folk har behov for',
            '<strong>Legalt</strong> — innenfor lover og regler',
            '<strong>Etisk</strong> — innenfor uformelle rammer, regler og normer',
            '<strong>Filantropisk</strong> — utover det man selv har nytte av'
          ]},
          { t: 'p', tekst: 'Virksomhetsstyring (corporate governance) skal sikre eierinnflytelse; samfunnsansvar (CSR) understreker at organisasjoner har et ansvar utover det å tjene penger. ESG samler det miljømessige, sosiale og etiske ansvaret.' },
          { t: 'boks', tittel: 'Den giftige triangelen', tekst: 'Destruktiv ledelse oppstår sjelden av lederen alene. Padilla, Hogan og Kaiser (2007) beskriver tre elementer som må være til stede samtidig: en <strong>destruktiv leder</strong>, <strong>mottakelige følgere</strong>, og et <strong>gunstig miljø</strong>. Modellen flytter analysen fra person til system — og er derfor den mest brukbare inngangen til spørsmålet om hvordan dårlig ledelse får bestå.' }
        ]
      }
    ]
  }
];
