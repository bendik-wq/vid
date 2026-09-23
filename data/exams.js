/* Skriftlige eksamensoppgaver med sensorveiledning.
   Felt: id, modul (modul-id eller 'tvers'), type, tid, tittel, oppgave,
   krav (må være med), sensor (veiledende besvarelse, avsnitt delt med \n\n),
   fallgruver (typiske trekk som trekker ned), teorier (id-er i teoribanken). */
window.OT = window.OT || {};
window.OT.exams = [

  /* ---------- 1 Grunnlag ---------- */
  {
    id: 'ek-grunnlag-1', modul: 'grunnlag', type: 'Langsvar', tid: '45 min', niva: 2,
    tittel: 'Organisasjonen som åpent system',
    oppgave: 'Gjør rede for hva det vil si å betrakte en organisasjon som et åpent system. Drøft deretter hvilke konsekvenser dette perspektivet får for hvordan en leder bør analysere et internt problem, sammenlignet med et lukket systemperspektiv.',
    krav: [
      'Definisjonen av en organisasjon og de fire bærende elementene',
      'Input, omformingsprosess, output og tilbakemelding',
      'Minst to systembegreper: entropi, ekvifinalitet, requisite variety eller løse koblinger',
      'Et konkret eksempel på et internt problem analysert begge veier'
    ],
    sensor: 'Besvarelsen må først etablere definisjonen: et sosialt system, bevisst konstruert, for å løse oppgaver og realisere mål. Deretter må den vise omformingsmodellen — organisasjonen henter input fra omgivelsene, omformer dem, leverer output tilbake, og justeres av tilbakemelding.\n\nSystembegrepene skal brukes, ikke bare listes. <em>Ekvifinalitet</em> er det mest slagkraftige i drøftingsdelen: finnes det flere veier til samme resultat, faller selve premisset for å lete etter én beste løsning bort. <em>Requisite variety</em> gir en annen konsekvens: står organisasjonen overfor sammensatte omgivelser, må den indre kompleksiteten matche dem, og forenkling av strukturen kan da forverre problemet.\n\nDrøftingsdelen skal vise forskjellen i diagnose. Et lukket perspektiv leter etter årsaken innenfor organisasjonens egne grenser: dårlig rutine, feil person, uklar instruks. Et åpent perspektiv spør i tillegg hva som har endret seg i omgivelsene, og om problemet er en rimelig tilpasning til et nytt krav utenfra. Sterke besvarelser peker på at det åpne perspektivet gjør diagnosen riktigere, men også vanskeligere å handle på, fordi årsaken kan ligge utenfor lederens kontroll.',
    fallgruver: [
      'Å gjengi modellen uten å anvende den på et konkret problem',
      'Å blande sammen entropi og requisite variety',
      'Å fremstille det lukkede perspektivet som en ren feil — det var et historisk svar på andre omgivelser'
    ],
    teorier: ['scientific-management', 'byraakrati', 'human-relations']
  },
  {
    id: 'ek-grunnlag-2', modul: 'grunnlag', type: 'Drøfting', tid: '45 min', niva: 3,
    tittel: 'Fire perspektiver på samme konflikt',
    oppgave: 'To avdelinger i en bedrift har vært i åpen konflikt om budsjettfordelingen i to år. Analyser konflikten gjennom Bolman og Deals fire fortolkningsrammer. Drøft deretter hva som går tapt dersom ledelsen bare bruker én av rammene.',
    krav: [
      'Alle fire rammene: strukturell, human resource, politisk, symbolsk',
      'En egen diagnose og et eget tiltak per ramme',
      'Et selvstendig standpunkt om hvilken ramme som er mest treffende her, med begrunnelse'
    ],
    sensor: 'Den strukturelle rammen ser konflikten som et designproblem: uklare ansvarslinjer, overlappende mandater eller en budsjettprosess som tvinger enhetene til å konkurrere. Tiltaket er å endre strukturen, ikke menneskene.\n\nHuman resource-rammen leter etter misforholdet mellom organisasjonens krav og menneskenes behov: opplever noen seg overkjørt, underkjent eller utrygg? Tiltaket er medvirkning, kompetanse og bedre relasjoner.\n\nDen politiske rammen tar interessemotsetningen på alvor som et varig trekk, ikke som en misforståelse. Budsjettet er en knapp ressurs, og det er rasjonelt å kjempe om den. Tiltaket er forhandling og koalisjonsbygging, ikke harmonisering.\n\nDen symbolske rammen spør hva budsjettandelen <em>betyr</em>: status, anerkjennelse, bekreftelse på at arbeidet er viktig. Da handler konflikten ikke om kronene, og et tiltak som bare flytter kroner treffer ikke.\n\nDrøftingen må vise at ensidig rammebruk gir systematiske blindsoner: ren struktur overser interessene, ren HR gjør politikk til et personproblem, ren politikk overser at designet kan endres, ren symbolikk risikerer å forklare bort reelle ressurskonflikter. At konflikten har vart i to år er et signal i seg selv — kortvarige misforståelser løser seg, varige motsetninger har som regel et strukturelt eller politisk grunnlag.',
    fallgruver: [
      'Å behandle rammene som fire like gode meninger uten å ta standpunkt',
      'Å bruke den politiske rammen som et skjellsord i stedet for et analyseverktøy'
    ],
    teorier: ['teori-x-y', 'human-relations']
  },

  /* ---------- 2 Mål og strategi ---------- */
  {
    id: 'ek-mal-1', modul: 'mal', type: 'Langsvar', tid: '60 min', niva: 2,
    tittel: 'Målforskyvning i målstyrte organisasjoner',
    oppgave: 'Gjør rede for målhierarkiet og for Perrows skille mellom offisielle og operative mål. Drøft deretter hvorfor målstyring systematisk produserer målforskyvning, og vurder hvilke mottiltak som faktisk virker.',
    krav: [
      'Visjon, hovedmål, delmål — og hva som skiller dem',
      'Offisielle mål (utad, legitimerende) mot operative mål (det som faktisk styrer handling)',
      'Mekanismen bak målforskyvning, ikke bare definisjonen',
      'Minst to konkrete mottiltak, vurdert kritisk'
    ],
    sensor: 'Redegjørelsen skal vise målhierarkiet som en kjede fra visjon til målbart delmål, og Perrows poeng om at det offisielle og det operative kan sprike uten at noen lyver: det offisielle målet legitimerer utad, det operative styrer prioriteringene innad.\n\nMekanismen bak målforskyvning må frem eksplisitt: det som måles, belønnes og rapporteres, fortrenger det som er viktig men vanskelig å måle. Middelet blir målet. Ventetid er tellbar, faglig forsvarlighet er det ikke i samme grad — derfor vinner ventetiden når de to kolliderer. Gode besvarelser knytter dette til begrenset rasjonalitet: aktører forenkler ved å styre etter det som er synlig.\n\nMottiltakene må vurderes, ikke ramses opp. Motstridende målesett som fanger begge hensyn er virksomt, men gir mer rapportering. Uavhengige kanaler for det som ikke telles (tilsyn, avvikssystemer, brukerundersøkelser) virker bare når de har reell konsekvens. Færre indikatorer reduserer forskyvningen, men øker risikoen for at noe vesentlig ikke følges opp i det hele tatt. Det svakeste mottiltaket er å appellere til holdninger: når systemet belønner noe annet, taper holdningskampanjen.',
    fallgruver: [
      'Å definere målforskyvning uten å forklare hvorfor den oppstår',
      'Å foreslå mottiltak uten å si hva de koster'
    ],
    teorier: ['maalsettingsteori', 'balansert-maalstyring', 'begrenset-rasjonalitet']
  },
  {
    id: 'ek-mal-2', modul: 'mal', type: 'Langsvar', tid: '60 min', niva: 3,
    tittel: 'Posisjon eller ressurser',
    oppgave: 'Sammenlign Porters posisjoneringsperspektiv med det ressursbaserte perspektivet (VRIO) som forklaring på vedvarende konkurransefortrinn. Bruk et selvvalgt selskap og vurder hvilket perspektiv som forklarer dets posisjon best.',
    krav: [
      'Porters fem krefter og de generiske strategiene',
      'VRIO-kriteriene og hva som skiller en ressurs fra et fortrinn',
      'Et konkret selskap analysert med begge perspektivene',
      'Et standpunkt med begrunnelse, og minst én innvending mot det'
    ],
    sensor: 'Porter forklarer lønnsomhet utenfra og inn: bransjestrukturen setter rammen, og selskapet velger en forsvarbar posisjon — kostnadsleder, differensiering eller fokus. Analysen må vise at de fem kreftene er et bransjediagnostisk verktøy, ikke en sjekkliste over konkurrenter.\n\nDet ressursbaserte perspektivet snur blikket innover: fortrinn oppstår når selskapet kontrollerer ressurser som er verdifulle, sjeldne, vanskelige å imitere og som organisasjonen faktisk er innrettet for å utnytte. Poenget med VRIO er at de tre første kriteriene forklarer potensialet, mens det fjerde forklarer hvorfor så mange selskaper med gode ressurser likevel ikke tjener på dem.\n\nEn sterk besvarelse viser at perspektivene besvarer ulike spørsmål. Porter forklarer hvorfor en bransje er lønnsom; VRIO forklarer hvorfor to selskaper i samme bransje presterer ulikt. Det mest overbevisende argumentet er at posisjonen som regel er lett å beskrive og vanskelig å kopiere nettopp fordi den hviler på ressurser konkurrenten mangler — en kostnadsposisjon som forutsetter en bestemt kultur eller arbeidsdeling lar seg ikke kjøpe.\n\nInnvendingen som bør med: begge perspektivene forklarer godt i ettertid og forutsier dårlig. Ressurser som var uimiterbare i ti år kan bli irrelevante over natten når teknologien skifter.',
    fallgruver: [
      'Å beskrive de fem kreftene uten å bruke dem på selskapet',
      'Å kalle enhver styrke en VRIO-ressurs — sjeldenhet og imiterbarhet må faktisk vurderes'
    ],
    teorier: ['porter-fem-krefter', 'barney-vrio', 'chandler']
  },

  /* ---------- 3 Struktur ---------- */
  {
    id: 'ek-struktur-1', modul: 'struktur', type: 'Langsvar', tid: '90 min', niva: 2,
    tittel: 'Konfigurasjon, koordinering og vekst',
    oppgave: 'Gjør rede for Mintzbergs konfigurasjoner og de tilhørende koordineringsmekanismene. Drøft deretter hva som skjer når en organisasjon vokser ut av konfigurasjonen sin, og hvilke grep som da er nødvendige.',
    krav: [
      'De fem konfigurasjonene med organisasjonens hoveddel og koordineringsmekanisme for hver',
      'Skillet mellom gjensidig tilpasning, direkte tilsyn og de tre formene for standardisering',
      'Vekst som utløsende mekanisme, knyttet til kontrollspenn',
      'At konfigurasjonene er idealtyper og at virkelige organisasjoner er hybrider'
    ],
    sensor: 'Redegjørelsen må koble hver konfigurasjon til sin koordineringsmekanisme: enkel struktur og direkte tilsyn, maskinbyråkrati og standardisering av arbeidsprosesser, profesjonsbyråkrati og standardisering av kunnskap, divisjonalisert form og standardisering av resultater, adhokrati og gjensidig tilpasning.\n\nVekstargumentet er kjernen. Direkte tilsyn har en hard kapasitetsgrense: én leders oppmerksomhet. Når antallet ansatte og beslutninger passerer den grensen, oppstår symptomene i en bestemt rekkefølge — beslutningskø, informasjonssvikt på tvers, og til slutt turnover blant dem som ikke får jobbet. Dette er en strukturell diagnose, ikke en vurdering av lederens dyktighet.\n\nGrepene må følge av diagnosen: et mellomledernivå med reelt delegert myndighet, og formalisering av de prosessene som går på tvers. Sterke besvarelser bruker Thompsons avhengighetstyper til å begrunne hvilken mekanisme som trengs hvor — gjensidig avhengighet lar seg ikke koordinere med standardisering alene, den krever møtepunkter.\n\nDrøftingen bør ta med kostnaden: formalisering svekker den fleksibiliteten som ofte var det opprinnelige fortrinnet, jf. Burns og Stalkers skille mellom mekanistiske og organiske former. Delegering som ikke ledsages av at lederen faktisk slipper kontrollen, gir bare et ekstra ledd i køen.',
    fallgruver: [
      'Å plassere en organisasjon i én konfigurasjon uten å vise hvilke deler som er hva',
      'Å foreslå mer struktur uten å nevne hva det koster i fleksibilitet'
    ],
    teorier: ['mintzberg-konfigurasjoner', 'thompson-avhengighet', 'burns-stalker', 'chandler']
  },
  {
    id: 'ek-struktur-2', modul: 'struktur', type: 'Drøfting', tid: '60 min', niva: 3,
    tittel: 'Matrisestrukturens pris',
    oppgave: 'En kunnskapsbedrift vurderer å gå fra funksjonsbasert struktur til matrise. Gjør rede for hva en matrisestruktur er, og drøft under hvilke betingelser den er forsvarlig. Ta et standpunkt til om bedriften bør gjøre det.',
    krav: [
      'Funksjonsbasert mot markedsbasert gruppering, og hva hver av dem optimaliserer',
      'Matrisen som bevisst brudd på prinsippet om enhetlig kommando',
      'Betingelsene: omgivelsenes kompleksitet, behov for dobbelt fokus, knappe spesialistressurser',
      'Et standpunkt med begrunnelse'
    ],
    sensor: 'Funksjonsbasert gruppering samler likt med likt og gir stordriftsfordeler og faglig dybde, men svak koordinering mot kunde eller produkt. Markedsbasert gruppering gir det motsatte. Matrisen er et forsøk på å få begge deler samtidig, til prisen av at medarbeideren har to sjefer.\n\nBetingelsene må vurderes konkret. Lawrence og Lorsch er relevante: jo mer differensiert organisasjonen må være for å møte ulike delomgivelser, desto sterkere integrasjonsmekanismer trengs. Matrisen er en av de sterkeste — og en av de dyreste. Den er forsvarlig når begge dimensjonene er kritiske samtidig, når spesialistene er for få til å dupliseres, og når organisasjonen har modenhet til å håndtere konflikt åpent.\n\nEn god besvarelse er ærlig om kostnadene: flere møter, tregere beslutninger, og at uenighet mellom de to linjene skyves ned på den enkelte medarbeideren. Matrisen fungerer bare når de to lederne faktisk forhandler seg imellom i stedet for å la den ansatte gjøre det.\n\nStandpunktet kan gå begge veier, men må begrunnes i betingelsene, ikke i en generell påstand om at matriser er moderne eller vanskelige.',
    fallgruver: [
      'Å beskrive matrisen uten å nevne at den bryter med enhetlig kommando',
      'Å konkludere uten å ha vurdert betingelsene først'
    ],
    teorier: ['mintzberg-konfigurasjoner', 'lawrence-lorsch', 'administrasjonsteori']
  },

  /* ---------- 4 Kultur ---------- */
  {
    id: 'ek-kultur-1', modul: 'kultur', type: 'Langsvar', tid: '90 min', niva: 2,
    tittel: 'Kultur som styringsmekanisme',
    oppgave: 'Gjør rede for Scheins tre kulturnivåer. Drøft deretter under hvilke betingelser organisasjonskultur er et effektivt styringsverktøy, og hva kostnadene ved en sterk kultur er.',
    krav: [
      'Alle tre nivåene med eksempler, og at artefakter er synlige men tvetydige',
      'At grunnleggende antakelser bare avdekkes gjennom hva som skjer når verdiene koster noe',
      'Kultur som alternativ til formalisering som samordningsmekanisme',
      'Minst tre konkrete kostnader ved sterk kultur'
    ],
    sensor: 'Nivåene må presenteres presist. Artefakter er det observerbare — språk, historier, innredning, ritualer — og de er tvetydige fordi samme artefakt kan bety flere ting. Uttrykte verdier er det organisasjonen sier den står for. Grunnleggende antakelser er det som tas for gitt og som styrer atferd uten å bli diskutert.\n\nDet avgjørende analytiske poenget er at nivå 2 og nivå 3 kan sprike. Argyris og Schöns skille mellom uttrykt teori og bruksteori er den skarpeste måten å vise det på: en organisasjon kan ha åpenhet som verdi og en bruksteori som tilsier at man ikke tar opp friksjon direkte. Testen på hva som ligger på nivå 3 er hva folk gjør når verdien faktisk koster noe.\n\nSom styringsverktøy virker kultur ved at den erstatter regler: der antakelsene er delte, trengs verken detaljert instruks eller tett overvåking, og koordineringen blir billigere. Betingelsene er stabil bemanning, tid nok til sosialisering, og felles erfaring — kultur endres gjennom praksis, ikke gjennom plakater.\n\nKostnadene må frem: svekket evne til å ta inn avvikende informasjon, høyere terskel for å varsle, dårligere håndtering av mangfold, og at sterke subkulturer gjør omstilling tyngre. Sterke besvarelser peker på at de samme trekkene som gjør kulturen styringseffektiv, gjør den til en blindsone.',
    fallgruver: [
      'Å stoppe på artefaktnivå — verdiplakaten på veggen er nivå 2, ikke nivå 3',
      'Å fremstille sterk kultur som udelt positivt',
      'Å påstå at kultur kan endres raskt ved hjelp av verdiarbeid'
    ],
    teorier: ['schein-kultur', 'argyris-schon', 'competing-values', 'psykologisk-trygghet']
  },
  {
    id: 'ek-kultur-2', modul: 'kultur', type: 'Drøfting', tid: '60 min', niva: 3,
    tittel: 'Kulturendring ved fusjon',
    oppgave: 'To organisasjoner med ulike kulturer fusjonerer. Ledelsen lanserer felles verdier og en ny logo, men atten måneder senere omtaler ansatte seg fortsatt som «gamle A» og «gamle B». Forklar hvorfor verdiarbeidet ikke er nok, og gjør rede for hva som faktisk skal til.',
    krav: [
      'Analysen plassert på Scheins tre nivåer',
      'Subkulturer og hvorfor de overlever formelle sammenslåinger',
      'Hvorfor endring på nivå 3 krever ny felles erfaring, ikke ny formulering',
      'Konkrete tiltak, med realistisk tidshorisont'
    ],
    sensor: 'Verdiene, logoen og kick-offet ligger på nivå 1 og 2. Selvbetegnelsene «gamle A» og «gamle B» er også artefakter, og de forteller at identiteten fortsatt følger de gamle grensene. Det er et symptom, ikke årsaken.\n\nÅrsaken ligger på nivå 3: de to organisasjonene har ulike grunnleggende antakelser om hvordan arbeid gjøres — hvordan man forbereder et møte, hvem som bestemmer, hvor mye usikkerhet det er akseptabelt å vise. Fordi antakelsene er selvfølgelige for begge parter, tolkes den andres atferd som en karakterbrist snarere enn som en annen kulturell logikk. Verdiarbeidet treffer ikke fordi det opererer på et nivå over konflikten.\n\nTiltakene må flytte arbeidet fra formulering til praksis: kartlegge de faktiske arbeidsmåtene, gjøre forskjellene eksplisitte og legitime, og bli konkret enige om hvordan et møte, en beslutning og en leveranse gjennomføres. Blandede team med reelle felles oppgaver bygger den nye felles erfaringen som er den eneste kilden til nye antakelser. At ingen tar opp friksjonen i plenum, peker dessuten på lav psykologisk trygghet på tvers av de gamle grensene — den må adresseres først, ellers kommer forskjellene aldri på bordet.\n\nTidshorisonten skal være realistisk: år, ikke måneder, og den forutsetter at lederne selv praktiserer det nye.',
    fallgruver: [
      'Å foreslå flere verdisamlinger som løsning på et nivå 3-problem',
      'Å beskrive kulturforskjellen som at den ene parten har feil holdning'
    ],
    teorier: ['schein-kultur', 'argyris-schon', 'psykologisk-trygghet', 'hofstede']
  },

  /* ---------- 5 Omgivelser ---------- */
  {
    id: 'ek-omgivelser-1', modul: 'omgivelser', type: 'Langsvar', tid: '60 min', niva: 2,
    tittel: 'Hvorfor organisasjoner blir like hverandre',
    oppgave: 'Gjør rede for skillet mellom tekniske og institusjonelle omgivelser og for de tre formene for isomorfi. Drøft hvorfor organisasjoner i samme felt blir like hverandre selv når likheten ikke er effektiv.',
    krav: [
      'Tekniske omgivelser (krav til effektiv produksjon) mot institusjonelle (krav til legitimitet)',
      'Tvingende, mimetisk og normativ isomorfi, hver med et eksempel',
      'Legitimitet som en ressurs organisasjonen er avhengig av',
      'Dekobling eller organisatorisk hykleri som konsekvens'
    ],
    sensor: 'Skillet må være skarpt: tekniske omgivelser stiller krav om at organisasjonen produserer effektivt, institusjonelle omgivelser stiller krav om at den ser riktig ut. Begge må håndteres, og de trekker ikke alltid i samme retning.\n\nDe tre formene for isomorfi skal illustreres, ikke bare navngis. Tvingende isomorfi kommer av lovkrav, tilsyn og avhengighet av en sterk motpart. Mimetisk isomorfi oppstår under usikkerhet: vet man ikke hva som virker, kopierer man den som oppfattes som vellykket. Normativ isomorfi kommer med profesjonene — utdanning og fagforeninger gir like forestillinger om hva god praksis er, uavhengig av arbeidsgiver.\n\nSvaret på hvorfor likheten består selv uten effektivitetsgevinst, er at legitimitet i seg selv er en ressurs: den gir tilgang til kapital, personell og politisk velvilje. En organisasjon som avviker, må bruke krefter på å forsvare seg.\n\nSterke besvarelser lander på dekobling: organisasjonen adopterer den forventede formen utad og driver videre som før innad. Brunssons begrep om organisatorisk hykleri er relevant og bør presenteres nøytralt — det er en tilpasningsstrategi når omgivelsene stiller motstridende krav, ikke en anklage.',
    fallgruver: [
      'Å blande mimetisk og normativ isomorfi',
      'Å behandle dekobling som ren uærlighet i stedet for som en løsning på motstridende krav'
    ],
    teorier: ['nyinstitusjonell', 'scott-pilarer', 'organisatorisk-hykleri', 'ressursavhengighet']
  },
  {
    id: 'ek-omgivelser-2', modul: 'omgivelser', type: 'Drøfting', tid: '60 min', niva: 3,
    tittel: 'Avhengighet som strategisk problem',
    oppgave: 'En leverandørbedrift har én kunde som står for 70 prosent av omsetningen. Analyser situasjonen med ressursavhengighetsteori og transaksjonskostnadsteori, og drøft hvilke handlingsalternativer bedriften har.',
    krav: [
      'Avhengighet som funksjon av ressursens viktighet og tilgangen på alternativer',
      'Transaksjonskostnadsteoriens marked–hierarki-valg og betydningen av spesifikke investeringer',
      'Minst tre handlingsalternativer, vurdert mot hverandre',
      'Maktforholdet som følger av avhengigheten'
    ],
    sensor: 'Ressursavhengighetsteorien gir diagnosen: avhengighet er stor når ressursen er viktig og alternativene få. Her er begge betingelsene oppfylt, og konsekvensen er at kunden får reell makt over leverandørens beslutninger — også over beslutninger som formelt ligger hos leverandøren selv, som prising, kapasitet og produktvalg.\n\nTransaksjonskostnadsteorien forklarer hvorfor forholdet er vanskelig å komme ut av. Har leverandøren gjort spesifikke investeringer tilpasset denne ene kunden — utstyr, systemer, kompetanse — har investeringene lav verdi utenfor forholdet. Det er nettopp asset specificity som binder, og som gjør at forholdet glir fra marked mot hierarki i praksis, uten at eierskapet har endret seg.\n\nHandlingsalternativene bør drøftes mot hverandre: diversifisere kundegrunnlaget (virksomt, men tar tid og kapital), binde kunden tettere gjennom langsiktig kontrakt eller felles utvikling (reduserer usikkerheten, øker bindingen ytterligere), vertikal integrasjon eller oppkjøp (fjerner avhengigheten, krever kapital), eller bygge en ressurs kunden ikke lett kan erstatte (endrer maktbalansen innenfra).\n\nEt godt svar erkjenner at det ikke finnes et kostnadsfritt alternativ, og begrunner hvilket som er mest realistisk gitt tid og kapital.',
    fallgruver: [
      'Å behandle avhengighet som et rent salgsproblem uten maktdimensjon',
      'Å nevne transaksjonskostnader uten å bruke asset specificity'
    ],
    teorier: ['ressursavhengighet', 'transaksjonskostnad', 'strategisk-kontingens']
  },

  /* ---------- 6 Motivasjon ---------- */
  {
    id: 'ek-motivasjon-1', modul: 'motivasjon', type: 'Langsvar', tid: '90 min', niva: 2,
    tittel: 'Motivasjon når lønn ikke er virkemiddelet',
    oppgave: 'En kunnskapsbedrift kan ikke konkurrere på lønn. Gjør rede for relevante motivasjonsteorier og drøft hvilke virkemidler bedriften realistisk har. Behandl eksplisitt forholdet mellom indre og ytre motivasjon.',
    krav: [
      'Herzbergs skille mellom hygienefaktorer og motivasjonsfaktorer',
      'Jobbkarakteristikamodellens fem kjernedimensjoner og de psykologiske tilstandene',
      'Selvbestemmelsesteoriens tre behov',
      'Forskyvningseffekten av ytre belønning, og når den inntreffer'
    ],
    sensor: 'Herzberg gir utgangspunktet: lønn er en hygienefaktor. Utilstrekkelig lønn gir mistrivsel, men tilstrekkelig lønn gir ikke motivasjon — den fjerner bare et hinder. Det betyr at bedriften må gjøre lønnen god nok til at den ikke er et tema, og lete etter motivasjonen andre steder.\n\nJobbkarakteristikamodellen gir de konkrete virkemidlene: variasjon i ferdigheter, oppgaveidentitet, oppgavebetydning, autonomi og tilbakemelding. De tre første skaper opplevd meningsfullhet, autonomi skaper opplevd ansvar, og tilbakemelding gir kunnskap om resultatet. Dette er designspørsmål som koster lite penger og mye lederoppmerksomhet.\n\nSelvbestemmelsesteorien forsterker bildet med autonomi, kompetanse og tilhørighet. En viktig nyanse hører med: autonomi motiverer bare der kompetansen faktisk er til stede — ellers oppleves den som å bli overlatt til seg selv.\n\nForskyvningseffekten må drøftes presist. Ytre belønning for en oppgave som allerede motiverer i seg selv kan svekke den indre motivasjonen, særlig når belønningen oppleves som kontrollerende snarere enn som anerkjennelse. Konsekvensen for bedriften er at et bonussystem kan gjøre skade nettopp der arbeidet er mest interessant. Sterke besvarelser peker også på at de billige virkemidlene ikke er gratis: autonomi forutsetter at ledelsen faktisk gir slipp på kontroll.',
    fallgruver: [
      'Å ramse opp teorier uten å velge virkemidler',
      'Å hevde at penger ikke motiverer — Herzbergs poeng er mer presist enn som så'
    ],
    teorier: ['herzberg', 'jobbkarakteristika', 'selvbestemmelsesteori', 'forventningsteori']
  },
  {
    id: 'ek-motivasjon-2', modul: 'motivasjon', type: 'Drøfting', tid: '60 min', niva: 3,
    tittel: 'Maslow etter åtti år',
    oppgave: 'Gjør rede for Maslows behovshierarki og for skillet mellom mangelbehov og vekstbehov. Drøft holdbarheten i modellen i lys av kritikken mot den, og vurder om den likevel har verdi som analytisk verktøy.',
    krav: [
      'De fem nivåene, og skillet mellom mangelbehov og vekstbehov',
      'At Maslow selv avviste en streng trappemodell',
      'Den empiriske kritikken av rangordenen',
      'En begrunnet vurdering av modellens bruksverdi'
    ],
    sensor: 'Redegjørelsen må ha de fem nivåene og, viktigere, skillet mellom mangelbehov og vekstbehov: mangelbehov avtar når de dekkes, vekstbehov forsterkes.\n\nDrøftingen står og faller på presisjonen om hva Maslow faktisk hevdet. Han beskrev en tendens, ikke en lov, og understreket at de fleste er delvis tilfredsstilt på alle nivåer samtidig. Han beskrev også unntakene selv — den som velger idealer framfor trygghet. Pyramideformen er heller ikke hans egen, men kom til i ledelseslitteraturen, og den strammere trappen som ofte gjengis i lærebøker er en forenkling av en løsere teori.\n\nKritikken må frem: den empiriske støtten for at tilfredsstillelse på ett nivå aktiverer det neste, er svak, og Alderfers ERG-modell er et forsøk på å svare på dette ved å åpne for at flere behov er aktive samtidig og for regresjon nedover ved frustrasjon.\n\nVurderingen bør skille mellom modellen som prognose og som vokabular. Som prediksjon holder den dårlig. Som analytisk verktøy er den fortsatt nyttig: den retter oppmerksomheten mot at et udekket lavere behov dominerer oppmerksomheten, og at tiltak rettet mot selvrealisering er bortkastet så lenge tryggheten mangler. Et selvstendig eksempel som tester rekkefølgen løfter besvarelsen.',
    fallgruver: [
      'Å gjengi pyramiden som Maslows egen framstilling',
      'Å avvise modellen helt uten å skille mellom prognoseverdi og analytisk verdi'
    ],
    teorier: ['maslow', 'herzberg', 'selvbestemmelsesteori']
  },

  /* ---------- 7 Kommunikasjon ---------- */
  {
    id: 'ek-kommunikasjon-1', modul: 'kommunikasjon', type: 'Langsvar', tid: '60 min', niva: 2,
    tittel: 'Hvorfor toppledelsen ikke visste',
    oppgave: 'I flere kjente havarier og skandaler viser det seg i ettertid at noen i organisasjonen kjente risikoen. Gjør rede for kommunikasjonsprosessen og for kanalrikhet, og forklar hvilke mekanismer som siler informasjon på vei oppover i et hierarki. Foreslå strukturelle mottiltak.',
    krav: [
      'Kommunikasjonsprosessen: sender, koding, kanal, dekoding, støy, tilbakemelding',
      'Kanalrikhet og når rik kanal bør velges',
      'Minst tre silingsmekanismer, forklart som rasjonelle for den enkelte',
      'Strukturelle mottiltak, ikke holdningstiltak'
    ],
    sensor: 'Prosessmodellen skal brukes til å lokalisere hvor signalet stopper, ikke bare gjengis. Kanalrikhet hører med: budskap som er tvetydige eller truende krever rik kanal, og nettopp de budskapene er de som oftest sendes i en fattig kanal fordi avsenderen vegrer seg.\n\nSilingsmekanismene er kjernen. De må presenteres som rasjonelle for den enkelte, ikke som karakterbrist: den som melder dårlige nyheter blir forbundet med dem; hvert ledd i hierarkiet komprimerer og glatter ut for å spare mottakerens tid; usikre signaler nedtones fordi den som tar feil, taper mer enn den som tier; og en leder som har uttrykt et standpunkt får sjeldnere motforestillinger. Resultatet er at informasjonen svekkes systematisk for hvert ledd den passerer.\n\nMottiltakene må være strukturelle. Kanaler som går utenom linjen (avvikssystem, verneombud, tilsyn, anonym varsling) virker bare når de har reell konsekvens. Beslutninger som dokumenterer hvilke innvendinger som ble vurdert, gjør det dyrere å utelate dem. Ledere som etterspør dårlige nyheter eksplisitt, og som ikke straffer dem, endrer regnestykket for avsenderen. Sterke besvarelser peker på at psykologisk trygghet er en forutsetning, men ikke et tiltak i seg selv.',
    fallgruver: [
      'Å beskrive modellen uten å si hvor i kjeden signalet faktisk stoppet',
      'Å foreslå «bedre kommunikasjonskultur» som tiltak uten å si hva det består i'
    ],
    teorier: ['kanalrikhet', 'psykologisk-trygghet', 'weick-sensemaking', 'svake-band']
  },
  {
    id: 'ek-kommunikasjon-2', modul: 'kommunikasjon', type: 'Kortsvar', tid: '30 min', niva: 2,
    tittel: 'Kanalvalg i praksis',
    oppgave: 'En leder skal (a) informere om en ny feriekalender, (b) gi en ansatt kritisk tilbakemelding på arbeidsutførelse, og (c) varsle om en forestående nedbemanning. Begrunn kanalvalget i hvert tilfelle med teori om kanalrikhet, og forklar hva som går galt ved feil valg.',
    krav: [
      'Kanalrikhetsdimensjonene: umiddelbar tilbakemelding, flere signaler samtidig, språklig variasjon, personlig fokus',
      'Et begrunnet valg for hvert av de tre tilfellene',
      'Konsekvensen av å velge for fattig og av å velge for rik kanal'
    ],
    sensor: 'Feriekalenderen er et entydig budskap med lav tvetydighet. Skriftlig, fattig kanal er riktig: den er presis, etterprøvbar og effektiv. Å kalle inn til møte om dette sløser med tid og signaliserer at saken er mer alvorlig enn den er — for rik kanal er også et feilvalg.\n\nKritisk tilbakemelding er tvetydig og følelsesladet. Den krever rik kanal: ansikt til ansikt, med mulighet for umiddelbar tilbakemelding, tonefall og kroppsspråk, og med rom for at mottakeren kan korrigere lederens bilde av situasjonen. Skriftlig kritikk låser tolkningen, fjerner muligheten for oppklaring og oppleves regelmessig hardere enn avsenderen mente.\n\nNedbemanning er både tvetydig og eksistensielt truende. Den krever den rikeste kanalen, og rekkefølgen betyr like mye som kanalen: de berørte først og direkte, deretter fellesskapet, og skriftlig oppfølging etterpå slik at innholdet er etterprøvbart. Det typiske feilgrepet er e-post til alle samtidig, som både er for fattig og lar rykter fylle tomrommet. Gode besvarelser nevner at rik kanal ikke skalerer, og at store organisasjoner derfor må kombinere kanaler bevisst.',
    fallgruver: [
      'Å svare at rik kanal alltid er best',
      'Å ikke nevne at kanalvalget i seg selv er et signal om sakens alvor'
    ],
    teorier: ['kanalrikhet', 'psykologisk-kontrakt']
  },

  /* ---------- 8 Beslutninger ---------- */
  {
    id: 'ek-beslutning-1', modul: 'beslutning', type: 'Langsvar', tid: '90 min', niva: 2,
    tittel: 'Når kompetente organisasjoner velger feil',
    oppgave: 'Gjør rede for den rasjonelle beslutningsmodellen og for begrenset rasjonalitet. Drøft hvordan gruppetenkning og eskalerende forpliktelse kan føre til at kompetente organisasjoner tar beslutninger ingen enkeltperson ville forsvart alene.',
    krav: [
      'Den rasjonelle modellens forutsetninger, og at den er normativ',
      'Simons begrensede rasjonalitet og satisficing',
      'Gruppetenkning: symptomer og de forholdene som øker risikoen',
      'Eskalerende forpliktelse, og hvorfor sunk cost er vanskelig å ignorere'
    ],
    sensor: 'Den rasjonelle modellen forutsetter klare mål, full informasjon om alternativer og konsekvenser, og konsistent rangering. Den må presenteres som en normativ idealmodell — et mål på hvor langt virkeligheten avviker, ikke en beskrivelse av den.\n\nSimon gir avviket: informasjonen er ufullstendig, kapasiteten begrenset, tiden knapp. Konsekvensen er satisficing — man velger det første alternativet som er godt nok, ikke det beste. Dette er ikke latskap, men en rasjonell tilpasning til begrensede ressurser.\n\nGruppetenkning forklarer hvordan flere kompetente personer sammen blir dårligere enn hver for seg: sterk samhørighet, en leder som signaliserer standpunkt tidlig, tidspress og isolasjon fra kritikk gir illusjon av enighet, selvsensur og press mot avvikere. Mottiltakene følger av mekanismene — djevelens advokat, at lederen uttaler seg sist, uavhengige delvurderinger.\n\nEskalerende forpliktelse forklarer hvorfor man ikke snur: jo mer som er investert, desto dyrere er det å innrømme at investeringen var feil. Prospektteori forklarer hvorfor — i tapsdomenet er man risikosøkende, og å fortsette fremstår som en sjanse til å unngå det sikre tapet.\n\nSterke besvarelser identifiserer det konkrete punktet der kostnaden ved å snu ble opplevd som høyere enn risikoen ved å fortsette.',
    fallgruver: [
      'Å behandle den rasjonelle modellen som noe organisasjoner burde klare',
      'Å forveksle gruppetenkning med alminnelig enighet'
    ],
    teorier: ['begrenset-rasjonalitet', 'gruppetenkning', 'prospektteori', 'garbage-can']
  },
  {
    id: 'ek-beslutning-2', modul: 'beslutning', type: 'Drøfting', tid: '60 min', niva: 3,
    tittel: 'Søppelbøtta og det organiserte anarkiet',
    oppgave: 'Gjør rede for søppelbøttemodellen og for hva som kjennetegner et organisert anarki. Drøft i hvilken grad modellen er en bedre beskrivelse av beslutninger i kunnskapsorganisasjoner enn den rasjonelle modellen og inkrementalismen.',
    krav: [
      'De tre kjennetegnene ved organiserte anarkier: uklare mål, uklar teknologi, skiftende deltakelse',
      'De fire strømmene: problemer, løsninger, deltakere, beslutningsanledninger',
      'Inkrementalismen som mellomposisjon',
      'Et standpunkt om modellens forklaringskraft, med innvending'
    ],
    sensor: 'Modellen må presenteres uten karikatur. Organiserte anarkier kjennetegnes ved at målene er uklare og omstridte, at man ikke vet sikkert hvordan midler henger sammen med resultater, og at hvem som deltar varierer fra sak til sak. Universiteter og mange offentlige organer er typiske eksempler.\n\nKjernen er at de fire strømmene er relativt uavhengige, og at en beslutning oppstår når de tilfeldigvis møtes i tid. Det mest kontraintuitive poenget — og det som skiller gode besvarelser — er at løsninger kan finnes før problemene: en ferdig idé leter etter en anledning der den kan koples på et problem.\n\nInkrementalismen bør trekkes inn som mellomposisjon: små skritt, sammenlikning med det bestående, og enighet om tiltak snarere enn om mål. Den forklarer mye av forvaltningens praksis og er mindre pessimistisk enn søppelbøttemodellen.\n\nStandpunktet kan gå begge veier, men må begrunnes i organisasjonstypen. Innvendingen som bør med: modellen beskriver godt og foreskriver dårlig — den gir få holdepunkter for hva en leder skal gjøre. Det mest brukbare rådet den gir, er å ta kontroll over beslutningsanledningene: hvem som møtes, når, og med hvilken sak på bordet.',
    fallgruver: [
      'Å fremstille søppelbøttemodellen som at beslutninger er rent tilfeldige',
      'Å utelate inkrementalismen og dermed gjøre drøftingen til et enten–eller'
    ],
    teorier: ['garbage-can', 'inkrementalisme', 'begrenset-rasjonalitet', 'allison']
  },

  /* ---------- 9 Makt og konflikt ---------- */
  {
    id: 'ek-makt-1', modul: 'makt', type: 'Langsvar', tid: '60 min', niva: 2,
    tittel: 'Makt der organisasjonskartet ikke gjelder',
    oppgave: 'Gjør rede for French og Ravens maktbaser og for strategisk kontingensteori. Drøft hvordan ekspertmakt i profesjonsorganisasjoner begrenser den formelle ledelsens handlingsrom, og hva en leder realistisk kan gjøre.',
    krav: [
      'De fem (seks) maktbasene med eksempel på hver',
      'Avhengighet som grunnlaget for makt',
      'Strategisk kontingens: den som håndterer den kritiske usikkerheten, får makt',
      'Konkrete handlingsalternativer for lederen'
    ],
    sensor: 'Maktbasene må presenteres med eksempler: legitim makt fra posisjonen, belønningsmakt, tvangsmakt, ekspertmakt fra kunnskap andre trenger, referentmakt fra identifikasjon, og informasjonsmakt fra kontroll over hva andre får vite.\n\nDet analytiske poenget er at makt er relasjonell og bunner i avhengighet. Strategisk kontingensteori spisser dette: makt tilfaller den enheten som håndterer den usikkerheten organisasjonen er mest sårbar for, og som er vanskeligst å erstatte.\n\nI profesjonsorganisasjoner er konsekvensen at den operative kjernen har reell vetomakt. Ledelsen kan fatte formelle vedtak, men kan ikke utføre arbeidet, vurdere kvaliteten på det eller erstatte utøverne på kort sikt. Formell myndighet og reell makt er dermed ulike størrelser, og et vedtak som ikke har fagmiljøet med seg, stopper i gjennomføringen.\n\nHandlingsalternativene må være realistiske: å gjøre fagmiljøet til medforfatter av endringen framfor mottaker, å bruke kolleger med faglig legitimitet som endringsagenter, å knytte endringen til faglige mål framfor til styringsmål, og å redusere organisasjonens sårbarhet over tid gjennom dokumentasjon og bredere kompetanse. Sterke besvarelser nevner at tvangsmakt virker på kort sikt og koster på lang sikt, og at referentmakt er det lederen faktisk kan bygge.',
    fallgruver: [
      'Å behandle makt som noe negativt i seg selv',
      'Å foreslå tiltak som forutsetter en autoritet lederen ikke har'
    ],
    teorier: ['french-raven', 'strategisk-kontingens', 'lukes', 'prinsipal-agent']
  },
  {
    id: 'ek-makt-2', modul: 'makt', type: 'Drøfting', tid: '45 min', niva: 3,
    tittel: 'Konflikt som ressurs og som kostnad',
    oppgave: 'Gjør rede for Thomas og Kilmanns fem konflikthåndteringsstiler. Drøft påstanden om at et visst konfliktnivå er nødvendig for en velfungerende organisasjon, og vis hvilken stil du ville valgt i to ulike situasjoner.',
    krav: [
      'De fem stilene plassert langs aksene selvhevdelse og samarbeidsvilje',
      'Skillet mellom saks- og relasjonskonflikt',
      'Et begrunnet standpunkt til påstanden',
      'To konkrete situasjoner med begrunnet stilvalg'
    ],
    sensor: 'Stilene skal plasseres i rutenettet: konkurrerende (høy selvhevdelse, lav samarbeidsvilje), samarbeidende (høy på begge), unnvikende (lav på begge), imøtekommende (lav selvhevdelse, høy samarbeidsvilje) og kompromiss i midten. Ingen stil er best i seg selv — poenget er situasjonstilpasning.\n\nSkillet mellom saks- og relasjonskonflikt bærer drøftingen. Saksuenighet om hvordan et problem skal løses, øker kvaliteten på beslutninger: den motvirker gruppetenkning og tvinger fram at premissene blir prøvd. Relasjonskonflikt, som handler om person og posisjon, tapper energi og forbedrer ingenting. Vanskeligheten er at saksuenighet lett glir over i relasjonskonflikt når den håndteres dårlig — og det er der lederens arbeid ligger.\n\nStandpunktet bør være at et moderat nivå av saksuenighet er ønskelig, og at fravær av konflikt oftere er et faresignal enn et sunnhetstegn: det kan bety at innvendinger ikke kommer fram.\n\nSituasjonsvalgene må begrunnes. Konkurrerende stil er forsvarlig ved akutt sikkerhetsrisiko der noen må bestemme nå. Samarbeidende stil er riktig når saken er viktig for begge parter og forholdet skal vare, men den er tidkrevende og kan ikke brukes overalt. Unnvikelse er et legitimt valg i trivielle saker — ikke bare et unnlatelsessyndrom.',
    fallgruver: [
      'Å fremstille samarbeidende stil som alltid best',
      'Å drøfte konfliktnivå uten å skille sak fra relasjon'
    ],
    teorier: ['thomas-kilmann', 'prinsipiell-forhandling', 'gruppetenkning']
  },

  /* ---------- 10 Ledelse ---------- */
  {
    id: 'ek-ledelse-1', modul: 'ledelse', type: 'Langsvar', tid: '90 min', niva: 2,
    tittel: 'Transformasjonsledelse og fullspektrumsmodellen',
    oppgave: 'Gjør rede for transaksjons- og transformasjonsledelse og for de fire I-ene. Drøft augmentasjonshypotesen, og vurder påstanden om at transformasjonsledelse alltid er å foretrekke.',
    krav: [
      'Transaksjonsledelse: betinget belønning og aktiv/passiv unntaksledelse',
      'De fire I-ene: idealisert innflytelse, inspirerende motivasjon, intellektuell stimulering, individuelle hensyn',
      'Fullspektrumsmodellen og laissez-faire som ytterpunkt',
      'Augmentasjonshypotesen forklart presist',
      'Minst én kritisk innvending mot transformasjonsledelse'
    ],
    sensor: 'Transaksjonsledelse må presenteres som mer enn belønning: betinget belønning er den konstruktive formen, mens aktiv og passiv unntaksledelse skiller seg på når lederen griper inn. Laissez-faire hører med som fravær av ledelse, og må behandles som skadelig snarere enn nøytralt — uplassert ansvar og uteblitte beslutninger har selvstendig negativ effekt.\n\nDe fire I-ene skal forklares, ikke bare navngis, og fullspektrumsmodellen brukes til å vise at atferdene er rangert både etter aktivitet og etter effekt.\n\nAugmentasjonshypotesen er det sentrale: transformasjonsledelse forklarer varians i innsats og prestasjon <em>ut over</em> det transaksjonsledelse alene forklarer. Den erstatter den altså ikke. Praktisk konsekvens: uten tydelige avtaler, klare forventninger og forutsigbar oppfølging i bunn har visjonen ingenting å stå på.\n\nDrøftingen må ta innvendingene på alvor. Effekten er situasjonsbetinget — i rutinepreget arbeid med lav autonomi er handlingsrommet lite. Målemetoden er omdiskutert, siden både lederatferd og resultat ofte rapporteres av samme kilde. Og karisma er tveegget: de samme virkemidlene som skaper oppslutning, svekker den kritiske sansen, noe litteraturen om destruktiv ledelse behandler eksplisitt.',
    fallgruver: [
      'Å forstå augmentasjon som at transformasjonsledelse erstatter transaksjonsledelse',
      'Å behandle laissez-faire som nøytral fraværende ledelse',
      'Å konkludere at transformasjonsledelse alltid er best'
    ],
    teorier: ['transformasjonsledelse', 'destruktiv-ledelse', 'situasjonsbestemt-ledelse', 'lmx']
  },
  {
    id: 'ek-ledelse-2', modul: 'ledelse', type: 'Drøfting', tid: '60 min', niva: 3,
    tittel: 'Samme leder, tre situasjoner',
    oppgave: 'En tydelig transformasjonsorientert leder — sterk på visjon og inspirasjon, svak på oppfølging av avtaler — settes inn i (a) en nystartet teknologibedrift, (b) en sykehusavdeling under omstilling og (c) en prosessindustri med høy sikkerhetsrisiko. Drøft hvordan det sannsynligvis går i hvert tilfelle.',
    krav: [
      'Situasjonsbestemt ledelse eller Fiedlers kontingensmodell som analyseramme',
      'Fullspektrumsmodellen brukt på lederens faktiske profil',
      'Tre selvstendige vurderinger, ikke tre varianter av samme svar',
      'En samlet konklusjon om hva lederen mangler'
    ],
    sensor: 'Analysen må ta utgangspunkt i at lederens profil er ubalansert: høy på de fire I-ene, lav på betinget belønning og oppfølging. Det er nettopp augmentasjonshypotesen som gjør dette til et problem — toppen av spekteret hviler på et transaksjonelt fundament som her mangler.\n\nI en nystartet bedrift er forholdene gunstigst: oppgavene er uklare, retningen er det viktigste bidraget, og de ansatte er selvgående nok til å kompensere for svak oppfølging. Risikoen melder seg først ved vekst, når antallet avtaler overstiger det uformell koordinering klarer.\n\nI sykehusavdelingen møter lederen en profesjonsorganisasjon med egen faglig legitimitet. Visjon uten faglig troverdighet gir lite, og under omstilling er det nettopp forutsigbarhet, tydelige avtaler og oppfølging de ansatte etterspør. Her er den svake siden mest kostbar.\n\nI prosessindustrien er situasjonen mest alvorlig. Der feil er dyre, er aktiv unntaksledelse — systematisk overvåking av avvik — ikke et tegn på dårlig ledelse, men et krav. En leder som er svak på oppfølging, er i praksis nær passiv unntaksledelse, og det er den profilen som gjentatte ganger opptrer i granskninger etter alvorlige hendelser.\n\nKonklusjonen bør være at lederen ikke mangler visjon, men det transaksjonelle grunnlaget, og at behovet for det varierer systematisk med oppgavens karakter og risiko.',
    fallgruver: [
      'Å gi tre nesten identiske vurderinger',
      'Å behandle aktiv unntaksledelse som dårlig ledelse uansett kontekst'
    ],
    teorier: ['situasjonsbestemt-ledelse', 'fiedler', 'transformasjonsledelse', 'mintzberg-lederroller']
  },

  /* ---------- 11 Endring ---------- */
  {
    id: 'ek-endring-1', modul: 'endring', type: 'Langsvar', tid: '90 min', niva: 2,
    tittel: 'Hvorfor endringer feiler',
    oppgave: 'Gjør rede for planlagt endring og for de viktigste kildene til endringsmotstand. Drøft påstanden om at motstand mot endring som regel er rasjonell, og hva det i så fall bør bety for hvordan endringer gjennomføres.',
    krav: [
      'Lewins tre faser, og hva opptining faktisk innebærer',
      'Minst fire kilder til motstand',
      'Et begrunnet standpunkt til rasjonalitetspåstanden',
      'Konsekvenser for gjennomføring, utledet av analysen'
    ],
    sensor: 'Fasene må forklares med vekt på opptining, som er den fasen som oftest hoppes over: uten en erkjennelse av at dagens tilstand er utilfredsstillende, møter endringen motstand den ikke burde hatt. Kotters faser kan brukes som et mer detaljert alternativ.\n\nKildene til motstand må presenteres som noe annet enn uvilje: frykt for det ukjente, tap av faglig identitet, brudd på psykologiske kontrakter, tap av makt og posisjon, og faglig uenighet om at endringen faktisk er en forbedring. Den siste er den viktigste for drøftingen.\n\nStandpunktet bør være at motstanden i stor grad er rasjonell: den som rammes, bærer reelle kostnader, og de som kjenner arbeidet best ser ofte svakheter ledelsen ikke ser. Motstand er derfor også en informasjonskilde om endringens kvalitet.\n\nKonsekvensene må utledes, ikke ramses opp: medvirkning tidlig i prosessen, ikke som informasjonsmøte etter at alt er bestemt; åpen behandling av hvem som faktisk taper noe, og hva de får igjen; og en reell mulighet for at innvendinger endrer planen — ellers er medvirkningen et rituale som forsterker mistilliten.\n\nSterke besvarelser nevner at motstand også kan være ren interessehevding, og at ledelsen må skille mellom de to uten å avfeie den første som den andre.',
    fallgruver: [
      'Å behandle motstand som et kommunikasjonsproblem',
      'Å hoppe over opptiningsfasen i analysen, slik organisasjonen selv gjorde'
    ],
    teorier: ['lewin', 'kotter', 'punktert-likevekt', 'psykologisk-kontrakt']
  },
  {
    id: 'ek-endring-2', modul: 'endring', type: 'Drøfting', tid: '60 min', niva: 3,
    tittel: 'Oversettelse framfor implementering',
    oppgave: 'En organisasjon innfører en ledelsesidé som har virket godt et annet sted. Drøft med oversettelsesteori og nyinstitusjonell teori hvorfor ideen sjelden virker likt to steder, og hva det bør bety for hvordan innføringen legges opp.',
    krav: [
      'Oversettelse som aktiv omforming, ikke kopiering',
      'Mimetisk isomorfi som forklaring på hvorfor ideen ble valgt',
      'Dekobling som mulig utfall',
      'Praktiske konsekvenser for innføringen'
    ],
    sensor: 'Utgangspunktet er at en idé ikke er en gjenstand som flyttes, men noe som må oversettes for å gi mening i en ny sammenheng. Oversettelsen er aktiv: noe legges til, noe trekkes fra, noe endres. En idé som innføres uendret, blir som regel enten avvist eller redusert til fasade.\n\nNyinstitusjonell teori forklarer hvorfor ideen ble valgt i utgangspunktet. Under usikkerhet kopierer organisasjoner dem som oppfattes som vellykkede — mimetisk isomorfi — og valget er da drevet av legitimitet like mye som av dokumentert virkning. Det er en viktig del av analysen, fordi det forklarer hvorfor innføringen ofte starter med konseptet og ikke med problemet.\n\nDekobling er det typiske utfallet når presset kommer utenfra: organisasjonen adopterer formen utad og arbeider videre som før innad. Det bør presenteres nøytralt som en tilpasningsstrategi, ikke som juks.\n\nKonsekvensene for innføringen følger: start med problemet organisasjonen faktisk har, ikke med konseptet; regn oversettelsen som en del av arbeidet og gi dem som skal bruke ideen mandat til å endre den; og vær eksplisitt på hva som ikke lar seg overføre. Sterke besvarelser peker på at organisasjonen man kopierer, som regel også har trekk som ikke lot seg se utenfra — og at det ofte er nettopp de trekkene som forklarte suksessen.',
    fallgruver: [
      'Å behandle oversettelse som en unnskyldning for dårlig gjennomføring',
      'Å utelate hvorfor ideen ble valgt'
    ],
    teorier: ['oversettelsesteori', 'nyinstitusjonell', 'organisatorisk-hykleri', 'kotter']
  },

  /* ---------- 12 Læring ---------- */
  {
    id: 'ek-laering-1', modul: 'laering', type: 'Langsvar', tid: '60 min', niva: 2,
    tittel: 'Enkel- og dobbeltkretslæring i praksis',
    oppgave: 'Gjør rede for skillet mellom enkel- og dobbeltkretslæring og for SEKI-modellen. Drøft hvorfor organisasjoner sjelden får til dobbeltkretslæring, og hva som skal til.',
    krav: [
      'Skillet forklart med et konkret eksempel på hver',
      'Uttrykt teori mot bruksteori',
      'Taus og eksplisitt kunnskap, og de fire omformingene i SEKI',
      'Hindringene for dobbeltkretslæring, og realistiske tiltak'
    ],
    sensor: 'Skillet må illustreres, ikke bare defineres: enkelkretslæring justerer handlingen innenfor gjeldende mål og forutsetninger — avviket rettes. Dobbeltkretslæring stiller spørsmål ved målene og forutsetningene selv — er det riktig at vi skal gjøre dette i det hele tatt?\n\nArgyris og Schöns skille mellom uttrykt teori og bruksteori forklarer hvorfor det siste er sjeldent: de defensive rutinene som beskytter den enkelte mot ubehag, beskytter samtidig forutsetningene mot å bli prøvd. Å sette spørsmålstegn ved målene innebærer å antyde at noen med makt tok feil.\n\nSEKI-modellen hører med som forklaring på hvordan kunnskap faktisk beveger seg: sosialisering (taus til taus, gjennom felles praksis), eksternalisering (taus til eksplisitt, det vanskeligste steget), kombinering (eksplisitt til eksplisitt) og internalisering (eksplisitt til taus). Poenget er at mye av det organisasjonen kan, ikke lar seg skrive ned, og at dokumentasjon derfor ikke er det samme som læring.\n\nTiltakene må treffe mekanismen: arenaer der forutsetninger kan prøves uten at noen taper ansikt, psykologisk trygghet som forutsetning, og ledere som selv inviterer til at deres egne premisser utfordres. Sterke besvarelser nevner at organisasjoner som er svært gode på enkelkretslæring, kan bli dårligere på dobbeltkrets — de optimaliserer seg fast.',
    fallgruver: [
      'Å definere de to læringsformene uten eksempler',
      'Å foreslå kunnskapsdatabaser som løsning på et taus kunnskap-problem'
    ],
    teorier: ['argyris-schon', 'seki', 'senge', 'psykologisk-trygghet']
  },
  {
    id: 'ek-laering-2', modul: 'laering', type: 'Drøfting', tid: '60 min', niva: 3,
    tittel: 'Utnyttelse eller utforskning',
    oppgave: 'Gjør rede for Marchs skille mellom exploitation og exploration. Drøft hvorfor veletablerte organisasjoner systematisk favoriserer det første, og hva det betyr for evnen til å møte disruptiv innovasjon.',
    krav: [
      'Begge begrepene, og hvorfor de konkurrerer om de samme ressursene',
      'Kompetansefellen',
      'Disruptiv innovasjon og hvorfor gode beslutninger gir dårlig utfall',
      'Ambideksteritet som mulig svar, med innvending'
    ],
    sensor: 'Exploitation er å utnytte og forbedre det man allerede kan; exploration er å utforske det man ennå ikke kan. Det avgjørende er at de konkurrerer om de samme knappe ressursene, og at avkastningen er ulikt fordelt i tid og sikkerhet: utnyttelse gir sikker gevinst nå, utforskning usikker gevinst senere.\n\nKompetansefellen forklarer skjevheten: jo bedre organisasjonen blir på det den gjør, desto høyere blir avkastningen av å fortsette, og desto dyrere blir det å prøve noe nytt. Dette er en rasjonell mekanisme, ikke en ledelsesfeil.\n\nChristensens poeng er det samme sett fra markedet: den etablerte aktøren lytter til sine beste kunder, investerer der marginene er høyest, og avviser den nye teknologien fordi den i starten er dårligere og retter seg mot et lite, ulønnsomt segment. Hver enkelt beslutning er forsvarlig, og summen er fatal. Det er nettopp derfor problemet er vanskelig.\n\nAmbideksteritet — å drive begge deler samtidig, gjerne i atskilte enheter med ulike mål og ulik struktur — er standardsvaret. Innvendingen bør med: atskillelsen løser ressurskonflikten, men skaper et nytt problem, nemlig at den utforskende enheten mangler tilgang til morselskapets ressurser og ofte taper når de to skal integreres igjen.',
    fallgruver: [
      'Å fremstille etablerte selskapers valg som dumme',
      'Å nevne ambideksteritet uten å si hva det koster'
    ],
    teorier: ['march-exploration', 'disruptiv-innovasjon', 'senge', 'punktert-likevekt']
  },

  /* ---------- På tvers av kapitlene ---------- */
  {
    id: 'ek-tvers-1', modul: 'tvers', type: 'Langsvar', tid: '120 min', niva: 3,
    tittel: 'Struktur, kultur og makt i samme analyse',
    oppgave: 'Et helseforetak innfører standardiserte pasientforløp ved en kirurgisk avdeling. Etter et halvt år er liggetiden redusert, men to erfarne sykepleiere har sluttet, overlegene deltar ikke på de nye møtene, og det rapporteres om økt tidspress. Analyser situasjonen med struktur-, kultur- og maktteori, og gi en begrunnet anbefaling om videre utrulling.',
    krav: [
      'Profesjonsbyråkratiet og hvorfor standardisering av prosesser kolliderer med standardisering av kunnskap',
      'Maktanalyse: hvem har reell vetomakt, og hvorfor',
      'Målforskyvning som tolkning av resultatbildet',
      'Jobbkarakteristika eller mestringsklima brukt på oppsigelsene',
      'En tydelig anbefaling med forbehold'
    ],
    sensor: 'Den strukturelle diagnosen er kjernen: en kirurgisk avdeling er et profesjonsbyråkrati, der koordineringen skjer gjennom standardisering av kunnskap. Lean standardiserer arbeidsprosesser. Konflikten er dermed strukturell, ikke et spørsmål om holdninger hos enkeltleger, og en besvarelse som forklarer den som uvilje har misforstått.\n\nMaktanalysen må vise at overlegene har ekspertmakt og kontroll over den kritiske usikkerheten, og dermed reell vetomakt uavhengig av linjen. Sykepleierne har mindre strukturell makt, og det er verdt å merke seg at det er de som slutter — makt og belastning fordeler seg ulikt.\n\nResultatbildet bør tolkes som mulig målforskyvning: liggetid er målbar, faglig forsvarlighet og arbeidsbelastning er det i mindre grad. Reduksjonen kan derfor være reell og likevel kjøpt for noe som ikke telles. Forslag til supplerende målinger — avvik, strykninger, turnover, opplevd belastning — hører med.\n\nOppsigelsene bør analyseres med jobbkarakteristikamodellen: standardiserte forløp reduserer autonomi og oppgaveidentitet, og effekten er ulik for de to profesjonsgruppene fordi utgangspunktet er ulikt.\n\nAnbefalingen må være tydelig. Et forsvarlig standpunkt er å utsette utrullingen til fagmiljøet er medforfatter og til målesettet fanger belastningen — med det ærlige forbeholdet at utsettelse også har en kostnad, og at flytgevinstene er reelle.',
    fallgruver: [
      'Å bruke tre teorier etter hverandre uten å koble dem',
      'Å konkludere uten forbehold, eller å la være å konkludere'
    ],
    teorier: ['mintzberg-konfigurasjoner', 'french-raven', 'strategisk-kontingens', 'jobbkarakteristika', 'schein-kultur']
  },
  {
    id: 'ek-tvers-2', modul: 'tvers', type: 'Langsvar', tid: '120 min', niva: 3,
    tittel: 'Da noen visste, men ingen handlet',
    oppgave: 'I en teknologitung bedrift blir en kjent risiko ikke håndtert før den utløser en alvorlig hendelse. I ettertid viser det seg at ingeniører varslet internt, at et delmål om å unngå kostbar omskolering styrte tekniske valg, og at tilsynsoppgaver var delegert til bedriften selv. Analyser hendelsesforløpet med mål-, kommunikasjons-, beslutnings- og omgivelsesteori.',
    krav: [
      'Målforskyvning: hovedmål mot målbart delmål',
      'Siling oppover som forklaring på at varselet ikke nådde fram',
      'Eskalerende forpliktelse og gruppetenkning',
      'Legitimitet og hva som skjer når tilsyn delegeres til den som kontrolleres',
      'Lederatferden plassert i fullspektrumsmodellen'
    ],
    sensor: 'Analysen bør begynne med målstrukturen: sikkerhet er hovedmålet, men det er vanskelig å måle løpende. Delmålet om å unngå omskolering er konkret, tidfestet og eid av noen. Mekanismen i målforskyvning er nettopp at det målbare delmålet vinner når de to kolliderer, uten at noen tar en bevisst beslutning om å nedprioritere sikkerheten.\n\nKommunikasjonsdelen må lokalisere hvor varselet stoppet og hvorfor. Silingen skal forklares som rasjonell for den enkelte: den som melder dårlige nyheter knyttes til dem, hvert ledd glatter ut, og usikre signaler nedtones fordi den som tar feil taper mer enn den som tier.\n\nBeslutningsdelen kobler begrenset rasjonalitet med eskalerende forpliktelse: jo lenger utviklingen har kommet, desto dyrere er det å snu, og i tapsdomenet velger man risiko framfor et sikkert tap. Gruppetenkning forklarer hvordan innvendinger forsvant i en gruppe med sterk samhørighet og tidspress.\n\nOmgivelsesdelen må ta opp tilsynsforholdet: når kontrollfunksjonen delegeres til den som kontrolleres, forsvinner den uavhengige korreksjonen, samtidig som legitimiteten utad opprettholdes. Dekobling er et presist begrep her.\n\nLederatferden hører hjemme i passiv unntaksledelse — inngripen først når problemet er stort nok til å bli synlig — og i en virksomhet med denne risikoen er det i praksis nær laissez-faire. Sterke besvarelser knytter de fem delene sammen til én mekanisme i stedet for fem separate analyser.',
    fallgruver: [
      'Å lete etter én skyldig person i stedet for en organisatorisk mekanisme',
      'Å analysere de fire teoriområdene hver for seg uten å vise hvordan de forsterker hverandre'
    ],
    teorier: ['maalsettingsteori', 'kanalrikhet', 'gruppetenkning', 'prospektteori', 'nyinstitusjonell', 'destruktiv-ledelse']
  },
  {
    id: 'ek-tvers-3', modul: 'tvers', type: 'Drøfting', tid: '90 min', niva: 3,
    tittel: 'Kultur eller struktur som styringsvalg',
    oppgave: 'To selskaper løser samordningsproblemet ulikt: det ene med detaljerte rutiner og tett oppfølging, det andre med få regler, sterk kultur og høy autonomi. Drøft hva som avgjør hvilken løsning som er riktig, og hvilke betingelser den kulturbaserte modellen hviler på.',
    krav: [
      'Samordningsmekanismene, med standardisering mot gjensidig tilpasning og normer',
      'Oppgavens karakter: rutinepreget mot kunnskapsintensivt, og kostnaden ved feil',
      'Betingelsene for kulturstyring: seleksjon, sosialisering, stabilitet, tillit',
      'Et standpunkt om overførbarhet til norsk arbeidsliv'
    ],
    sensor: 'Drøftingen må forankres i at begge modellene løser det samme problemet — å få mange mennesker til å handle koordinert — med ulike mekanismer. Formalisering standardiserer handlingen; kultur standardiserer premissene for handlingen.\n\nDet som avgjør valget, er oppgavens karakter og kostnaden ved feil. Er arbeidet rutinepreget og feilene dyre, er formalisering overlegen: den er etterprøvbar, uavhengig av hvem som er på jobb, og den tåler utskiftning. Er arbeidet kunnskapsintensivt og situasjonene for varierte til å beskrives på forhånd, blir detaljerte rutiner enten ignorert eller til hinder, og kultur er det som skalerer.\n\nBetingelsene for den kulturbaserte modellen må frem tydelig: streng seleksjon ved ansettelse, tid og arenaer for sosialisering, rimelig stabil bemanning, og et tillitsforhold som tåler at feil blir kjent. Modellen forutsetter også et arbeidsmarked der den som ikke passer inn, raskt får ny jobb — ellers blir det implisitte kravet om vedvarende toppytelse en helt annen belastning.\n\nOverførbarheten til norsk arbeidsliv bør drøftes konkret: stillingsvernet, medbestemmelsestradisjonen og de institusjonelle omgivelsene gjør at en modell bygget på rask utskiftning ikke lar seg importere uendret — den må oversettes, og det som oversettes bort, kan være det som fikk den til å virke.',
    fallgruver: [
      'Å fremstille kulturstyring som mykere og derfor bedre',
      'Å utelate kostnaden ved feil som avgjørende variabel'
    ],
    teorier: ['mintzberg-konfigurasjoner', 'schein-kultur', 'selvbestemmelsesteori', 'oversettelsesteori', 'burns-stalker']
  },
  {
    id: 'ek-tvers-4', modul: 'tvers', type: 'Drøfting', tid: '60 min', niva: 3,
    tittel: 'Forsvar det motsatte',
    oppgave: 'Velg en påstand fra pensum du er uenig i — for eksempel at transformasjonsledelse er å foretrekke, at sterk kultur er et gode, eller at motstand mot endring bør reduseres. Skriv den beste besvarelsen du kan til forsvar for påstanden. Avslutt med to avsnitt om hvilket motargument som var vanskeligst å håndtere.',
    krav: [
      'Påstanden formulert presist, slik en tilhenger ville formulert den',
      'Minst tre teoriforankrede argumenter for påstanden',
      'De sterkeste motargumentene behandlet, ikke utelatt',
      'En avsluttende refleksjon over hva øvelsen gjorde med ditt eget standpunkt'
    ],
    sensor: 'Dette er en øvelse i drøftingsteknikk, og vurderes deretter. En sterk besvarelse formulerer påstanden i sin mest velvillige form: det er lett å vinne mot en karikatur, og en besvarelse som gjør det, har ikke løst oppgaven.\n\nArgumentene må være teoriforankrede og ikke retoriske. Forsvarer man for eksempel sterk kultur, er de gode argumentene at kultur er en billigere samordningsmekanisme enn formalisering, at den gir raskere beslutninger fordi premissene er delte, og at den reduserer behovet for kontroll som i seg selv svekker indre motivasjon.\n\nMotargumentene må tas i sin sterkeste form — for sterk kultur: svekket evne til å oppdage egne feil, høyere terskel for varsling, og dårligere håndtering av mangfold — og besvares, ikke nevnes i forbifarten.\n\nRefleksjonsdelen vurderes på ærlighet og presisjon, ikke på om standpunktet snudde. Det som løfter, er å identifisere nøyaktig hvilket argument som ikke lot seg besvare, og hva det innebærer: om påstanden må innsnevres, betinges av kontekst, eller oppgis. Den som konkluderer med at alt lot seg forsvare like godt, har som regel unngått det vanskeligste motargumentet.',
    fallgruver: [
      'Å forsvare en svakere versjon av påstanden enn den reelle',
      'Å bruke refleksjonsdelen til å gjenta sitt opprinnelige standpunkt'
    ],
    teorier: ['schein-kultur', 'transformasjonsledelse', 'lewin']
  }
];
