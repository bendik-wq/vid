/* Koblingsoppgaver: par sammen teori og opphavsperson, eller begrep og definisjon. */
(function () {
  window.OT = window.OT || {};

  var VARIANTER = {
    teoretiker: {
      tittel: 'Teori og opphav',
      lede: 'Koble hver teori til opphavspersonen. Velg ett element i hver kolonne.',
      venstreTittel: 'Teori',
      hoyreTittel: 'Opphav',
      par: function (modulId) {
        return window.OT.theories
          .filter(function (t) { return !modulId || t.modul === modulId; })
          .map(function (t) { return { id: t.id, venstre: t.navn, hoyre: t.opphav }; });
      }
    },
    definisjon: {
      tittel: 'Begrep og definisjon',
      lede: 'Koble hvert begrep til riktig definisjon.',
      venstreTittel: 'Begrep',
      hoyreTittel: 'Definisjon',
      par: function (modulId) {
        return window.OT.glossary
          .filter(function (g) { return !modulId || g.modul === modulId; })
          .map(function (g) { return { id: g.term, venstre: g.term, hoyre: g.def }; });
      }
    },
    kjerne: {
      tittel: 'Teori og kjerneidé',
      lede: 'Koble hver teori til den påstanden som best sammenfatter den.',
      venstreTittel: 'Teori',
      hoyreTittel: 'Kjerneidé',
      par: function (modulId) {
        return window.OT.theories
          .filter(function (t) { return !modulId || t.modul === modulId; })
          .map(function (t) {
            var kort = t.kjerne.split('. ')[0];
            return { id: t.id, venstre: t.navn, hoyre: kort.length > 165 ? kort.slice(0, 162) + '…' : kort + '.' };
          });
      }
    }
  };

  function tegn(state, rot) {
    var ui = window.OT.ui;
    var v = VARIANTER[state.variant];

    var html = ui.sideHode('Koblingsoppgave', v.tittel, v.lede);
    html += '<div class="card">';
    html += '<div class="quiz-head">';
    html += '<span class="chip chip-accent">' +
      ui.esc(state.modulId ? ui.modulNavn(state.modulId) : 'Alle kapitler') + '</span>';
    html += '<span class="quiz-progress">' + state.lost.length + ' av ' + state.par.length +
      ' koblet &middot; ' + state.bom + ' bom</span>';
    html += '</div>';
    html += ui.bar(Math.round((state.lost.length / state.par.length) * 100),
      state.lost.length === state.par.length);

    if (state.lost.length === state.par.length) {
      html += '<div class="feedback ok" style="margin-top:1rem"><strong>Alle koblet</strong>' +
        'Du brukte ' + state.bom + ' feilforsøk på ' + state.par.length + ' par.</div>';
    }

    html += '<div class="match-board">';
    html += '<div class="match-col"><h3>' + ui.esc(v.venstreTittel) + '</h3>';
    state.venstre.forEach(function (p) {
      var lost = state.lost.indexOf(p.id) !== -1;
      var klasse = 'match-item' + (lost ? ' is-done' : '') +
        (state.valgtVenstre === p.id ? ' is-picked' : '') +
        (state.feil === p.id ? ' is-wrong' : '');
      html += '<button class="' + klasse + '" data-side="venstre" data-id="' + ui.esc(p.id) + '"' +
        (lost ? ' disabled' : '') + '>' + ui.esc(p.venstre) + '</button>';
    });
    html += '</div>';

    html += '<div class="match-col"><h3>' + ui.esc(v.hoyreTittel) + '</h3>';
    state.hoyre.forEach(function (p) {
      var lost = state.lost.indexOf(p.id) !== -1;
      var klasse = 'match-item' + (lost ? ' is-done' : '') +
        (state.valgtHoyre === p.id ? ' is-picked' : '') +
        (state.feil === p.id ? ' is-wrong' : '');
      html += '<button class="' + klasse + '" data-side="hoyre" data-id="' + ui.esc(p.id) + '"' +
        (lost ? ' disabled' : '') + '>' + ui.esc(p.hoyre) + '</button>';
    });
    html += '</div></div>';

    html += '<div class="btn-row"><button class="btn" data-nytt>Nytt sett</button>' +
      '<a class="btn btn-ghost" href="#/kobling">Andre koblingsoppgaver</a></div>';
    html += '</div>';

    rot.innerHTML = html;

    rot.querySelectorAll('[data-side]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var side = btn.getAttribute('data-side');
        var id = btn.getAttribute('data-id');
        state.feil = null;
        if (side === 'venstre') state.valgtVenstre = state.valgtVenstre === id ? null : id;
        else state.valgtHoyre = state.valgtHoyre === id ? null : id;

        if (state.valgtVenstre && state.valgtHoyre) {
          if (state.valgtVenstre === state.valgtHoyre) {
            state.lost.push(state.valgtVenstre);
          } else {
            state.bom += 1;
            state.feil = state.valgtHoyre;
          }
          state.valgtVenstre = null;
          state.valgtHoyre = null;
        }
        tegn(state, rot);
      });
    });

    rot.querySelector('[data-nytt]').addEventListener('click', function () {
      window.OT.match.start(rot, state.variant, state.modulId, state.antall);
    });
  }

  window.OT.match = {
    varianter: VARIANTER,
    start: function (rot, variant, modulId, antall) {
      var ui = window.OT.ui;
      var alle = VARIANTER[variant].par(modulId);
      var utvalg = ui.bland(alle).slice(0, Math.min(antall || 6, alle.length));
      if (utvalg.length < 2) {
        rot.innerHTML = ui.sideHode('Koblingsoppgave', 'For få elementer',
          'Dette utvalget har ikke nok par til en koblingsoppgave. Velg et annet kapittel.') +
          '<div class="btn-row"><a class="btn" href="#/kobling">Tilbake</a></div>';
        return;
      }
      tegn({
        variant: variant, modulId: modulId, antall: utvalg.length,
        par: utvalg,
        venstre: ui.bland(utvalg),
        hoyre: ui.bland(utvalg),
        valgtVenstre: null, valgtHoyre: null,
        lost: [], bom: 0, feil: null
      }, rot);
    }
  };
})();
