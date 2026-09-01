/* Små hjelpefunksjoner for DOM-bygging og felles visning. */
(function () {
  window.OT = window.OT || {};

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Innholdet i datafilene er kuratert og bruker <em>/<strong> med hensikt.
     Alt annet markup escapes bort før innsetting. */
  var TILLATT = /<\/?(?:em|strong|b|i|br)\s*\/?>/gi;
  var SENTINEL = String.fromCharCode(1);

  function rik(s) {
    var vakter = [];
    var med = String(s == null ? '' : s).replace(TILLATT, function (treff) {
      vakter.push(treff);
      return SENTINEL + (vakter.length - 1) + SENTINEL;
    });
    return esc(med).replace(
      new RegExp(SENTINEL + '(\\d+)' + SENTINEL, 'g'),
      function (_, i) { return vakter[Number(i)]; }
    );
  }

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
      });
    }
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function modulById(id) {
    return window.OT.modules.filter(function (m) { return m.id === id; })[0];
  }

  function modulNavn(id) {
    var m = modulById(id);
    return m ? m.nr + '. ' + m.tittel : id;
  }

  function bland(liste) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function bar(prosent, ok) {
    return '<div class="bar' + (ok ? ' bar-ok' : '') + '"><i style="width:' +
      Math.max(0, Math.min(100, prosent)) + '%"></i></div>';
  }

  function sideHode(eyebrow, tittel, lede) {
    return '<div class="page-head">' +
      (eyebrow ? '<p class="eyebrow">' + esc(eyebrow) + '</p>' : '') +
      '<h1>' + esc(tittel) + '</h1>' +
      (lede ? '<p class="lede">' + rik(lede) + '</p>' : '') +
      '</div>';
  }

  window.OT.ui = {
    esc: esc,
    rik: rik,
    el: el,
    bland: bland,
    bar: bar,
    sideHode: sideHode,
    modulById: modulById,
    modulNavn: modulNavn
  };
})();
