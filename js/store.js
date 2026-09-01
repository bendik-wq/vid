/* Lagring av fremgang i localStorage. */
(function () {
  var KEY = 'ot-progresjon-v1';

  var tomState = {
    tema: null,
    sporsmal: {},   // qid -> { riktig: bool, forsok: n }
    quiz: {},       // modulId -> { beste: n, antall: n, siste: n, kjort: n }
    kort: {},       // begrep -> 'kan' | 'repeter'
    caseSvar: {},   // caseId::idx -> tekst
    caseFerdig: {}  // caseId -> true
  };

  function les() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(tomState));
      var lagret = JSON.parse(raw);
      var state = JSON.parse(JSON.stringify(tomState));
      Object.keys(tomState).forEach(function (k) {
        if (lagret[k] !== undefined && lagret[k] !== null) state[k] = lagret[k];
      });
      return state;
    } catch (e) {
      return JSON.parse(JSON.stringify(tomState));
    }
  }

  var state = les();

  function lagre() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* Lagring kan feile i privat modus; appen fungerer uten. */
    }
  }

  window.OT = window.OT || {};
  window.OT.store = {
    get: function () { return state; },

    settTema: function (tema) { state.tema = tema; lagre(); },

    registrerSvar: function (qid, riktig) {
      var f = state.sporsmal[qid] || { riktig: false, forsok: 0 };
      f.forsok += 1;
      f.riktig = riktig;
      state.sporsmal[qid] = f;
      lagre();
    },

    registrerQuiz: function (modulId, riktige, antall) {
      var q = state.quiz[modulId] || { beste: 0, antall: 0, siste: 0, kjort: 0 };
      q.siste = riktige;
      q.antall = antall;
      q.kjort += 1;
      if (riktige > q.beste) q.beste = riktige;
      state.quiz[modulId] = q;
      lagre();
    },

    settKort: function (begrep, status) {
      if (status) state.kort[begrep] = status;
      else delete state.kort[begrep];
      lagre();
    },

    lagreCaseSvar: function (caseId, idx, tekst) {
      var n = caseId + '::' + idx;
      if (tekst) state.caseSvar[n] = tekst;
      else delete state.caseSvar[n];
      lagre();
    },

    hentCaseSvar: function (caseId, idx) {
      return state.caseSvar[caseId + '::' + idx] || '';
    },

    settCaseFerdig: function (caseId, ferdig) {
      if (ferdig) state.caseFerdig[caseId] = true;
      else delete state.caseFerdig[caseId];
      lagre();
    },

    /* Feilbesvarte spørsmål, til repetisjonsmodus. */
    feilSporsmal: function () {
      return window.OT.questions.filter(function (q) {
        var f = state.sporsmal[q.id];
        return f && f.forsok > 0 && !f.riktig;
      });
    },

    modulFremgang: function (modulId) {
      var sp = window.OT.questions.filter(function (q) { return q.modul === modulId; });
      var riktige = sp.filter(function (q) {
        var f = state.sporsmal[q.id];
        return f && f.riktig;
      }).length;
      var kort = window.OT.glossary.filter(function (g) { return g.modul === modulId; });
      var kanKort = kort.filter(function (g) { return state.kort[g.term] === 'kan'; }).length;
      var caser = window.OT.cases.filter(function (c) { return c.modul === modulId; });
      var ferdigCase = caser.filter(function (c) { return state.caseFerdig[c.id]; }).length;

      var deler = [];
      if (sp.length) deler.push(riktige / sp.length);
      if (kort.length) deler.push(kanKort / kort.length);
      if (caser.length) deler.push(ferdigCase / caser.length);
      var snitt = deler.length
        ? deler.reduce(function (a, b) { return a + b; }, 0) / deler.length
        : 0;

      return {
        sporsmal: sp.length, riktigeSporsmal: riktige,
        kort: kort.length, kanKort: kanKort,
        caser: caser.length, ferdigCase: ferdigCase,
        prosent: Math.round(snitt * 100)
      };
    },

    totalFremgang: function () {
      var moduler = window.OT.modules;
      var sum = moduler.reduce(function (acc, m) {
        return acc + window.OT.store.modulFremgang(m.id).prosent;
      }, 0);
      return Math.round(sum / moduler.length);
    },

    nullstill: function () {
      var tema = state.tema;
      state = JSON.parse(JSON.stringify(tomState));
      state.tema = tema;
      lagre();
    }
  };
})();
