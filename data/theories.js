/* Teoribank: hovedteoriene i organisasjonsteori. */
window.OT = window.OT || {};
window.OT.theories = [
  /* ---------- Klassiske retninger ---------- */
  {
    id: 'scientific-management',
    navn: 'Scientific management',
    opphav: 'Frederick W. Taylor',
    aar: '1911',
    modul: 'grunnlag',
    kategori: 'Klassisk',
    kjerne: 'Arbeidsoppgaver kan analyseres vitenskapelig for å finne den ene beste måten å utføre dem på. Planlegging skilles fra utførelse, arbeidet brytes ned i enkle deloperasjoner, arbeiderne velges og trenes systematisk, og lønn knyttes til produsert mengde.',
    punkter: [
      'Tidsstudier og bevegelsesanalyse av hver arbeidsoperasjon',
      'Sterk horisontal og vertikal spesialisering',
      'Akkordlønn som primært motivasjonsmiddel',
      'Ledelsen har ansvar for planlegging, arbeideren for utførelse'
    ],
    kritikk: 'Ensidig økonomisk menneskesyn, ignorerer sosiale behov og indre motivasjon, gir fremmedgjøring og monotoni. Likevel lever prinsippene videre i lean, callsentre og plattformarbeid.'
  },
  {
    id: 'byraakrati',
    navn: 'Byråkratiteorien',
    opphav: 'Max Weber',
    aar: '1922',
    modul: 'struktur',
    kategori: 'Klassisk',
    kjerne: 'Byråkratiet er den idealtypiske organisasjonsformen bygd på legal-rasjonell autoritet. Weber anså den for teknisk overlegen alle andre former, fordi den gir presisjon, hurtighet, forutsigbarhet og likebehandling.',
    punkter: [
      'Hierarki med klar over- og underordning',
      'Skriftlige, generelle regler som styrer saksbehandlingen',
      'Klar arbeidsdeling og avgrenset kompetanseområde',
      'Ansettelse og forfremmelse etter kvalifikasjoner, ikke slekt eller vennskap',
      'Upersonlighet: saker behandles etter regler, ikke etter person',
      'Skriftlig dokumentasjon og arkiv'
    ],
    kritikk: 'Merton beskrev byråkratiets dysfunksjoner: regelfiksering, målforskyvning og «trenet udyktighet». Weber selv advarte mot «rasjonalitetens jernbur».'
  },
  {
    id: 'administrasjonsteori',
    navn: 'Administrasjonsteori',
    opphav: 'Henri Fayol; Gulick & Urwick',
    aar: '1916 / 1937',
    modul: 'grunnlag',
    kategori: 'Klassisk',
    kjerne: 'Generelle prinsipper for hvordan ledelse og administrasjon bør utøves, uavhengig av bransje. Fayol formulerte 14 administrasjonsprinsipper og fem lederfunksjoner: planlegge, organisere, befale, koordinere og kontrollere.',
    punkter: [
      'Enhetlig kommando: hver ansatt har én overordnet',
      'Klart kontrollspenn og skalarkjede',
      'Myndighet skal følge ansvar',
      'Gulick & Urwicks POSDCORB: Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting'
    ],
    kritikk: 'Simon kalte prinsippene «ordtak» – de motsier hverandre og angir ikke når hvilket gjelder.'
  },
  {
    id: 'human-relations',
    navn: 'Human relations-bevegelsen',
    opphav: 'Elton Mayo; Mary Parker Follett',
    aar: '1930-årene',
    modul: 'grunnlag',
    kategori: 'Klassisk',
    kjerne: 'Ansatte er sosiale vesener. Gruppetilhørighet, anerkjennelse og uformelle normer påvirker ytelsen mer enn fysiske arbeidsforhold og akkordsatser.',
    punkter: [
      'Hawthorne-studiene ved Western Electric 1924–1932',
      'Den uformelle organisasjonen settes på dagsordenen',
      'Follett: makt <em>med</em> framfor makt <em>over</em>; konflikt kan gi integrative løsninger',
      'Grunnlag for senere teorier om motivasjon og lederatferd'
    ],
    kritikk: 'Beskyldt for å være «kupåpassing» – å bruke sosiale virkemidler for å øke produktiviteten uten å endre maktforholdene.'
  },
  {
    id: 'teori-x-y',
    navn: 'Teori X og teori Y',
    opphav: 'Douglas McGregor',
    aar: '1960',
    modul: 'motivasjon',
    kategori: 'Menneskesyn',
    kjerne: 'Ledere handler ut fra implisitte antakelser om mennesker. Teori X antar at folk misliker arbeid og må styres og kontrolleres. Teori Y antar at arbeid er like naturlig som lek, og at folk søker ansvar under de rette betingelsene.',
    punkter: [
      'Antakelsene virker som selvoppfyllende profetier',
      'Teori X gir kontroll, detaljstyring og ytre belønning',
      'Teori Y gir delegering, medvirkning og jobbberikelse'
    ],
    kritikk: 'Dikotomien er forenklet; senere forskning viser at situasjonen og oppgavens karakter betyr mye for hva som virker.'
  },
  {
    id: 'teori-z',
    navn: 'Teori Z',
    opphav: 'William Ouchi',
    aar: '1981',
    modul: 'motivasjon',
    kategori: 'Menneskesyn',
    kjerne: 'En hybrid av amerikansk og japansk ledelsespraksis, lansert som et tredje alternativ til McGregors teori X og Y. Organisasjonen binder den ansatte til seg over tid gjennom trygghet, tillit og kollektiv beslutningstaking, og får til gjengjeld lojalitet og innsats.',
    punkter: [
      'Langsiktig, tilnærmet livsvarig ansettelse gir trygghet og lojalitet',
      'Konsensusorienterte beslutninger, men individuelt ansvar for gjennomføring',
      'Langsom evaluering og forfremmelse, med vekt på modning framfor rask karriere',
      'Implisitt, uformell kontroll gjennom kultur, kombinert med eksplisitte måltall',
      'Moderat spesialiserte karriereveier som gir bred organisasjonsforståelse',
      'Helhetlig omsorg for den ansatte, også utenfor arbeidsrollen'
    ],
    kritikk: 'Sterkt kulturelt betinget og bygger på et idealisert bilde av japansk arbeidsliv fra 1970-tallet. Svak empirisk støtte for at modellen lar seg overføre, og forutsetningen om livsvarig ansettelse passer dårlig med dagens arbeidsmarked.'
  },

  /* ---------- Struktur og design ---------- */
  {
    id: 'mintzberg-konfigurasjoner',
    navn: 'Mintzbergs konfigurasjoner',
    opphav: 'Henry Mintzberg',
    aar: '1979/1983',
    modul: 'struktur',
    kategori: 'Struktur',
    kjerne: 'Organisasjoner består av fem deler og koordineres med seks mekanismer. Bestemte kombinasjoner opptrer sammen som gjenkjennelige konfigurasjoner, fordi delene forsterker hverandre.',
    punkter: [
      'Fem deler: operativ kjerne, mellomledelse, toppledelse, teknostruktur, støttestruktur',
      'Enkel struktur – toppledelse – direkte tilsyn',
      'Maskinbyråkrati – teknostruktur – standardisering av arbeidsprosesser',
      'Profesjonsbyråkrati – operativ kjerne – standardisering av kunnskap',
      'Divisjonalisert form – mellomledelse – standardisering av resultater',
      'Adhokrati – støttestruktur – gjensidig tilpasning'
    ],
    kritikk: 'Rendyrkede typer opptrer sjelden i praksis; hybrider er regelen.'
  },
  {
    id: 'burns-stalker',
    navn: 'Mekanistiske og organiske systemer',
    opphav: 'Tom Burns & G.M. Stalker',
    aar: '1961',
    modul: 'struktur',
    kategori: 'Betingelsesteori',
    kjerne: 'Effektiv struktur avhenger av endringstakten i omgivelsene. Stabile omgivelser favoriserer mekanistiske organisasjoner med regler og hierarki; dynamiske omgivelser favoriserer organiske organisasjoner med brede roller og horisontal kommunikasjon.',
    punkter: [
      'Mekanistisk: høy spesialisering, mange regler, sentraliserte beslutninger, vertikal kommunikasjon',
      'Organisk: brede roller, få regler, desentralisering, kunnskap som autoritetsgrunnlag',
      'Ingen av formene er best i seg selv'
    ],
    kritikk: 'Vanskelig å skifte mellom formene i praksis; mange organisasjoner må håndtere begge samtidig.'
  },
  {
    id: 'woodward',
    navn: 'Teknologi og struktur',
    opphav: 'Joan Woodward',
    aar: '1965',
    modul: 'struktur',
    kategori: 'Betingelsesteori',
    kjerne: 'Produksjonsteknologien bestemmer hvilken struktur som gir gode resultater. Woodward skiller mellom enkeltstykke-/småserieproduksjon, masseproduksjon og prosessproduksjon.',
    punkter: [
      'Masseproduksjon fungerer best med mekanistisk struktur',
      'Enkeltstykke- og prosessproduksjon fungerer best med organisk struktur',
      'Antall ledelsesnivåer og kontrollspenn varierer systematisk med teknologitype'
    ],
    kritikk: 'Teknologisk determinisme; undervurderer ledelsens strategiske valg.'
  },
  {
    id: 'lawrence-lorsch',
    navn: 'Differensiering og integrasjon',
    opphav: 'Paul Lawrence & Jay Lorsch',
    aar: '1967',
    modul: 'struktur',
    kategori: 'Betingelsesteori',
    kjerne: 'Ulike avdelinger møter ulike deler av omgivelsene og utvikler derfor ulik struktur, tidshorisont og tenkemåte (differensiering). Jo større differensiering, desto sterkere integrasjonsmekanismer trengs for å holde organisasjonen sammen.',
    punkter: [
      'Integrasjonsmekanismer: koordinatorroller, tverrgående team, hierarki, planer',
      'De mest effektive bedriftene hadde både høy differensiering og høy integrasjon',
      'Grunnlaget for den moderne betingelsesteorien'
    ],
    kritikk: 'Basert på et lite antall bransjer; effektiv integrasjon er kostbar.'
  },
  {
    id: 'thompson-avhengighet',
    navn: 'Avhengighet og koordinering',
    opphav: 'James D. Thompson',
    aar: '1967',
    modul: 'struktur',
    kategori: 'Struktur',
    kjerne: 'Koordineringsbehovet følger av typen gjensidig avhengighet mellom enheter. Organisasjoner søker å skjerme sin tekniske kjerne mot usikkerhet fra omgivelsene.',
    punkter: [
      'Samlet avhengighet → koordinering ved regler og standardisering',
      'Sekvensiell avhengighet → koordinering ved planer og tidsplaner',
      'Gjensidig avhengighet → koordinering ved gjensidig tilpasning',
      'Buffering, utjevning og rasjonering beskytter kjernen'
    ],
    kritikk: 'Skjermingsstrategien passer dårlig for tjenesteytende organisasjoner der kunden er i kjernen.'
  },
  {
    id: 'chandler',
    navn: 'Structure follows strategy',
    opphav: 'Alfred Chandler',
    aar: '1962',
    modul: 'mal',
    kategori: 'Strategi',
    kjerne: 'Historiske studier av amerikanske storkonsern viste at endringer i strategi – særlig diversifisering – gikk forut for og framtvang endringer i struktur, typisk overgangen fra funksjonsbasert til divisjonalisert form.',
    punkter: [
      'Vekst og diversifisering skaper koordineringsproblemer den gamle strukturen ikke løser',
      'Strukturen endres først etter at ytelsen har blitt dårlig nok',
      'Senere forskning viser at kausaliteten også går motsatt vei: strukturen former hvilke strategier som er tenkelige'
    ],
    kritikk: 'For deterministisk; struktur og strategi former hverandre gjensidig.'
  },

  /* ---------- Mål og strategi ---------- */
  {
    id: 'porter-fem-krefter',
    navn: 'Femkraftsmodellen og generiske strategier',
    opphav: 'Michael Porter',
    aar: '1980',
    modul: 'mal',
    kategori: 'Strategi',
    kjerne: 'Lønnsomheten i en bransje bestemmes av fem konkurransekrefter. Organisasjonen bør velge en klar posisjon i forhold til dem.',
    punkter: [
      'Fem krefter: rivalisering, trussel fra nyetableringer, substitutter, kundenes forhandlingsmakt, leverandørenes forhandlingsmakt',
      'Generiske strategier: kostnadslederskap, differensiering, fokusering',
      'Å bli «stuck in the middle» gir svak lønnsomhet'
    ],
    kritikk: 'Statisk, undervurderer samarbeid og økosystemer, og passer dårlig i raskt skiftende digitale markeder.'
  },
  {
    id: 'barney-vrio',
    navn: 'Ressursbasert teori (VRIO)',
    opphav: 'Jay Barney',
    aar: '1991',
    modul: 'mal',
    kategori: 'Strategi',
    kjerne: 'Varig konkurransefortrinn stammer fra organisasjonens interne ressurser, ikke fra markedsposisjonen. En ressurs gir varig fortrinn når den er verdifull, sjelden, vanskelig å imitere og organisatorisk utnyttet.',
    punkter: [
      'Ressurser omfatter kompetanse, rutiner, omdømme, kultur og relasjoner',
      'Kausal tvetydighet og stiavhengighet gjør ressurser vanskelige å kopiere',
      'Kjernekompetanse (Prahalad & Hamel) er en beslektet idé'
    ],
    kritikk: 'Vanskelig å teste empirisk og nesten sirkulær: en ressurs defineres som verdifull fordi den gir fortrinn.'
  },
  {
    id: 'maalsettingsteori',
    navn: 'Målsettingsteori',
    opphav: 'Edwin Locke & Gary Latham',
    aar: '1968/1990',
    modul: 'mal',
    kategori: 'Motivasjon',
    kjerne: 'Spesifikke og krevende mål gir høyere ytelse enn vage mål eller ingen mål, forutsatt at målet er akseptert og at det gis tilbakemelding underveis.',
    punkter: [
      'Mål virker gjennom retning, innsats, utholdenhet og strategiutvikling',
      'Moderatorer: målforpliktelse, tilbakemelding, oppgavekompleksitet, mestringstro',
      'Deltakelse i målsettingen øker aksept, men er ikke alltid nødvendig'
    ],
    kritikk: 'Krevende mål kan gi uetisk atferd, tunnelsyn og lavere kvalitet når bare kvantitet måles.'
  },
  {
    id: 'balansert-maalstyring',
    navn: 'Balansert målstyring',
    opphav: 'Robert Kaplan & David Norton',
    aar: '1992',
    modul: 'mal',
    kategori: 'Styring',
    kjerne: 'Styring bør skje langs fire perspektiver samtidig, for å unngå ensidig fokus på finansielle etterslepsindikatorer.',
    punkter: [
      'Finansielt perspektiv: hvordan ser eierne på oss?',
      'Kundeperspektiv: hvordan ser kundene på oss?',
      'Interne prosesser: hva må vi være gode på?',
      'Læring og vekst: kan vi fortsette å forbedre oss?',
      'Perspektivene knyttes sammen i et strategikart med årsak–virkning-kjeder'
    ],
    kritikk: 'Kan bli et tungt måleapparat der antall indikatorer vokser; risiko for målforskyvning i offentlig sektor.'
  },

  /* ---------- Kultur ---------- */
  {
    id: 'schein-kultur',
    navn: 'Scheins kulturmodell',
    opphav: 'Edgar Schein',
    aar: '1985',
    modul: 'kultur',
    kategori: 'Kultur',
    kjerne: 'Kultur er et mønster av grunnleggende antakelser som en gruppe har utviklet mens den lærte å mestre problemer med ytre tilpasning og indre integrasjon, og som læres videre til nye medlemmer som den riktige måten å oppfatte, tenke og føle på.',
    punkter: [
      'Nivå 1 – artefakter: synlige uttrykk, lette å se, vanskelige å tolke',
      'Nivå 2 – uttrykte verdier og normer: det organisasjonen sier den står for',
      'Nivå 3 – grunnleggende antakelser: ubevisste, tatt for gitt, kulturens kjerne',
      'Kulturen dannes gjennom det som har fungert og derfor gjentas'
    ],
    kritikk: 'Vekten på felles kultur undervurderer subkulturer og flertydighet (jf. Martins differensierings- og fragmenteringsperspektiv).'
  },
  {
    id: 'competing-values',
    navn: 'Konkurrerende verdier (CVF)',
    opphav: 'Kim Cameron & Robert Quinn',
    aar: '1999',
    modul: 'kultur',
    kategori: 'Kultur',
    kjerne: 'Organisasjonskultur kan kartlegges langs to akser – fleksibilitet mot kontroll, og internt mot eksternt fokus – som gir fire kulturtyper.',
    punkter: [
      'Klankultur: intern, fleksibel – familie, samarbeid, utvikling av mennesker',
      'Adhokratikultur: ekstern, fleksibel – innovasjon, risiko, entreprenørskap',
      'Hierarkikultur: intern, kontroll – regler, effektivitet, forutsigbarhet',
      'Markedskultur: ekstern, kontroll – resultater, konkurranse, måloppnåelse'
    ],
    kritikk: 'Firefeltstabeller forenkler; de fleste organisasjoner har innslag av alle fire.'
  },
  {
    id: 'hofstede',
    navn: 'Hofstedes kulturdimensjoner',
    opphav: 'Geert Hofstede',
    aar: '1980/2010',
    modul: 'kultur',
    kategori: 'Kultur',
    kjerne: 'Nasjonale kulturer varierer systematisk langs seks dimensjoner, noe som påvirker hvordan organisasjoner ledes og struktureres i ulike land.',
    punkter: [
      'Maktdistanse: hvor stor ulikhet i makt som aksepteres',
      'Individualisme–kollektivisme',
      'Maskulinitet–femininitet (konkurranse mot omsorg og livskvalitet)',
      'Usikkerhetsunngåelse: toleranse for tvetydighet',
      'Langsiktig–kortsiktig orientering',
      'Overbærenhet–tilbakeholdenhet',
      'Norge: lav maktdistanse, høy individualisme, sterkt feminin, moderat usikkerhetsunngåelse'
    ],
    kritikk: 'Bygger på IBM-ansatte fra 1970-tallet; behandler nasjoner som homogene enheter og undervurderer variasjon innad.'
  },

  /* ---------- Omgivelser ---------- */
  {
    id: 'ressursavhengighet',
    navn: 'Ressursavhengighetsteori',
    opphav: 'Jeffrey Pfeffer & Gerald Salancik',
    aar: '1978',
    modul: 'omgivelser',
    kategori: 'Omgivelser',
    kjerne: 'Ingen organisasjon er selvforsynt. Den er avhengig av kritiske ressurser som andre kontrollerer, og handler for å redusere egen avhengighet og øke andres avhengighet av seg selv. Makt følger ressurskontroll.',
    punkter: [
      'Avhengighet øker med ressursens viktighet, konsentrasjon og mangel på alternativer',
      'Strategier: buffering, kontrakter, kooptering, allianser, fusjon, diversifisering',
      'Styresammensetning kan leses som et kart over kritiske avhengigheter'
    ],
    kritikk: 'Behandler organisasjonen som en enhetlig, strategisk aktør og undervurderer institusjonelle og kulturelle bindinger.'
  },
  {
    id: 'populasjonsokologi',
    navn: 'Populasjonsøkologi',
    opphav: 'Michael Hannan & John Freeman',
    aar: '1977',
    modul: 'omgivelser',
    kategori: 'Omgivelser',
    kjerne: 'Organisasjoner er trege og endrer seg sjelden grunnleggende. Det er omgivelsene som velger ut hvilke organisasjonsformer som overlever, gjennom variasjon, seleksjon og retensjon på populasjonsnivå.',
    punkter: [
      'Strukturell treghet skyldes investeringer, rutiner, normer og legitimitetskrav',
      'Nyhetens byrde: unge organisasjoner har høyest dødelighet',
      'Nisjebredde: generalister overlever varierende omgivelser, spesialister stabile',
      'Tetthetsavhengighet: legitimitet øker først, så tar konkurransen over'
    ],
    kritikk: 'Nesten ingen plass til ledelse og strategiske valg; deterministisk.'
  },
  {
    id: 'nyinstitusjonell',
    navn: 'Nyinstitusjonell teori og isomorfi',
    opphav: 'Meyer & Rowan; DiMaggio & Powell',
    aar: '1977 / 1983',
    modul: 'omgivelser',
    kategori: 'Omgivelser',
    kjerne: 'Organisasjoner tilpasser seg ikke bare krav om effektivitet, men også institusjonaliserte forventninger til hva som er en riktig og moderne organisasjon. Resultatet er at organisasjoner i samme felt blir stadig likere hverandre.',
    punkter: [
      'Tvingende isomorfi: lover, forskrifter, krav fra mektige aktører',
      'Mimetisk isomorfi: etterligning under usikkerhet',
      'Normativ isomorfi: profesjoner og utdanning sprer felles standarder',
      'Legitimitet kan være viktigere for overlevelse enn effektivitet',
      'Dekobling: fasadestrukturen kobles fra den faktiske driften'
    ],
    kritikk: 'Forklarer likhet bedre enn ulikhet og endring; svarer dårlig på hvordan nye institusjoner oppstår (jf. institusjonelt entreprenørskap).'
  },
  {
    id: 'transaksjonskostnad',
    navn: 'Transaksjonskostnadsteori',
    opphav: 'Ronald Coase; Oliver Williamson',
    aar: '1937 / 1975',
    modul: 'omgivelser',
    kategori: 'Omgivelser',
    kjerne: 'Valget mellom å kjøpe i markedet og å produsere selv (marked mot hierarki) avgjøres av kostnadene ved å inngå, overvåke og håndheve transaksjoner.',
    punkter: [
      'Atferdsforutsetninger: begrenset rasjonalitet og opportunisme',
      'Transaksjonsdimensjoner: spesifisitet i investeringer, usikkerhet, frekvens',
      'Høy spesifisitet + høy usikkerhet → internalisering i hierarki',
      'Hybridformer: langsiktige kontrakter, allianser, franchise'
    ],
    kritikk: 'Pessimistisk menneskesyn; undervurderer tillit, relasjoner og læringsgevinster ved samarbeid.'
  },
  {
    id: 'oversettelsesteori',
    navn: 'Translasjonsteori (oversettelse av ideer)',
    opphav: 'Kjell Arne Røvik; Czarniawska & Sevón',
    aar: '1996/2007',
    modul: 'omgivelser',
    kategori: 'Omgivelser',
    kjerne: 'Organisasjonsoppskrifter som lean, målstyring og teamorganisering reiser mellom organisasjoner. De kopieres ikke direkte, men oversettes og omformes når de tas i bruk i en ny kontekst.',
    punkter: [
      'Oversettelsesmoduser: kopiering, addering, fratrekking, omvandling',
      'Organisasjonsoppskrifter kan bli moter som kommer og går',
      'Translatørkompetanse: kunnskap om både ideen og mottakerkonteksten er avgjørende for om ideen virker',
      'Skandinavisk nyinstitusjonalisme som motvekt til amerikansk isomorfitenkning'
    ],
    kritikk: 'Beskrivende mer enn forklarende; vanskelig å forutsi hvilke oversettelser som lykkes.'
  },
  {
    id: 'scott-pilarer',
    navn: 'Institusjonens tre pilarer',
    opphav: 'W. Richard Scott',
    aar: '1995',
    modul: 'omgivelser',
    kategori: 'Omgivelser',
    kjerne: 'Institusjoner hviler på tre pilarer som gir organisasjoner stabilitet og mening, hver med sin egen etterlevelsesmekanisme og legitimitetsgrunnlag.',
    punkter: [
      'Regulativ pilar: regler, lover og sanksjoner; etterlevelse av hensiktsmessighet',
      'Normativ pilar: verdier og forpliktelser; etterlevelse av sosial forpliktelse',
      'Kulturelt-kognitiv pilar: felles forståelser som tas for gitt; etterlevelse fordi noe annet er utenkelig'
    ],
    kritikk: 'Pilarene er analytisk atskilte, men vanskelige å skille empirisk.'
  },

  /* ---------- Motivasjon ---------- */
  {
    id: 'maslow',
    navn: 'Behovshierarkiet',
    opphav: 'Abraham Maslow',
    aar: '1943',
    modul: 'motivasjon',
    kategori: 'Motivasjon',
    kjerne: 'Menneskelige behov er ordnet i et hierarki. Behov på lavere nivå må være rimelig tilfredsstilt før behov på høyere nivå aktiveres som motivasjonskraft.',
    punkter: [
      'Fysiologiske behov – mat, søvn, lønn til livsopphold',
      'Trygghetsbehov – forutsigbarhet, fast ansettelse, HMS',
      'Sosiale behov – tilhørighet, vennskap, gruppe',
      'Anerkjennelse – status, respekt, mestring',
      'Selvrealisering – å utnytte sitt potensial fullt ut'
    ],
    kritikk: 'Svak empirisk støtte for den strenge rekkefølgen; kulturelt betinget; skiller ikke mellom behov og verdier.'
  },
  {
    id: 'herzberg',
    navn: 'Tofaktorteorien',
    opphav: 'Frederick Herzberg',
    aar: '1959',
    modul: 'motivasjon',
    kategori: 'Motivasjon',
    kjerne: 'Trivsel og mistrivsel er ikke to ender av samme skala, men skapes av forskjellige forhold. Hygienefaktorer fjerner mistrivsel, men motiverer ikke. Motivasjonsfaktorer skaper trivsel og motivasjon.',
    punkter: [
      'Hygienefaktorer: lønn, arbeidsforhold, personalpolitikk, ledelse, status, jobbtrygghet',
      'Motivasjonsfaktorer: prestasjon, anerkjennelse, arbeidet i seg selv, ansvar, vekst, forfremmelse',
      'Praktisk konsekvens: jobbberikelse framfor bare bedre betingelser'
    ],
    kritikk: 'Metodekritikk: den kritiske hendelse-metoden kan gi selvtjenende attribusjon. Lønn viser seg å ha mer komplekse virkninger.'
  },
  {
    id: 'selvbestemmelsesteori',
    navn: 'Selvbestemmelsesteorien',
    opphav: 'Edward Deci & Richard Ryan',
    aar: '1985',
    modul: 'motivasjon',
    kategori: 'Motivasjon',
    kjerne: 'Mennesket har tre psykologiske grunnbehov. Når de dekkes, oppstår indre motivasjon, bedre ytelse og høyere velvære. Ytre reguleringer kan internaliseres i ulik grad.',
    punkter: [
      'Autonomi: opplevelse av frivillighet og eget valg',
      'Kompetanse: opplevelse av mestring og effektivitet',
      'Tilhørighet: opplevelse av nære, trygge relasjoner',
      'Motivasjonskontinuum fra amotivasjon via ytre, introjisert, identifisert og integrert regulering til indre motivasjon',
      'Kontrollerende ytre belønning kan fortrenge indre motivasjon'
    ],
    kritikk: 'Fortrengningseffekten er kontekstavhengig; for rutinearbeid uten indre interesse virker ytre belønning godt.'
  },
  {
    id: 'forventningsteori',
    navn: 'Forventningsteori',
    opphav: 'Victor Vroom',
    aar: '1964',
    modul: 'motivasjon',
    kategori: 'Motivasjon',
    kjerne: 'Motivasjon er et produkt av tre vurderinger: at innsats gir resultat, at resultatet gir belønning, og at belønningen er verdt noe for meg. Er én av dem null, blir motivasjonen null.',
    punkter: [
      'Forventning (expectancy): innsats → prestasjon',
      'Instrumentalitet: prestasjon → belønning',
      'Valens: belønningens subjektive verdi',
      'Porter & Lawler utvidet modellen med evner, rolleforståelse og opplevd rettferdighet'
    ],
    kritikk: 'Forutsetter en bevisst, kalkulerende aktør; vanskelig å måle de tre komponentene presist.'
  },
  {
    id: 'rettferdighetsteori',
    navn: 'Rettferdighetsteori (Equity theory)',
    opphav: 'J. Stacy Adams',
    aar: '1963',
    modul: 'motivasjon',
    kategori: 'Motivasjon',
    kjerne: 'Ansatte sammenligner forholdet mellom egen innsats og egen belønning med det de tror gjelder for andre. Opplevd urettferdighet skaper spenning som må reduseres.',
    punkter: [
      'Reaksjoner ved underbetaling: redusere innsats, kreve mer, endre sammenligningsperson, forlate organisasjonen',
      'Overbetaling gir svakere og mer kortvarige reaksjoner',
      'Utvidet til organisatorisk rettferdighet: distributiv, prosedyremessig, interpersonlig og informasjonsmessig'
    ],
    kritikk: 'Sammenligningsgrunnlaget er subjektivt og ustabilt; vanskelig å forutsi hvem folk sammenligner seg med.'
  },
  {
    id: 'jobbkarakteristika',
    navn: 'Jobbkarakteristikamodellen',
    opphav: 'Richard Hackman & Greg Oldham',
    aar: '1976',
    modul: 'motivasjon',
    kategori: 'Motivasjon',
    kjerne: 'Fem trekk ved jobben skaper tre kritiske psykologiske tilstander, som igjen gir indre motivasjon, høy kvalitet, jobbtilfredshet og lavt fravær.',
    punkter: [
      'Variasjon i ferdigheter, oppgaveidentitet og oppgavebetydning → opplevd meningsfullhet',
      'Autonomi → opplevd ansvar for resultatet',
      'Tilbakemelding fra arbeidet → kunnskap om resultatene',
      'Effekten modereres av medarbeiderens vekstbehov og kompetanse',
      'Motiverende potensialskår (MPS) beregnes av de fem trekkene'
    ],
    kritikk: 'Selvrapportering gir fare for felles metodevarians; individuelle forskjeller undervurderes.'
  },
  {
    id: 'krav-kontroll',
    navn: 'Krav–kontroll–støtte-modellen',
    opphav: 'Robert Karasek; Jeffrey Johnson',
    aar: '1979 / 1988',
    modul: 'motivasjon',
    kategori: 'Arbeidsmiljø',
    kjerne: 'Jobbstress oppstår ikke av høye krav alene, men av kombinasjonen av høye krav og lav kontroll. Sosial støtte virker som en buffer.',
    punkter: [
      'Høye krav + lav kontroll = belastende jobb med helserisiko',
      'Høye krav + høy kontroll = aktiv jobb med læring og utvikling',
      'Lave krav + høy kontroll = avslappet jobb',
      'Lave krav + lav kontroll = passiv jobb med kompetansetap'
    ],
    kritikk: 'Fanger ikke opp alle stressorer, som rollekonflikt og emosjonelle krav; jobbkrav–ressurser-modellen (JD-R) er en videreutvikling.'
  },
  {
    id: 'psykologisk-kontrakt',
    navn: 'Psykologisk kontrakt',
    opphav: 'Denise Rousseau',
    aar: '1989/1995',
    modul: 'motivasjon',
    kategori: 'Motivasjon',
    kjerne: 'Ved siden av den formelle arbeidsavtalen finnes et sett uskrevne, subjektive forventninger om gjensidige forpliktelser mellom ansatt og arbeidsgiver.',
    punkter: [
      'Transaksjonell kontrakt: kortsiktig, økonomisk, spesifikk',
      'Relasjonell kontrakt: langsiktig, sosioemosjonell, åpen',
      'Kontraktsbrudd gir sterke reaksjoner: redusert innsats, tap av tillit, turnover',
      'Særlig relevant ved omstilling, nedbemanning og lederskifte'
    ],
    kritikk: 'Subjektiv og vanskelig å måle; partene har ofte ulik oppfatning av hva kontrakten inneholder.'
  },

  /* ---------- Kommunikasjon ---------- */
  {
    id: 'kanalrikhet',
    navn: 'Teorien om kanalrikhet',
    opphav: 'Richard Daft & Robert Lengel',
    aar: '1986',
    modul: 'kommunikasjon',
    kategori: 'Kommunikasjon',
    kjerne: 'Kommunikasjonskanaler varierer i evnen til å håndtere tvetydig informasjon. Effektiv kommunikasjon krever at kanalens rikhet matcher budskapets tvetydighet.',
    punkter: [
      'Rikhet bestemmes av tilbakemeldingshastighet, antall signaler, språklig variasjon og personlig fokus',
      'Rikeste kanal: ansikt til ansikt. Fattigste: standardiserte skriftlige rapporter',
      'Tvetydige budskap krever rike kanaler; entydige budskap kan sendes i fattige'
    ],
    kritikk: 'Utviklet før digitale medier; nyere forskning peker på at vane, tilgjengelighet og sosiale normer også styrer kanalvalg.'
  },
  {
    id: 'weick-sensemaking',
    navn: 'Meningsskaping (sensemaking)',
    opphav: 'Karl Weick',
    aar: '1979/1995',
    modul: 'kommunikasjon',
    kategori: 'Kommunikasjon',
    kjerne: 'Organisering er en pågående prosess der mennesker skaper mening i tvetydige situasjoner, i stor grad retrospektivt: vi forstår hva vi mener etter at vi har handlet og sett hva vi gjorde.',
    punkter: [
      'Sentrale trekk: identitetsbasert, retrospektiv, iscenesettende, sosial, pågående, basert på ledetråder, drevet av plausibilitet framfor nøyaktighet',
      'Enactment: organisasjoner skaper delvis de omgivelsene de senere må forholde seg til',
      'Løse koblinger og kollektiv oppmerksomhet i høypålitelighetsorganisasjoner',
      'Mann Gulch-brannen som illustrasjon på sammenbrudd i meningsskaping'
    ],
    kritikk: 'Vanskelig å operasjonalisere; gir få konkrete anbefalinger for praksis.'
  },
  {
    id: 'svake-band',
    navn: 'Styrken i svake bånd',
    opphav: 'Mark Granovetter',
    aar: '1973',
    modul: 'kommunikasjon',
    kategori: 'Nettverk',
    kjerne: 'Ny informasjon og nye muligheter kommer oftere gjennom perifere bekjentskaper enn gjennom nære relasjoner, fordi nære kontakter i stor grad kjenner til det samme som en selv.',
    punkter: [
      'Svake bånd fungerer som broer mellom ellers atskilte klynger',
      'Burts begrep om strukturelle hull: makt og informasjonsfordel tilfaller den som kobler adskilte nettverk',
      'Relevant for rekruttering, innovasjonsspredning og kunnskapsdeling på tvers av avdelinger'
    ],
    kritikk: 'Sterke bånd er viktigere når kunnskapen som skal overføres er kompleks og taus.'
  },

  /* ---------- Beslutninger ---------- */
  {
    id: 'begrenset-rasjonalitet',
    navn: 'Begrenset rasjonalitet',
    opphav: 'Herbert Simon',
    aar: '1947',
    modul: 'beslutning',
    kategori: 'Beslutning',
    kjerne: 'Mennesket forsøker å være rasjonelt, men har begrenset kapasitet til å skaffe og bearbeide informasjon. I stedet for å maksimere, satisfierer vi: vi velger det første alternativet som er godt nok.',
    punkter: [
      'Aspirasjonsnivået avgjør hva som er «godt nok», og justeres opp og ned med erfaring',
      'Beslutningsprosessen: intelligence, design, choice',
      'Organisasjonen kompenserer for individets begrensninger gjennom arbeidsdeling, rutiner og hierarki',
      'Nobelprisen i økonomi 1978'
    ],
    kritikk: 'Grensen mellom «godt nok» og «best» er uklar i praksis; senere atferdsøkonomi viser at avvikene fra rasjonalitet er mer systematiske enn Simon antok.'
  },
  {
    id: 'garbage-can',
    navn: 'Garbage can-modellen',
    opphav: 'Michael Cohen, James March & Johan P. Olsen',
    aar: '1972',
    modul: 'beslutning',
    kategori: 'Beslutning',
    kjerne: 'I organiserte anarkier – med uklare mål, uklar teknologi og skiftende deltakelse – er beslutninger utfall av tilfeldige møter mellom fire uavhengige strømmer.',
    punkter: [
      'Fire strømmer: problemer, løsninger, deltakere og beslutningsanledninger',
      'Løsninger kan lete etter problemer, ikke bare omvendt',
      'Beslutningsformer: løsning, oversight (forbigåelse) og flight (flukt)',
      'Timing og hvem som er til stede betyr mer enn analyse',
      'Utviklet med universiteter som empirisk utgangspunkt'
    ],
    kritikk: 'Beskriver ekstreme situasjoner; overdriver tilfeldigheten i organisasjoner med tydelig struktur.'
  },
  {
    id: 'inkrementalisme',
    navn: 'Inkrementalisme («muddling through»)',
    opphav: 'Charles Lindblom',
    aar: '1959',
    modul: 'beslutning',
    kategori: 'Beslutning',
    kjerne: 'Reelle beslutninger tas gjennom små, suksessive skritt fra dagens situasjon, ikke gjennom omfattende analyse av alle alternativer. Enighet om neste skritt er lettere å oppnå enn enighet om mål.',
    punkter: [
      'Sammenlignende, begrenset analyse av marginale endringer',
      'Mål og midler vurderes samtidig, ikke i rekkefølge',
      'Gjensidig tilpasning mellom mange deltakere gir en form for koordinering uten sentral plan',
      'Test på god beslutning: at partene er enige, ikke at målet er objektivt best'
    ],
    kritikk: 'Konservativ; egner seg dårlig når raske og grunnleggende skifter er nødvendige.'
  },
  {
    id: 'gruppetenkning',
    navn: 'Gruppetenkning',
    opphav: 'Irving Janis',
    aar: '1972',
    modul: 'beslutning',
    kategori: 'Beslutning',
    kjerne: 'Sterkt sammensveisede grupper under press kan sette enighet foran realistisk vurdering av alternativer, og treffe svært dårlige beslutninger.',
    punkter: [
      'Betingelser: høy samhold, isolasjon, dirigerende leder, stress, ingen prosedyrer for kritisk vurdering',
      'Symptomer: illusjon om usårbarhet, kollektiv bortforklaring, tro på egen moralske overlegenhet, stereotypier om motparten, press mot avvikere, selvsensur, illusjon om enstemmighet, tankevoktere',
      'Konsekvenser: ufullstendig gjennomgang av alternativer, skjev informasjonssøking, ingen beredskapsplan',
      'Mottiltak: djevelens advokat, uavhengige undergrupper, lederen holder tilbake eget syn, eksterne eksperter'
    ],
    kritikk: 'Bygger på retrospektive casestudier av fiaskoer; eksperimentell støtte er blandet.'
  },
  {
    id: 'prospektteori',
    navn: 'Prospektteori og heuristikker',
    opphav: 'Daniel Kahneman & Amos Tversky',
    aar: '1974/1979',
    modul: 'beslutning',
    kategori: 'Beslutning',
    kjerne: 'Beslutninger under usikkerhet følger mentale snarveier og systematiske skjevheter. Vi vurderer utfall som gevinster og tap fra et referansepunkt, og tap veier omtrent dobbelt så tungt som tilsvarende gevinst.',
    punkter: [
      'Heuristikker: tilgjengelighet, representativitet, forankring og justering',
      'Tapsaversjon og innrammingseffekt',
      'System 1 (rask, intuitiv) og system 2 (langsom, analytisk)',
      'Risikosøkende atferd i tapsdomenet forklarer eskalerende forpliktelse'
    ],
    kritikk: 'Mange laboratoriefunn; replikasjonsdebatten har svekket enkelte effekter innen atferdsvitenskapen.'
  },
  {
    id: 'allison',
    navn: 'Tre beslutningsmodeller',
    opphav: 'Graham Allison',
    aar: '1971',
    modul: 'beslutning',
    kategori: 'Beslutning',
    kjerne: 'Samme beslutning kan forklares på tre grunnleggende ulike måter, og valget av modell avgjør hva man i det hele tatt får øye på.',
    punkter: [
      'Modell I – rasjonell aktør: organisasjonen som én aktør som maksimerer nytte',
      'Modell II – organisatorisk prosess: utfallet følger av standardprosedyrer og rutiner',
      'Modell III – byråkratisk politikk: utfallet er resultat av forhandling mellom aktører med ulike interesser',
      'Illustrert med Cubakrisen i 1962'
    ],
    kritikk: 'Modellene overlapper; vanskelig å avgjøre hvilken som er «riktig» i et gitt tilfelle.'
  },

  /* ---------- Makt og konflikt ---------- */
  {
    id: 'french-raven',
    navn: 'Maktbaser',
    opphav: 'John French & Bertram Raven',
    aar: '1959',
    modul: 'makt',
    kategori: 'Makt',
    kjerne: 'Makt i organisasjoner hviler på fem (senere seks) ulike grunnlag, som gir forskjellige typer respons hos den som påvirkes.',
    punkter: [
      'Legitim makt – formell posisjon',
      'Belønningsmakt – kontroll over goder',
      'Tvangsmakt – mulighet for sanksjoner',
      'Ekspertmakt – kunnskap og kompetanse',
      'Referentmakt – identifikasjon og beundring',
      'Informasjonsmakt – kontroll over informasjon (lagt til senere)',
      'Personlige baser gir forpliktelse; posisjonsbaser gir føyelighet; tvang gir motstand'
    ],
    kritikk: 'Kategoriene overlapper og sier lite om hvordan makt utøves over tid.'
  },
  {
    id: 'lukes',
    navn: 'Maktens tre dimensjoner',
    opphav: 'Steven Lukes; Bachrach & Baratz; Dahl',
    aar: '1974',
    modul: 'makt',
    kategori: 'Makt',
    kjerne: 'Makt virker på tre nivåer: i åpne beslutningskonflikter, i kontrollen over dagsordenen, og i formingen av hva folk oppfatter som sine egne interesser.',
    punkter: [
      'Første ansikt: A får B til å gjøre noe B ellers ikke ville gjort (Dahl)',
      'Andre ansikt: ikke-beslutninger og dagsordenmakt (Bachrach & Baratz)',
      'Tredje ansikt: bevissthetskontroll; konflikten oppstår aldri (Lukes)',
      'Foucault utvider med disiplinerende makt og selvregulering'
    ],
    kritikk: 'Det tredje ansiktet forutsetter at forskeren kan avgjøre hva som er folks «virkelige» interesser.'
  },
  {
    id: 'strategisk-kontingens',
    navn: 'Strategisk kontingensteori om makt',
    opphav: 'David Hickson m.fl.; Michel Crozier',
    aar: '1971 / 1964',
    modul: 'makt',
    kategori: 'Makt',
    kjerne: 'Makt i organisasjoner tilfaller enheter og personer som håndterer kritisk usikkerhet, er vanskelige å erstatte, og er sentralt plassert i arbeidsflyten.',
    punkter: [
      'Usikkerhetshåndtering er den viktigste maktkilden',
      'Substituerbarhet reduserer makt; unikhet øker den',
      'Sentralitet i arbeidsflyten gir gjennomslag',
      'Crozier: vedlikeholdsmekanikerne i tobakksfabrikken hadde uformell makt fordi maskinstans var den siste kilden til uforutsigbarhet'
    ],
    kritikk: 'Undervurderer institusjonelle og kulturelle maktformer som ikke følger arbeidsflyten.'
  },
  {
    id: 'thomas-kilmann',
    navn: 'Konflikthåndteringsstiler',
    opphav: 'Kenneth Thomas & Ralph Kilmann',
    aar: '1974',
    modul: 'makt',
    kategori: 'Konflikt',
    kjerne: 'Konflikthåndtering kan beskrives langs to dimensjoner – grad av selvhevdelse og grad av samarbeidsvilje – som gir fem stiler.',
    punkter: [
      'Konkurrere: høy selvhevdelse, lav samarbeidsvilje',
      'Samarbeide: høy på begge – eneste stil som kan gi vinn-vinn',
      'Kompromiss: middels på begge',
      'Unngå: lav på begge',
      'Tilpasse seg: lav selvhevdelse, høy samarbeidsvilje',
      'Ingen stil er best i alle situasjoner'
    ],
    kritikk: 'Måler selvrapportert preferanse, ikke faktisk atferd i konflikt.'
  },
  {
    id: 'prinsipiell-forhandling',
    navn: 'Prinsipiell forhandling',
    opphav: 'Roger Fisher & William Ury',
    aar: '1981',
    modul: 'makt',
    kategori: 'Konflikt',
    kjerne: 'Forhandling bør flyttes fra posisjonskamp til gjensidig problemløsning, slik at kaken utvides før den fordeles.',
    punkter: [
      'Skill sak fra person',
      'Fokuser på interesser, ikke posisjoner',
      'Utvikle flere alternativer før du velger',
      'Bruk objektive kriterier',
      'BATNA – den beste alternative løsningen ved brudd – bestemmer forhandlingsmakten'
    ],
    kritikk: 'Forutsetter at motparten også vil samarbeide; mindre nyttig i rene fordelingskonflikter.'
  },
  {
    id: 'prinsipal-agent',
    navn: 'Prinsipal–agent-teori',
    opphav: 'Jensen & Meckling; Eisenhardt',
    aar: '1976 / 1989',
    modul: 'makt',
    kategori: 'Styring',
    kjerne: 'Når en prinsipal (eier, leder) delegerer oppgaver til en agent (ansatt) med ulike interesser og asymmetrisk informasjon, oppstår styringsproblemer.',
    punkter: [
      'Skjult handling (moral hazard) og skjult informasjon (ugunstig utvalg)',
      'Løsninger: overvåking, insentivkontrakter, resultatmåling',
      'Agentkostnader: overvåkings-, bindings- og residualkostnader',
      'Grunnlaget for mye av moderne resultatstyring og bonusordninger'
    ],
    kritikk: 'Pessimistisk menneskesyn; forvalterteori (stewardship theory) framholder at ansatte ofte deler organisasjonens mål og motiveres av ansvar snarere enn av kontroll.'
  },

  /* ---------- Ledelse ---------- */
  {
    id: 'transformasjonsledelse',
    navn: 'Transformasjons- og transaksjonsledelse',
    opphav: 'James MacGregor Burns; Bernard Bass',
    aar: '1978 / 1985',
    modul: 'ledelse',
    kategori: 'Ledelse',
    kjerne: 'Transaksjonsledelse bygger på bytteforhold mellom innsats og belønning. Transformasjonsledelse hever medarbeidernes motiver og verdier, og gir en tilleggseffekt utover det transaksjonsledelse alene oppnår.',
    punkter: [
      'De fire I-ene: idealisert innflytelse, inspirerende motivasjon, intellektuell stimulering, individuell oppmerksomhet',
      'Transaksjonsformer: betinget belønning, ledelse ved unntak (aktiv og passiv)',
      'La-det-skure-ledelse er fravær av ledelse, ikke en mild variant',
      'Måles med Multifactor Leadership Questionnaire (MLQ)'
    ],
    kritikk: 'Romantiserer lederen, blander atferd og effekt i målingene, og tar utilstrekkelig høyde for at karisma kan brukes destruktivt.'
  },
  {
    id: 'situasjonsbestemt-ledelse',
    navn: 'Situasjonsbestemt ledelse',
    opphav: 'Paul Hersey & Kenneth Blanchard',
    aar: '1969',
    modul: 'ledelse',
    kategori: 'Ledelse',
    kjerne: 'Effektiv lederstil avhenger av medarbeiderens kompetanse og motivasjon for den aktuelle oppgaven. Lederen bør variere mellom styrende og støttende atferd.',
    punkter: [
      'S1 Instruerende – lav kompetanse, høy vilje',
      'S2 Coachende/overtalende – noe kompetanse, lav vilje',
      'S3 Deltakende/støttende – høy kompetanse, varierende vilje',
      'S4 Delegerende – høy kompetanse, høy vilje',
      'Modenhet vurderes per oppgave, ikke som en fast egenskap ved personen'
    ],
    kritikk: 'Svak empirisk støtte til tross for stor popularitet i lederopplæring; modenhetsbegrepet er uklart definert.'
  },
  {
    id: 'fiedler',
    navn: 'Fiedlers kontingensmodell',
    opphav: 'Fred Fiedler',
    aar: '1967',
    modul: 'ledelse',
    kategori: 'Ledelse',
    kjerne: 'Lederstil er relativt stabil og måles med LPC-skalaen (Least Preferred Coworker). Effektivitet oppstår når stilen matcher hvor gunstig situasjonen er.',
    punkter: [
      'Situasjonsgunstighet bestemmes av leder–medarbeider-relasjon, oppgavestruktur og posisjonsmakt',
      'Oppgaveorienterte (lav LPC) presterer best i svært gunstige og svært ugunstige situasjoner',
      'Relasjonsorienterte (høy LPC) presterer best i moderat gunstige situasjoner',
      'Praktisk anbefaling: endre situasjonen eller bytt leder, ikke lær lederen en ny stil'
    ],
    kritikk: 'LPC-målets validitet er omstridt; antakelsen om at lederstil er uforanderlig er lite plausibel.'
  },
  {
    id: 'lmx',
    navn: 'LMX – leder–medarbeider-utveksling',
    opphav: 'George Graen & Mary Uhl-Bien',
    aar: '1975/1995',
    modul: 'ledelse',
    kategori: 'Ledelse',
    kjerne: 'Ledelse skjer i den enkelte relasjonen mellom leder og medarbeider. Ledere utvikler ulike relasjoner til ulike medarbeidere, med ulik grad av tillit, respekt og gjensidig forpliktelse.',
    punkter: [
      'Inngruppe: høy LMX, tillit, utvidede oppgaver, uformell støtte',
      'Utgruppe: lav LMX, rent kontraktsmessig forhold',
      'Høy LMX henger sammen med jobbtilfredshet, ytelse og lavere turnover',
      'Relasjonen utvikles i faser: fremmed, bekjentskap, moden partner'
    ],
    kritikk: 'Reiser rettferdighetsproblemer: differensiering kan oppleves som forskjellsbehandling og svekke gruppen.'
  },
  {
    id: 'destruktiv-ledelse',
    navn: 'Destruktiv ledelse',
    opphav: 'Ståle Einarsen, Merethe Aasland & Anders Skogstad',
    aar: '2007',
    modul: 'ledelse',
    kategori: 'Ledelse',
    kjerne: 'Systematisk og gjentatt atferd fra en leder som undergraver organisasjonens mål, oppgaver, ressurser og effektivitet, og/eller medarbeidernes motivasjon, trivsel og jobbtilfredshet.',
    punkter: [
      'Tyrannisk ledelse: støtter organisasjonens mål, men undergraver medarbeiderne',
      'Utro/illojal ledelse: støtter medarbeiderne, men undergraver organisasjonen',
      'Avsporet ledelse: undergraver begge deler',
      'La-det-skure-ledelse: passiv unnlatelse; den vanligste og mest undervurderte formen',
      'Destruktiv ledelse er ikke bare fravær av god ledelse, men en egen dimensjon'
    ],
    kritikk: 'Basert på selvrapportering fra medarbeidere; grensen mot tydelig, men upopulær ledelse kan være vanskelig å trekke.'
  },
  {
    id: 'mintzberg-lederroller',
    navn: 'Mintzbergs lederroller',
    opphav: 'Henry Mintzberg',
    aar: '1973',
    modul: 'ledelse',
    kategori: 'Ledelse',
    kjerne: 'Observasjonsstudier viser at lederarbeid er fragmentert, muntlig og avbruddspreget, ikke systematisk planleggende slik klassisk teori antok. Arbeidet kan beskrives med ti roller i tre grupper.',
    punkter: [
      'Interpersonlige roller: gallionsfigur, anfører, forbindelsesledd',
      'Informasjonsroller: overvåker, informasjonsspreder, talsperson',
      'Beslutningsroller: entreprenør, kriseløser, ressursfordeler, forhandler'
    ],
    kritikk: 'Beskrivende, ikke normativ: sier hva ledere gjør, ikke hva de burde gjøre.'
  },

  /* ---------- Endring og læring ---------- */
  {
    id: 'lewin',
    navn: 'Trestegsmodellen og kraftfeltanalyse',
    opphav: 'Kurt Lewin',
    aar: '1947',
    modul: 'endring',
    kategori: 'Endring',
    kjerne: 'Planlagt endring skjer i tre faser: opptining, endring og nedfrysing. Enhver situasjon holdes i likevekt av drivkrefter og motkrefter.',
    punkter: [
      'Opptining: skape erkjennelse av behov, løsne opp etablerte mønstre',
      'Endring: innføre ny praksis, ny struktur, ny atferd',
      'Nedfrysing: forankre og stabilisere det nye',
      'Kraftfeltanalyse: mer effektivt å svekke motkrefter enn å øke drivkrefter',
      'Lewin la også grunnlaget for aksjonsforskning og gruppedynamikk'
    ],
    kritikk: '«Nedfrysing» passer dårlig i organisasjoner med kontinuerlig endring; kritisert for å være for lineær.'
  },
  {
    id: 'kotter',
    navn: 'Kotters åtte trinn',
    opphav: 'John P. Kotter',
    aar: '1996',
    modul: 'endring',
    kategori: 'Endring',
    kjerne: 'Store endringsprosesser mislykkes fordi ledere hopper over trinn eller erklærer seier for tidlig. Åtte trinn må gjennomføres i rekkefølge.',
    punkter: [
      '1 Skap kriseforståelse, 2 Etabler styrende koalisjon, 3 Utvikle visjon og strategi, 4 Kommuniser visjonen',
      '5 Fjern hindringer, 6 Skap kortsiktige gevinster, 7 Konsolider og driv videre, 8 Forankre i kulturen',
      'Kriseforståelse er det vanligste og mest kritiske feiltrinnet'
    ],
    kritikk: 'Normativ og lineær; bygger på erfaring snarere enn systematisk forskning, og passer dårlig for framvoksende endring.'
  },
  {
    id: 'punktert-likevekt',
    navn: 'Punktert likevekt',
    opphav: 'Michael Tushman & Elaine Romanelli',
    aar: '1985',
    modul: 'endring',
    kategori: 'Endring',
    kjerne: 'Organisasjoner utvikler seg gjennom lange perioder med inkrementell tilpasning innenfor en stabil grunnstruktur, avbrutt av korte og omfattende omveltninger som endrer alt på én gang.',
    punkter: [
      'Konvergensperioder gir økende effektivitet, men også økende treghet',
      'Omveltninger utløses av ytelsesfall, teknologiskift eller lederskifte',
      'Toppledelsen spiller en avgjørende rolle i omveltningsfasene',
      'Kobles til ambidekstre organisasjoner som forsøker begge deler samtidig'
    ],
    kritikk: 'Vanskelig å avgjøre hva som er «grunnstruktur»; noen bransjer viser kontinuerlig snarere enn punktert endring.'
  },
  {
    id: 'argyris-schon',
    navn: 'Enkelt- og dobbeltkretslæring',
    opphav: 'Chris Argyris & Donald Schön',
    aar: '1978',
    modul: 'laering',
    kategori: 'Læring',
    kjerne: 'Organisasjoner kan korrigere handlinger innenfor gjeldende mål og antakelser (enkeltkretslæring), eller stille spørsmål ved selve målene og antakelsene (dobbeltkretslæring).',
    punkter: [
      'Enkeltkretslæring: «gjør vi tingene riktig?»',
      'Dobbeltkretslæring: «gjør vi de riktige tingene?»',
      'Deuterolæring: å lære å lære',
      'Uttrykt teori mot bruksteori: det vi sier vi gjør, mot det vi faktisk gjør',
      'Defensive rutiner beskytter mot ubehag og blokkerer dobbeltkretslæring'
    ],
    kritikk: 'Dobbeltkretslæring er lettere å beskrive enn å få til; krever psykologisk trygghet og tid som få organisasjoner har.'
  },
  {
    id: 'seki',
    navn: 'SEKI-modellen for kunnskapsutvikling',
    opphav: 'Ikujiro Nonaka & Hirotaka Takeuchi',
    aar: '1995',
    modul: 'laering',
    kategori: 'Læring',
    kjerne: 'Ny kunnskap skapes i en spiral mellom taus og eksplisitt kunnskap, gjennom fire omformingsmoduser.',
    punkter: [
      'Sosialisering: taus → taus, gjennom felles erfaring og mesterlære',
      'Eksternalisering: taus → eksplisitt, gjennom metaforer, dialog og dokumentasjon',
      'Kombinering: eksplisitt → eksplisitt, gjennom systematisering og analyse',
      'Internalisering: eksplisitt → taus, gjennom øvelse og learning by doing',
      '«Ba» er den delte arenaen der kunnskapsutvikling kan skje'
    ],
    kritikk: 'Bygger på japanske storkonsern; taus kunnskap lar seg neppe gjøre eksplisitt så lett som modellen antyder.'
  },
  {
    id: 'senge',
    navn: 'Den lærende organisasjon',
    opphav: 'Peter Senge',
    aar: '1990',
    modul: 'laering',
    kategori: 'Læring',
    kjerne: 'En lærende organisasjon utvikler kontinuerlig sin evne til å skape sin egen framtid, gjennom fem disipliner som må utvikles sammen.',
    punkter: [
      'Personlig mestring',
      'Mentale modeller',
      'Felles visjon',
      'Gruppelæring',
      'Systemtenkning – den femte disiplinen som binder de andre sammen',
      'Læringshemninger: «jeg er min stilling», «fienden der ute», illusjonen om å ta ansvar'
    ],
    kritikk: 'Normativ og idealistisk; vanskelig å operasjonalisere og måle empirisk.'
  },
  {
    id: 'march-exploration',
    navn: 'Utforskning og utnyttelse',
    opphav: 'James G. March',
    aar: '1991',
    modul: 'laering',
    kategori: 'Læring',
    kjerne: 'Organisasjoner må fordele knappe ressurser mellom å utnytte eksisterende kunnskap og å utforske nye muligheter. Balansen er vanskelig fordi utnyttelse gir sikrere og raskere avkastning.',
    punkter: [
      'Exploitation: forbedring, effektivisering, raffinering – nær og sikker avkastning',
      'Exploration: eksperimentering, variasjon, risikotaking – fjern og usikker avkastning',
      'Kompetansefelle: suksess med det man kan, forsterker ensidig utnyttelse',
      'Ambidekstre organisasjoner (O\'Reilly & Tushman) håndterer begge, strukturelt eller i tid'
    ],
    kritikk: 'Balansepunktet er situasjonsavhengig og gir få konkrete anvisninger.'
  },
  {
    id: 'psykologisk-trygghet',
    navn: 'Psykologisk trygghet',
    opphav: 'Amy Edmondson',
    aar: '1999',
    modul: 'laering',
    kategori: 'Læring',
    kjerne: 'En delt oppfatning i et team om at det er trygt å ta mellommenneskelig risiko: å stille spørsmål, innrømme feil, be om hjelp og komme med avvikende synspunkter.',
    punkter: [
      'Forutsetning for læring i team og for at feil rapporteres i stedet for skjules',
      'Ikke det samme som lave krav – kombineres best med høye prestasjonskrav',
      'Bygges av ledere som rammer inn arbeidet som læringsproblem, innrømmer egen feilbarlighet og inviterer til deltakelse',
      'Sterk empirisk støtte, blant annet i Googles Project Aristotle'
    ],
    kritikk: 'Populariseringen har gjort begrepet uklart; forveksles ofte med trivsel og konfliktfrihet.'
  },
  {
    id: 'disruptiv-innovasjon',
    navn: 'Disruptiv innovasjon',
    opphav: 'Clayton Christensen',
    aar: '1997',
    modul: 'laering',
    kategori: 'Innovasjon',
    kjerne: 'Etablerte, veldrevne selskaper taper mot nykommere fordi de lytter til sine beste kunder og prioriterer høymarginprodukter, mens disruptive teknologier vokser fram i segmenter de har valgt bort.',
    punkter: [
      'Oppretteholdende innovasjon forbedrer eksisterende produkter for eksisterende kunder',
      'Disruptiv innovasjon starter enklere og billigere, i lavmargin- eller nye markeder',
      'Innovatørens dilemma: god ledelse etter etablerte kriterier er nettopp det som feller selskapet',
      'Motstrategi: skille ut den nye virksomheten i en egen enhet med egne mål'
    ],
    kritikk: 'Begrepet brukes altfor bredt; historiske caseutvalg er kritisert for etterpåklokskap.'
  },
  {
    id: 'organisatorisk-hykleri',
    navn: 'Organisert hykleri',
    opphav: 'Nils Brunsson',
    aar: '1989',
    modul: 'omgivelser',
    kategori: 'Omgivelser',
    kjerne: 'Når organisasjoner møter motstridende krav fra omgivelsene, kan de svare ved å la prat, beslutning og handling peke i ulike retninger. Hykleriet er ikke moralsk svikt, men en systematisk løsning på et umulig krysspress.',
    punkter: [
      'Prat tilfredsstiller én gruppe, beslutninger en annen, handling en tredje',
      'Særlig utbredt i politiske organisasjoner med mange interessenter',
      'Beslektet med Meyer og Rowans dekobling',
      'Forklarer hvorfor reformer vedtas gang på gang uten å bli iverksatt'
    ],
    kritikk: 'Kan brukes til å bortforklare reell ansvarsfraskrivelse.'
  }
];
