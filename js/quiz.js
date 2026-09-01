/* Quizmotor: én økt om gangen, med umiddelbar tilbakemelding. */
(function () {
  var ui = null;
  var BOKSTAV = ['A', 'B', 'C', 'D', 'E', 'F'];

  function lagOkt(sporsmal, opts) {
    return {
      sporsmal: sporsmal,
      indeks: 0,
      valgt: [],
      besvart: false,
      riktige: 0,
      tittel: (opts && opts.tittel) || 'Quiz',
      undertittel: (opts && opts.undertittel) || '',
      modulId: (opts && opts.modulId) || null,
      lagreResultat: !opts || opts.lagreResultat !== false
    };
  }

  function erFlervalg(sp) { return sp.riktige.length > 1; }

  function likeSett(a, b) {
    if (a.length !== b.length) return false;
    var s = a.slice().sort();
    var t = b.slice().sort();
    return s.every(function (v, i) { return v === t[i]; });
  }

  function tegn(okt, rot, ferdigTilbake) {
    ui = window.OT.ui;

    if (okt.indeks >= okt.sporsmal.length) return tegnResultat(okt, rot, ferdigTilbake);

    var sp = okt.sporsmal[okt.indeks];
    var flervalg = erFlervalg(sp);

    var html = '';
    html += ui.sideHode(okt.undertittel, okt.tittel, null);
    html += '<div class="card">';
    html += '<div class="quiz-head">';
    html += '<span class="chip chip-accent">' + ui.esc(ui.modulNavn(sp.modul)) + '</span>';
    html += '<span class="quiz-progress">Spørsmål ' + (okt.indeks + 1) + ' av ' +
      okt.sporsmal.length + ' &middot; riktige: ' + okt.riktige + '</span>';
    html += '</div>';
    html += ui.bar(Math.round((okt.indeks / okt.sporsmal.length) * 100));
    html += '<p class="q-text">' + ui.rik(sp.q) + '</p>';
    if (flervalg) html += '<p class="count-note">Flere svar er riktige. Velg alle, og trykk «Sjekk svar».</p>';

    html += '<div class="options" role="group">';
    sp.alt.forEach(function (tekst, i) {
      var klasse = 'option';
      if (okt.besvart) {
        if (sp.riktige.indexOf(i) !== -1) klasse += ' is-correct';
        else if (okt.valgt.indexOf(i) !== -1) klasse += ' is-wrong';
      } else if (okt.valgt.indexOf(i) !== -1) {
        klasse += ' is-picked';
      }
      html += '<button class="' + klasse + '" data-alt="' + i + '"' +
        (okt.besvart ? ' disabled' : '') + '>' +
        '<span class="key">' + BOKSTAV[i] + '</span><span>' + ui.rik(tekst) + '</span></button>';
    });
    html += '</div>';

    if (okt.besvart) {
      var riktig = likeSett(okt.valgt, sp.riktige);
      html += '<div class="feedback ' + (riktig ? 'ok' : 'err') + '">' +
        '<strong>' + (riktig ? 'Riktig' : 'Ikke riktig') + '</strong>' +
        ui.rik(sp.forklaring) + '</div>';
      html += '<div class="btn-row"><button class="btn btn-primary" data-neste>' +
        (okt.indeks + 1 < okt.sporsmal.length ? 'Neste spørsmål' : 'Se resultat') + '</button></div>';
    } else {
      html += '<div class="btn-row"><button class="btn btn-primary" data-sjekk' +
        (okt.valgt.length ? '' : ' disabled') + '>Sjekk svar</button></div>';
    }

    html += '</div>';
    rot.innerHTML = html;

    rot.querySelectorAll('[data-alt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-alt'));
        if (flervalg) {
          var pos = okt.valgt.indexOf(i);
          if (pos === -1) okt.valgt.push(i); else okt.valgt.splice(pos, 1);
        } else {
          okt.valgt = [i];
        }
        tegn(okt, rot, ferdigTilbake);
      });
    });

    var sjekk = rot.querySelector('[data-sjekk]');
    if (sjekk) sjekk.addEventListener('click', function () {
      okt.besvart = true;
      var riktig = likeSett(okt.valgt, sp.riktige);
      if (riktig) okt.riktige += 1;
      window.OT.store.registrerSvar(sp.id, riktig);
      tegn(okt, rot, ferdigTilbake);
    });

    var neste = rot.querySelector('[data-neste]');
    if (neste) neste.addEventListener('click', function () {
      okt.indeks += 1;
      okt.valgt = [];
      okt.besvart = false;
      tegn(okt, rot, ferdigTilbake);
      window.scrollTo(0, 0);
    });
  }

  function tegnResultat(okt, rot, ferdigTilbake) {
    var total = okt.sporsmal.length;
    var prosent = total ? Math.round((okt.riktige / total) * 100) : 0;
    if (okt.lagreResultat && okt.modulId) {
      window.OT.store.registrerQuiz(okt.modulId, okt.riktige, total);
    }

    var vurdering = prosent >= 90 ? 'Utmerket. Du har god kontroll på dette stoffet.'
      : prosent >= 75 ? 'Solid. Se gjennom det du bommet på, så sitter det.'
      : prosent >= 50 ? 'På vei. Les modulen på nytt og ta quizen igjen.'
      : 'Her er det mer å hente. Start med modulteksten og flashcardene.';

    var html = ui.sideHode('Resultat', okt.tittel, vurdering);
    html += '<div class="card" style="text-align:center">';
    html += '<div class="result-score">' + prosent + '%</div>';
    html += '<p class="lede" style="margin:.4rem auto 1rem">' + okt.riktige + ' av ' + total + ' riktige</p>';
    html += ui.bar(prosent, prosent >= 75);
    html += '</div>';

    var feil = okt.sporsmal.filter(function (sp) {
      var f = window.OT.store.get().sporsmal[sp.id];
      return f && !f.riktig;
    });

    if (feil.length) {
      html += '<h2>Gå gjennom disse på nytt</h2><div class="def-list">';
      feil.forEach(function (sp) {
        html += '<dl class="def"><dt>' + ui.rik(sp.q) + '</dt><dd>' +
          '<strong>Riktig:</strong> ' +
          sp.riktige.map(function (i) { return ui.rik(sp.alt[i]); }).join(' &middot; ') +
          '<span class="src">' + ui.rik(sp.forklaring) + '</span></dd></dl>';
      });
      html += '</div>';
    }

    html += '<div class="btn-row">' +
      '<button class="btn btn-primary" data-igjen>Ta quizen på nytt</button>' +
      (okt.modulId ? '<a class="btn" href="#/modul/' + okt.modulId + '">Til modulen</a>' : '') +
      '<a class="btn btn-ghost" href="#/quiz">Alle quizer</a>' +
      '</div>';

    rot.innerHTML = html;
    rot.querySelector('[data-igjen]').addEventListener('click', function () {
      ferdigTilbake();
    });
  }

  window.OT = window.OT || {};
  window.OT.quiz = {
    start: function (rot, sporsmal, opts, restart) {
      if (!sporsmal.length) {
        rot.innerHTML = '<div class="card"><p>Ingen spørsmål å vise her.</p></div>';
        return;
      }
      var blandet = window.OT.ui.bland(sporsmal);
      tegn(lagOkt(blandet, opts), rot, restart);
    }
  };
})();
