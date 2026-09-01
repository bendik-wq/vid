/* Caseoppgaver med veiledende svar. */
window.OT = window.OT || {};
window.OT.cases = [
  {
    id: 'c-struktur-vekst',
    modul: 'struktur',
    tittel: 'Vekstsmerter i Nordvik Teknologi',
    tid: '25 min',
    scenario: 'Nordvik Teknologi startet for seks år siden med fire ansatte og en gründer som tok alle beslutninger over lunsjbordet. I dag er de 140 ansatte fordelt på utvikling, salg, kundeservice og drift, med kontorer i tre byer. Gründeren er fortsatt daglig leder og involverer seg i det meste. Utviklingsavdelingen klager over at salg lover funksjoner som ikke finnes. Kundeservice får ikke beskjed om nye lanseringer. Beslutninger stopper opp fordi «alt må innom Kristian». Sykefraværet stiger, og tre nøkkelutviklere har sluttet det siste halvåret.',
    sporsmal: [
      'Diagnostiser situasjonen med begreper fra strukturteorien. Hvilken konfigurasjon har selskapet, og hvilken er det på vei mot?',
      'Hvilke koordineringsmekanismer brukes i dag, og hvilke bør tas i bruk?',
      'Foreslå et konkret strukturgrep, og drøft hva som taler mot det.'
    ],
    teorier: ['mintzberg-konfigurasjoner', 'burns-stalker', 'thompson-avhengighet', 'chandler'],
    veiledende: 'Selskapet er en klassisk <strong>enkel struktur</strong> (entreprenørorganisasjon) som har vokst ut av formen sin. Koordineringen skjer fortsatt ved <em>direkte tilsyn</em> fra gründeren, som var effektivt ved fire ansatte, men som blir en flaskehals ved 140. Symptomene – beslutningskø, manglende informasjonsflyt mellom salg, utvikling og kundeservice, og turnover – er typiske for at kontrollspennet og gründerens kognitive kapasitet er overskredet.\n\nAvhengigheten mellom salg, utvikling og kundeservice er i Thompsons terminologi <em>gjensidig</em>: salg lover noe utvikling må levere, og kundeservice må håndtere det som faktisk kommer ut. Gjensidig avhengighet kan ikke koordineres med direkte tilsyn alene; den krever <em>gjensidig tilpasning</em> gjennom faste, tverrgående møtepunkter, og etter hvert <em>standardisering av arbeidsprosesser</em> (lanseringsrutiner, produktkrav) og <em>standardisering av resultater</em> (klare leveransemål per enhet).\n\nEt naturlig strukturgrep er å innføre et mellomledernivå med reell delegert myndighet, samtidig som man etablerer en formalisert lanseringsprosess på tvers. Chandlers tese om at struktur følger strategi er relevant: veksten har allerede skjedd, strukturen henger etter. Motargumentene er reelle: økt formalisering kan svekke den fleksibiliteten og hurtigheten som var selskapets fortrinn (jf. Burns og Stalker om organiske former i dynamiske omgivelser), og gründeren må faktisk slippe kontroll for at delegeringen skal bli mer enn formell. Uten det siste får man bare et ekstra ledd i beslutningskøen.'
  },
  {
    id: 'c-kultur-fusjon',
    modul: 'kultur',
    tittel: 'Fusjonen som ikke satt seg',
    tid: '25 min',
    scenario: 'To ingeniørselskaper fusjonerte for atten måneder siden. Ledelsen lanserte nye felles verdier – «åpenhet, samarbeid, mot» – med kick-off, plakater og felles logo. Likevel omtaler ansatte fortsatt seg selv som «gamle Bergstad» og «gamle Torvik». I møter presenterer Bergstad-folkene ferdige analyser, mens Torvik-folkene forventer at man tenker høyt sammen. Bergstad-ansatte opplever Torvik som uforberedte; Torvik-ansatte opplever Bergstad som lukkede. Ingen tar dette opp i plenum.',
    sporsmal: [
      'Analyser situasjonen ved hjelp av Scheins tre kulturnivåer.',
      'Hvorfor er ikke verdiarbeidet nok til å skape én kultur?',
      'Hva ville du gjort som HR-direktør?'
    ],
    teorier: ['schein-kultur', 'argyris-schon', 'psykologisk-trygghet'],
    veiledende: 'De nye verdiene, plakatene og logoen ligger på Scheins <strong>nivå 1 og 2</strong>: artefakter og uttrykte verdier. Selvbetegnelsene «gamle Bergstad» og «gamle Torvik» er også artefakter – de forteller at identiteten fortsatt følger de gamle grensene.\n\nDen egentlige forskjellen ligger på <strong>nivå 3</strong>, i grunnleggende antakelser om hvordan kunnskap skapes og deles. Bergstad har en antakelse om at man kommer til møtet med et gjennomarbeidet svar; Torvik har en antakelse om at svaret skapes i rommet. Ingen av delene er uttalt, og begge oppleves som selvfølgelige – derfor tolkes den andres atferd som en karakterbrist («uforberedt», «lukket») snarere enn som en annen kulturell logikk.\n\nVerdiarbeidet er utilstrekkelig fordi det opererer på nivå 2 og adresserer aldri nivå 3. Her er Argyris og Schöns skille mellom <em>uttrykt teori</em> og <em>bruksteori</em> presist: organisasjonen sier «åpenhet», men bruksteorien i begge leire tilsier at man ikke tar opp friksjonen direkte. At ingen løfter temaet i plenum, tyder også på lav <em>psykologisk trygghet</em> på tvers av de gamle grensene.\n\nSom HR-direktør ville jeg flyttet arbeidet fra verdiformuleringer til konkret praksis: kartlegge de faktiske arbeidsmåtene i begge leire, gjøre forskjellene eksplisitte og legitime i felles fora, og bli enige om hvordan man rent konkret kjører et møte, en beslutning og en leveranse. Blandede team med reelle felles oppgaver bygger ny felles erfaring – som er den eneste kilden til nye grunnleggende antakelser. Endring på nivå 3 tar år, ikke måneder, og forutsetter at ledere selv modellerer den nye praksisen.'
  },
  {
    id: 'c-motivasjon-bonus',
    modul: 'motivasjon',
    tittel: 'Bonusordningen som slo tilbake',
    tid: '20 min',
    scenario: 'En kommunal saksbehandlingsenhet innførte en resultatbonus knyttet til antall behandlede saker per måned. Første halvår økte antall behandlede saker med 22 %. Deretter begynte klagene å komme: flere vedtak ble omgjort av klageinstansen, de vanskeligste sakene ble liggende, og to erfarne saksbehandlere sa opp med begrunnelsen at «dette er ikke lenger en jobb jeg kan stå inne for».',
    sporsmal: [
      'Forklar hva som skjedde med begreper fra motivasjonsteori og målteori.',
      'Hvilke premisser sviktet i utformingen av ordningen?',
      'Foreslå en alternativ tilnærming, og begrunn den teoretisk.'
    ],
    teorier: ['selvbestemmelsesteori', 'maalsettingsteori', 'jobbkarakteristika', 'forventningsteori'],
    veiledende: 'To mekanismer virker samtidig. For det første <strong>målforskyvning</strong>: bonusen målte kvantitet, og kvantitet ble det operative målet, mens kvaliteten – det egentlige formålet – ble usynlig i styringen. At de vanskeligste sakene blir liggende, er rasjonell tilpasning til insentivet, ikke latskap. For det andre <strong>fortrengning av indre motivasjon</strong>: for profesjonsutøvere er faglig forsvarlighet en kilde til indre motivasjon. Når ordningen tvinger dem til å handle mot eget faglig skjønn, svekkes både autonomi og opplevd kompetanse – to av de tre grunnbehovene i selvbestemmelsesteorien. Oppsigelsene med faglig begrunnelse er et tydelig uttrykk for dette, og kan også leses som brudd på den <em>psykologiske kontrakten</em> om hva slags arbeid man er ansatt for å gjøre.\n\nPremissene som sviktet: Locke og Latham forutsetter at målet er akseptert og at det finnes tilbakemelding på det som faktisk betyr noe. Her ble et endimensjonalt mål påført et flerdimensjonalt arbeid. Vrooms forventningsteori forklarer også hvorfor effekten var sterk i starten – koblingen innsats → resultat → belønning var svært tydelig – og nettopp derfor ble vridningen så kraftig.\n\nAlternativt bør man måle på flere dimensjoner samtidig, inkludert omgjøringsprosent, saksalder og brukertilfredshet, slik prinsippet i balansert målstyring tilsier, og legge mer vekt på jobbdesign enn på insentiver: oppgavebetydning, autonomi og reell faglig tilbakemelding, jf. Hackman og Oldham. For komplekst kunnskapsarbeid taler forskningen for at man sikrer opplevd rettferdig grunnlønn og deretter bygger på indre motivasjon, framfor å styre gjennom stykkbasert bonus.'
  },
  {
    id: 'c-beslutning-styremote',
    modul: 'beslutning',
    tittel: 'Styret som ikke ville høre',
    tid: '20 min',
    scenario: 'Et styre i et mellomstort industriselskap har jobbet tett sammen i syv år. Styrelederen er en karismatisk bransjeveteran som alltid åpner sakene med sin egen vurdering. Selskapet vurderer et stort oppkjøp i et marked de ikke kjenner. Finansdirektøren har innvendinger, men nevner dem bare kort i gangen etterpå. På styremøtet stemmer alle for. Analysen som ble lagt fram, var utarbeidet av et konsulentselskap som også får oppdraget med å gjennomføre integrasjonen. Ingen alternativer ble presentert.',
    sporsmal: [
      'Identifiser minst fire beslutningsteoretiske problemer i denne prosessen.',
      'Hvilke konkrete tiltak ville redusert risikoen?'
    ],
    teorier: ['gruppetenkning', 'prospektteori', 'begrenset-rasjonalitet', 'prinsipal-agent'],
    veiledende: 'Prosessen viser flere klassiske svakheter samtidig.\n\n<strong>Gruppetenkning</strong> (Janis): høyt samhold gjennom syv år, en dirigerende leder som markerer sitt syn først, ingen prosedyre for kritisk vurdering, og en illusjon om enstemmighet. Finansdirektørens selvsensur – innvendingene kommer i gangen, ikke i møtet – er et lærebokeksempel, og tyder på lav psykologisk trygghet i styret.\n\n<strong>Forankring</strong>: styrelederens åpningsvurdering setter et anker som resten av diskusjonen justerer utilstrekkelig fra. <strong>Bekreftelsesfellen</strong> forsterkes av at bare ett alternativ ble utredet; når ingen alternativer finnes, blir vurderingen en ja/nei-avstemning framfor et reelt valg. Det er også et brudd på Simons <em>design</em>-fase: alternativer skal genereres før man velger.\n\n<strong>Interessekonflikt</strong>: konsulentselskapet som anbefaler oppkjøpet, tjener på at det gjennomføres. Dette er et prinsipal–agent-problem med asymmetrisk informasjon – styret kan ikke uavhengig vurdere kvaliteten på analysen de har fått.\n\nTiltak: innhent en uavhengig second opinion fra en aktør uten interesse i utfallet; krev at minst to reelle alternativer utredes, inkludert nullalternativet; la styrelederen uttale seg sist; utnevn en formell djevelens advokat eller del styret i to undergrupper som vurderer saken hver for seg; gjennomfør en <em>premortem</em> der styret forestiller seg at oppkjøpet har mislyktes om tre år og forklarer hvorfor. Sistnevnte er særlig effektivt fordi det gjør det sosialt legitimt å uttrykke tvil.'
  },
  {
    id: 'c-omgivelser-reform',
    modul: 'omgivelser',
    tittel: 'Kvalitetssystemet ingen bruker',
    tid: '20 min',
    scenario: 'En videregående skole innførte for tre år siden et omfattende kvalitetssikringssystem etter krav fra skoleeier, og etter at nabofylket hadde gjort det samme. Systemet krever at lærerne dokumenterer vurderingspraksis i et digitalt verktøy. I tilsynsrapporter framstår skolen som forbilledlig. I praksis fyller lærerne ut skjemaene i siste liten før rapporteringsfristen, og planlegger undervisningen som før. Rektor vet dette, men ser det som en akseptabel arbeidsdeling.',
    sporsmal: [
      'Analyser innføringen av systemet med nyinstitusjonell teori.',
      'Hva kalles gapet mellom rapportering og praksis, og hvorfor oppstår det?',
      'Er rektors holdning forsvarlig? Drøft.'
    ],
    teorier: ['nyinstitusjonell', 'organisatorisk-hykleri', 'oversettelsesteori'],
    veiledende: 'Innføringen har to drivere som begge er institusjonelle snarere enn tekniske. Kravet fra skoleeier er <strong>tvingende isomorfi</strong>; at nabofylket allerede hadde gjort det samme, er <strong>mimetisk isomorfi</strong>. Systemet er i Meyer og Rowans forstand en <em>rasjonalisert myte</em>: det tas i bruk fordi det gir legitimitet, ikke fordi effekten på undervisningskvaliteten er dokumentert. Skolen opererer i sterkt institusjonelle omgivelser der legitimitet er en forutsetning for tillit og ressurser.\n\nGapet mellom den flotte rapporteringen og den uendrede praksisen er <strong>dekobling</strong>: fasadestrukturen kobles fra driften. Brunsson ville kalt det <em>organisert hykleri</em> – prat, beslutning og handling peker i ulike retninger fordi omgivelsene stiller krav som ikke lar seg forene med hverdagens ressurser. Dekobling er dermed ikke primært moralsk svikt, men en systematisk løsning på et krysspress.\n\nVurderingen av rektors holdning bør være tosidig. For skolens kortsiktige overlevelse er dekobling funksjonell: den beskytter lærernes tid og den pedagogiske kjernen mot et system som ikke er tilpasset arbeidet – det Thompson ville kalt buffering av den tekniske kjernen. Samtidig har det reelle kostnader: ressursbruk uten læringseffekt, en kultur der man sier én ting og gjør en annen (jf. uttrykt teori mot bruksteori), og tap av muligheten til at kvalitetsarbeid faktisk kunne forbedre praksis. Røviks translasjonsperspektiv peker på et tredje alternativ: å <em>oversette</em> systemet slik at det gir mening i skolens kontekst, framfor å velge mellom lojal kopiering og ren fasade. Det krever translatørkompetanse hos rektor og reell dialog med skoleeier om hva som skal dokumenteres og hvorfor.'
  },
  {
    id: 'c-ledelse-nyansatt',
    modul: 'ledelse',
    tittel: 'To medarbeidere, én lederstil',
    tid: '20 min',
    scenario: 'Ida leder et team på ni i en kommunikasjonsavdeling. Hun er opptatt av å behandle alle likt og gir alle samme grad av frihet. Sondre har jobbet der i ti år, er faglig sterk og trives med lite oppfølging. Maja er nyutdannet, har vært der i fire måneder og sier lite i møter. På medarbeidersamtalen sier Maja at hun ofte er usikker på om hun gjør ting riktig, men ikke vil «mase». Sondre sier at han savner faglige utfordringer. Ida opplever selv at hun leder rettferdig.',
    sporsmal: [
      'Vurder Idas lederpraksis med situasjonsbestemt ledelse.',
      'Hvilken rolle spiller LMX-teori og mestringstro her?',
      'Hva bør Ida gjøre konkret med hver av de to?'
    ],
    teorier: ['situasjonsbestemt-ledelse', 'lmx', 'jobbkarakteristika'],
    veiledende: 'Idas premiss – at lik behandling er rettferdig behandling – er nettopp det situasjonsbestemt ledelse utfordrer. Hersey og Blanchard ville sagt at hun anvender en <em>delegerende</em> stil (S4) på alle. For Sondre, med høy kompetanse og høy vilje på oppgavene sine, er det riktig. For Maja, som har lav oppgavekompetanse og synkende selvtillit, er det feil: hun trenger en <em>instruerende</em> eller <em>coachende</em> stil (S1–S2) med tydelige rammer og hyppig tilbakemelding. Merk at modenhet vurderes per oppgave, ikke som en fast egenskap ved personen.\n\nMajas utsagn om at hun ikke vil «mase», peker på lav <em>mestringstro</em> og på at hun mangler mestringserfaringer og tilbakemelding – de to viktigste kildene ifølge Bandura. Det tyder også på at terskelen for å be om hjelp er for høy, altså et spørsmål om psykologisk trygghet i teamet.\n\nLMX-teorien gir et nyttig motpoeng: Ida behandler alle likt for å unngå inn- og utgrupper, noe som er en reell risiko ved differensiert ledelse. Men LMX-forskningen sier ikke at man skal gi alle samme oppfølging – den sier at alle bør ha en relasjon av høy kvalitet. Differensiering i <em>form</em> er nødvendig; differensiering i <em>kvalitet</em> og tilgang er problemet.\n\nKonkret: For Maja bør Ida avtale faste, korte oppfølgingspunkter, gi tydelige kriterier for hva som er godt nok, og aktivt invitere spørsmål slik at det å spørre blir normalisert framfor å oppleves som mas. For Sondre peker savnet av utfordringer mot jobbkarakteristikamodellen: økt oppgavebetydning og variasjon, for eksempel gjennom fagansvar, mentorrolle for Maja eller mer komplekse oppdrag – jobbberikelse framfor bare flere oppgaver. Ida bør også gjøre premisset eksplisitt overfor teamet, slik at ulik oppfølging leses som tilpasning, ikke som forskjellsbehandling.'
  },
  {
    id: 'c-endring-digitalisering',
    modul: 'endring',
    tittel: 'Digitaliseringsprosjektet som stoppet opp',
    tid: '25 min',
    scenario: 'Et forsikringsselskap besluttet å innføre et nytt saksbehandlingssystem som skal automatisere 40 % av enkle skadesaker. Prosjektet ble ledet fra IT-avdelingen med en ekstern leverandør. Beslutningen ble kommunisert i et allmøte og i to intranettartikler. Mellomlederne fikk ansvar for «lokal implementering» uten frikjøpt tid. Ni måneder ut i prosjektet brukes systemet parallelt med det gamle, saksbehandlerne stoler ikke på de automatiske vurderingene, og prosjektlederen rapporterer at «det handler bare om å få folk til å endre holdning».',
    sporsmal: [
      'Vurder prosessen mot Kotters åtte trinn. Hvilke trinn er svake?',
      'Er motstanden et holdningsproblem? Drøft med endringsteori.',
      'Hvordan ville du lagt opp prosessen på nytt?'
    ],
    teorier: ['kotter', 'lewin', 'argyris-schon'],
    veiledende: 'Målt mot Kotter svikter flere trinn. <strong>Trinn 1</strong>, kriseforståelse, er ikke etablert – ansatte har ikke fått en begrunnelse som gjør endringen nødvendig for dem. <strong>Trinn 2</strong>, styrende koalisjon, mangler: prosjektet eies av IT og en ekstern leverandør, uten tungt eierskap i linjen. <strong>Trinn 4</strong>, kommunikasjon, er kraftig undervurdert: to intranettartikler og ett allmøte er en fattig kanal for et tvetydig og identitetsberørende budskap, jf. teorien om kanalrikhet. <strong>Trinn 5</strong>, å fjerne hindringer, er ikke gjort – mellomlederne har fått ansvar uten tid, som er en klassisk måte å gjøre implementering umulig på. <strong>Trinn 6</strong>, kortsiktige gevinster, mangler, og parallell drift av to systemer er en tydelig indikasjon på det.\n\nPåstanden om at det «bare handler om holdning» bør avvises. Motstand er informasjon. At saksbehandlerne ikke stoler på de automatiske vurderingene, kan være en helt korrekt faglig observasjon om systemets treffsikkerhet – og hvis den ignoreres, taper organisasjonen den viktigste tilbakemeldingskilden den har. Andre rasjonelle grunner er reell frykt for at 40 % automatisering betyr færre stillinger, tap av faglig identitet for folk som har definert seg gjennom skjønnsutøvelse, dobbeltarbeid i overgangsfasen, og brudd på psykologiske kontrakter. Å omdefinere dette til holdningsproblem er i seg selv en defensiv rutine som beskytter prosjektet mot læring (Argyris).\n\nEn omstart bør: forankre eierskapet i linjeledelsen med en styrende koalisjon som inkluderer erfarne saksbehandlere; frikjøpe mellomlederne reelt; systematisk samle inn og besvare de faglige innvendingene om treffsikkerhet, og justere systemet der de har rett; avklare åpent hva automatiseringen betyr for bemanningen, siden usikkerhet om dette blokkerer alt annet; velge ut ett sakssegment der gevinsten kan demonstreres raskt; og sette en dato for avvikling av det gamle systemet, siden parallell drift ellers blir permanent. I Lewins termer er organisasjonen ikke opptint – arbeidet med å svekke motkreftene er knapt påbegynt.'
  },
  {
    id: 'c-makt-omorganisering',
    modul: 'makt',
    tittel: 'Hvem eier egentlig beslutningen?',
    tid: '20 min',
    scenario: 'I et sykehusforetak vil økonomidirektøren slå sammen to avdelinger for å spare 12 millioner. Klinikksjefen, som er lege med lang fartstid og høy anseelse blant kollegene, mener forslaget vil svekke pasientsikkerheten. Forslaget settes på sakskartet til foretaksmøtet, men flyttes tre ganger og kommer aldri til votering. Etter et halvår er saken stille død. Økonomidirektøren sier at «faglige hensyn veier tyngst hos oss».',
    sporsmal: [
      'Analyser maktforholdene med French og Ravens maktbaser og Lukes tre dimensjoner.',
      'Hvorfor har klinikksjefen makt uten å ha formell beslutningsmyndighet i saken?',
      'Hva sier dette om profesjonsbyråkratier?'
    ],
    teorier: ['french-raven', 'lukes', 'strategisk-kontingens', 'mintzberg-konfigurasjoner'],
    veiledende: 'Klinikksjefens makt hviler i liten grad på <em>legitim makt</em> i denne saken – forslaget er økonomidirektørens. Den bygger på <strong>ekspertmakt</strong> (medisinsk-faglig autoritet som andre ikke kan overprøve) og <strong>referentmakt</strong> (anseelse blant kolleger, som gjør at motstanden får kollektiv tyngde).\n\nAt saken utsettes tre ganger og aldri kommer til votering, er et skoleeksempel på maktens <strong>andre ansikt</strong>: dagsordenmakt og ikke-beslutninger (Bachrach & Baratz). Den åpne konflikten oppstår aldri, og derfor ser det utad ut som om ingen har utøvd makt. Økonomidirektørens utsagn om at «faglige hensyn veier tyngst» kan leses som en henvisning til maktens <strong>tredje ansikt</strong>: i dette feltet er pasientsikkerhet en tatt-for-gitt overordnet verdi, og den som kan påberope seg den, har definisjonsmakt over hva som i det hele tatt er en tenkelig løsning. Det gjør at motforestillinger blir vanskelige å formulere uten å framstå som uansvarlige.\n\nStrategisk kontingensteori forklarer hvorfor: klinikksjefen håndterer den mest kritiske usikkerheten i organisasjonen – faglig forsvarlighet og risiko for pasientskade – og er vanskelig å erstatte i den rollen.\n\nDette er typisk for <strong>profesjonsbyråkratier</strong> i Mintzbergs forstand: den operative kjernen er dominerende, koordineringen skjer gjennom standardisert kunnskap forvaltet av profesjonen selv, og administrasjonen har begrenset gjennomslag i faglige spørsmål. Toppledelsen kan i praksis sjelden overstyre profesjonen direkte; endring må gå gjennom profesjonens egne normer og fagfolk. Det gir sterkt faglig vern, men gjør også nødvendige omstillinger tunge, og kan gi profesjonen vetorett over legitime økonomiske hensyn. En mer farbar vei ville vært å involvere fagmiljøet i utformingen av innsparingen fra start, slik at spørsmålet ble «hvordan spare forsvarlig» framfor «spare eller ikke».'
  },
  {
    id: 'c-laering-feil',
    modul: 'laering',
    tittel: 'Avviket som ikke ble meldt',
    tid: '20 min',
    scenario: 'I et produksjonsanlegg oppdager en operatør at en sikkerhetsventil er feilmontert. Han retter det selv og sier ingenting, fordi forrige gang noen meldte avvik, ble det etterfulgt av granskning og en muntlig irettesettelse av det aktuelle skiftet. Anlegget har et digitalt avvikssystem, en HMS-plakat med «vi lærer av feil», og null registrerte avvik siste kvartal. Ledelsen bruker nulltallet i sin kvartalsrapport som bevis på god sikkerhetskultur.',
    sporsmal: [
      'Hva er galt med ledelsens tolkning av nulltallet?',
      'Analyser situasjonen med psykologisk trygghet og læringsteori.',
      'Foreslå tiltak.'
    ],
    teorier: ['psykologisk-trygghet', 'argyris-schon', 'schein-kultur'],
    veiledende: 'Ledelsen tolker null registrerte avvik som fravær av feil. Edmondsons forskning viser det motsatte: i team med lav <strong>psykologisk trygghet</strong> rapporteres færre feil, ikke fordi det gjøres færre, men fordi det er utrygt å melde. Null avvik i et komplekst anlegg er et faresignal, ikke et kvalitetstegn. Ledelsen bruker altså en indikator som måler rapporteringsvilje som om den målte sikkerhet.\n\nSanksjonen etter forrige avviksmelding har etablert en effektiv læringsblokkering. Operatøren gjør en rasjonell kalkyle: kostnaden ved å melde bæres av ham og skiftet, gevinsten tilfaller organisasjonen. Med Argyris\' begreper er dette en <strong>defensiv rutine</strong>: en uskreven regel som beskytter mot ubehag og gjør et viktig tema udiskuterbart. At man samtidig har plakater om at «vi lærer av feil», er en klassisk motsetning mellom <em>uttrykt teori</em> og <em>bruksteori</em> – og i Scheins termer avviker de uttrykte verdiene på nivå 2 fra den grunnleggende antakelsen på nivå 3 om at feil straffes. Ansatte styrer alltid etter nivå 3.\n\nOrganisasjonen får dermed verken enkelt- eller dobbeltkretslæring: den korrigerer ikke engang enkelthendelser, langt mindre stiller spørsmål ved hvorfor ventiler kan feilmonteres i utgangspunktet.\n\nTiltak: skill konsekvent mellom systemfeil og forsettlig regelbrudd, og gjør dette skillet kjent (rettferdig kultur / just culture); fjern sanksjoner mot dem som melder; la ledelsen selv melde og omtale egne feil først, siden lederatferd er den sterkeste kulturbæreren; gi synlig tilbakemelding om hva hver melding førte til, slik at melding oppleves som nyttig; og bytt indikator – mål andel meldinger som er lukket med tiltak, og tid fra melding til lukking, framfor antall avvik. Endringen krever tid, fordi nivå 3-antakelser bare endres gjennom nye erfaringer som motsier dem.'
  },
  {
    id: 'c-mal-strategi',
    modul: 'mal',
    tittel: 'Visjonen ingen kjenner igjen',
    tid: '20 min',
    scenario: 'En frivillig organisasjon som arbeider med integrering har visjonen «Et samfunn der alle hører til». Hovedmålet er å «styrke deltakelse i lokalsamfunnet». I praksis måles alle lokallag på antall gjennomførte arrangementer og antall registrerte medlemmer, siden det er dette giverne etterspør. Et lokallag som over to år bygget tett oppfølging av femten familier med svært gode resultater, får kritikk for lav aktivitet. Generalsekretæren mener målingen «er det vi har».',
    sporsmal: [
      'Analyser målhierarkiet. Hvor brister mål–middel-kjeden?',
      'Bruk skillet mellom offisielle og operative mål.',
      'Foreslå en bedre målstruktur.'
    ],
    teorier: ['maalsettingsteori', 'balansert-maalstyring', 'ressursavhengighet'],
    veiledende: 'Målhierarkiet ser ryddig ut på papiret: visjon → hovedmål → aktivitet. Bruddet skjer mellom hovedmål og målekriterier. «Styrke deltakelse i lokalsamfunnet» er et utfallsmål; «antall arrangementer og medlemmer» er aktivitets- og innsatsmål. Kjeden brister fordi det ikke er dokumentert at flere arrangementer gir mer reell tilhørighet – middelet har mistet koblingen til målet.\n\nMed Perrows skille er visjonen og hovedmålet <strong>offisielle mål</strong>, mens antall arrangementer og medlemmer er de <strong>operative målene</strong>: det er disse som faktisk styrer prioriteringer, ressursfordeling og ros og ris. Lokallaget som får kritikk til tross for gode resultater, er beviset – organisasjonen belønner det den måler, ikke det den sier den vil.\n\nAt målene er formet av hva giverne etterspør, forklares godt med <strong>ressursavhengighetsteori</strong>: giverne kontrollerer en kritisk ressurs, og organisasjonen tilpasser sin målstruktur til deres krav. Dette er en reell begrensning, ikke bare dårlig håndverk fra generalsekretæren. Men avhengigheten kan påvirkes: en organisasjon kan aktivt forhandle om rapporteringskrav, dokumentere effekt for å endre hva giverne etterspør, og spre finansieringskildene for å redusere avhengigheten av én type krav.\n\nEn bedre målstruktur bør kombinere flere typer indikatorer, slik logikken i balansert målstyring tilsier: aktivitetsmål (arrangementer, medlemmer), resultatmål på deltakernivå (andel som deltar i lokale aktiviteter etter tolv måneder, opplevd tilhørighet målt med en kort standardisert måling), og kvalitative case som fanger arbeidet med de femten familiene. Poenget er ikke å måle mer, men å sikre at det som måles faktisk er koblet til hovedmålet – og å beskytte kvalitetsarbeid som er dyrt per hode, men som treffer formålet best.'
  },
  {
    id: 'c-kommunikasjon-hybrid',
    modul: 'kommunikasjon',
    tittel: 'Hybridkontoret som ble stille',
    tid: '15 min',
    scenario: 'En analyseavdeling på 25 personer gikk over til tre hjemmekontordager i uken. Etter et år rapporterer lederen at leveransene holder tempoet, men at noe har endret seg: nyansatte bruker vesentlig lengre tid på å bli selvgående, tverrfaglige initiativer har nesten opphørt, og to konflikter har eskalert fra korte meldinger til formelle personalsaker. All koordinering skjer i en chattekanal og i ukentlige videomøter der de fleste har kameraet av.',
    sporsmal: [
      'Forklar de tre problemene med kommunikasjons- og læringsteori.',
      'Hvilke konkrete grep ville du foreslått?'
    ],
    teorier: ['kanalrikhet', 'svake-band', 'seki', 'psykologisk-trygghet'],
    veiledende: 'De tre problemene har hver sin teoretiske forklaring.\n\n<strong>Nyansatte bruker lengre tid:</strong> Mye av det en nyansatt analytiker må lære, er <em>taus kunnskap</em> – vurderinger, tommelfingerregler, hva man reagerer på i et datasett. I SEKI-modellen overføres dette gjennom <em>sosialisering</em>: taus til taus, ved å sitte sammen, observere og prøve seg. Chat og strukturerte videomøter støtter kombinering av eksplisitt kunnskap, men nesten ikke sosialisering. Den viktigste læringsarenaen er borte.\n\n<strong>Tverrfaglige initiativer har opphørt:</strong> Digitale kanaler er effektive for planlagt kommunikasjon med dem man allerede vet at man skal snakke med. De tilfeldige møtene som aktiverer <em>svake bånd</em> – og som ifølge Granovetter er hovedkilden til ny informasjon og nye koblinger – forsvinner. Nettverket krymper til de sterke båndene, der alle allerede vet det samme.\n\n<strong>Konflikter eskalerer:</strong> Korte meldinger er en fattig kanal uten ikke-verbale signaler og uten rask tilbakemelding. Ifølge Daft og Lengel er dette et systematisk misforhold: tvetydige og følelsesladde budskap krever rike kanaler. Kamera av i møter forsterker dette og senker samtidig terskelen for at ting forblir usagt, altså lavere psykologisk trygghet.\n\nGrep: legg felles kontordager for hele avdelingen, ikke individuelle valg, slik at overlappet faktisk oppstår; gi nyansatte en periode med hovedsakelig fysisk tilstedeværelse og en fadder de sitter sammen med; innfør en enkel norm om at uenighet flyttes fra chat til samtale etter to runder; sett kamera på som standard i møter under en viss størrelse; og etabler faste, korte arenaer på tvers av fag der formålet nettopp er ustrukturert utveksling. Poenget er ikke å reversere hybridarbeidet, men å designe bevisst for det digitale kanaler ikke gir.'
  },
  {
    id: 'c-tverrgaaende-eksamen',
    modul: 'grunnlag',
    tittel: 'Tverrgående analyse: Byggmester Sund AS',
    tid: '40 min',
    scenario: 'Byggmester Sund AS har 220 ansatte og har vokst gjennom tre oppkjøp på fem år. Selskapet er organisert med avdelinger for anlegg, rehabilitering og prosjektering, samt en stab for HMS, HR og økonomi. Prosjektlederne rapporterer både til avdelingsleder og til prosjekteier. HMS-staben opplever at avdelingslederne overser deres pålegg. Ledergruppen består av folk fra den opprinnelige bedriften. Bransjen er preget av økende krav til dokumentasjon av bærekraft, hardt prispress og mangel på fagarbeidere. Sykefraværet er 8,4 %. Den nye HR-direktøren skal legge fram en analyse for styret.',
    sporsmal: [
      'Gjennomfør en analyse på fire nivåer: struktur, kultur, makt og omgivelser.',
      'Hvilke tre problemer ville du prioritert, og hvorfor?',
      'Hva er de viktigste innvendingene mot din egen anbefaling?'
    ],
    teorier: ['mintzberg-konfigurasjoner', 'schein-kultur', 'french-raven', 'nyinstitusjonell', 'ressursavhengighet'],
    veiledende: '<strong>Struktur:</strong> Selskapet er funksjonsbasert gruppert etter fagområde, med en matriselignende dimensjon der prosjektledere rapporterer i to linjer. Det bryter med enhetlig kommando og er en velkjent kilde til rollekonflikt og møtebelastning. Skillet mellom linje og stab er uklart: HMS-staben har ansvar uten instruksjonsmyndighet, noe som forklarer at pålegg overses. Etter tre oppkjøp er det grunn til å undersøke om koordineringen fortsatt hviler på direkte tilsyn og personlige relasjoner fra den opprinnelige bedriften, altså at strukturen henger etter veksten (jf. Chandler).\n\n<strong>Kultur:</strong> Tre oppkjøp på fem år gir sannsynligvis sterke subkulturer med ulike grunnleggende antakelser om hvordan man jobber, hva som er god kvalitet og hvor mye risiko man tar på HMS. At ledergruppen utelukkende består av folk fra den opprinnelige bedriften, sender et kraftig symbolsk signal om hvem som eier organisasjonen – et artefakt med stor betydning for de oppkjøpte miljøenes opplevelse av tilhørighet.\n\n<strong>Makt:</strong> Avdelingslederne har legitim makt, ressurskontroll og faglig autoritet; HMS-staben har verken posisjonsmakt eller sanksjonsmuligheter, bare ekspertmakt som ikke anerkjennes. Ledergruppens sammensetning gir de opprinnelige eierne uformell definisjonsmakt over hva som regnes som «slik vi gjør det her» – maktens tredje ansikt. Et sykefravær på 8,4 % ligger over bransjenormen og bør leses som en indikator på arbeidsmiljø og belastning, ikke bare som en HR-statistikk.\n\n<strong>Omgivelser:</strong> Bærekraftsdokumentasjon er tvingende og normativ isomorfi som vil øke i styrke, og som krever reell kapasitet i staben. Prispresset er en teknisk omgivelse som trekker mot kostnadskutt, samtidig som mangelen på fagarbeidere gjør arbeidskraft til en kritisk ressurs. Ressursavhengighetsteori tilsier at selskapet bør investere i å bli en attraktiv arbeidsgiver framfor å konkurrere på pris alene – arbeidskraften er den knappeste ressursen.\n\n<strong>Tre prioriteringer:</strong> (1) Avklare myndighetsforholdet i matrisen og HMS-stabens mandat, siden uklar myndighet er årsak til flere av de andre symptomene og er raskest å rette. (2) Håndtere sykefraværet med en reell årsaksanalyse, siden det både er en kostnad og et signal om at noe er galt i arbeidsmiljøet – og fordi det direkte forverrer rekrutteringsproblemet. (3) Bredde ut ledergruppen, siden legitimiteten til alle andre tiltak avhenger av at de oppkjøpte miljøene opplever at de har innflytelse.\n\n<strong>Innvendinger mot egen anbefaling:</strong> Å endre ledergruppens sammensetning er en maktflytting som vil møte motstand fra dem som i dag har posisjonene, og som kan koste erfaring på kort sikt. Å styrke HMS-stabens mandat kan oppleves som byråkratisering i en bransje under prispress, og kan svekke avdelingsledernes eierskap til sikkerheten hvis det gjøres som ren myndighetsoverføring framfor felles ansvar. Og tre samtidige tiltak i en organisasjon som allerede har gjennomgått tre oppkjøp, risikerer endringstretthet – rekkefølge og tempo er derfor like viktig som innholdet.'
  }
];
