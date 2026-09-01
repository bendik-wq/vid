/* Kapittelinnhold for organisasjonsteori.
   Blokktyper: p (avsnitt), liste, tabell, boks, def */
window.OT = window.OT || {};
window.OT.modules = [
  {
    id: 'grunnlag',
    nr: 1,
    tittel: 'Hva er en organisasjon?',
    ingress: 'Grunndefinisjoner, organisasjonen som åpent system og de historiske hovedretningene i faget.',
    laeringsmaal: [
      'Definere hva en organisasjon er, og skille formell fra uformell organisasjon',
      'Forklare organisasjonen som et åpent, produksjonsomformende system',
      'Plassere de klassiske retningene (scientific management, byråkrati, administrasjonsteori, human relations) historisk',
      'Forklare hva et perspektiv i organisasjonsteori er, og hvorfor flere perspektiver trengs'
    ],
    seksjoner: [
      {
        tittel: 'Definisjonen av en organisasjon',
        blokker: [
          { t: 'def', term: 'Organisasjon', tekst: 'Et sosialt system som er bevisst konstruert for å løse spesielle oppgaver og realisere bestemte mål (Jacobsen & Thorsvik).' },
          { t: 'p', tekst: 'Definisjonen har fire bærende elementer. <em>Sosialt system</em> betyr at organisasjonen består av mennesker som samhandler; den er ikke bygninger eller maskiner. <em>Bevisst konstruert</em> betyr at den er planlagt og designet, i motsetning til spontane sosiale grupperinger som en vennegjeng. <em>Løse oppgaver</em> peker på at det finnes arbeid som skal utføres, og <em>realisere mål</em> peker på at aktiviteten er rettet mot noe utenfor seg selv.' },
          { t: 'p', tekst: 'Andre klassiske definisjoner legger vekt på litt ulike ting. Etzioni framhever at organisasjoner er sosiale enheter konstruert for å nå spesifikke mål. Scott skiller mellom organisasjoner som rasjonelle, naturlige og åpne systemer. Weick vender oppmerksomheten fra organisasjon som ting til <em>organisering</em> som prosess: pågående atferd som knyttes sammen og gir mening i ettertid.' },
          { t: 'liste', tittel: 'Fellestrekk ved organisasjoner', punkter: [
            'Et sett mål som gir retning for aktiviteten',
            'Arbeidsdeling og spesialisering mellom deltakerne',
            'En struktur som koordinerer og styrer atferd',
            'En grense mot omgivelsene som avgjør hvem som er innenfor og utenfor',
            'Varighet over tid, uavhengig av utskifting av enkeltmedlemmer'
          ]}
        ]
      },
      {
        tittel: 'Formell og uformell organisasjon',
        blokker: [
          { t: 'def', term: 'Formell organisasjon', tekst: 'De bevisst utformede og nedskrevne trekkene ved organisasjonen: mål, strategi, struktur, stillingsbeskrivelser, rutiner og prosedyrer.' },
          { t: 'def', term: 'Uformell organisasjon', tekst: 'Trekk som vokser fram av seg selv gjennom sosial samhandling: organisasjonskultur, normer, verdier, maktforhold og uformelle nettverk.' },
          { t: 'p', tekst: 'Det formelle og det uformelle virker sammen og påvirker hverandre. En formell omorganisering endrer hvem som møtes daglig og dermed hvilke uformelle relasjoner som oppstår. Motsatt kan sterke uformelle normer undergrave formelle rutiner, for eksempel når en arbeidsgruppe utvikler en felles norm om hva som er «passe» produksjonstakt.' },
          { t: 'boks', tittel: 'Hawthorne-studiene (1924–1932)', tekst: 'Studiene ved Western Electric i Chicago skulle måle hvordan lysforhold og pauser påvirket produktiviteten. Resultatene viste at de sosiale forholdene i arbeidsgruppen – oppmerksomhet, gruppenormer og tilhørighet – hadde større effekt enn de fysiske betingelsene. Funnet grunnla human relations-bevegelsen og satte den uformelle organisasjonen på dagsordenen.' }
        ]
      },
      {
        tittel: 'Organisasjonen som åpent system',
        blokker: [
          { t: 'p', tekst: 'Et åpent systemperspektiv beskriver organisasjonen som avhengig av utveksling med omgivelsene. Organisasjonen henter <strong>input</strong> (arbeidskraft, kapital, råvarer, informasjon, legitimitet), gjennomfører en <strong>omformingsprosess</strong> (produksjon, saksbehandling, tjenesteyting) og leverer <strong>output</strong> (varer, tjenester, vedtak) tilbake til omgivelsene. <strong>Tilbakemelding</strong> fra omgivelsene styrer neste runde.' },
          { t: 'liste', tittel: 'Sentrale systembegreper', punkter: [
            '<strong>Entropi:</strong> Alle systemer har en tendens til forfall dersom de ikke tilføres energi utenfra. Negativ entropi er organisasjonens evne til å motvirke dette.',
            '<strong>Ekvifinalitet:</strong> Samme sluttresultat kan nås gjennom flere ulike veier. Det finnes ingen «one best way».',
            '<strong>Krav om variasjon (requisite variety):</strong> Organisasjonens indre kompleksitet må matche kompleksiteten i omgivelsene.',
            '<strong>Løse koblinger:</strong> Deler av systemet kan påvirke hverandre uten å være tett bundet sammen, noe som gir fleksibilitet, men også svak styring.'
          ]},
          { t: 'p', tekst: 'Jacobsen og Thorsvik framstiller organisasjonen som et samspill mellom fire indre forhold – <em>mål og strategi</em>, <em>struktur</em>, <em>kultur</em> og <em>maktforhold</em> – som virker gjennom <em>organisasjonsatferd og prosesser</em> (motivasjon, kommunikasjon, beslutninger, læring, endring, ledelse) og gir <em>resultater</em>, alt innenfor rammen av <em>omgivelsene</em>. Denne modellen er strukturen for resten av kurset.' }
        ]
      },
      {
        tittel: 'Fagets historiske hovedretninger',
        blokker: [
          { t: 'tabell', kolonner: ['Retning', 'Hovednavn', 'Menneskesyn', 'Kjerneidé'], rader: [
            ['Scientific management (ca. 1911)', 'F.W. Taylor', 'Økonomisk rasjonell', 'Arbeid kan analyseres vitenskapelig; finn «the one best way», skill planlegging fra utførelse, betal etter prestasjon'],
            ['Byråkratiteori (1922)', 'Max Weber', 'Regelstyrt embetsmann', 'Legal-rasjonell autoritet, hierarki, regler og upersonlighet gir teknisk overlegen effektivitet'],
            ['Administrasjonsteori (1916/1937)', 'Henri Fayol, Gulick & Urwick', 'Rasjonell leder', 'Generelle prinsipper for ledelse og organisering (POSDCORB, enhetlig kommando, kontrollspenn)'],
            ['Human relations (1930-årene)', 'Elton Mayo, Follett', 'Sosialt menneske', 'Sosiale behov, gruppetilhørighet og anerkjennelse driver ytelse'],
            ['Beslutningsteori (1947–)', 'Simon, March, Cyert', 'Begrenset rasjonell', 'Mennesket har begrenset kapasitet; organisasjoner er beslutningssystemer'],
            ['Betingelsesteori (1960-årene)', 'Burns & Stalker, Lawrence & Lorsch, Woodward', 'Situasjonsbestemt', 'Det finnes ingen beste organisasjonsform; effektiv struktur avhenger av teknologi, størrelse og omgivelser'],
            ['Institusjonell teori (1977–)', 'Meyer & Rowan, DiMaggio & Powell, Scott', 'Meningssøkende', 'Organisasjoner tilpasser seg forventninger i omgivelsene for å oppnå legitimitet, ikke bare effektivitet']
          ]},
          { t: 'p', tekst: 'Utviklingslinjen går fra å søke universelle prinsipper (klassikerne), via situasjonsavhengighet (betingelsesteori), til å se organisasjoner som meningsbærende og legitimitetssøkende (institusjonell teori og kulturperspektivet).' }
        ]
      },
      {
        tittel: 'Perspektiver som forståelsesrammer',
        blokker: [
          { t: 'p', tekst: 'Et perspektiv er en systematisk måte å rette oppmerksomheten på: det framhever noen trekk og skygger for andre. Bolman og Deal skiller mellom fire fortolkningsrammer, som er nyttige som diagnoseverktøy når noe går galt i en organisasjon.' },
          { t: 'tabell', kolonner: ['Ramme', 'Organisasjonen ses som', 'Sentralt problem', 'Ledelsens oppgave'], rader: [
            ['Strukturell', 'En maskin med roller og regler', 'Uklar struktur, dårlig samsvar mellom oppgave og design', 'Analysere og redesigne'],
            ['Human resource', 'En familie av mennesker med behov', 'Dårlig match mellom person og organisasjon', 'Støtte, myndiggjøre, utvikle'],
            ['Politisk', 'En arena med knappe ressurser og interessekonflikt', 'Makt- og ressurskamp', 'Forhandle, bygge koalisjoner'],
            ['Symbolsk', 'Et teater av mening, ritualer og myter', 'Tap av mening og tro', 'Fortolke, fortelle, iscenesette']
          ]},
          { t: 'p', tekst: 'Morgan gir et beslektet bidrag med organisasjonsmetaforer: organisasjonen som maskin, organisme, hjerne, kultur, politisk system, psykisk fengsel, flyt og forandring, og herredømmeinstrument. Poenget er at enhver metafor både opplyser og forblinder.' }
        ]
      }
    ]
  },

  {
    id: 'mal',
    nr: 2,
    tittel: 'Mål, strategi og effektivitet',
    ingress: 'Målhierarkiet, offisielle mot operative mål, strategiske hovedretninger og hvordan effektivitet måles.',
    laeringsmaal: [
      'Skille mellom visjon, hovedmål, delmål og resultatkrav',
      'Forklare funksjonene mål har i en organisasjon, og deres dysfunksjoner',
      'Gjøre rede for generiske strategier og skillet mellom strategi som posisjon og som ressurs',
      'Drøfte ulike effektivitetsmodeller og problemet med å måle måloppnåelse'
    ],
    seksjoner: [
      {
        tittel: 'Målhierarkiet',
        blokker: [
          { t: 'def', term: 'Mål', tekst: 'En beskrivelse av en ønsket framtidig tilstand. Målet sier hva organisasjonen vil oppnå, ikke hvordan.' },
          { t: 'liste', tittel: 'Nivåene i målhierarkiet', punkter: [
            '<strong>Visjon:</strong> et bilde av en ønsket framtid som organisasjonen aldri helt når. Fungerer motiverende og retningsgivende.',
            '<strong>Forretningsidé / samfunnsoppdrag:</strong> hva organisasjonen skal drive med, for hvem, og med hvilket fortrinn.',
            '<strong>Hovedmål:</strong> overordnede mål for organisasjonen som helhet, ofte langsiktige.',
            '<strong>Delmål:</strong> nedbrutte mål for avdelinger og enheter, middel for å nå hovedmålet.',
            '<strong>Resultatkrav / måltall:</strong> konkrete, målbare og tidsbestemte krav på individ- eller enhetsnivå.'
          ]},
          { t: 'p', tekst: 'Målhierarkiet bygges gjennom en <em>mål–middel-kjede</em>: det som er mål på ett nivå, er middel for nivået over. En kjent fallgruve er at kjeden brister, slik at delmål lever sitt eget liv uten kobling til hovedmålet.' },
          { t: 'def', term: 'SMART-kriteriene', tekst: 'Et mål bør være Spesifikt, Målbart, Ambisiøst (og akseptert), Realistisk og Tidsbestemt.' }
        ]
      },
      {
        tittel: 'Offisielle og operative mål',
        blokker: [
          { t: 'p', tekst: 'Perrow skiller mellom <strong>offisielle mål</strong> – det organisasjonen sier den vil oppnå i årsrapporter og strategidokumenter – og <strong>operative mål</strong>, som er det man faktisk prioriterer når ressurser fordeles. Avviket mellom dem er et sentralt analytisk grep: det avslører hva som virkelig styrer atferd.' },
          { t: 'liste', tittel: 'Funksjoner mål har', punkter: [
            'Motiverende effekt på ansatte (jf. Locke & Lathams målsettingsteori)',
            'Styrende effekt: retningslinjer for arbeidet',
            'Beslutningsgrunnlag: kriterier for å velge mellom alternativer',
            'Legitimerende effekt utad overfor eiere, kunder og myndigheter',
            'Evaluerings- og kontrollgrunnlag for å vurdere resultater'
          ]},
          { t: 'boks', tittel: 'Målforskyvning', tekst: 'Målforskyvning oppstår når middelet erstatter målet. Klassiske former: (1) overmåling der man styrer etter det som lett lar seg telle, (2) suboptimalisering der en avdeling maksimerer eget delmål på bekostning av helheten, (3) regelfiksering der etterlevelse av prosedyren blir viktigere enn resultatet, og (4) målutskiftning der organisasjonen overlever seg selv etter at oppdraget er løst.' },
          { t: 'p', tekst: 'Locke og Lathams målsettingsteori sier at spesifikke og vanskelige mål gir høyere ytelse enn vage «gjør ditt beste»-mål, forutsatt at målet er akseptert, at personen har nødvendig kompetanse, og at det gis tilbakemelding om framdrift.' }
        ]
      },
      {
        tittel: 'Strategi',
        blokker: [
          { t: 'def', term: 'Strategi', tekst: 'En beskrivelse av hva organisasjonen tenker å gjøre for å realisere målene – valg av retning, posisjon og ressursbruk over tid.' },
          { t: 'p', tekst: 'Mintzberg skiller mellom <em>tilsiktet</em> strategi (det som planlegges), <em>framvoksende</em> strategi (mønstre som oppstår underveis) og <em>realisert</em> strategi (det som faktisk skjedde). Poenget er at strategi like ofte er et mønster i handlinger som en plan.' },
          { t: 'tabell', kolonner: ['Perspektiv', 'Sentralt spørsmål', 'Hovedbidrag'], rader: [
            ['Strategi som posisjon (Porter)', 'Hvor i markedet skal vi stå?', 'Femkraftsmodellen: rivalisering, nyetableringer, substitutter, kunders og leverandørers forhandlingsmakt. Generiske strategier: kostnadsleder, differensiering, fokusering.'],
            ['Strategi som ressurs (Barney)', 'Hva har vi som andre ikke kan kopiere?', 'VRIO: ressurser gir varig fortrinn når de er Verdifulle, Sjeldne, Vanskelige å imitere og Organisatorisk utnyttet.'],
            ['Dynamiske kapabiliteter (Teece)', 'Hvordan fornyer vi ressursbasen?', 'Evnen til å sanse, gripe og omforme ressurser i skiftende omgivelser.'],
            ['Blue Ocean (Kim & Mauborgne)', 'Kan vi skape et nytt marked?', 'Verdiinnovasjon: øk og skap verdi for kunden samtidig som kostnadene reduseres.']
          ]},
          { t: 'p', tekst: 'SWOT-analysen kobler intern analyse (styrker og svakheter) til ekstern analyse (muligheter og trusler), og er koblingspunktet mellom ressursperspektivet og posisjonsperspektivet. Miles og Snows typologi beskriver fire strategiske adferdsmønstre: <em>prospector</em> (oppdager), <em>defender</em> (forsvarer), <em>analyzer</em> (analytiker) og <em>reactor</em> (etearnøler).' }
        ]
      },
      {
        tittel: 'Effektivitet og måling',
        blokker: [
          { t: 'def', term: 'Effektivitet', tekst: 'Graden av måloppnåelse sett i forhold til ressursbruken. Skilles fra produktivitet, som er forholdet mellom output og input uavhengig av mål.' },
          { t: 'tabell', kolonner: ['Modell', 'Effektivitet betyr', 'Svakhet'], rader: [
            ['Målmodellen', 'Grad av måloppnåelse', 'Forutsetter klare, stabile og målbare mål'],
            ['Systemressursmodellen', 'Evne til å skaffe kritiske ressurser fra omgivelsene', 'Sier lite om hva ressursene brukes til'],
            ['Prosessmodellen', 'Sunne interne prosesser: flyt, samarbeid, lav friksjon', 'Kan bli navlebeskuende'],
            ['Interessentmodellen', 'Evne til å tilfredsstille sentrale interessenter', 'Interessentkrav er ofte motstridende'],
            ['Konkurrerende verdier (Quinn & Rohrbaugh)', 'Balanse mellom fire verdisett i spenningen fleksibilitet–kontroll og intern–ekstern', 'Krever skjønn i vektingen']
          ]},
          { t: 'p', tekst: 'Balansert målstyring (Kaplan & Norton) er et forsøk på å motvirke ensidig finansiell måling ved å måle fire perspektiver samtidig: finansielt, kunde, interne prosesser og læring og vekst. Kritikken mot målstyring i offentlig sektor handler om at komplekse samfunnsoppdrag reduseres til tellekanter, og at profesjonelt skjønn fortrenges.' }
        ]
      }
    ]
  },

  {
    id: 'struktur',
    nr: 3,
    tittel: 'Organisasjonsstruktur',
    ingress: 'Arbeidsdeling, koordinering, strukturelle hovedformer og Mintzbergs konfigurasjoner.',
    laeringsmaal: [
      'Forklare de to grunnproblemene struktur løser: arbeidsdeling og koordinering',
      'Skille mellom funksjonsbasert, markedsbasert og matrisebasert gruppering',
      'Gjøre rede for Mintzbergs fem organisasjonsdeler og fem konfigurasjoner',
      'Drøfte hvordan teknologi, størrelse og omgivelser påvirker strukturvalg'
    ],
    seksjoner: [
      {
        tittel: 'Hva struktur er og gjør',
        blokker: [
          { t: 'def', term: 'Organisasjonsstruktur', tekst: 'De formelle rammene som fordeler arbeidsoppgaver, myndighet og ansvar, og som koordinerer arbeidet mot organisasjonens mål. Mintzberg: summen av måtene arbeidet deles i oppgaver og deretter koordineres.' },
          { t: 'liste', tittel: 'Strukturens tre virkninger på atferd', punkter: [
            '<strong>Fokus:</strong> retter oppmerksomheten mot bestemte oppgaver og bort fra andre',
            '<strong>Koordinering:</strong> gjør atferd forutsigbar og gjør samhandling mulig',
            '<strong>Stabilitet:</strong> gir kontinuitet uavhengig av hvem som fyller stillingene'
          ]},
          { t: 'p', tekst: 'Strukturen begrenser og muliggjør samtidig. Den reduserer kompleksitet ved å avgrense hva den enkelte skal forholde seg til, men skaper samtidig grenser som informasjon og samarbeid må krysse.' }
        ]
      },
      {
        tittel: 'Arbeidsdeling og spesialisering',
        blokker: [
          { t: 'p', tekst: 'Arbeidsdeling skjer langs to akser. <strong>Horisontal spesialisering</strong> deler arbeidet i ulike oppgaver på samme nivå. <strong>Vertikal spesialisering</strong> deler arbeidet mellom nivåer – hvem som planlegger og bestemmer, og hvem som utfører.' },
          { t: 'tabell', kolonner: ['Grupperingsform', 'Prinsipp', 'Styrker', 'Svakheter'], rader: [
            ['Funksjonsbasert', 'Gruppering etter lik funksjon eller fagkompetanse (økonomi, produksjon, salg)', 'Stordriftsfordeler, dype fagmiljøer, tydelig karrierevei', 'Silotenkning, dårlig helhetskoordinering, treg respons'],
            ['Markedsbasert (divisjon)', 'Gruppering etter produkt, kundegruppe eller geografi', 'Kundehårhet, klart resultatansvar, rask omstilling', 'Dobbeltarbeid, tap av stordrift, svakere fagmiljøer'],
            ['Matrise', 'To dimensjoner samtidig, f.eks. funksjon × prosjekt', 'Kombinerer fagdybde og resultatfokus, fleksibel ressursbruk', 'Brudd på enhetlig kommando, rollekonflikt, høy møtebelastning'],
            ['Prosessbasert', 'Gruppering langs verdikjeden/kundereisen', 'Kort flyt, få overleveringer', 'Krever bred kompetanse, sårbar for fravær'],
            ['Nettverk / virtuell', 'Kjernefunksjoner beholdes, resten settes ut', 'Svært fleksibel, lave faste kostnader', 'Kontrolltap, avhengighet av partnere']
          ]},
          { t: 'boks', tittel: 'Kontrollspenn', tekst: 'Kontrollspenn er antall underordnede en leder har direkte ansvar for. Smalt spenn gir høy og bratt struktur med tett oppfølging og mange nivåer. Bredt spenn gir flat struktur, mer selvstendighet og raskere kommunikasjonsvei, men mindre oppfølging. Spennet kan økes når oppgavene er standardiserte, medarbeiderne kompetente og arbeidet lite gjensidig avhengig.' }
        ]
      },
      {
        tittel: 'Koordineringsmekanismer',
        blokker: [
          { t: 'p', tekst: 'Mintzberg identifiserer seks grunnleggende koordineringsmekanismer, som avløser hverandre etter hvert som arbeidet blir mer komplekst.' },
          { t: 'liste', punkter: [
            '<strong>Gjensidig tilpasning:</strong> uformell, direkte kommunikasjon mellom dem som utfører arbeidet',
            '<strong>Direkte tilsyn:</strong> en leder instruerer og kontrollerer',
            '<strong>Standardisering av arbeidsprosesser:</strong> rutiner og prosedyrer bestemmer hvordan arbeidet gjøres',
            '<strong>Standardisering av resultater:</strong> det spesifiseres hva som skal komme ut, ikke hvordan',
            '<strong>Standardisering av kunnskap og ferdigheter:</strong> koordinering gjennom felles utdanning og profesjonsnormer',
            '<strong>Standardisering av normer:</strong> felles verdier og kultur styrer atferden'
          ]},
          { t: 'p', tekst: 'Thompson kobler koordineringsbehov til avhengighetstype: <em>samlet avhengighet</em> (enheter deler ressurser) koordineres med regler, <em>sekvensiell avhengighet</em> (A leverer til B) koordineres med planer, og <em>gjensidig avhengighet</em> (A og B leverer til hverandre løpende) krever gjensidig tilpasning.' },
          { t: 'p', tekst: 'Andre sentrale strukturvariabler er <strong>sentralisering</strong> (hvor beslutningsmyndighet ligger), <strong>formalisering</strong> (hvor mye som er nedskrevet i regler), og <strong>linje mot stab</strong>: linjen har beslutningsmyndighet i den vertikale kommandokjeden, mens staben er rådgivende og støttende uten instruksjonsrett.' }
        ]
      },
      {
        tittel: 'Mintzbergs konfigurasjoner',
        blokker: [
          { t: 'liste', tittel: 'Fem organisasjonsdeler', punkter: [
            '<strong>Operativ kjerne:</strong> de som utfører kjerneproduksjonen',
            '<strong>Mellomledelse:</strong> binder toppen til den operative kjernen',
            '<strong>Toppledelse:</strong> strategisk ledelse og ytre ansvar',
            '<strong>Teknostruktur:</strong> analytikere som standardiserer arbeid (planlegging, kvalitet, controlling)',
            '<strong>Støttestruktur:</strong> tjenester utenfor kjernestrømmen (IT, kantine, HR, juridisk)'
          ]},
          { t: 'tabell', kolonner: ['Konfigurasjon', 'Dominerende del', 'Koordinering', 'Typisk kontekst'], rader: [
            ['Enkel struktur / entreprenørorganisasjon', 'Toppledelse', 'Direkte tilsyn', 'Liten, ung organisasjon i dynamiske omgivelser'],
            ['Maskinbyråkrati', 'Teknostruktur', 'Standardisering av arbeidsprosesser', 'Stor, moden, masseproduksjon i stabile omgivelser'],
            ['Profesjonsbyråkrati', 'Operativ kjerne', 'Standardisering av kunnskap', 'Sykehus, universitet, advokatfirma'],
            ['Divisjonalisert form', 'Mellomledelse', 'Standardisering av resultater', 'Store konsern med flere markeder'],
            ['Adhokrati / innovativ organisasjon', 'Støttestruktur og operativ kjerne', 'Gjensidig tilpasning', 'Prosjektbasert innovasjon, komplekse og dynamiske omgivelser']
          ]},
          { t: 'p', tekst: 'Mintzberg føyer senere til <em>det misjonære</em> (koordinering gjennom normer) og <em>det politiske</em> (ingen dominerende koordineringsmekanisme; makt styrer).' }
        ]
      },
      {
        tittel: 'Betingelsesteori: hva bestemmer strukturen?',
        blokker: [
          { t: 'p', tekst: 'Betingelsesteori (contingency theory) avviser at det finnes én beste organisasjonsform. Effektiv struktur avhenger av situasjonen.' },
          { t: 'tabell', kolonner: ['Studie', 'Betingelse', 'Funn'], rader: [
            ['Burns & Stalker (1961)', 'Endringstakt i omgivelsene', 'Stabile omgivelser favoriserer mekanistisk struktur; dynamiske omgivelser favoriserer organisk struktur'],
            ['Woodward (1965)', 'Produksjonsteknologi', 'Enkeltstykke-, masse- og prosessproduksjon krever ulik struktur; masseproduksjon passer best med byråkrati'],
            ['Lawrence & Lorsch (1967)', 'Omgivelsenes usikkerhet', 'Jo mer differensiering mellom avdelinger, desto sterkere integrasjonsmekanismer trengs'],
            ['Perrow (1967)', 'Oppgaveteknologi', 'Rutinepreg og analyserbarhet bestemmer graden av formalisering'],
            ['Aston-gruppen (1960-årene)', 'Størrelse', 'Økende størrelse gir økt formalisering, spesialisering og desentralisering'],
            ['Chandler (1962)', 'Strategi', '«Structure follows strategy»: diversifisering framtvinger divisjonalisering']
          ]},
          { t: 'tabell', kolonner: ['Kjennetegn', 'Mekanistisk', 'Organisk'], rader: [
            ['Spesialisering', 'Høy, snevre roller', 'Lav, brede roller'],
            ['Formalisering', 'Mange regler', 'Få regler'],
            ['Beslutninger', 'Sentralisert', 'Desentralisert'],
            ['Kommunikasjon', 'Vertikal, instruksjoner', 'Horisontal, rådgivning'],
            ['Lojalitet', 'Til overordnet og regelverk', 'Til oppgaven og fagfellesskapet']
          ]}
        ]
      }
    ]
  },

  {
    id: 'kultur',
    nr: 4,
    tittel: 'Organisasjonskultur',
    ingress: 'Scheins kulturnivåer, kulturens funksjoner og dysfunksjoner, kulturtypologier og subkulturer.',
    laeringsmaal: [
      'Definere organisasjonskultur og redegjøre for Scheins tre nivåer',
      'Forklare hvordan kultur oppstår, læres og opprettholdes',
      'Drøfte kulturens funksjoner og negative sider',
      'Bruke kulturtypologier (Handy, Cameron & Quinn, Hofstede) analytisk'
    ],
    seksjoner: [
      {
        tittel: 'Definisjon og nivåer',
        blokker: [
          { t: 'def', term: 'Organisasjonskultur', tekst: 'Et mønster av grunnleggende antakelser som en gruppe har utviklet mens den lærte å mestre problemer med ytre tilpasning og indre integrasjon, som har fungert godt nok til å bli betraktet som gyldig, og som derfor læres bort til nye medlemmer som den riktige måten å oppfatte, tenke og føle på (Schein).' },
          { t: 'liste', tittel: 'Scheins tre kulturnivåer', punkter: [
            '<strong>Artefakter:</strong> det synlige og hørbare – lokaler, kleskoder, språk, historier, ritualer, symboler, seremonier. Lett å observere, vanskelig å tolke.',
            '<strong>Uttrykte verdier og normer:</strong> det organisasjonen sier den står for – verdidokumenter, strategier, etiske retningslinjer. Kan avvike fra praksis.',
            '<strong>Grunnleggende antakelser:</strong> ubevisste, tatt-for-gitte oppfatninger om virkeligheten, mennesket og tiden. Kulturens kjerne, svært motstandsdyktig mot endring.'
          ]},
          { t: 'p', tekst: 'Argyris og Schöns skille mellom <em>uttrykt teori</em> (espoused theory) og <em>bruksteori</em> (theory-in-use) fanger opp gapet mellom nivå 2 og nivå 3: det man sier man gjør, og det man faktisk gjør.' }
        ]
      },
      {
        tittel: 'Hvordan kultur oppstår og læres',
        blokker: [
          { t: 'p', tekst: 'Kultur oppstår gjennom felles erfaringer med å løse to typer problemer: <em>ytre tilpasning</em> (hvordan skal vi overleve i omgivelsene?) og <em>indre integrasjon</em> (hvordan skal vi fungere sammen?). Løsninger som virker, gjentas, blir vaner, og til slutt tatt for gitt.' },
          { t: 'liste', tittel: 'Kilder til kulturdannelse', punkter: [
            'Grunnleggerens verdier og tidlige avgjørende hendelser',
            'Bransje- og profesjonsnormer, utdanningsbakgrunn',
            'Nasjonal kultur og samfunnsmessige verdier',
            'Teknologi og oppgavens karakter',
            'Belønningssystemer: det som måles og premieres, blir kultur'
          ]},
          { t: 'liste', tittel: 'Mekanismer som overfører kultur', punkter: [
            'Sosialisering av nyansatte (organizational socialization): forberedende, møte, tilpasning',
            'Historier, myter og heltefortellinger om organisasjonens fortid',
            'Ritualer og seremonier som markerer overganger og bekrefter verdier',
            'Rollemodeller: hva ledere systematisk vier oppmerksomhet til, måler og reagerer på',
            'Rekruttering og utvelgelse etter kulturell passform',
            'Fysiske omgivelser og symboler'
          ]}
        ]
      },
      {
        tittel: 'Funksjoner og dysfunksjoner',
        blokker: [
          { t: 'liste', tittel: 'Positive funksjoner', punkter: [
            'Skaper tilhørighet, identitet og fellesskap',
            'Reduserer usikkerhet og gir mening',
            'Gir sosial støtte og reduserer angst i uklare situasjoner',
            'Virker som styringsmekanisme (normativ kontroll) der regler ikke rekker til',
            'Bygger tillit og reduserer transaksjons- og kontrollkostnader',
            'Motiverer gjennom felles verdier og opplevd hensikt'
          ]},
          { t: 'liste', tittel: 'Negative sider', punkter: [
            'Sterk kultur kan gi <em>gruppetenkning</em> og undertrykke kritikk',
            'Motstand mot endring: det tatt-for-gitte utfordres ikke',
            'Ekskludering av dem som er annerledes; svekket mangfold',
            'Subkulturkonflikt mellom profesjoner, avdelinger eller nivåer',
            'Normativ kontroll kan oppleves som manipulerende og grensesprengende'
          ]},
          { t: 'p', tekst: 'Martin skiller mellom tre kulturperspektiver: <strong>integrasjonsperspektivet</strong> (kulturen er felles og konsistent), <strong>differensieringsperspektivet</strong> (kulturen består av subkulturer med indre konsistens, men innbyrdes konflikt) og <strong>fragmenteringsperspektivet</strong> (kulturen er flertydig og i stadig endring; konsensus er situasjonsbestemt).' }
        ]
      },
      {
        tittel: 'Kulturtypologier',
        blokker: [
          { t: 'tabell', kolonner: ['Typologi', 'Kategorier', 'Poeng'], rader: [
            ['Handy / Harrison', 'Maktkultur, rollekultur, oppgavekultur, personkultur', 'Kultur speiler hvordan makt og oppgaver er organisert'],
            ['Cameron & Quinn (Competing Values Framework)', 'Klan, adhokrati, hierarki, marked', 'To akser: fleksibilitet–kontroll og internt–eksternt fokus'],
            ['Deal & Kennedy', 'Tøff-og-maskulin, hardt-arbeid/mye-lek, satse-selskapet, prosesskultur', 'Kultur formes av risikonivå og hastighet på tilbakemelding'],
            ['Schneider', 'Kontroll, samarbeid, kompetanse, dyrking', 'Kultur som dominerende beslutningslogikk']
          ]},
          { t: 'p', tekst: 'Hofstedes dimensjoner brukes til å sammenligne <em>nasjonale</em> kulturer som organisasjonen opererer i: maktdistanse, individualisme–kollektivisme, maskulinitet–femininitet, usikkerhetsunngåelse, langsiktig–kortsiktig orientering og overbærenhet–tilbakeholdenhet. Norge kjennetegnes av lav maktdistanse, høy individualisme, sterkt feminine verdier og moderat usikkerhetsunngåelse – noe som forklarer flate strukturer, uformell omgangstone og forhandlingsbasert lederstil.' },
          { t: 'boks', tittel: 'Den norske arbeidslivsmodellen', tekst: 'Samarbeidsforsøkene på 1960-tallet (Thorsrud og Emery) og hovedavtalen mellom partene i arbeidslivet har gitt norske organisasjoner særtrekk: høy grad av medbestemmelse, korte maktavstander, selvstyrte grupper, og et psykologisk krav om at arbeidet skal gi læring, medbestemmelse og mening. Dette gjør at internasjonale styringsmodeller ofte må oversettes for å fungere her.' }
        ]
      }
    ]
  },

  {
    id: 'omgivelser',
    nr: 5,
    tittel: 'Organisasjonens omgivelser',
    ingress: 'Tekniske og institusjonelle omgivelser, usikkerhet, ressursavhengighet og nyinstitusjonell teori.',
    laeringsmaal: [
      'Skille mellom tekniske og institusjonelle omgivelser',
      'Forklare hvordan usikkerhet og avhengighet påvirker organisasjonens handlingsvalg',
      'Gjøre rede for ressursavhengighetsteori, populasjonsøkologi og nyinstitusjonell teori',
      'Bruke begrepene isomorfi, legitimitet og dekobling i analyse'
    ],
    seksjoner: [
      {
        tittel: 'Å avgrense omgivelsene',
        blokker: [
          { t: 'def', term: 'Omgivelser', tekst: 'Alle forhold utenfor organisasjonen som kan ha en potensiell effekt på den.' },
          { t: 'liste', tittel: 'Nivåer', punkter: [
            '<strong>Domene / oppgaveomgivelser:</strong> de aktørene organisasjonen samhandler direkte med – kunder, leverandører, konkurrenter, ansatte, myndigheter, eiere',
            '<strong>Nasjonale og internasjonale omgivelser:</strong> generelle forhold som teknologi, økonomi, demografi, politikk og kultur (PESTEL)',
            '<strong>Institusjonelle omgivelser:</strong> normer, verdier og forventninger til hva som er en riktig og legitim organisasjon'
          ]},
          { t: 'p', tekst: 'Skillet mellom <strong>tekniske omgivelser</strong> (der organisasjonen belønnes for effektiv produksjon) og <strong>institusjonelle omgivelser</strong> (der den belønnes for å framstå som legitim) er sentralt. De fleste organisasjoner må håndtere begge, men vektingen varierer: en fabrikk er mer teknisk styrt, en skole eller et departement mer institusjonelt.' }
        ]
      },
      {
        tittel: 'Usikkerhet og avhengighet',
        blokker: [
          { t: 'p', tekst: 'Usikkerhet i omgivelsene skapes av to forhold: <strong>kompleksitet</strong> (hvor mange og hvor ulike forhold organisasjonen må ta hensyn til) og <strong>dynamikk/stabilitet</strong> (hvor raskt og forutsigbart de endrer seg). Duncan setter dem sammen i en firefeltsmatrise der kombinasjonen kompleks + dynamisk gir høyest usikkerhet.' },
          { t: 'liste', tittel: 'Strategier for å håndtere usikkerhet og avhengighet', punkter: [
            '<strong>Buffering:</strong> skjerme kjerneaktiviteten med lagre, ventelister og reservekapasitet',
            '<strong>Grenseregulering:</strong> egne roller som overvåker og tolker omgivelsene (innkjøp, salg, kommunikasjon, lobby)',
            '<strong>Planlegging og prognoser:</strong> forsøke å forutsi utviklingen',
            '<strong>Kontraktsbinding:</strong> langsiktige avtaler som låser leverandører og kunder',
            '<strong>Kooptering:</strong> hente kritiske aktører inn i styret eller råd',
            '<strong>Allianser, joint ventures og fusjoner:</strong> internalisere avhengigheten',
            '<strong>Vertikal integrasjon:</strong> kjøpe opp ledd i verdikjeden',
            '<strong>Påvirkning av omgivelsene:</strong> lobbyvirksomhet, bransjeorganisasjoner, omdømmebygging'
          ]}
        ]
      },
      {
        tittel: 'Teoretiske perspektiver på omgivelsene',
        blokker: [
          { t: 'tabell', kolonner: ['Teori', 'Opphav', 'Kjerneidé'], rader: [
            ['Ressursavhengighetsteori', 'Pfeffer & Salancik (1978)', 'Organisasjoner er avhengige av kritiske ressurser andre kontrollerer. Målet er å redusere egen avhengighet og øke andres avhengighet av seg. Makt følger ressurskontroll.'],
            ['Populasjonsøkologi', 'Hannan & Freeman (1977)', 'Organisasjoner har strukturell treghet; det er omgivelsene som velger ut hvilke organisasjonsformer som overlever. Variasjon–seleksjon–retensjon. Nyhetens byrde gjør unge organisasjoner mest utsatt.'],
            ['Transaksjonskostnadsteori', 'Coase (1937), Williamson (1975)', 'Valget mellom marked og hierarki avgjøres av transaksjonskostnader. Høy spesifisitet i investeringer, usikkerhet og fare for opportunisme taler for å organisere internt.'],
            ['Nyinstitusjonell teori', 'Meyer & Rowan (1977), DiMaggio & Powell (1983)', 'Organisasjoner tilpasser seg rasjonaliserte myter om hva som er moderne og riktig, for å oppnå legitimitet. Resultatet er økende likhet – isomorfi.'],
            ['Nyinstitusjonell teori, skandinavisk gren', 'Czarniawska, Sevón, Røvik', 'Ideer reiser som «oppskrifter» og blir <em>oversatt</em> og redigert når de tas i bruk lokalt, ikke bare kopiert.']
          ]},
          { t: 'liste', tittel: 'DiMaggio & Powells tre former for isomorfi', punkter: [
            '<strong>Tvingende isomorfi:</strong> press fra lover, forskrifter og mektige aktører organisasjonen er avhengig av',
            '<strong>Mimetisk isomorfi:</strong> etterligning av vellykkede organisasjoner når målene er uklare og usikkerheten stor',
            '<strong>Normativ isomorfi:</strong> profesjoner og utdanningsinstitusjoner sprer felles standarder for hva som er riktig praksis'
          ]},
          { t: 'boks', tittel: 'Dekobling', tekst: 'Meyer og Rowan påpeker at organisasjoner kan innføre en legitimerende struktur på papiret uten at den styrer den faktiske virksomheten. Fasaden er koblet fra driften – et strategisk svar når kravene i institusjonelle omgivelser kolliderer med effektiv drift. Brunsson kaller det organisert hykleri når prat, beslutning og handling systematisk peker i ulike retninger for å tilfredsstille motstridende krav.' },
          { t: 'p', tekst: 'Scotts tre institusjonelle pilarer beskriver hva som holder institusjoner på plass: den <em>regulative</em> (regler, sanksjoner, tvang), den <em>normative</em> (forpliktelse, hva som er passende) og den <em>kulturelt-kognitive</em> (tatt-for-gitte forståelser). Marchs logikk om «det passendes logikk» hører til den normative pilaren: aktører spør hva en person som meg gjør i en situasjon som dette, ikke hva som lønner seg.' }
        ]
      }
    ]
  },

  {
    id: 'motivasjon',
    nr: 6,
    tittel: 'Motivasjon og ytelse',
    ingress: 'Behovs-, kognitive, sosiale og jobbkarakteristika-teorier, og hvordan belønning virker.',
    laeringsmaal: [
      'Skille mellom indre og ytre motivasjon',
      'Gjøre rede for behovsteoriene og deres begrensninger',
      'Forklare forventningsteori, målsettingsteori og rettferdighetsteori',
      'Bruke jobbkarakteristikamodellen til å vurdere jobbdesign'
    ],
    seksjoner: [
      {
        tittel: 'Grunnbegreper',
        blokker: [
          { t: 'def', term: 'Motivasjon', tekst: 'De biologiske, psykologiske og sosiale faktorene som aktiverer, gir retning til og opprettholder atferd i ulik grad av intensitet for å oppnå et mål.' },
          { t: 'def', term: 'Indre motivasjon', tekst: 'Motivasjon som ligger i aktiviteten selv – interesse, glede, mestring og mening. Belønningen er selve arbeidet.' },
          { t: 'def', term: 'Ytre motivasjon', tekst: 'Motivasjon som kommer fra konsekvenser utenfor selve aktiviteten – lønn, bonus, forfremmelse, ros eller frykt for straff.' },
          { t: 'p', tekst: 'Ytelse er ikke motivasjon alene. En vanlig formel er <strong>Ytelse = evne × motivasjon × mulighet</strong>: kompetanse, vilje og betingelsene på arbeidsplassen må alle være til stede. Svikter én faktor, hjelper det lite å skru på de andre.' }
        ]
      },
      {
        tittel: 'Behovsteorier',
        blokker: [
          { t: 'tabell', kolonner: ['Teori', 'Opphav', 'Innhold', 'Kritikk'], rader: [
            ['Behovshierarkiet', 'Maslow (1943)', 'Fem behovsnivåer: fysiologiske, trygghet, sosiale, anerkjennelse, selvrealisering. Lavere behov må tilfredsstilles før høyere aktiveres.', 'Svak empirisk støtte for den strenge rekkefølgen; kulturelt betinget'],
            ['ERG-teorien', 'Alderfer (1972)', 'Tre behov: Existence, Relatedness, Growth. Flere behov kan være aktive samtidig, og frustrasjon på ett nivå gir regresjon til lavere.', 'Mer fleksibel, men vanskelig å teste'],
            ['Tofaktorteorien', 'Herzberg (1959)', 'Hygienefaktorer (lønn, arbeidsforhold, ledelse, politikk) fjerner mistrivsel, men skaper ikke trivsel. Motivasjonsfaktorer (prestasjon, anerkjennelse, ansvar, vekst, selve arbeidet) skaper trivsel.', 'Metodekritikk: resultatet kan skyldes at folk tilskriver suksess seg selv og problemer omgivelsene'],
            ['Behov for prestasjon, makt og tilhørighet', 'McClelland (1961)', 'Tre lærte behov som varierer mellom individer og predikerer ulik atferd i arbeidslivet.', 'Måles med projektive tester som er metodisk omstridte'],
            ['Selvbestemmelsesteorien', 'Deci & Ryan (1985)', 'Tre psykologiske grunnbehov: autonomi, kompetanse og tilhørighet. Blir de dekket, oppstår indre motivasjon og bedre trivsel og prestasjon.', 'Sterk empirisk støtte; sentral i moderne motivasjonsforskning']
          ]},
          { t: 'boks', tittel: 'Fortrengningseffekten', tekst: 'Deci og Ryan viste at ytre belønning kan fortrenge indre motivasjon (crowding out). Når en oppgave man gjør av interesse blir betalt, kan opplevelsen av autonomi svekkes, og aktiviteten oppleves som styrt utenfra. Effekten er sterkest for kontrollerende belønninger knyttet til kvantitet, og svakest når belønningen oppleves som informerende anerkjennelse av kompetanse.' }
        ]
      },
      {
        tittel: 'Kognitive og sosiale teorier',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Forventningsteori (Vroom, 1964):</strong> Motivasjon = Forventning × Instrumentalitet × Valens. Innsatsen må antas å gi resultat, resultatet må antas å gi belønning, og belønningen må ha verdi for personen. Er én faktor null, blir motivasjonen null.',
            '<strong>Målsettingsteori (Locke & Latham):</strong> Spesifikke og krevende mål gir høyere ytelse enn vage mål, når målet aksepteres og det gis tilbakemelding.',
            '<strong>Rettferdighetsteori (Adams, 1963):</strong> Ansatte sammenligner forholdet mellom egen innsats og belønning med andres. Opplevd ubalanse skaper spenning som utløser handling: redusert innsats, krav om mer, endret sammenligningsgrunnlag eller exit.',
            '<strong>Organisatorisk rettferdighet:</strong> distributiv (fordelingen), prosedyremessig (framgangsmåten), interpersonlig (respektfull behandling) og informasjonsmessig (åpen begrunnelse). Prosedyrerettferdighet påvirker tillit til ledelsen sterkest.',
            '<strong>Sosial læringsteori / mestringstro (Bandura):</strong> Troen på egen evne til å mestre en oppgave (self-efficacy) forutsier innsats og utholdenhet. Bygges av mestringserfaring, modellæring, verbal overtalelse og fysiologisk tilstand.',
            '<strong>Psykologisk kontrakt (Rousseau):</strong> Uskrevne, gjensidige forventninger mellom ansatt og arbeidsgiver. Brudd svekker tillit, ytelse og lojalitet mer enn brudd på den formelle kontrakten.'
          ]}
        ]
      },
      {
        tittel: 'Jobbdesign',
        blokker: [
          { t: 'p', tekst: 'Hackman og Oldhams <strong>jobbkarakteristikamodell</strong> knytter fem trekk ved jobben til tre kritiske psykologiske tilstander og videre til motivasjon, kvalitet og trivsel.' },
          { t: 'tabell', kolonner: ['Jobbtrekk', 'Beskrivelse', 'Psykologisk tilstand'], rader: [
            ['Variasjon i ferdigheter', 'Jobben krever ulike ferdigheter og talenter', 'Opplevd meningsfullhet'],
            ['Oppgaveidentitet', 'Man utfører en helhetlig, avgrenset oppgave', 'Opplevd meningsfullhet'],
            ['Oppgavebetydning', 'Arbeidet har betydning for andre mennesker', 'Opplevd meningsfullhet'],
            ['Autonomi', 'Frihet til å bestemme framgangsmåte og tempo', 'Opplevd ansvar for resultatet'],
            ['Tilbakemelding fra arbeidet', 'Jobben gir i seg selv informasjon om hvor godt man gjør det', 'Kunnskap om resultater']
          ]},
          { t: 'p', tekst: 'Effekten modereres av medarbeiderens <em>vekstbehov</em>, kunnskap og ferdigheter, og tilfredshet med rammebetingelsene. Beslektede virkemidler er jobbrotasjon, jobbutvidelse (horisontal), jobbberikelse (vertikal, mer ansvar) og <em>job crafting</em>, der medarbeideren selv omformer jobben sin.' },
          { t: 'boks', tittel: 'Krav–kontroll-modellen (Karasek)', tekst: 'Jobbstress avhenger av forholdet mellom krav og kontroll. Høye krav med lav kontroll gir belastende jobber. Høye krav med høy kontroll gir aktive, utviklende jobber. Johnson føyde til sosial støtte som tredje dimensjon: krav–kontroll–støtte.' }
        ]
      }
    ]
  },

  {
    id: 'kommunikasjon',
    nr: 7,
    tittel: 'Kommunikasjon i organisasjoner',
    ingress: 'Kommunikasjonsprosessen, kanalvalg, formelle og uformelle kanaler, og digital kommunikasjon.',
    laeringsmaal: [
      'Beskrive kommunikasjonsprosessen og hva som skaper støy',
      'Anvende teorien om kanalrikhet på valg av kanal',
      'Skille mellom vertikal, horisontal, formell og uformell kommunikasjon',
      'Forklare hvordan informasjonsteknologi endrer kommunikasjonsmønstre'
    ],
    seksjoner: [
      {
        tittel: 'Kommunikasjonsprosessen',
        blokker: [
          { t: 'def', term: 'Kommunikasjon', tekst: 'Den kontinuerlige prosessen der mennesker og grupper overfører og utveksler informasjon, og der informasjonen tolkes og gis mening.' },
          { t: 'p', tekst: 'Grunnmodellen har elementene <em>sender → koding → budskap → kanal → dekoding → mottaker → tilbakemelding</em>, med <em>støy</em> som kan forstyrre i alle ledd. Modellen stammer fra Shannon og Weavers informasjonsteori, men kritiseres for å framstille kommunikasjon som ren overføring; i organisasjoner er kommunikasjon også fortolkning og meningsskaping.' },
          { t: 'liste', tittel: 'Kilder til støy', punkter: [
            '<strong>Fysisk støy:</strong> dårlig lyd, avbrytelser, teknologisvikt',
            '<strong>Semantisk støy:</strong> fagsjargong, tvetydige ord, språkbarrierer',
            '<strong>Psykologisk støy:</strong> forutinntatthet, selektiv persepsjon, forsvarsholdning',
            '<strong>Organisatorisk støy:</strong> mange ledd, hierarkisk filtrering, informasjonsoverbelastning',
            '<strong>Kulturell støy:</strong> ulike tolkningsrammer og normer for høflighet og direkthet'
          ]},
          { t: 'p', tekst: 'To systematiske skjevheter er verdt å merke seg. <strong>Filtrering</strong> oppstår når informasjon bearbeides og forskjønnes på vei oppover i hierarkiet. <strong>MUM-effekten</strong> (keeping Mum about Undesirable Messages) beskriver at folk vegrer seg for å formidle dårlige nyheter oppover, noe som gjør at toppledelsen systematisk får et for positivt bilde.' }
        ]
      },
      {
        tittel: 'Kanalvalg og kanalrikhet',
        blokker: [
          { t: 'p', tekst: 'Daft og Lengels teori om <strong>kanalrikhet</strong> (media richness) rangerer kanaler etter fire kriterier: mulighet for umiddelbar tilbakemelding, antall signaler som overføres samtidig, språklig variasjon og personlig fokus.' },
          { t: 'tabell', kolonner: ['Kanal', 'Rikhet', 'Egner seg for'], rader: [
            ['Ansikt til ansikt', 'Svært rik', 'Tvetydige, følelsesladde og konfliktfylte budskap; forhandling; oppsigelse'],
            ['Videomøte / telefon', 'Rik', 'Drøfting, avklaring, relasjonsbygging på avstand'],
            ['Chat / direktemelding', 'Middels', 'Rask koordinering, korte avklaringer'],
            ['E-post', 'Middels til fattig', 'Dokumentasjon, avtaler, informasjon som må kunne gjenfinnes'],
            ['Rapport, intranett, oppslag', 'Fattig', 'Entydig, standardisert informasjon til mange']
          ]},
          { t: 'p', tekst: 'Hovedregelen er å matche kanalens rikhet med budskapets tvetydighet. Rik kanal til enkel beskjed sløser tid; fattig kanal til tvetydig eller sensitivt budskap skaper misforståelser og konflikt.' }
        ]
      },
      {
        tittel: 'Kommunikasjonsretninger og nettverk',
        blokker: [
          { t: 'liste', punkter: [
            '<strong>Nedadrettet:</strong> instrukser, mål, tilbakemelding, forklaring av hensikt. Mister presisjon for hvert ledd.',
            '<strong>Oppadrettet:</strong> rapportering, forslag, varsling. Hemmes av filtrering og frykt.',
            '<strong>Horisontal:</strong> koordinering mellom sideordnede enheter; helt avgjørende i matriser og prosjektorganisasjoner.',
            '<strong>Ekstern:</strong> mot kunder, media, eiere og myndigheter; kobler til omdømme og legitimitet.'
          ]},
          { t: 'p', tekst: 'Uformell kommunikasjon – «jungeltelegrafen» – er hurtig, går på tvers av hierarkiet og fyller tomrom når den formelle informasjonen svikter. Den er ofte overraskende treffsikker, men vanskelig å styre. Granovetters teori om <em>svake bånd</em> viser at nettopp de perifere kontaktene gir tilgang til ny informasjon, fordi nære kontakter stort sett vet det samme som en selv.' },
          { t: 'boks', tittel: 'Digital kommunikasjon', tekst: 'Digitale kanaler gir raskere spredning, flatere tilgang og full sporbarhet, men skaper også informasjonsoverbelastning, mindre uformell kontakt og økt risiko for misforståelser fordi ikke-verbale signaler forsvinner. Hybridarbeid forsterker behovet for bevisst kanalstrategi og for arenaer som erstatter det tilfeldige møtet i gangen.' }
        ]
      }
    ]
  },

  {
    id: 'beslutning',
    nr: 8,
    tittel: 'Beslutningsprosesser',
    ingress: 'Fra rasjonell modell til begrenset rasjonalitet, garbage can, gruppebeslutninger og skjevheter.',
    laeringsmaal: [
      'Beskrive fasene i en beslutningsprosess',
      'Forklare forskjellen på perfekt og begrenset rasjonalitet',
      'Gjøre rede for administrativ modell, inkrementalisme og garbage can-modellen',
      'Identifisere systematiske skjevheter og gruppetenkning'
    ],
    seksjoner: [
      {
        tittel: 'Beslutningen som prosess',
        blokker: [
          { t: 'def', term: 'Beslutning', tekst: 'Et valg mellom ulike alternativer, der valget innebærer en forpliktelse til handling.' },
          { t: 'p', tekst: 'Simon deler prosessen i tre faser: <em>intelligence</em> (identifisere og analysere problemet), <em>design</em> (utvikle alternativer) og <em>choice</em> (velge). I organisasjonspraksis føyes gjerne til iverksetting og evaluering.' },
          { t: 'liste', tittel: 'Beslutningstyper', punkter: [
            '<strong>Programmerte:</strong> rutinepregede, gjentakende, løses med regler og prosedyrer',
            '<strong>Ikke-programmerte:</strong> nye, komplekse og tvetydige, krever skjønn og analyse',
            'Strategiske (retning), administrative (struktur og ressurser) og operative (daglig drift)'
          ]}
        ]
      },
      {
        tittel: 'Rasjonalitetsmodellene',
        blokker: [
          { t: 'tabell', kolonner: ['Modell', 'Forutsetninger', 'Beslutningsregel'], rader: [
            ['Perfekt rasjonell (økonomisk modell)', 'Klare mål, full informasjon om alle alternativer og konsekvenser, ubegrenset kognitiv kapasitet', 'Maksimering: velg det objektivt beste alternativet'],
            ['Begrenset rasjonalitet (Simon)', 'Uklare og motstridende mål, ufullstendig informasjon, begrenset kapasitet, tidspress', 'Satisfiering: søk til du finner et alternativ som er godt nok'],
            ['Administrativ modell (March & Simon)', 'Sekvensiell søking, bruk av standardprosedyrer og tommelfingerregler', 'Bruk eksisterende programmer; søk lokalt rundt problemet'],
            ['Inkrementalisme (Lindblom)', 'Konflikt om mål, komplekst problem, mange aktører', '«Muddling through»: små skritt fra dagens praksis, gjensidig tilpasning mellom aktører'],
            ['Garbage can (Cohen, March & Olsen)', 'Organisert anarki: uklare mål, uklar teknologi, skiftende deltakelse', 'Løsninger, problemer, deltakere og valgsituasjoner møtes tilfeldig; utfallet avhenger av timing']
          ]},
          { t: 'p', tekst: 'Simons begrep <strong>begrenset rasjonalitet</strong> er kanskje fagets viktigste enkeltbidrag: mennesket er «intendedly rational, but only limitedly so». Vi forenkler virkeligheten til en håndterbar modell, og velger det første alternativet som tilfredsstiller et akseptabelt nivå.' },
          { t: 'p', tekst: 'Allison viser med Cubakrisen at samme beslutning kan forklares på tre måter: som <em>rasjonell aktør</em>, som utfall av <em>organisatoriske prosedyrer</em>, eller som resultat av <em>byråkratisk politikk</em> og forhandling mellom aktører.' }
        ]
      },
      {
        tittel: 'Skjevheter i dømmekraften',
        blokker: [
          { t: 'p', tekst: 'Kahneman og Tversky beskriver hvordan vi bruker heuristikker – mentale snarveier som er effektive, men systematisk feilbarlige. Kahnemans skille mellom <em>system 1</em> (raskt, intuitivt, automatisk) og <em>system 2</em> (langsomt, analytisk, anstrengende) rammer inn feltet.' },
          { t: 'liste', tittel: 'Sentrale skjevheter', punkter: [
            '<strong>Tilgjengelighetsheuristikk:</strong> vi overvurderer det som er lett å komme på',
            '<strong>Representativitet:</strong> vi vurderer sannsynlighet etter likhet med en stereotypi og ignorerer basisrater',
            '<strong>Forankring:</strong> første tall vi hører preger vurderingen',
            '<strong>Bekreftelsesfellen:</strong> vi søker informasjon som støtter det vi allerede tror',
            '<strong>Tapsaversjon og innrammingseffekt:</strong> valget endres av hvordan alternativet presenteres',
            '<strong>Eskalerende forpliktelse (Staw):</strong> vi kaster gode penger etter dårlige for å rettferdiggjøre tidligere valg',
            '<strong>Overkonfidens:</strong> vi tror vi vet mer og treffer bedre enn vi gjør',
            '<strong>Etterpåklokskap:</strong> i ettertid framstår utfallet som opplagt'
          ]}
        ]
      },
      {
        tittel: 'Beslutninger i grupper',
        blokker: [
          { t: 'liste', tittel: 'Fordeler og ulemper', punkter: [
            'Fordeler: mer informasjon, flere perspektiver, høyere aksept og lettere iverksetting, læring',
            'Ulemper: tidkrevende, ansvarspulverisering, dominans fra enkeltpersoner, kompromisser som ingen egentlig vil ha'
          ]},
          { t: 'boks', tittel: 'Gruppetenkning (Janis)', tekst: 'I sterkt sammensveisede grupper under press kan streben etter enighet fortrenge realistisk vurdering av alternativene. Symptomer: illusjon om usårbarhet, kollektiv bortforklaring, tro på gruppens moralske overlegenhet, stereotypier om motparten, press mot avvikere, selvsensur, illusjon om enstemmighet og selvutnevnte tankevoktere. Mottiltak: djevelens advokat, uavhengige undergrupper, at lederen holder eget syn tilbake i starten, og eksterne vurderinger.' },
          { t: 'liste', tittel: 'Andre gruppefenomener', punkter: [
            '<strong>Gruppepolarisering:</strong> gruppens beslutning blir mer ekstrem enn medlemmenes utgangspunkt',
            '<strong>Sosial loffing:</strong> individuell innsats synker når den ikke er identifiserbar',
            '<strong>Abilene-paradokset:</strong> gruppen velger noe ingen enkeltmedlemmer ønsker, fordi alle tror de andre vil det',
            '<strong>Psykologisk trygghet (Edmondson):</strong> troen på at det er trygt å ta mellommenneskelig risiko i gruppen; sterkeste enkeltprediktor for velfungerende team'
          ]},
          { t: 'p', tekst: 'Strukturerte teknikker som brainstorming, nominell gruppeteknikk, Delfi-metoden og premortem-analyse er utviklet nettopp for å motvirke disse skjevhetene.' }
        ]
      }
    ]
  },

  {
    id: 'makt',
    nr: 9,
    tittel: 'Makt og konflikt',
    ingress: 'Maktbaser, maktens ansikter, avhengighet som maktkilde, og håndtering av konflikt.',
    laeringsmaal: [
      'Definere makt og skille mellom makt, autoritet og innflytelse',
      'Gjøre rede for French og Ravens maktbaser og Lukes tre maktdimensjoner',
      'Forklare hvordan avhengighet og usikkerhetshåndtering skaper makt',
      'Analysere konflikttyper og vurdere håndteringsstrategier'
    ],
    seksjoner: [
      {
        tittel: 'Maktbegrepet',
        blokker: [
          { t: 'def', term: 'Makt', tekst: 'En aktørs evne til å få en annen aktør til å gjøre noe vedkommende ellers ikke ville gjort (Dahl). Makt er relasjonell og situasjonsbestemt, ikke en egenskap ved personen.' },
          { t: 'def', term: 'Autoritet', tekst: 'Legitim makt – makt som aksepteres av dem den utøves over fordi den anses som rettmessig. Weber skiller mellom tradisjonell, karismatisk og legal-rasjonell autoritet.' },
          { t: 'liste', tittel: 'French og Ravens maktbaser', punkter: [
            '<strong>Legitim makt:</strong> følger av formell posisjon',
            '<strong>Belønningsmakt:</strong> kontroll over goder andre ønsker',
            '<strong>Tvangsmakt:</strong> mulighet til å påføre sanksjoner',
            '<strong>Ekspertmakt:</strong> verdsatt kunnskap og kompetanse',
            '<strong>Referentmakt:</strong> identifikasjon, beundring og personlig tiltrekning',
            '<strong>Informasjonsmakt:</strong> kontroll over informasjon andre trenger (lagt til senere)'
          ]},
          { t: 'p', tekst: 'De personlige maktbasene (ekspert og referent) gir sterkest forpliktelse og indre oppslutning; posisjonsbasene gir lettere føyelighet, og tvangsmakt gir ofte motstand.' }
        ]
      },
      {
        tittel: 'Maktens ansikter',
        blokker: [
          { t: 'liste', tittel: 'Lukes tre dimensjoner', punkter: [
            '<strong>Første ansikt (Dahl):</strong> makt i åpen beslutningskonflikt – hvem vinner når partene er uenige?',
            '<strong>Andre ansikt (Bachrach & Baratz):</strong> makt over dagsordenen – å hindre at saker i det hele tatt tas opp (ikke-beslutninger)',
            '<strong>Tredje ansikt (Lukes):</strong> makt over bevisstheten – å forme andres oppfatning av egne interesser, slik at konflikten aldri oppstår'
          ]},
          { t: 'p', tekst: 'Foucault utvider dette til <em>disiplinerende makt</em>: makt som virker gjennom normer, kategorier og selvregulering snarere enn gjennom kommando. I organisasjoner møter vi dette som målesystemer, evalueringer og normativ kontroll som får folk til å styre seg selv.' },
          { t: 'p', tekst: 'Strategisk kontingensteori (Hickson m.fl.) og Crozier forklarer hvorfor makten ikke alltid følger organisasjonskartet: en enhet eller person får makt i den grad den (1) håndterer usikkerhet som er kritisk for organisasjonen, (2) er vanskelig å erstatte, og (3) er sentralt plassert i arbeidsflyten. Vedlikeholdsmekanikeren i Croziers tobakksfabrikk hadde reell makt fordi maskinstansen var den eneste uforutsigbarheten som var igjen.' }
        ]
      },
      {
        tittel: 'Konflikt',
        blokker: [
          { t: 'def', term: 'Konflikt', tekst: 'En situasjon der én part opplever at en annen part hindrer eller motarbeider noe som er viktig for den første.' },
          { t: 'liste', tittel: 'Konflikttyper', punkter: [
            '<strong>Saks-/oppgavekonflikt:</strong> uenighet om innhold og mål. Kan være produktiv i moderate doser.',
            '<strong>Relasjons-/personkonflikt:</strong> personlig antipati og friksjon. Nesten alltid destruktiv.',
            '<strong>Prosesskonflikt:</strong> uenighet om hvordan arbeidet skal gjøres og hvem som skal gjøre hva.',
            '<strong>Verdikonflikt:</strong> uforenlige grunnleggende oppfatninger om hva som er rett.'
          ]},
          { t: 'p', tekst: 'Konflikt kan være både funksjonell og dysfunksjonell. For lite konflikt gir stagnasjon og gruppetenkning; for mye gir lammelse og utrygghet. Vanlige årsaker er knappe ressurser, uklare ansvarsgrenser, gjensidig avhengighet, ulike delmål (suboptimalisering), statusforskjeller og kommunikasjonssvikt.' },
          { t: 'tabell', kolonner: ['Håndteringsstil (Thomas–Kilmann)', 'Selvhevdelse', 'Samarbeidsvilje', 'Passer når'], rader: [
            ['Konkurrere', 'Høy', 'Lav', 'Krisesituasjon, upopulære men nødvendige vedtak'],
            ['Samarbeide', 'Høy', 'Høy', 'Begge parters mål er viktige; tid til å finne vinn-vinn'],
            ['Ingå kompromiss', 'Middels', 'Middels', 'Likeverdige parter, tidspress, midlertidig løsning'],
            ['Unngå', 'Lav', 'Lav', 'Trivielle saker, behov for avkjøling, andre kan løse det bedre'],
            ['Tilpasse seg', 'Lav', 'Høy', 'Saken betyr mer for den andre; bygge goodwill']
          ]},
          { t: 'p', tekst: 'Forhandlingsteori skiller mellom <em>distributiv</em> forhandling (fordeling av en fast kake, nullsum) og <em>integrativ</em> forhandling (utvide kaken ved å utveksle på ulikt vektede interesser). Fisher og Urys prinsipielle forhandling anbefaler å skille sak fra person, fokusere på interesser framfor posisjoner, utvikle flere alternativer og bruke objektive kriterier. BATNA – den beste alternative løsningen dersom forhandlingen bryter sammen – bestemmer forhandlingsmakten.' }
        ]
      }
    ]
  },

  {
    id: 'ledelse',
    nr: 10,
    tittel: 'Ledelse',
    ingress: 'Fra trekkteori til transformasjonsledelse, situasjonsbestemt ledelse og destruktive former.',
    laeringsmaal: [
      'Skille mellom ledelse og administrasjon',
      'Følge utviklingslinjen fra trekk- til atferds-, situasjons- og relasjonsteorier',
      'Gjøre rede for transformasjons- og transaksjonsledelse',
      'Vurdere destruktiv ledelse og etiske sider ved lederrollen'
    ],
    seksjoner: [
      {
        tittel: 'Hva ledelse er',
        blokker: [
          { t: 'def', term: 'Ledelse', tekst: 'En spesiell atferd som mennesker utviser i den hensikt å påvirke andres tenkning, holdning og atferd, slik at gruppens eller organisasjonens mål nås.' },
          { t: 'tabell', kolonner: ['Dimensjon', 'Administrasjon (management)', 'Ledelse (leadership)'], rader: [
            ['Fokus', 'Orden, forutsigbarhet, drift', 'Retning, endring, mening'],
            ['Virkemidler', 'Planlegging, budsjett, struktur, kontroll', 'Visjon, kommunikasjon, motivasjon, kultur'],
            ['Tidshorisont', 'Kort til middels', 'Lang'],
            ['Spørsmål', 'Hvordan gjør vi tingene riktig?', 'Gjør vi de riktige tingene?']
          ]},
          { t: 'p', tekst: 'Mintzbergs studier av hva ledere faktisk gjør, viser et arbeid preget av fragmentering, avbrytelser, muntlighet og korte sekvenser – ikke systematisk planlegging. Han grupperer lederroller i tre: <em>interpersonlige</em> (gallionsfigur, anfører, forbindelsesledd), <em>informasjonsroller</em> (overvåker, informasjonsspreder, talsperson) og <em>beslutningsroller</em> (entreprenør, kriseløser, ressursfordeler, forhandler).' }
        ]
      },
      {
        tittel: 'Utviklingslinjen i ledelsesforskningen',
        blokker: [
          { t: 'tabell', kolonner: ['Periode', 'Retning', 'Kjernespørsmål', 'Sentrale bidrag'], rader: [
            ['1900–1940', 'Trekkteori', 'Hvem er lederen?', 'Store menn-teorien; senere femfaktormodellen, der ekstraversjon og planmessighet korrelerer svakt til moderat med lederframvekst'],
            ['1940–1960', 'Atferdsteori', 'Hva gjør lederen?', 'Ohio-studiene (hensynstakende og strukturerende atferd), Michigan-studiene (medarbeider- vs. produksjonsorientert), Blake & Moutons ledergitter'],
            ['1960–1980', 'Situasjonsteori', 'Når virker hva?', 'Fiedlers kontingensmodell, Hersey & Blanchards situasjonsbestemte ledelse, House’ sti–mål-teori, Vroom & Yettons beslutningsmodell'],
            ['1980–2000', 'Ny-karismatiske teorier', 'Hvordan skapes engasjement?', 'Burns og Bass om transformasjons- og transaksjonsledelse; karismatisk ledelse'],
            ['2000–', 'Relasjonelle, distribuerte og etiske teorier', 'Hvor sitter ledelsen?', 'LMX, tjenende ledelse, autentisk ledelse, delt og distribuert ledelse, destruktiv ledelse']
          ]},
          { t: 'liste', tittel: 'Situasjonsmodellene i korthet', punkter: [
            '<strong>Fiedler:</strong> Lederstilen er relativt fast (målt med LPC-skalaen). Oppgaveorienterte ledere gjør det best i svært gunstige og svært ugunstige situasjoner; relasjonsorienterte i mellomsituasjoner. Løsningen er å matche leder til situasjon, ikke omvendt.',
            '<strong>Hersey & Blanchard:</strong> Lederstilen tilpasses medarbeiderens modenhet: instruerende (S1), overtalende/coachende (S2), deltakende (S3) og delegerende (S4).',
            '<strong>Sti–mål-teori (House):</strong> Lederens oppgave er å klargjøre veien til målet og fjerne hindringer, med dirigerende, støttende, deltakende eller prestasjonsorientert stil avhengig av oppgave og medarbeider.',
            '<strong>Vroom & Yetton:</strong> En beslutningstre-modell for hvor mye medvirkning som er hensiktsmessig, avhengig av krav til kvalitet, informasjon og aksept.'
          ]}
        ]
      },
      {
        tittel: 'Transformasjons- og transaksjonsledelse',
        blokker: [
          { t: 'tabell', kolonner: ['Transaksjonsledelse', 'Transformasjonsledelse'], rader: [
            ['Betinget belønning: klare avtaler om ytelse og gjengjeld', 'Idealisert innflytelse: lederen framstår som rollemodell og skaper tillit'],
            ['Ledelse ved unntak, aktiv: overvåker avvik og korrigerer', 'Inspirerende motivasjon: formidler en meningsfull visjon'],
            ['Ledelse ved unntak, passiv: griper inn først når problemet er stort', 'Intellektuell stimulering: utfordrer antakelser og oppmuntrer til nytenkning'],
            ['La-det-skure (laissez-faire): fravær av ledelse', 'Individuell oppmerksomhet: ser og utvikler den enkelte']
          ]},
          { t: 'p', tekst: 'Bass framholder at transformasjonsledelse gir en <em>tilleggseffekt</em> utover transaksjonsledelse, men at de to utfyller hverandre: uten ryddige avtaler og oppfølging blir visjonene tomme. Kritikken mot transformasjonsledelse peker på romantisering av lederen, uklare målinger og at karisma også kan brukes destruktivt.' },
          { t: 'liste', tittel: 'Nyere relasjonelle perspektiver', punkter: [
            '<strong>LMX (leader–member exchange):</strong> Ledelse skjer i par. Ledere utvikler ulike relasjoner til ulike medarbeidere; en «inngruppe» med høy tillit og en «utgruppe» med rent kontraktsmessig forhold.',
            '<strong>Tjenende ledelse (Greenleaf):</strong> Lederen setter medarbeidernes vekst og behov først.',
            '<strong>Autentisk ledelse:</strong> Selvinnsikt, balansert informasjonsbehandling, relasjonell åpenhet og internalisert moralsk perspektiv.',
            '<strong>Delt og distribuert ledelse:</strong> Ledelse som funksjon som utøves av flere, ikke en posisjon én person har.',
            '<strong>Selvledelse og superledelse:</strong> Å lede andre til å lede seg selv.'
          ]},
          { t: 'boks', tittel: 'Destruktiv ledelse', tekst: 'Einarsen, Aasland og Skogstad definerer destruktiv ledelse som systematisk og gjentatt atferd fra en leder som undergraver organisasjonens mål, oppgaver, ressurser og effektivitet, og/eller underordnedes motivasjon, trivsel og jobbtilfredshet. Modellen deres skiller mellom tyrannisk (mot ansatte), utro/illojal (mot organisasjonen), avsporet (mot begge) og la-det-skure-ledelse (passiv, men den vanligste og undervurderte formen).' }
        ]
      }
    ]
  },

  {
    id: 'endring',
    nr: 11,
    tittel: 'Endring i organisasjoner',
    ingress: 'Endringsdrivere, endringsmodeller, motstand mot endring og hvorfor endringsprosesser mislykkes.',
    laeringsmaal: [
      'Skille mellom ulike typer og drivere for endring',
      'Gjøre rede for Lewins og Kotters endringsmodeller',
      'Forklare årsakene til motstand mot endring og hvordan de kan møtes',
      'Drøfte planlagt endring mot framvoksende og evolusjonære perspektiver'
    ],
    seksjoner: [
      {
        tittel: 'Typer og drivere',
        blokker: [
          { t: 'liste', tittel: 'Dimensjoner ved endring', punkter: [
            '<strong>Omfang:</strong> inkrementell (små justeringer) mot radikal/strategisk (bryter med eksisterende mønstre)',
            '<strong>Tempo:</strong> evolusjonær mot revolusjonær',
            '<strong>Initiativ:</strong> proaktiv (forut for problemet) mot reaktiv (svar på krise)',
            '<strong>Innhold:</strong> struktur, kultur, teknologi, oppgaver eller mennesker'
          ]},
          { t: 'p', tekst: 'Teorien om <strong>punktert likevekt</strong> (Tushman & Romanelli) beskriver organisasjonshistorien som lange perioder med inkrementell tilpasning, avbrutt av korte, dramatiske omveltninger. Nadler og Tushman krysser omfang og timing i fire typer: finjustering, tilpasning, reorientering og gjenskaping.' },
          { t: 'p', tekst: 'Drivere kan være ytre (marked, teknologi, regulering, konkurranse, samfunnsforventninger) eller indre (nye eiere eller ledere, vekst, kriser, læring, misnøye). Van de Ven og Poole systematiserer fire endringsteorier: <em>livssyklus</em>, <em>teleologisk</em> (målstyrt), <em>dialektisk</em> (konflikt mellom motsetninger) og <em>evolusjonær</em> (variasjon–seleksjon–retensjon).' }
        ]
      },
      {
        tittel: 'Endringsmodeller',
        blokker: [
          { t: 'p', tekst: '<strong>Lewins trestegsmodell</strong> er fagets urmodell: <em>opptining</em> (skape erkjennelse av behovet og løsne på det etablerte), <em>endring</em> (innføre den nye praksisen) og <em>nedfrysing</em> (forankre og stabilisere). Lewins kraftfeltanalyse supplerer: endring skjer når drivkreftene overstiger motkreftene, og det er som regel mer effektivt å svekke motkreftene enn å øke presset.' },
          { t: 'liste', tittel: 'Kotters åtte trinn', punkter: [
            'Skap en kriseforståelse – en følelse av at endringen haster',
            'Etabler en styrende koalisjon med tilstrekkelig makt',
            'Utvikle en visjon og en strategi for endringen',
            'Kommuniser endringsvisjonen bredt og gjentatte ganger',
            'Fjern hindringer og gi medarbeiderne handlingsrom',
            'Skap synlige kortsiktige gevinster',
            'Konsolider forbedringene og driv fram videre endring',
            'Forankre de nye tilnærmingene i kulturen'
          ]},
          { t: 'tabell', kolonner: ['Modell', 'Grunnsyn', 'Lederens rolle'], rader: [
            ['Planlagt endring (Lewin, Kotter)', 'Endring kan styres gjennom faser', 'Arkitekt og drivkraft'],
            ['Organisasjonsutvikling (OU)', 'Endring gjennom medvirkning, data og humanistiske verdier', 'Prosesskonsulent'],
            ['Framvoksende endring (Weick & Quinn)', 'Endring skjer kontinuerlig gjennom lokal tilpasning', 'Fortolker og tilrettelegger'],
            ['Evolusjonær / populasjonsøkologisk', 'Organisasjoner har treghet; omgivelsene velger', 'Begrenset handlingsrom'],
            ['Endring som oversettelse (Røvik)', 'Ideer reiser og omformes lokalt', 'Oversetter med kontekstkunnskap'],
            ['Appreciative Inquiry', 'Bygg på det som allerede fungerer', 'Fasilitator for positive fortellinger']
          ]},
          { t: 'p', tekst: 'Beer og Nohria kontrasterer <strong>teori E</strong> (economic value; ovenfra og ned, struktur og økonomi, rask og hard) med <strong>teori O</strong> (organizational capability; nedenfra og opp, kultur og læring, langsom og myk), og argumenterer for at de mest vellykkede prosessene kombinerer dem.' }
        ]
      },
      {
        tittel: 'Motstand mot endring',
        blokker: [
          { t: 'p', tekst: 'Motstand bør forstås som informasjon, ikke bare som hindring: den peker ofte på reelle svakheter ved endringsforslaget eller ved prosessen.' },
          { t: 'liste', tittel: 'Ti vanlige årsaker', punkter: [
            'Frykt for det ukjente og for egen mestring',
            'Tap av identitet og faglig stolthet',
            'Brudd på psykologiske kontrakter og forventninger',
            'Tap av makt, status eller posisjon',
            'Tap av materielle goder og karrieremuligheter',
            'Endrede sosiale relasjoner og oppløsning av arbeidsmiljø',
            'Dobbeltarbeid i overgangsfasen',
            'Uenighet om at problemet finnes eller om diagnosen',
            'Manglende tillit til ledelsen etter tidligere prosesser',
            'Krav fra eksterne aktører som fagforeninger eller kunder'
          ]},
          { t: 'p', tekst: 'Kotter og Schlesinger foreslår seks tiltak: opplæring og kommunikasjon, deltakelse og involvering, støtte og tilrettelegging, forhandling og avtale, manipulering og kooptering, og eksplisitt eller implisitt tvang. Valget avhenger av tidspress, motstandens styrke og hvor mye informasjon initiativtakerne selv mangler.' },
          { t: 'boks', tittel: 'Hvorfor mislykkes endringsprosesser?', tekst: 'Typiske årsaker er at kriseforståelsen er for svak, at visjonen er uklar eller underkommunisert, at kortsiktige gevinster mangler, at seieren erklæres for tidlig, at endringen ikke forankres i kulturen, at mellomledere ikke får eierskap, at prosessen konkurrerer med daglig drift, og at organisasjonen rammes av endringstretthet fra tidligere runder.' }
        ]
      }
    ]
  },

  {
    id: 'laering',
    nr: 12,
    tittel: 'Læring, kunnskap og innovasjon',
    ingress: 'Organisasjonslæring, kunnskapsforvaltning, den lærende organisasjon og innovasjonsprosesser.',
    laeringsmaal: [
      'Skille mellom individuell læring og organisasjonslæring',
      'Forklare enkelt- og dobbeltkretslæring',
      'Gjøre rede for SEKI-modellen og skillet taus/eksplisitt kunnskap',
      'Drøfte utnyttelse mot utforskning og betingelser for innovasjon'
    ],
    seksjoner: [
      {
        tittel: 'Fra individuell til organisatorisk læring',
        blokker: [
          { t: 'def', term: 'Organisasjonslæring', tekst: 'En prosess der organisasjonen utvikler ny kunnskap og innsikt basert på erfaring, og der denne innsikten nedfeller seg i endret atferd, rutiner og systemer som består selv om enkeltpersoner slutter.' },
          { t: 'p', tekst: 'Individuell læring blir organisatorisk først når kunnskapen spres, deles og forankres i felles rutiner, prosedyrer, systemer og kultur – det som ofte kalles organisasjonens hukommelse. Crossan, Lane og Whites 4I-modell beskriver bevegelsen: <em>intuiting</em> (individ), <em>interpreting</em> (individ til gruppe), <em>integrating</em> (gruppe) og <em>institutionalizing</em> (organisasjon), med en tilbakestrøm som gjør at det institusjonaliserte former hva individet i det hele tatt legger merke til.' },
          { t: 'liste', tittel: 'Argyris og Schöns læringsnivåer', punkter: [
            '<strong>Enkeltkretslæring:</strong> Vi oppdager avvik og korrigerer handlingene, men lar målene og de underliggende antakelsene stå. «Gjør vi tingene riktig?»',
            '<strong>Dobbeltkretslæring:</strong> Vi stiller spørsmål ved selve målene, normene og antakelsene som ligger til grunn. «Gjør vi de riktige tingene?»',
            '<strong>Deuterolæring:</strong> Å lære å lære – organisasjonen reflekterer over og forbedrer sine egne læringsprosesser.'
          ]},
          { t: 'p', tekst: 'Argyris peker på <em>defensive rutiner</em> som hovedhindringen for dobbeltkretslæring: uskrevne regler som beskytter mot ubehag, gjør vanskelige temaer «udiskuterbare», og gjør at det udiskuterbare i seg selv blir udiskuterbart.' }
        ]
      },
      {
        tittel: 'Kunnskap i organisasjoner',
        blokker: [
          { t: 'p', tekst: 'Polanyi skiller mellom <strong>taus kunnskap</strong> (personlig, erfaringsbasert, vanskelig å sette ord på – «vi vet mer enn vi kan si») og <strong>eksplisitt kunnskap</strong> (kodifisert, skriftlig, lett overførbar). Nonaka og Takeuchis SEKI-modell beskriver hvordan kunnskap skapes i spiralen mellom disse.' },
          { t: 'tabell', kolonner: ['Modus', 'Fra → til', 'Mekanisme'], rader: [
            ['Sosialisering', 'Taus → taus', 'Mesterlære, observasjon, felles erfaring, praksisfellesskap'],
            ['Eksternalisering', 'Taus → eksplisitt', 'Metaforer, modeller, dialog, dokumentasjon av praksis'],
            ['Kombinering', 'Eksplisitt → eksplisitt', 'Systematisering, sammenstilling, databaser, analyse'],
            ['Internalisering', 'Eksplisitt → taus', 'Learning by doing, trening, gjentakelse til det sitter i fingrene']
          ]},
          { t: 'p', tekst: 'Nonaka bruker begrepet <em>ba</em> om den delte arenaen – fysisk, virtuell eller mental – der kunnskapsutvikling kan skje. Lave og Wenger beskriver <em>praksisfellesskap</em>, der læring er legitim perifer deltakelse: nykommeren lærer ved gradvis å bevege seg fra kanten mot sentrum av et faglig fellesskap.' },
          { t: 'p', tekst: 'Cohen og Levinthals begrep <strong>absorpsjonskapasitet</strong> forklarer hvorfor tilgang til kunnskap ikke er nok: organisasjonen må ha nok forkunnskap til å kjenne igjen verdien av ny informasjon, ta den opp i seg og anvende den.' }
        ]
      },
      {
        tittel: 'Den lærende organisasjon og innovasjon',
        blokker: [
          { t: 'liste', tittel: 'Senges fem disipliner', punkter: [
            '<strong>Personlig mestring:</strong> kontinuerlig utvikling av egen kompetanse og klarhet om det man vil oppnå',
            '<strong>Mentale modeller:</strong> å avdekke og utfordre de indre bildene som styrer hvordan vi forstår verden',
            '<strong>Felles visjon:</strong> et delt bilde av framtiden som forplikter, ikke bare føyer seg',
            '<strong>Gruppelæring:</strong> dialog og kollektiv tenkning der gruppen tenker bedre enn medlemmene hver for seg',
            '<strong>Systemtenkning:</strong> den femte disiplinen som binder de andre sammen – å se helheter, sirkulære årsaksforhold og tidsforsinkelser i stedet for lineære kjeder'
          ]},
          { t: 'boks', tittel: 'Utnyttelse og utforskning (March, 1991)', tekst: 'March skiller mellom <em>exploitation</em> – å forbedre og utnytte det man allerede kan, med sikker og nær avkastning – og <em>exploration</em> – å søke etter det nye, med usikker og fjern avkastning. Organisasjoner har en systematisk tendens til å favorisere utnyttelse, fordi gevinsten er nærmere og sikrere. Resultatet kan bli en kompetansefelle. En <em>ambidekster</em> organisasjon klarer begge deler samtidig, ofte ved å skille dem strukturelt eller i tid.' },
          { t: 'liste', tittel: 'Innovasjonsbegreper', punkter: [
            '<strong>Inkrementell mot radikal innovasjon:</strong> forbedring av det bestående mot brudd med det bestående',
            '<strong>Oppretteholdende mot disruptiv innovasjon (Christensen):</strong> disrupsjon starter i lavmarginsegmenter etablerte aktører velger bort, og beveger seg oppover',
            '<strong>Åpen innovasjon (Chesbrough):</strong> ideer og teknologi flyter både inn i og ut av organisasjonen',
            '<strong>Innovasjonens dilemma:</strong> nettopp det som gjør etablerte selskaper gode – lydhørhet for eksisterende kunder og krav til margin – hindrer dem i å gripe det nye'
          ]},
          { t: 'p', tekst: 'Betingelser som fremmer læring og innovasjon: psykologisk trygghet, slakk i ressursene, mangfold i kompetanse, tillatelse til å feile, arenaer for deling på tvers, og ledelse som etterspør refleksjon framfor bare resultater.' }
        ]
      }
    ]
  }
];
