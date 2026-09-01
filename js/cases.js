/* Caseoppgaver: skriv eget svar, sammenlign med veiledende svar. */
(function () {
  window.OT = window.OT || {};

  function teoriLenker(ider) {
    var ui = window.OT.ui;
    return ider.map(function (id) {
      var t = window.OT.theories.filter(function (x) { return x.id === id; })[0];
      if (!t) return '';
      return '<a class="chip chip-accent" href="#/teori/' + ui.esc(id) + '">' + ui.esc(t.navn) + '</a>';
    }).join(' ');
  }

  function tegn(c, rot) {
    var ui = window.OT.ui;
    var store = window.OT.store;
    var ferdig = !!store.get().caseFerdig[c.id];

    var html = ui.sideHode('Caseoppgave &middot; ' + ui.modulNavn(c.modul), c.tittel, null);

    html += '<div class="chip-row">';
    html += '<span class="chip">Beregnet tid: ' + ui.esc(c.tid) + '</span>';
    if (ferdig) html += '<span class="chip chip-ok">Gjennomført</span>';
    html += '</div>';

    html += '<div class="case-scenario">' + ui.rik(c.scenario) + '</div>';

    html += '<h2>Oppgaver</h2>';
    c.sporsmal.forEach(function (s, i) {
      html += '<p class="case-q">' + (i + 1) + '. ' + ui.rik(s) + '</p>';
      html += '<textarea class="answer" data-svar="' + i + '" ' +
        'placeholder="Skriv svaret ditt her. Det lagres lokalt i nettleseren.">' +
        ui.esc(store.hentCaseSvar(c.id, i)) + '</textarea>';
    });

    html += '<h2>Relevante teorier</h2><div class="chip-row">' + teoriLenker(c.teorier) + '</div>';

    html += '<details class="model-answer"><summary>Vis veiledende svar</summary><div class="prose">' +
      c.veiledende.split('\n\n').map(function (p) { return '<p>' + ui.rik(p) + '</p>'; }).join('') +
      '</div></details>';

    html += '<div class="btn-row">' +
      '<button class="btn ' + (ferdig ? '' : 'btn-primary') + '" data-ferdig>' +
      (ferdig ? 'Fjern markering som gjennomført' : 'Marker som gjennomført') + '</button>' +
      '<a class="btn btn-ghost" href="#/case">Alle caseoppgaver</a>' +
      '</div>';

    html += '<div class="callout callout-warn"><strong>Om det veiledende svaret</strong>' +
      'Svaret viser én forsvarlig analyse, ikke en fasit. På eksamen teller det mer at du bruker begrepene presist ' +
      'og drøfter innvendinger enn at du lander på samme konklusjon.</div>';

    rot.innerHTML = html;

    rot.querySelectorAll('[data-svar]').forEach(function (ta) {
      var i = Number(ta.getAttribute('data-svar'));
      var timer = null;
      ta.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          window.OT.store.lagreCaseSvar(c.id, i, ta.value);
        }, 400);
      });
    });

    rot.querySelector('[data-ferdig]').addEventListener('click', function () {
      window.OT.store.settCaseFerdig(c.id, !ferdig);
      tegn(c, rot);
    });
  }

  window.OT.caseview = {
    vis: function (rot, caseId) {
      var c = window.OT.cases.filter(function (x) { return x.id === caseId; })[0];
      if (!c) {
        rot.innerHTML = '<div class="card"><p>Fant ikke caseoppgaven.</p></div>';
        return;
      }
      tegn(c, rot);
    }
  };
})();
