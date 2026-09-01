/* Router og sidevisninger. */
(function () {
  var ui = window.OT.ui;
  var store = window.OT.store;
  var main = document.getElementById('main');

  /* ---------------- Tema ---------------- */

  function settTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    store.settTema(tema);
  }

  (function initTema() {
    var lagret = store.get().tema;
    var mork = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', lagret || (mork ? 'dark' : 'light'));
  })();

  document.getElementById('themeBtn').addEventListener('click', function () {
    var na = document.documentElement.getAttribute('data-theme');
    settTema(na === 'dark' ? 'light' : 'dark');
  });

  /* ---------------- Meny ---------------- */

  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var menuBtn = document.getElementById('menuBtn');

  function lukkMeny() {
    sidebar.classList.remove('is-open');
    scrim.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', function () {
    var apen = sidebar.classList.toggle('is-open');
    scrim.hidden = !apen;
    menuBtn.setAttribute('aria-expanded', String(apen));
  });
  scrim.addEventListener('click', lukkMeny);

  function byggModulNav() {
    var rot = document.getElementById('moduleNav');
    rot.innerHTML = window.OT.modules.map(function (m) {
      return '<a class="nav-item" href="#/modul/' + m.id + '" data-nav="/modul/' + m.id + '">' +
        '<span class="nav-num">' + m.nr + '</span>' + ui.esc(m.tittel) + '</a>';
    }).join('');
  }

  function markerAktiv(rute) {
    document.querySelectorAll('.nav-item').forEach(function (a) {
      var href = a.getAttribute('href').replace('#', '');
      a.classList.toggle('is-active', href === rute || (href !== '/oversikt' && rute.indexOf(href) === 0));
    });
  }

  /* ---------------- Søk ---------------- */

  var searchInput = document.getElementById('globalSearch');
  var searchResults = document.getElementById('searchResults');

  function sokIndeks() {
    var poster = [];
    window.OT.modules.forEach(function (m) {
      poster.push({ kind: 'Modul', title: m.nr + '. ' + m.tittel, sub: m.ingress, href: '#/modul/' + m.id, tekst: m.tittel + ' ' + m.ingress });
    });
    window.OT.theories.forEach(function (t) {
      poster.push({ kind: 'Teori', title: t.navn, sub: t.opphav + (t.aar ? ' (' + t.aar + ')' : ''), href: '#/teori/' + t.id, tekst: t.navn + ' ' + t.opphav + ' ' + t.kjerne });
    });
    window.OT.glossary.forEach(function (g) {
      poster.push({ kind: 'Begrep', title: g.term, sub: g.def, href: '#/begreper?q=' + encodeURIComponent(g.term), tekst: g.term + ' ' + g.def });
    });
    window.OT.cases.forEach(function (c) {
      poster.push({ kind: 'Case', title: c.tittel, sub: ui.modulNavn(c.modul), href: '#/case/' + c.id, tekst: c.tittel + ' ' + c.scenario });
    });
    return poster;
  }

  var indeks = null;

  function visSok(q) {
    if (!indeks) indeks = sokIndeks();
    var s = q.trim().toLowerCase();
    if (s.length < 2) {
      searchResults.hidden = true;
      searchInput.setAttribute('aria-expanded', 'false');
      return;
    }
    var treff = indeks.filter(function (p) {
      return p.tekst.toLowerCase().indexOf(s) !== -1;
    }).sort(function (a, b) {
      return a.title.toLowerCase().indexOf(s) - b.title.toLowerCase().indexOf(s);
    }).slice(0, 12);

    if (!treff.length) {
      searchResults.innerHTML = '<p class="search-empty">Ingen treff på «' + ui.esc(q) + '».</p>';
    } else {
      searchResults.innerHTML = treff.map(function (t) {
        return '<a class="search-hit" href="' + t.href + '" role="option">' +
          '<span class="hit-kind">' + ui.esc(t.kind) + '</span>' +
          '<span class="hit-title">' + ui.esc(t.title) + '</span>' +
          '<span class="hit-sub">' + ui.esc(String(t.sub).slice(0, 110)) + '</span></a>';
      }).join('');
    }
    searchResults.hidden = false;
    searchInput.setAttribute('aria-expanded', 'true');
  }

  searchInput.addEventListener('input', function () { visSok(searchInput.value); });
  searchInput.addEventListener('focus', function () { if (searchInput.value) visSok(searchInput.value); });
  document.addEventListener('click', function (e) {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.hidden = true;
      searchInput.setAttribute('aria-expanded', 'false');
    }
  });
  searchResults.addEventListener('click', function () {
    searchResults.hidden = true;
    searchInput.value = '';
  });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { searchResults.hidden = true; searchInput.blur(); }
  });

  /* ---------------- Sider ---------------- */

  function sideOversikt() {
    var total = store.totalFremgang();
    var s = store.get();
    var besvarte = Object.keys(s.sporsmal).length;
    var kanKort = Object.keys(s.kort).filter(function (k) { return s.kort[k] === 'kan'; }).length;
    var ferdigCase = Object.keys(s.caseFerdig).length;

    var html = ui.sideHode('Interaktiv oppgaveplattform', 'Hvordan organisasjoner fungerer',
      'Tolv kapitler i organisasjonsteori med alle hovedteoriene og definisjonene, og fire oppgavetyper å øve med: quiz, flashcards, koblingsoppgaver og caseoppgaver. Fremgangen din lagres lokalt i nettleseren.');

    html += '<div class="stat-row">';
    html += '<div class="stat"><b>' + window.OT.modules.length + '</b><span>kapitler</span></div>';
    html += '<div class="stat"><b>' + window.OT.theories.length + '</b><span>hovedteorier</span></div>';
    html += '<div class="stat"><b>' + window.OT.glossary.length + '</b><span>definisjoner</span></div>';
    html += '<div class="stat"><b>' + window.OT.questions.length + '</b><span>quizspørsmål</span></div>';
    html += '<div class="stat"><b>' + window.OT.cases.length + '</b><span>caseoppgaver</span></div>';
    html += '</div>';

    html += '<div class="card"><h3 style="margin-top:0">Samlet fremgang: ' + total + ' %</h3>' +
      ui.bar(total, total >= 80) +
      '<p class="count-note" style="margin-top:.7rem">' + besvarte + ' spørsmål besvart &middot; ' +
      kanKort + ' begreper markert som «kan» &middot; ' + ferdigCase + ' caseoppgaver gjennomført</p></div>';

    html += '<h2>Start her</h2><div class="grid">';
    html += tile('#/modul/grunnlag', 'Les kapitlene', 'Tolv moduler med læringsmål, teoritabeller og definisjoner.');
    html += tile('#/quiz', 'Ta en quiz', 'Flervalgsspørsmål med forklaring på hvert svar, per kapittel eller på tvers.');
    html += tile('#/flashcards', 'Puggekort', 'Snu kort med begrep og definisjon, og marker hva du kan.');
    html += tile('#/kobling', 'Koblingsoppgaver', 'Par teori med opphavsperson, eller begrep med definisjon.');
    html += tile('#/case', 'Caseoppgaver', 'Realistiske situasjoner å analysere, med veiledende svar.');
    html += tile('#/eksamen', 'Eksamensmodus', 'Førti spørsmål på tvers av alle kapitler.');
    html += '</div>';

    html += '<h2>Kapitler</h2><div class="grid">';
    window.OT.modules.forEach(function (m) {
      var f = store.modulFremgang(m.id);
      html += '<a class="tile" href="#/modul/' + m.id + '">' +
        '<span class="chip chip-accent">Kapittel ' + m.nr + '</span>' +
        '<h3>' + ui.esc(m.tittel) + '</h3><p>' + ui.esc(m.ingress) + '</p>' +
        '<div style="margin-top:.7rem">' + ui.bar(f.prosent, f.prosent >= 80) + '</div>' +
        '<p style="margin-top:.4rem;font-size:.76rem;color:var(--text-dim)">' + f.prosent + ' % fullført</p>' +
        '</a>';
    });
    html += '</div>';

    main.innerHTML = html;
  }

  function tile(href, tittel, tekst) {
    return '<a class="tile" href="' + href + '"><h3>' + ui.esc(tittel) + '</h3><p>' + ui.esc(tekst) + '</p></a>';
  }

  function sideModuler() {
    var html = ui.sideHode('Pensum', 'Alle kapitler',
      'Kapitlene følger den vanlige oppbygningen i organisasjonsteori: først organisasjonens indre forhold, så atferd og prosesser, og til slutt endring og læring.');
    html += '<div class="grid">';
    window.OT.modules.forEach(function (m) {
      var f = store.modulFremgang(m.id);
      html += '<a class="tile" href="#/modul/' + m.id + '">' +
        '<span class="chip chip-accent">Kapittel ' + m.nr + '</span>' +
        '<h3>' + ui.esc(m.tittel) + '</h3><p>' + ui.esc(m.ingress) + '</p>' +
        '<div style="margin-top:.7rem">' + ui.bar(f.prosent, f.prosent >= 80) + '</div>' +
        '<p style="margin-top:.4rem;font-size:.76rem;color:var(--text-dim)">' +
        f.riktigeSporsmal + '/' + f.sporsmal + ' spørsmål &middot; ' +
        f.kanKort + '/' + f.kort + ' begreper</p></a>';
    });
    html += '</div>';
    main.innerHTML = html;
  }

  function blokkHtml(b) {
    if (b.t === 'p') return '<p>' + ui.rik(b.tekst) + '</p>';
    if (b.t === 'liste') {
      return (b.tittel ? '<h3>' + ui.esc(b.tittel) + '</h3>' : '') +
        '<ul class="bullets">' + b.punkter.map(function (p) {
          return '<li>' + ui.rik(p) + '</li>';
        }).join('') + '</ul>';
    }
    if (b.t === 'tabell') {
      return '<div class="table-wrap"><table><thead><tr>' +
        b.kolonner.map(function (k) { return '<th>' + ui.esc(k) + '</th>'; }).join('') +
        '</tr></thead><tbody>' +
        b.rader.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + ui.rik(c) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
    }
    if (b.t === 'boks') {
      return '<div class="callout"><strong>' + ui.esc(b.tittel) + '</strong>' + ui.rik(b.tekst) + '</div>';
    }
    if (b.t === 'def') {
      return '<dl class="def"><dt>' + ui.esc(b.term) + '</dt><dd>' + ui.rik(b.tekst) + '</dd></dl>';
    }
    return '';
  }

  function sideModul(id) {
    var m = ui.modulById(id);
    if (!m) return sideIkkeFunnet();

    var teorier = window.OT.theories.filter(function (t) { return t.modul === id; });
    var begreper = window.OT.glossary.filter(function (g) { return g.modul === id; });
    var caser = window.OT.cases.filter(function (c) { return c.modul === id; });
    var sporsmal = window.OT.questions.filter(function (q) { return q.modul === id; });
    var f = store.modulFremgang(id);

    var html = ui.sideHode('Kapittel ' + m.nr, m.tittel, m.ingress);

    html += '<div class="card"><h3 style="margin-top:0">Læringsmål</h3><ul class="bullets">' +
      m.laeringsmaal.map(function (l) { return '<li>' + ui.rik(l) + '</li>'; }).join('') +
      '</ul><div style="margin-top:.8rem">' + ui.bar(f.prosent, f.prosent >= 80) +
      '<p class="count-note" style="margin-top:.5rem">' + f.prosent + ' % fullført i dette kapitlet</p></div></div>';

    html += '<div class="module-toc"><strong>Innhold</strong><ol>' +
      m.seksjoner.map(function (s, i) {
        return '<li><a href="#/modul/' + id + '#s' + i + '">' + ui.esc(s.tittel) + '</a></li>';
      }).join('') + '</ol></div>';

    html += '<div class="prose">';
    m.seksjoner.forEach(function (s, i) {
      html += '<h2 id="s' + i + '">' + ui.esc(s.tittel) + '</h2>';
      s.blokker.forEach(function (b) { html += blokkHtml(b); });
    });
    html += '</div>';

    if (teorier.length) {
      html += '<h2>Hovedteorier i dette kapitlet</h2><div class="grid">';
      teorier.forEach(function (t) {
        html += '<a class="tile" href="#/teori/' + t.id + '"><span class="chip">' + ui.esc(t.kategori) + '</span>' +
          '<h3>' + ui.esc(t.navn) + '</h3><p>' + ui.esc(t.opphav) + (t.aar ? ', ' + ui.esc(t.aar) : '') + '</p></a>';
      });
      html += '</div>';
    }

    if (begreper.length) {
      html += '<h2>Definisjoner (' + begreper.length + ')</h2><div class="def-list">';
      begreper.forEach(function (g) {
        html += '<dl class="def"><dt>' + ui.esc(g.term) + '</dt><dd>' + ui.rik(g.def) +
          (g.kilde ? '<span class="src">' + ui.esc(g.kilde) + '</span>' : '') + '</dd></dl>';
      });
      html += '</div>';
    }

    html += '<h2>Øv på dette kapitlet</h2><div class="grid">';
    if (sporsmal.length) html += tile('#/quiz/' + id, 'Quiz (' + sporsmal.length + ' spørsmål)', 'Test kapitlet med forklaring på hvert svar.');
    if (begreper.length) html += tile('#/flashcards/' + id, 'Flashcards (' + begreper.length + ')', 'Pugg definisjonene i dette kapitlet.');
    if (teorier.length > 1) html += tile('#/kobling/teoretiker/' + id, 'Koble teori og opphav', 'Par teoriene med opphavspersonene.');
    caser.forEach(function (c) {
      html += tile('#/case/' + c.id, 'Case: ' + c.tittel, c.tid + ' &middot; analyseoppgave med veiledende svar');
    });
    html += '</div>';

    var i = window.OT.modules.indexOf(m);
    var forrige = window.OT.modules[i - 1];
    var neste = window.OT.modules[i + 1];
    html += '<div class="pager">' +
      (forrige ? '<a href="#/modul/' + forrige.id + '">← ' + ui.esc(forrige.nr + '. ' + forrige.tittel) + '</a>' : '<span></span>') +
      '<span class="spacer"></span>' +
      (neste ? '<a href="#/modul/' + neste.id + '">' + ui.esc(neste.nr + '. ' + neste.tittel) + ' →</a>' : '<span></span>') +
      '</div>';

    main.innerHTML = html;
  }

  function sideTeorier() {
    var kategorier = [];
    window.OT.theories.forEach(function (t) {
      if (kategorier.indexOf(t.kategori) === -1) kategorier.push(t.kategori);
    });
    kategorier.sort();

    var html = ui.sideHode('Teoribank', 'Hovedteoriene',
      'Alle sentrale teorier i faget, med opphav, kjerneidé, hovedpunkter og den vanligste kritikken. Filtrer på kapittel eller kategori.');

    html += '<div class="toolbar">' +
      '<input type="search" id="tFilter" placeholder="Søk i teorier…" aria-label="Søk i teorier" />' +
      '<select id="tModul" aria-label="Filtrer på kapittel"><option value="">Alle kapitler</option>' +
      window.OT.modules.map(function (m) {
        return '<option value="' + m.id + '">' + ui.esc(m.nr + '. ' + m.tittel) + '</option>';
      }).join('') + '</select>' +
      '<select id="tKat" aria-label="Filtrer på kategori"><option value="">Alle kategorier</option>' +
      kategorier.map(function (k) { return '<option value="' + ui.esc(k) + '">' + ui.esc(k) + '</option>'; }).join('') +
      '</select></div>';

    html += '<p class="count-note" id="tCount"></p><div class="grid" id="tListe"></div>';
    main.innerHTML = html;

    var fInput = document.getElementById('tFilter');
    var fModul = document.getElementById('tModul');
    var fKat = document.getElementById('tKat');

    function tegn() {
      var q = fInput.value.trim().toLowerCase();
      var treff = window.OT.theories.filter(function (t) {
        if (fModul.value && t.modul !== fModul.value) return false;
        if (fKat.value && t.kategori !== fKat.value) return false;
        if (!q) return true;
        return (t.navn + ' ' + t.opphav + ' ' + t.kjerne).toLowerCase().indexOf(q) !== -1;
      });
      document.getElementById('tCount').textContent =
        treff.length + ' av ' + window.OT.theories.length + ' teorier';
      document.getElementById('tListe').innerHTML = treff.map(function (t) {
        return '<a class="tile" href="#/teori/' + t.id + '">' +
          '<span class="chip">' + ui.esc(t.kategori) + '</span>' +
          '<h3>' + ui.esc(t.navn) + '</h3>' +
          '<p>' + ui.esc(t.opphav) + (t.aar ? ', ' + ui.esc(t.aar) : '') + '</p></a>';
      }).join('') || '<p class="count-note">Ingen teorier matcher filteret.</p>';
    }

    [fInput, fModul, fKat].forEach(function (e) {
      e.addEventListener('input', tegn);
      e.addEventListener('change', tegn);
    });
    tegn();
  }

  function sideTeori(id) {
    var t = window.OT.theories.filter(function (x) { return x.id === id; })[0];
    if (!t) return sideIkkeFunnet();

    var html = ui.sideHode('Teori &middot; ' + ui.modulNavn(t.modul), t.navn, null);
    html += '<div class="chip-row">' +
      '<span class="chip chip-accent">' + ui.esc(t.kategori) + '</span>' +
      '<span class="chip">' + ui.esc(t.opphav) + '</span>' +
      (t.aar ? '<span class="chip">' + ui.esc(t.aar) + '</span>' : '') + '</div>';

    html += '<div class="card theory-card" style="margin-top:1.2rem"><h3>Kjerneidé</h3><p>' +
      ui.rik(t.kjerne) + '</p></div>';

    html += '<h2>Hovedpunkter</h2><ul class="bullets">' +
      t.punkter.map(function (p) { return '<li>' + ui.rik(p) + '</li>'; }).join('') + '</ul>';

    html += '<h2>Kritikk og begrensninger</h2><div class="callout callout-warn">' + ui.rik(t.kritikk) + '</div>';

    var beslektet = window.OT.theories.filter(function (x) {
      return x.id !== t.id && (x.modul === t.modul || x.kategori === t.kategori);
    }).slice(0, 6);

    if (beslektet.length) {
      html += '<h2>Beslektede teorier</h2><div class="grid">';
      beslektet.forEach(function (b) {
        html += '<a class="tile" href="#/teori/' + b.id + '"><span class="chip">' + ui.esc(b.kategori) + '</span>' +
          '<h3>' + ui.esc(b.navn) + '</h3><p>' + ui.esc(b.opphav) + '</p></a>';
      });
      html += '</div>';
    }

    html += '<div class="btn-row"><a class="btn" href="#/modul/' + t.modul + '">Til kapitlet</a>' +
      '<a class="btn btn-ghost" href="#/teorier">Tilbake til teoribanken</a></div>';

    main.innerHTML = html;
  }

  function sideBegreper(query) {
    var html = ui.sideHode('Begrepsbank', 'Definisjoner',
      'Alle definisjoner i pensum, samlet og søkbare. Bruk flashcards hvis du vil pugge dem aktivt.');

    html += '<div class="toolbar">' +
      '<input type="search" id="gFilter" placeholder="Søk i begreper…" aria-label="Søk i begreper" />' +
      '<select id="gModul" aria-label="Filtrer på kapittel"><option value="">Alle kapitler</option>' +
      window.OT.modules.map(function (m) {
        return '<option value="' + m.id + '">' + ui.esc(m.nr + '. ' + m.tittel) + '</option>';
      }).join('') + '</select>' +
      '<a class="btn btn-ghost" href="#/flashcards">Pugg som flashcards</a></div>';

    html += '<p class="count-note" id="gCount"></p><div class="def-list" id="gListe"></div>';
    main.innerHTML = html;

    var fInput = document.getElementById('gFilter');
    var fModul = document.getElementById('gModul');
    if (query) fInput.value = query;

    function tegn() {
      var q = fInput.value.trim().toLowerCase();
      var treff = window.OT.glossary.filter(function (g) {
        if (fModul.value && g.modul !== fModul.value) return false;
        if (!q) return true;
        return (g.term + ' ' + g.def).toLowerCase().indexOf(q) !== -1;
      });
      document.getElementById('gCount').textContent =
        treff.length + ' av ' + window.OT.glossary.length + ' begreper';
      document.getElementById('gListe').innerHTML = treff.map(function (g) {
        return '<dl class="def"><dt>' + ui.esc(g.term) + '</dt><dd>' + ui.rik(g.def) +
          '<span class="src">' + ui.esc(ui.modulNavn(g.modul)) +
          (g.kilde ? ' &middot; ' + ui.esc(g.kilde) : '') + '</span></dd></dl>';
      }).join('') || '<p class="count-note">Ingen begreper matcher søket.</p>';
    }

    fInput.addEventListener('input', tegn);
    fModul.addEventListener('change', tegn);
    tegn();
  }

  function sideQuizOversikt() {
    var feil = store.feilSporsmal();
    var html = ui.sideHode('Oppgaver', 'Quiz',
      'Flervalgsspørsmål med forklaring på hvert svar. Noen spørsmål har flere riktige alternativer – det står i så fall i oppgaveteksten.');

    html += '<div class="grid">';
    html += tile('#/quiz/alle', 'Blandet quiz', 'Tjue tilfeldige spørsmål fra hele pensum.');
    html += feil.length
      ? tile('#/quiz/feil', 'Repeter feil (' + feil.length + ')', 'Kun spørsmålene du sist svarte feil på.')
      : '<div class="tile" style="opacity:.6"><h3>Repeter feil</h3><p>Ingen feilsvar registrert ennå.</p></div>';
    html += tile('#/eksamen', 'Eksamensmodus', 'Førti spørsmål på tvers av alle kapitler.');
    html += '</div>';

    html += '<h2>Quiz per kapittel</h2><div class="grid">';
    window.OT.modules.forEach(function (m) {
      var sp = window.OT.questions.filter(function (q) { return q.modul === m.id; });
      var res = store.get().quiz[m.id];
      html += '<a class="tile" href="#/quiz/' + m.id + '">' +
        '<span class="chip chip-accent">Kapittel ' + m.nr + '</span>' +
        '<h3>' + ui.esc(m.tittel) + '</h3>' +
        '<p>' + sp.length + ' spørsmål' +
        (res ? ' &middot; beste resultat: ' + res.beste + '/' + res.antall : '') + '</p></a>';
    });
    html += '</div>';
    main.innerHTML = html;
  }

  function startQuiz(nokkel) {
    var sporsmal, opts, restart;

    if (nokkel === 'alle') {
      sporsmal = ui.bland(window.OT.questions).slice(0, 20);
      opts = { tittel: 'Blandet quiz', undertittel: 'Hele pensum', lagreResultat: false };
    } else if (nokkel === 'feil') {
      sporsmal = store.feilSporsmal();
      opts = { tittel: 'Repetisjon av feilsvar', undertittel: 'Dine feil', lagreResultat: false };
      if (!sporsmal.length) {
        main.innerHTML = ui.sideHode('Repetisjon', 'Ingen feilsvar igjen',
          'Du har ingen registrerte feilsvar akkurat nå. Ta en quiz først.') +
          '<div class="btn-row"><a class="btn btn-primary" href="#/quiz">Til quizoversikten</a></div>';
        return;
      }
    } else if (nokkel === 'eksamen') {
      sporsmal = ui.bland(window.OT.questions).slice(0, 40);
      opts = { tittel: 'Eksamensmodus', undertittel: '40 spørsmål fra hele pensum', lagreResultat: false };
    } else {
      var m = ui.modulById(nokkel);
      if (!m) return sideIkkeFunnet();
      sporsmal = window.OT.questions.filter(function (q) { return q.modul === nokkel; });
      opts = { tittel: 'Quiz: ' + m.tittel, undertittel: 'Kapittel ' + m.nr, modulId: nokkel };
    }

    restart = function () { startQuiz(nokkel); };
    window.OT.quiz.start(main, sporsmal, opts, restart);
    window.scrollTo(0, 0);
  }

  function sideFlashcardsOversikt() {
    var s = store.get();
    var repeter = window.OT.glossary.filter(function (g) { return s.kort[g.term] === 'repeter'; });

    var html = ui.sideHode('Oppgaver', 'Flashcards',
      'Snu kortet for å se definisjonen, og marker om du kan begrepet. Markeringene lagres, slik at du kan repetere det som sitter dårligst.');

    html += '<div class="grid">';
    html += tile('#/flashcards/alle', 'Alle begreper (' + window.OT.glossary.length + ')', 'Hele begrepsbanken i tilfeldig rekkefølge.');
    html += repeter.length
      ? tile('#/flashcards/repeter', 'Må repeteres (' + repeter.length + ')', 'Kun kortene du har markert for repetisjon.')
      : '<div class="tile" style="opacity:.6"><h3>Må repeteres</h3><p>Ingen kort markert for repetisjon ennå.</p></div>';
    html += '</div>';

    html += '<h2>Per kapittel</h2><div class="grid">';
    window.OT.modules.forEach(function (m) {
      var kort = window.OT.glossary.filter(function (g) { return g.modul === m.id; });
      var kan = kort.filter(function (g) { return s.kort[g.term] === 'kan'; }).length;
      if (!kort.length) return;
      html += '<a class="tile" href="#/flashcards/' + m.id + '">' +
        '<span class="chip chip-accent">Kapittel ' + m.nr + '</span>' +
        '<h3>' + ui.esc(m.tittel) + '</h3><p>' + kort.length + ' begreper &middot; ' + kan + ' markert som «kan»</p>' +
        '<div style="margin-top:.6rem">' + ui.bar(Math.round((kan / kort.length) * 100), kan === kort.length) + '</div></a>';
    });
    html += '</div>';
    main.innerHTML = html;
  }

  function startFlashcards(nokkel) {
    var s = store.get();
    var kort, tittel;
    if (nokkel === 'alle') {
      kort = window.OT.glossary; tittel = 'Alle begreper';
    } else if (nokkel === 'repeter') {
      kort = window.OT.glossary.filter(function (g) { return s.kort[g.term] === 'repeter'; });
      tittel = 'Kort til repetisjon';
    } else {
      var m = ui.modulById(nokkel);
      if (!m) return sideIkkeFunnet();
      kort = window.OT.glossary.filter(function (g) { return g.modul === nokkel; });
      tittel = 'Kapittel ' + m.nr + ': ' + m.tittel;
    }
    window.OT.flashcards.start(main, kort, tittel);
    window.scrollTo(0, 0);
  }

  function sideKoblingOversikt() {
    var html = ui.sideHode('Oppgaver', 'Koblingsoppgaver',
      'Velg ett element i hver kolonne for å koble dem. Oppgaven teller feilforsøk, slik at du ser hvor mye du gjettet.');

    html += '<div class="grid">';
    Object.keys(window.OT.match.varianter).forEach(function (v) {
      var d = window.OT.match.varianter[v];
      html += tile('#/kobling/' + v, d.tittel, d.lede);
    });
    html += '</div>';

    html += '<h2>Teori og opphav per kapittel</h2><div class="grid">';
    window.OT.modules.forEach(function (m) {
      var antall = window.OT.theories.filter(function (t) { return t.modul === m.id; }).length;
      if (antall < 2) return;
      html += '<a class="tile" href="#/kobling/teoretiker/' + m.id + '">' +
        '<span class="chip chip-accent">Kapittel ' + m.nr + '</span>' +
        '<h3>' + ui.esc(m.tittel) + '</h3><p>' + antall + ' teorier å koble</p></a>';
    });
    html += '</div>';
    main.innerHTML = html;
  }

  function sideCaseOversikt() {
    var s = store.get();
    var html = ui.sideHode('Oppgaver', 'Caseoppgaver',
      'Realistiske situasjoner å analysere med begreper fra pensum. Skriv ditt eget svar først, og sammenlign deretter med det veiledende svaret.');

    html += '<div class="grid">';
    window.OT.cases.forEach(function (c) {
      html += '<a class="tile" href="#/case/' + c.id + '">' +
        '<span class="chip ' + (s.caseFerdig[c.id] ? 'chip-ok' : 'chip-accent') + '">' +
        (s.caseFerdig[c.id] ? 'Gjennomført' : ui.esc(ui.modulNavn(c.modul))) + '</span>' +
        '<h3>' + ui.esc(c.tittel) + '</h3>' +
        '<p>' + ui.esc(c.tid) + ' &middot; ' + c.sporsmal.length + ' delspørsmål</p></a>';
    });
    html += '</div>';
    main.innerHTML = html;
  }

  function sideEksamen() {
    var html = ui.sideHode('Oppgaver', 'Eksamensmodus',
      'Førti tilfeldige spørsmål fra hele pensum, uten fasit underveis før du har svart. Resultatet lagres ikke som kapittelresultat, men feilsvarene havner i repetisjonslisten.');

    html += '<div class="card"><h3 style="margin-top:0">Slik er det satt opp</h3><ul class="bullets">' +
      '<li>40 spørsmål trukket tilfeldig fra alle tolv kapitler</li>' +
      '<li>Både enkeltvalg og flervalg</li>' +
      '<li>Forklaring vises etter hvert svar</li>' +
      '<li>Feilsvar samles i «Repeter feil» under Quiz</li>' +
      '</ul><div class="btn-row"><button class="btn btn-primary" data-start>Start eksamensøkt</button></div></div>';

    html += '<h2>Anbefalt eksamensforberedelse</h2><ul class="bullets">' +
      '<li>Les kapitlet og få oversikt over læringsmålene</li>' +
      '<li>Pugg definisjonene med flashcards til du kan dem uten hjelp</li>' +
      '<li>Koble teori til opphavsperson – det etterspørres ofte</li>' +
      '<li>Skriv minst tre caseoppgaver ordentlig før du ser veiledende svar</li>' +
      '<li>Avslutt med eksamensmodus og gå gjennom feilsvarene</li>' +
      '</ul>';

    main.innerHTML = html;
    main.querySelector('[data-start]').addEventListener('click', function () {
      startQuiz('eksamen');
    });
  }

  function sideFremgang() {
    var total = store.totalFremgang();
    var s = store.get();

    var html = ui.sideHode('Deg', 'Fremgang',
      'Alt lagres lokalt i denne nettleseren. Ingenting sendes noe sted, og fremgangen følger ikke med til en annen maskin.');

    html += '<div class="card"><h3 style="margin-top:0">Samlet: ' + total + ' %</h3>' + ui.bar(total, total >= 80) + '</div>';

    html += '<div class="table-wrap"><table><thead><tr>' +
      '<th>Kapittel</th><th>Spørsmål</th><th>Begreper</th><th>Case</th><th>Fullført</th>' +
      '</tr></thead><tbody>';
    window.OT.modules.forEach(function (m) {
      var f = store.modulFremgang(m.id);
      html += '<tr><td><a href="#/modul/' + m.id + '">' + ui.esc(m.nr + '. ' + m.tittel) + '</a></td>' +
        '<td>' + f.riktigeSporsmal + ' / ' + f.sporsmal + '</td>' +
        '<td>' + f.kanKort + ' / ' + f.kort + '</td>' +
        '<td>' + (f.caser ? f.ferdigCase + ' / ' + f.caser : '–') + '</td>' +
        '<td>' + f.prosent + ' %</td></tr>';
    });
    html += '</tbody></table></div>';

    var feil = store.feilSporsmal();
    if (feil.length) {
      html += '<h2>Spørsmål du bommet på (' + feil.length + ')</h2><div class="def-list">';
      feil.slice(0, 25).forEach(function (q) {
        html += '<dl class="def"><dt>' + ui.rik(q.q) + '</dt><dd>' +
          '<strong>Riktig:</strong> ' + q.riktige.map(function (i) { return ui.rik(q.alt[i]); }).join(' &middot; ') +
          '<span class="src">' + ui.esc(ui.modulNavn(q.modul)) + '</span></dd></dl>';
      });
      html += '</div><div class="btn-row"><a class="btn btn-primary" href="#/quiz/feil">Repeter disse nå</a></div>';
    }

    var repeter = window.OT.glossary.filter(function (g) { return s.kort[g.term] === 'repeter'; });
    if (repeter.length) {
      html += '<h2>Begreper markert for repetisjon (' + repeter.length + ')</h2>';
      html += '<div class="chip-row">' + repeter.map(function (g) {
        return '<span class="chip">' + ui.esc(g.term) + '</span>';
      }).join('') + '</div>' +
        '<div class="btn-row"><a class="btn btn-primary" href="#/flashcards/repeter">Pugg disse</a></div>';
    }

    html += '<h2>Nullstill</h2><p class="lede">Sletter alle svar, markeringer og caseutkast i denne nettleseren.</p>' +
      '<div class="btn-row"><button class="btn" data-nullstill>Nullstill all fremgang</button></div>';

    main.innerHTML = html;
    main.querySelector('[data-nullstill]').addEventListener('click', function () {
      if (window.confirm('Slette all lagret fremgang, inkludert caseutkast? Dette kan ikke angres.')) {
        store.nullstill();
        sideFremgang();
      }
    });
  }

  function sideIkkeFunnet() {
    main.innerHTML = ui.sideHode('404', 'Fant ikke siden',
      'Lenken peker på noe som ikke finnes.') +
      '<div class="btn-row"><a class="btn btn-primary" href="#/oversikt">Til oversikten</a></div>';
  }

  /* ---------------- Ruting ---------------- */

  function ruteFra(hash) {
    var rent = (hash || '').replace(/^#/, '');
    if (!rent || rent === '/') return { sti: '/oversikt', deler: ['oversikt'], query: '' };
    var qIdx = rent.indexOf('?');
    var query = '';
    if (qIdx !== -1) {
      query = rent.slice(qIdx + 1);
      rent = rent.slice(0, qIdx);
    }
    /* Ankerlenker inne i moduler: #/modul/x#s3 */
    var anker = null;
    var aIdx = rent.indexOf('#');
    if (aIdx !== -1) {
      anker = rent.slice(aIdx + 1);
      rent = rent.slice(0, aIdx);
    }
    return {
      sti: rent,
      deler: rent.split('/').filter(Boolean),
      query: query,
      anker: anker
    };
  }

  function ruteQuery(query, navn) {
    var funn = query.split('&').filter(function (p) { return p.indexOf(navn + '=') === 0; })[0];
    return funn ? decodeURIComponent(funn.slice(navn.length + 1)) : '';
  }

  function ruter() {
    var r = ruteFra(location.hash);
    var d = r.deler;
    lukkMeny();
    markerAktiv(r.sti);

    switch (d[0]) {
      case 'oversikt': sideOversikt(); break;
      case 'moduler': sideModuler(); break;
      case 'modul': d[1] ? sideModul(d[1]) : sideModuler(); break;
      case 'teorier': sideTeorier(); break;
      case 'teori': d[1] ? sideTeori(d[1]) : sideTeorier(); break;
      case 'begreper': sideBegreper(ruteQuery(r.query, 'q')); break;
      case 'quiz': d[1] ? startQuiz(d[1]) : sideQuizOversikt(); break;
      case 'flashcards': d[1] ? startFlashcards(d[1]) : sideFlashcardsOversikt(); break;
      case 'kobling':
        if (d[1]) window.OT.match.start(main, d[1], d[2] || null, d[2] ? 8 : 6);
        else sideKoblingOversikt();
        break;
      case 'case': d[1] ? window.OT.caseview.vis(main, d[1]) : sideCaseOversikt(); break;
      case 'eksamen': sideEksamen(); break;
      case 'fremgang': sideFremgang(); break;
      default: sideIkkeFunnet();
    }

    if (r.anker) {
      var mal = document.getElementById(r.anker);
      if (mal) mal.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
    main.focus({ preventScroll: true });
  }

  window.addEventListener('hashchange', ruter);
  byggModulNav();
  ruter();
})();
