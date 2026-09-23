/* Eksamensoppgaver: skriv besvarelse, sammenlign med sensorveiledning. */
(function () {
  window.OT = window.OT || {};

  function modulEtikett(id) {
    return id === 'tvers' ? 'På tvers av kapitlene' : window.OT.ui.modulNavn(id);
  }

  function teoriLenker(ider) {
    var ui = window.OT.ui;
    return (ider || []).map(function (id) {
      var t = window.OT.theories.filter(function (x) { return x.id === id; })[0];
      if (!t) return '';
      return '<a class="chip chip-accent" href="#/teori/' + ui.esc(id) + '">' + ui.esc(t.navn) + '</a>';
    }).join(' ');
  }

  function nivaTekst(n) {
    return n >= 3 ? 'Drøftingsnivå' : (n === 2 ? 'Anvendelse' : 'Gjengivelse');
  }

  function tegn(e, rot) {
    var ui = window.OT.ui;
    var store = window.OT.store;
    var ferdig = !!store.get().eksamenFerdig[e.id];

    var html = ui.sideHode('Eksamensoppgave \u00b7 ' + modulEtikett(e.modul), e.tittel, null);

    html += '<div class="chip-row">';
    html += '<span class="chip">' + ui.esc(e.type) + '</span>';
    html += '<span class="chip">' + ui.esc(e.tid) + '</span>';
    html += '<span class="chip">' + ui.esc(nivaTekst(e.niva)) + '</span>';
    if (ferdig) html += '<span class="chip chip-ok">Besvart</span>';
    html += '</div>';

    html += '<div class="case-scenario">' + ui.rik(e.oppgave) + '</div>';

    html += '<h2>Krav til besvarelsen</h2><ul class="bullets">' +
      e.krav.map(function (k) { return '<li>' + ui.rik(k) + '</li>'; }).join('') + '</ul>';

    html += '<h2>Din besvarelse</h2>' +
      '<textarea class="answer" data-svar="1" ' +
      'placeholder="Skriv besvarelsen her. Den lagres lokalt i nettleseren. Skriv ferdig før du åpner sensorveiledningen.">' +
      ui.esc(store.hentEksamenSvar(e.id)) + '</textarea>' +
      '<p class="count-note" data-tell>0 ord</p>';

    html += '<h2>Relevante teorier</h2><div class="chip-row">' + teoriLenker(e.teorier) + '</div>';

    html += '<details class="model-answer"><summary>Vis sensorveiledning</summary><div class="prose">' +
      e.sensor.split('\n\n').map(function (p) { return '<p>' + ui.rik(p) + '</p>'; }).join('') +
      '<h3>Typiske fallgruver</h3><ul class="bullets">' +
      e.fallgruver.map(function (f) { return '<li>' + ui.rik(f) + '</li>'; }).join('') +
      '</ul></div></details>';

    html += '<div class="btn-row">' +
      '<button class="btn ' + (ferdig ? '' : 'btn-primary') + '" data-ferdig>' +
      (ferdig ? 'Fjern markering som besvart' : 'Marker som besvart') + '</button>' +
      '<a class="btn btn-ghost" href="#/eksamensoppgaver">Alle eksamensoppgaver</a>' +
      '</div>';

    html += '<div class="callout callout-warn"><strong>Om sensorveiledningen</strong>' +
      'Veiledningen viser hva en god besvarelse må dekke, og én forsvarlig måte å drøfte det på. ' +
      'Den er ikke en fasit du skal treffe ordrett. Det teller mer at du bruker begrepene presist, ' +
      'tar et standpunkt og behandler den sterkeste innvendingen mot det.</div>';

    rot.innerHTML = html;

    var ta = rot.querySelector('[data-svar]');
    var tell = rot.querySelector('[data-tell]');
    function oppdaterTelling() {
      var ord = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
      tell.textContent = ord + ' ord';
    }
    oppdaterTelling();

    var timer = null;
    ta.addEventListener('input', function () {
      oppdaterTelling();
      clearTimeout(timer);
      timer = setTimeout(function () {
        window.OT.store.lagreEksamenSvar(e.id, ta.value);
      }, 400);
    });

    rot.querySelector('[data-ferdig]').addEventListener('click', function () {
      window.OT.store.settEksamenFerdig(e.id, !ferdig);
      tegn(e, rot);
    });
  }

  window.OT.examview = {
    modulEtikett: modulEtikett,
    nivaTekst: nivaTekst,
    vis: function (rot, id) {
      var e = window.OT.exams.filter(function (x) { return x.id === id; })[0];
      if (!e) {
        rot.innerHTML = '<div class="card"><p>Fant ikke eksamensoppgaven.</p></div>';
        return;
      }
      tegn(e, rot);
    }
  };
})();
