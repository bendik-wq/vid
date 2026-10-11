/* Shared code for every page of the Brann recruitment site. */
const B = (() => {
  const METRIC = {
    tklint90:["Tackles + interceptions","/90"], tkl90:["Tackles","/90"], int90:["Interceptions","/90"], recov90:["Ball recoveries","/90"],
    att3_90:["Possession won in final third","/90"], dribpast90:["Dribbled past (fewer is better)","/90"], err90:["Errors leading to shot (fewer is better)","/90"],
    aerw90:["Aerials won","/90"], "aer%":["Aerial win %","%"], "ground%":["Ground duel win %","%"], "duel%":["Duel win %","%"], "pass%":["Pass accuracy","%"],
    long90:["Accurate long balls","/90"], kp90:["Key passes","/90"], bcc90:["Big chances created","/90"], xa90:["xA","/90"], xg90:["xG","/90"],
    npg90:["Non-penalty goals","/90"], fin90:["Goals minus xG","/90"], shots90:["Shots","/90"], drib90:["Successful dribbles","/90"],
    cross90:["Accurate crosses","/90"], f3p90:["Accurate final-third passes","/90"] };
  const SHORT = { dribpast90:"Rarely dribbled past", err90:"Few errors" };
  const ROLES = {
    CB:{name:"Centre-back",plural:"centre-backs",n:1,label:"Right-sided centre-back",why:"Defends the space behind a high line, wins duels on the front foot and plays out of the 2-2 base. Brann sold Helland and Sery Larsen; Diop is on loan and Boakye is injured.",
      w:{dribpast90:15,tklint90:15,"ground%":15,"pass%":15,recov90:10,"aer%":10,err90:10,aerw90:5,long90:5}},
    CM:{name:"Midfield",plural:"midfielders",n:2,label:"Box-to-box No. 8",why:"Presses man-to-man in midfield, wins it back high, then moves the ball forward. Replaces Myhre and Kornvig; Sørensen is the only fit starter.",
      w:{tklint90:20,att3_90:15,recov90:10,kp90:10,xa90:10,"pass%":10,f3p90:10,"duel%":10,xg90:5}},
    FB:{name:"Full-back",plural:"full-backs",n:3,label:"Inverting left-back",why:"Steps inside beside the 6, so has to be secure on the ball and read transitions, then still overlap when play goes wide. Soltvedt is 31 and Dragsnes 32.",
      w:{"pass%":20,int90:15,"duel%":15,tkl90:10,xa90:10,kp90:10,dribpast90:10,cross90:5,recov90:5}},
    ST:{name:"Striker",plural:"strikers",n:4,label:"Clinical, pressing No. 9",why:"Converts the box presence Brann already create, attacks crosses, and drops onto the opposition 6 when pressing. Finne's contract is expiring and Castro is 30.",
      w:{xg90:25,npg90:15,aerw90:15,att3_90:15,fin90:10,xa90:10,tkl90:5,kp90:5}},
    W:{name:"Winger",plural:"wingers",n:5,label:"Box-attacking winger",why:"Gets shots and box touches, takes players on, and leads the press. Matondo and Þorsteinsson have gone from the left side.",
      w:{xg90:15,att3_90:15,shots90:10,drib90:10,kp90:10,xa90:10,bcc90:10,tkl90:10,npg90:10}} };
  const ORDER = ["CB","CM","FB","ST","W"];
  const PAGES = [["./","Overview"],["board.html","Board"],["free-agents.html","Free agents"],["prospects.html","Moneyball"],["lower-tiers.html","Lower tiers"],["report.html","Report"]];
  const TIER = {1:"Top tier",2:"2nd tier",3:"3rd tier",4:"4th tier",5:"5th tier"};

  const $ = (s, r=document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const mv = v => v==null ? "n/a" : v>=1e6 ? "€"+(v/1e6).toFixed(v>=1e7?0:1)+"m" : "€"+Math.round(v/1e3)+"k";
  const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const ct = s => s ? s.replace(/^(\d{4})-(\d{2})$/, (m,y,mo) => MON[+mo-1]+" "+y) : "n/a";
  const foot = f => ({R:"right",L:"left",B:"both"})[f] || "";
  const fmtM = (k,v) => v==null ? "n/a" : METRIC[k][1]==="%" ? v.toFixed(1)+"%" : v.toFixed(2);
  const eur = x => "€"+(+x).toFixed(2).replace(/\.?0+$/,"")+"m";

  function nav(){
    const file = location.pathname.split("/").pop(); const here = (!file || file==="index.html" || !file.endsWith(".html")) ? "./" : file;
    const el = document.createElement("nav"); el.className = "nav"; el.setAttribute("aria-label","Site");
    el.innerHTML = `<div class="nav-in"><a class="brand" href="./"><i></i>Brann Scouting</a><div class="nav-links">${PAGES.map(([h,t]) => `<a href="${h}"${h===here?' aria-current="page"':""}>${t}</a>`).join("")}</div></div>`;
    document.body.prepend(el);
  }
  function footer(meta){
    const f = document.createElement("footer");
    f.innerHTML = `<span>Data: Sofascore league statistics, pulled ${esc(meta.generated)}. ${meta.players_scored.toLocaleString()} players, ${meta.leagues.length} leagues.</span><span>Values are Sofascore estimates. Check contracts and values on Transfermarkt before any approach.</span>`;
    $(".wrap").append(f);
  }

  let cache;
  async function load(){
    if (cache) return cache;
    const [p, meta] = await Promise.all([fetch("data/players.json").then(r=>r.json()), fetch("data/meta.json").then(r=>r.json())]);
    const C = p.cols;
    const players = p.rows.map(r => { const o = {}; C.forEach((c,i) => o[c] = r[i]); o.tags = new Set(o.tags); o.brann = o.tags.has("brann"); o.stay = o.team===o.teamNow; o.noclub = o.teamNow==="No team"; return o; });
    cache = { players, meta };
    return cache;
  }

  function strengths(p){
    const w = ROLES[p.role].w;
    return Object.entries(p.pct).filter(([k]) => w[k]).sort((a,b) => b[1]*Math.sqrt(w[b[0]]) - a[1]*Math.sqrt(w[a[0]])).slice(0,3).map(([k,v]) => (SHORT[k]||METRIC[k][0])+" "+v);
  }
  function benchFor(players, role){ return players.filter(b => b.role===role && b.brann).sort((a,b) => b.fit-a.fit)[0]; }

  function detail(p, players, cols){
    const R = ROLES[p.role]; const bench = benchFor(players, p.role);
    const rows = Object.entries(R.w).map(([k,w]) => { const v = p.pct[k]; const bv = bench && bench!==p ? bench.pct[k] : null;
      return `<div class="mrow"><span>${METRIC[k][0]} <span class="sub">×${w}</span></span><span class="mbar">${v!=null?`<i style="width:${v}%"></i>`:""}${bv!=null?`<u style="left:calc(${bv}% - 1px)" title="${esc(bench.name)}: ${bv}"></u>`:""}</span><span class="mono">${fmtM(k,p.m[k])}</span><span class="mono">${v!=null?v:"–"}</span></div>`; }).join("");
    const q = encodeURIComponent(p.name);
    return `<tr class="detail"><td colspan="${cols}"><div class="dgrid"><div><div class="eyebrow" style="margin-bottom:6px">Percentile vs all ${R.plural} · raw value per 90${bench&&bench!==p?` · black tick = ${esc(bench.name)} (Brann)`:""}</div>${rows}</div>
    <div><dl class="facts"><dt>Positions</dt><dd>${esc(p.pos)}</dd><dt>Nationality</dt><dd>${esc(p.nat)}</dd><dt>Height · foot</dt><dd>${p.h?p.h+" cm":"n/a"} · ${foot(p.foot)||"n/a"}</dd>
    <dt>Season used</dt><dd>${esc(p.league)} · ${esc(p.team)}</dd><dt>Minutes · apps</dt><dd class="mono">${p.min.toLocaleString()} · ${p.apps??"–"}</dd>
    <dt>Goals · assists</dt><dd class="mono">${p.g??"–"} · ${p.a??"–"}${p.xg!=null?` (xG ${(+p.xg).toFixed(1)})`:""}</dd><dt>Sofascore rating</dt><dd class="mono">${p.rating!=null?(+p.rating).toFixed(2):"n/a"}</dd>
    <dt>Data coverage</dt><dd class="mono">${Math.round(p.cov*100)}%</dd><dt>Style fit × league</dt><dd class="mono">${p.fit.toFixed(1)} × ${p.lf.toFixed(2)} = ${p.adj.toFixed(1)}</dd>
    <dt>Price check</dt><dd class="mono">Score expected at ${mv(p.mv)}: ${p.exp.toFixed(1)} · gap ${p.resid>0?"+":""}${p.resid.toFixed(1)}</dd></dl>
    <div class="links"><a href="https://www.sofascore.com/player/x/${p.id}" target="_blank" rel="noopener">Sofascore profile</a><a href="https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=${q}" target="_blank" rel="noopener">Transfermarkt search</a></div></div></div></td></tr>`;
  }

  /* Table. opts: {el, countEl, players(all, for benchmarks), list(filtered incl. brann rows), state{sort,dir,open}, extra:[{h,k,cls,fmt}], onChange, limit, noun} */
  function table(o){
    const extra = o.extra || [];
    const head = `<thead><tr><th class="r">#</th><th>Player</th><th>Club · league (season)</th><th class="r" data-k="tier">Tier</th><th class="r" data-k="age">Age</th><th class="r" data-k="mv">Value</th><th data-k="ct">Contract</th>${extra.map(e=>`<th class="r" data-k="${e.k}">${e.h}</th>`).join("")}<th class="r" data-k="fit">Style fit</th><th class="r" data-k="adj">Brann score</th><th>Strengths</th></tr></thead>`;
    const S = o.state, k = S.sort, cols = 10 + extra.length;
    const list = o.list.slice().sort((a,b) => { const va=a[k]??(S.dir<0?-1e12:1e12), vb=b[k]??(S.dir<0?-1e12:1e12); return (va>vb?1:va<vb?-1:0)*S.dir; });
    let n = 0; const lim = o.limit || 150;
    const body = list.filter(p => p.brann || n++ < lim).map((p) => {
      const moved = !p.stay && !p.noclub;
      const rank = p.brann ? "" : list.filter(x=>!x.brann).indexOf(p)+1;
      const row = `<tr class="row${p.brann?" brann":""}" tabindex="0" data-id="${p.id}"><td class="r mono">${rank}</td>
      <td><span class="pname">${esc(p.name)}</span>${p.brann?'<span class="badge b">Brann</span>':""}${p.cov<.8?'<span class="badge c">partial data</span>':""}<div class="sub">${esc(p.pos)} · ${esc(p.nat)}${p.foot?" · "+foot(p.foot)+" foot":""}</div></td>
      <td>${p.noclub?'<span class="badge g" style="margin-left:0">no club</span>':esc(p.teamNow)}${moved?'<span class="badge m">moved</span>':""}<div class="sub">${moved||p.noclub?"data: "+esc(p.team)+", ":""}${esc(p.league)}</div></td>
      <td class="r mono">${p.tier}</td><td class="r mono">${p.age.toFixed(1)}</td><td class="r mono">${mv(p.mv)}</td><td class="mono">${ct(p.ct)}</td>
      ${extra.map(e=>`<td class="r ${e.cls?e.cls(p):""}">${e.fmt(p)}</td>`).join("")}
      <td class="r mono">${p.fit.toFixed(1)}</td>
      <td><div class="score"><span class="sb"><i style="width:${Math.min(100,p.adj)}%"></i></span><b>${p.adj.toFixed(1)}</b></div></td>
      <td><div class="chips">${strengths(p).map(s=>`<span class="chip">${esc(s)}</span>`).join("")}</div></td></tr>`;
      return row + (S.open===p.id ? detail(p, o.players, cols) : "");
    }).join("");
    o.el.innerHTML = `<table>${head}<tbody>${body || `<tr><td colspan="${cols}" class="sub">No players match. Loosen the filters above.</td></tr>`}</tbody></table>`;
    const total = list.filter(p=>!p.brann).length;
    if (o.countEl) o.countEl.textContent = `${total} ${o.noun||"players"} match${total>lim?` · showing top ${lim}`:""}`;
    o.el.querySelectorAll("th[data-k]").forEach(th => { th.classList.toggle("sorted", th.dataset.k===k); th.setAttribute("aria-sort", th.dataset.k===k?(S.dir<0?"descending":"ascending"):"none");
      th.onclick = () => { const nk = th.dataset.k; if (S.sort===nk) S.dir*=-1; else { S.sort=nk; S.dir=(nk==="age"||nk==="mv"||nk==="ct"||nk==="tier")?1:-1; } o.onChange(); }; });
    o.el.querySelectorAll("tr.row").forEach(tr => { const t = () => { const id=+tr.dataset.id; S.open = S.open===id?null:id; o.onChange(); }; tr.onclick=t; tr.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); t(); } }; });
  }

  function tabs(el, S, onChange){
    el.innerHTML = ORDER.map(r => `<button type="button" aria-pressed="${S.role===r}" data-r="${r}">${ROLES[r].n} · ${ROLES[r].name}</button>`).join("");
    el.querySelectorAll("button").forEach(b => b.onclick = () => { S.role=b.dataset.r; S.open=null; onChange(); });
  }

  /* Persisted per-page state */
  function state(key, defaults){
    let s = Object.assign({}, defaults);
    try { const v = JSON.parse(localStorage.getItem("brann-"+key)||"null"); if (v) Object.assign(s, v, {open:null}); } catch(e) {}
    s.save = () => { try { const {save, ...rest} = s; localStorage.setItem("brann-"+key, JSON.stringify(rest)); } catch(e) {} };
    return s;
  }
  /* Bind a range/select/checkbox/search control to state */
  function bind(id, S, key, parse, fmt, onChange){
    const el = document.getElementById(id), out = document.getElementById("o-"+key);
    const show = () => { if (out) out.textContent = fmt ? fmt(S[key]) : S[key]; };
    if (el.type==="checkbox") el.checked = !!S[key]; else el.value = S[key];
    show();
    el.addEventListener(el.type==="checkbox"?"change":"input", e => { S[key] = el.type==="checkbox" ? el.checked : parse(el.value); S.open=null; show(); onChange(); });
  }

  function pitch(svgDots){
    const pts=[["GK",150,396,0],["LCB",108,330,0],["RCB",192,330,1],["LB inside",120,272,3],["6",178,272,0],["RB high",262,168,0],["8",110,196,2],["8",190,196,0],["LW",52,96,5],["9",150,62,4],["RW",248,96,0]];
    svgDots.innerHTML = pts.map(([l,x,y,n]) => `<g><circle cx="${x}" cy="${y}" r="${n?15:11}" fill="${n?"var(--brann)":"var(--ink)"}"/>${n?`<text x="${x}" y="${y+5}" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="16" fill="var(--brann-ink)">${n}</text>`:""}<text x="${x}" y="${y+(n?29:24)}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="var(--ink)">${l}</text></g>`).join("");
  }
  function specs(el, players){
    el.innerHTML = ORDER.map(r => { const R = ROLES[r]; const b = players.filter(p => p.role===r && p.brann).sort((a,b)=>b.fit-a.fit);
      return `<div class="spec"><div class="tag"><span class="num">${R.n}</span><h3>${R.label}</h3></div><p>${R.why}</p>
      <div class="wlist">${Object.entries(R.w).map(([k,w]) => `<div class="wrow"><span>${METRIC[k][0]}</span><span class="wb"><i style="width:${w*4}%"></i></span><span class="mono">${w}</span></div>`).join("")}</div>
      <div class="bench">Current Brann benchmark: ${b.length ? b.slice(0,2).map(p => `${esc(p.name)} <b class="mono">${p.fit.toFixed(0)}</b>`).join(", ") : "no regular in this role with 900+ min"}</div></div>`; }).join("");
  }

  return { METRIC, ROLES, ORDER, TIER, $, esc, mv, ct, foot, eur, nav, footer, load, strengths, detail, table, tabs, state, bind, pitch, specs, benchFor };
})();
