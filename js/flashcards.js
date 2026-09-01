/* Flashcards over begrepsbanken, med "kan" / "repeter" som lagres. */
(function () {
  window.OT = window.OT || {};

  function tegn(state, rot) {
    var ui = window.OT.ui;
    var kort = state.kort;

    if (!kort.length) {
      rot.innerHTML = ui.sideHode('Flashcards', 'Ingen kort i dette utvalget',
        'Velg en annen modul, eller nullstill filteret.') +
        '<div class="btn-row"><a class="btn" href="#/flashcards">Tilbake</a></div>';
      return;
    }

    var k = kort[state.indeks % kort.length];
    var status = window.OT.store.get().kort[k.term];

    var html = ui.sideHode('Flashcards', state.tittel,
      'Klikk kortet for å snu det. Marker om du kan begrepet, så holder plattformen styr på hva du bør repetere.');

    html += '<div class="card">';
    html += '<div class="quiz-head">';
    html += '<span class="chip chip-accent">' + ui.esc(ui.modulNavn(k.modul)) + '</span>';
    html += '<span class="quiz-progress">Kort ' + (state.indeks % kort.length + 1) + ' av ' + kort.length +
      (status ? ' &middot; markert: ' + (status === 'kan' ? 'kan' : 'repeter') : '') + '</span>';
    html += '</div>';

    html += '<button class="flashcard' + (state.snudd ? ' is-flipped' : '') + '" data-snu ' +
      'aria-label="Snu kortet">' +
      '<div class="flashcard-inner">' +
      '<div class="flashcard-face"><span class="flashcard-hint">Begrep</span>' +
      '<span class="fc-term">' + ui.esc(k.term) + '</span>' +
      '<span class="flashcard-hint">Klikk for definisjon</span></div>' +
      '<div class="flashcard-face back"><span class="flashcard-hint">Definisjon</span>' +
      '<span class="fc-def">' + ui.rik(k.def) + '</span>' +
      (k.kilde ? '<span class="flashcard-hint">' + ui.esc(k.kilde) + '</span>' : '') +
      '</div></div></button>';

    html += '<div class="btn-row" style="justify-content:center">' +
      '<button class="btn" data-forrige>← Forrige</button>' +
      '<button class="btn" data-repeter>Må repeteres</button>' +
      '<button class="btn btn-primary" data-kan>Kan denne</button>' +
      '<button class="btn" data-neste>Neste →</button>' +
      '</div>';
    html += '</div>';

    var s = window.OT.store.get().kort;
    var kan = kort.filter(function (x) { return s[x.term] === 'kan'; }).length;
    html += '<h2>Status i dette utvalget</h2>';
    html += ui.bar(Math.round((kan / kort.length) * 100), kan === kort.length);
    html += '<p class="count-note" style="margin-top:.5rem">' + kan + ' av ' + kort.length +
      ' begreper markert som «kan».</p>';
    html += '<div class="btn-row"><button class="btn btn-ghost" data-bland>Stokk om kortene</button>' +
      '<a class="btn btn-ghost" href="#/flashcards">Velg annet utvalg</a></div>';

    rot.innerHTML = html;

    function gaa(delta) {
      state.indeks = (state.indeks + delta + kort.length) % kort.length;
      state.snudd = false;
      tegn(state, rot);
    }

    rot.querySelector('[data-snu]').addEventListener('click', function () {
      state.snudd = !state.snudd;
      tegn(state, rot);
    });
    rot.querySelector('[data-neste]').addEventListener('click', function () { gaa(1); });
    rot.querySelector('[data-forrige]').addEventListener('click', function () { gaa(-1); });
    rot.querySelector('[data-kan]').addEventListener('click', function () {
      window.OT.store.settKort(k.term, 'kan');
      gaa(1);
    });
    rot.querySelector('[data-repeter]').addEventListener('click', function () {
      window.OT.store.settKort(k.term, 'repeter');
      gaa(1);
    });
    rot.querySelector('[data-bland]').addEventListener('click', function () {
      state.kort = ui.bland(state.kort);
      state.indeks = 0;
      state.snudd = false;
      tegn(state, rot);
    });
  }

  window.OT.flashcards = {
    start: function (rot, kort, tittel) {
      tegn({ kort: window.OT.ui.bland(kort), indeks: 0, snudd: false, tittel: tittel }, rot);
    }
  };
})();
