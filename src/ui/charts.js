/**
 * Inline SVG figures.
 *
 * Every figure is one series: a bar is one colour, and identity comes from direct labels
 * beside the mark rather than from a second hue. Hue is spent on the three pillars and on
 * status, nowhere else. Each mark carries a <title> so hovering names it, and every figure
 * ships a legend or table beneath, which is also the relief for the low-contrast steps.
 */

import { money, moneyShort, turns, esc } from './format.js';

const VB = 1000;          // internal units; every figure scales to its container
const GAP = 3;            // surface gap between adjacent fills

const bound = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/**
 * A total split into what survives and what is taken off it.
 * Used for both haircuts, so the two read as the same operation applied twice.
 */
export function bridgeBar({ total, keep, keepLabel, keepValue, cuts, tone = 'var(--ink)', format }) {
  const height = 52;
  const safeTotal = total > 0 ? total : 1;
  const scale = (v) => (v / safeTotal) * VB;
  const fmt = format ?? money;

  const visible = cuts.filter((c) => c.value > 0);
  let x = 0;
  const segments = [];

  const keepW = Math.max(0, scale(keep));
  segments.push({ x: 0, w: keepW, fill: tone, label: keepLabel, value: keep, keep: true });
  x = keepW;

  for (const cut of visible) {
    const w = Math.max(0, scale(cut.value) - GAP);
    segments.push({ x: x + GAP, w, fill: 'var(--loss)', label: cut.label, value: cut.value });
    x += scale(cut.value);
  }

  const marks = segments
    .map(
      (s) => `<rect class="seg-mark" x="${s.x.toFixed(1)}" y="0" width="${Math.max(0, s.w).toFixed(1)}" height="${height}" fill="${s.fill}">
        <title>${esc(s.label)}: ${esc(fmt(s.value))}</title></rect>`,
    )
    .join('');

  const legend = segments
    .map(
      (s) => `<span><i style="background:${s.fill}"></i>${esc(s.label)}
        <strong style="margin-left:4px">${esc(fmt(s.value))}</strong></span>`,
    )
    .join('');

  return `
  <figure>
    <svg viewBox="0 0 ${VB} ${height}" preserveAspectRatio="none" style="height:52px;width:100%"
         role="img" aria-label="${esc(keepLabel)} ${esc(fmt(keepValue ?? keep))} of ${esc(fmt(total))}">
      <defs><clipPath id="clip-${cid()}"><rect x="0" y="0" width="${VB}" height="${height}" rx="7" /></clipPath></defs>
      <g clip-path="url(#clip-${lastId})">
        <rect x="0" y="0" width="${VB}" height="${height}" fill="var(--sunken)" />
        ${marks}
      </g>
    </svg>
    <div class="legend">${legend}</div>
  </figure>`;
}

let idCounter = 0;
let lastId = 'a';
const cid = () => { lastId = `f${(idCounter += 1)}`; return lastId; };

/** Five discrete steps, because the score is discrete. Partial fill on the current step. */
export function pillarMeter(score) {
  const s = bound(score, 0, 5);
  const cells = [1, 2, 3, 4, 5].map((n) => {
    const fill = bound(s - (n - 1), 0, 1);
    return `<div style="flex:1;height:8px;border-radius:3px;background:var(--sunken);overflow:hidden">
      <div style="height:100%;width:${(fill * 100).toFixed(0)}%;background:var(--hue)"></div></div>`;
  }).join('');
  return `<div style="display:flex;gap:3px" role="img" aria-label="${s.toFixed(1)} out of 5">${cells}</div>`;
}

/** A single value on a fixed scale, with the threshold that decides it marked. */
export function thresholdScale({ value, floor, max, label, unit = turns, good }) {
  const height = 58;
  const top = Math.max(max, floor * 1.5, isFinite(value) ? value * 1.15 : 0);
  const x = (v) => bound(v / top, 0, 1) * VB;
  const passing = good ?? value >= floor;
  const fill = passing ? 'var(--good)' : 'var(--critical)';
  const vx = x(value);
  const fx = x(floor);

  return `
  <figure>
    <svg viewBox="0 0 ${VB} ${height}" style="width:100%;height:${height}px" role="img"
         aria-label="${esc(label)} ${esc(unit(value))}, threshold ${esc(unit(floor))}">
      <rect x="0" y="20" width="${VB}" height="16" rx="8" fill="var(--sunken)" />
      <rect x="0" y="20" width="${vx.toFixed(1)}" height="16" rx="8" fill="${fill}">
        <title>${esc(label)}: ${esc(unit(value))}</title></rect>
      <line x1="${fx.toFixed(1)}" y1="12" x2="${fx.toFixed(1)}" y2="44" stroke="var(--ink)" stroke-width="2" />
      <text x="${fx.toFixed(1)}" y="56" fill="var(--ink-2)" font-size="13" text-anchor="middle">floor ${esc(unit(floor))}</text>
      <text x="0" y="12" fill="var(--ink-3)" font-size="12">0</text>
      <text x="${VB}" y="12" fill="var(--ink-3)" font-size="12" text-anchor="end">${esc(unit(top))}</text>
    </svg>
  </figure>`;
}

/**
 * What they want against what they get, with the fundability ceiling marked.
 * One bar, because there is one number in question.
 */
export function gapBar({ asking, achievable, fundable }) {
  const height = 52;
  const top = Math.max(asking, achievable, isFinite(fundable) ? fundable : 0) || 1;
  const x = (v) => bound(v / top, 0, 1) * VB;

  const cash = isFinite(fundable) ? fundable : achievable;
  const realistic = Math.min(achievable, cash);
  const blocked = Math.max(0, achievable - realistic);
  const blockedBy = achievable > cash ? 'a buyer cannot fund it' : 'the business does not support it';

  const zones = [
    { w: x(realistic), fill: 'var(--ink)', opacity: 1,
      label: 'What you would actually get', value: realistic },
    { w: Math.max(0, x(achievable) - x(realistic)), fill: 'var(--ink)', opacity: 0.3,
      label: `Worth it on paper, but ${blockedBy}`, value: blocked },
    { w: Math.max(0, x(asking) - x(achievable)), fill: 'var(--critical)', opacity: 0.16,
      label: 'The gap', value: Math.max(0, asking - achievable) },
  ].filter((z) => z.value > 0 || z.w > 1);

  let cursor = 0;
  const marks = zones.map((z) => {
    const rect = `<rect class="seg-mark" x="${cursor.toFixed(1)}" y="0" width="${Math.max(0, z.w - GAP).toFixed(1)}"
      height="${height}" fill="${z.fill}" opacity="${z.opacity}">
      <title>${esc(z.label)}: ${esc(money(z.value))}</title></rect>`;
    cursor += z.w;
    return rect;
  }).join('');

  const legend = zones.map((z) => `<span>
    <i style="background:${z.fill};opacity:${z.opacity}"></i>${esc(z.label)}
    <strong style="margin-left:4px">${esc(money(z.value))}</strong></span>`).join('');

  return `
  <figure>
    <svg viewBox="0 0 ${VB} ${height}" preserveAspectRatio="none" style="width:100%;height:${height}px" role="img"
         aria-label="Asking ${esc(money(asking))}, audit value ${esc(money(achievable))}, fundable ${esc(money(cash))}">
      <defs><clipPath id="clip-${cid()}"><rect x="0" y="0" width="${VB}" height="${height}" rx="7" /></clipPath></defs>
      <g clip-path="url(#clip-${lastId})">
        <rect x="0" y="0" width="${VB}" height="${height}" fill="var(--sunken)" />
        ${marks}
      </g>
    </svg>
    <div class="legend">${legend}</div>
  </figure>`;
}

/** Change over time: three points is thin for a line, but it is a line the seller walks. */
export function trajectory(points) {
  const w = VB;
  const h = 260;
  const padX = 60;
  const padTop = 54;
  const padBottom = 44;
  const max = Math.max(...points.map((p) => p.value)) || 1;
  const x = (i) => padX + (i / Math.max(1, points.length - 1)) * (w - padX * 2);
  const y = (v) => padTop + (1 - v / max) * (h - padTop - padBottom);

  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1).toFixed(1)},${h - padBottom} L${x(0).toFixed(1)},${h - padBottom} Z`;

  return `
  <figure>
    <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img"
         aria-label="Value over time: ${points.map((p) => `${p.label} ${money(p.value)}`).join(', ')}">
      <line x1="${padX}" y1="${h - padBottom}" x2="${w - padX}" y2="${h - padBottom}" stroke="var(--hair)" stroke-width="1" />
      <path d="${area}" fill="var(--ink)" opacity="0.06" />
      <path d="${line}" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
      ${points.map((p, i) => `
        <circle class="seg-mark" cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="6"
                fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5">
          <title>${esc(p.label)}: ${esc(money(p.value))}</title></circle>
        <text x="${x(i).toFixed(1)}" y="${(y(p.value) - 22).toFixed(1)}" text-anchor="middle"
              font-size="19" font-weight="600" fill="var(--ink)" letter-spacing="-0.5">${esc(moneyShort(p.value))}</text>
        <text x="${x(i).toFixed(1)}" y="${h - padBottom + 24}" text-anchor="middle"
              font-size="13" fill="var(--ink-3)">${esc(p.label)}</text>`).join('')}
    </svg>
  </figure>`;
}

/** Two marks on one multiple axis, the spread between them shaded. */
export function multipleSpread({ entry, exit, label = 'Arbitrage' }) {
  const h = 116;
  const top = Math.max(exit, entry) * 1.2 || 1;
  const x = (v) => bound(v / top, 0, 1) * (VB - 40) + 20;
  const y = 58;

  return `
  <figure>
    <svg viewBox="0 0 ${VB} ${h}" style="width:100%;height:${h}px" role="img"
         aria-label="Entry ${esc(turns(entry))}, exit ${esc(turns(exit))}">
      <line x1="20" y1="${y}" x2="${VB - 20}" y2="${y}" stroke="var(--hair)" stroke-width="1" />
      <rect x="${x(entry).toFixed(1)}" y="${y - 9}" width="${Math.max(0, x(exit) - x(entry)).toFixed(1)}" height="18"
            fill="var(--good)" opacity="0.18" rx="4">
        <title>${esc(label)}: ${esc(turns(exit - entry))}</title></rect>
      ${[['entry', entry, 'var(--ink-3)'], ['exit', exit, 'var(--ink)']].map(([name, v, c]) => `
        <line x1="${x(v).toFixed(1)}" y1="${y - 16}" x2="${x(v).toFixed(1)}" y2="${y + 16}" stroke="${c}" stroke-width="2.5" />
        <text x="${x(v).toFixed(1)}" y="${name === 'entry' ? y + 38 : y - 24}" text-anchor="middle"
              font-size="15" font-weight="600" fill="${c}">${esc(turns(v))}</text>
        <text x="${x(v).toFixed(1)}" y="${name === 'entry' ? y + 55 : y - 42}" text-anchor="middle"
              font-size="12" fill="var(--ink-3)">${name === 'entry' ? 'blended entry' : 'exit'}</text>`).join('')}
    </svg>
  </figure>`;
}

/**
 * The three C's side by side. Identity, so each pillar keeps its own hue wherever it
 * appears in the tool; direct labels carry the values so hue never has to.
 */
export function pillarBars(items, { format = money } = {}) {
  const rowH = 74;
  const h = items.length * rowH + 8;
  const max = Math.max(...items.map((i) => i.value), 1);
  const labelW = 150;

  return `
  <figure>
    <svg viewBox="0 0 ${VB} ${h}" style="width:100%;height:auto" role="img"
         aria-label="${items.map((i) => `${i.name} ${format(i.value)}`).join(', ')}">
      ${items.map((item, n) => {
        const y = n * rowH + 10;
        const w = bound(item.value / max, 0, 1) * (VB - labelW - 190);
        return `
        <text x="0" y="${y + 26}" font-size="17" font-weight="600" fill="var(--ink)">${esc(item.name)}</text>
        <text x="0" y="${y + 47}" font-size="13" fill="var(--ink-3)">${esc(item.sub ?? '')}</text>
        <rect class="seg-mark" x="${labelW}" y="${y + 8}" width="${Math.max(2, w).toFixed(1)}" height="30" rx="5"
              fill="${item.color}">
          <title>${esc(item.name)}: ${esc(format(item.value))}</title></rect>
        <text x="${(labelW + Math.max(2, w) + 14).toFixed(1)}" y="${y + 29}" font-size="17" font-weight="600"
              fill="var(--ink)">${esc(format(item.value))}</text>`;
      }).join('')}
    </svg>
  </figure>`;
}

/** A ranked magnitude, sized against the largest in its own list. */
export function rankBar(value, max) {
  const w = max > 0 ? bound(value / max, 0, 1) * 100 : 0;
  return `<div style="height:6px;background:var(--sunken);border-radius:3px;overflow:hidden;min-width:70px">
    <div style="height:100%;width:${w.toFixed(1)}%;background:var(--good);border-radius:3px"></div></div>`;
}

/**
 * Two roads over twenty years.
 *
 * The group line takes the identity colour; the do-nothing line is deliberately grey,
 * because it is the baseline rather than a competing category. Both ends are labelled so
 * the reader never has to match a colour to a legend to get the point.
 */
export function twoPaths(rows) {
  const w = VB;
  const h = 380;
  const padL = 46;   // room for the first year label, which is centred on the axis
  const padR = 170;
  const padTop = 40;
  const padBottom = 46;
  const max = Math.max(...rows.map((r) => Math.max(r.groupEquity, r.aloneValue))) || 1;
  const lastYear = rows[rows.length - 1].year;

  const x = (year) => padL + ((year - 1) / Math.max(1, lastYear - 1)) * (w - padL - padR);
  const y = (v) => padTop + (1 - v / max) * (h - padTop - padBottom);

  const path = (key) => rows.map((r, i) => `${i ? 'L' : 'M'}${x(r.year).toFixed(1)},${y(r[key]).toFixed(1)}`).join(' ');
  const last = rows[rows.length - 1];

  const gridYears = [1, 5, 10, 15, 20].filter((v) => v <= lastYear);

  return `
  <figure>
    <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img"
         aria-label="After ${lastYear} years: as a group ${money(last.groupEquity)}, on your own ${money(last.aloneValue)}">
      ${gridYears.map((yr) => `
        <line x1="${x(yr).toFixed(1)}" y1="${padTop - 10}" x2="${x(yr).toFixed(1)}" y2="${h - padBottom}"
              stroke="var(--hair)" stroke-width="1" />
        <text x="${x(yr).toFixed(1)}" y="${h - padBottom + 24}" font-size="13" fill="var(--ink-3)"
              text-anchor="middle">Year ${yr}</text>`).join('')}
      <path d="${path('groupEquity')} L${x(last.year).toFixed(1)},${h - padBottom} L${x(1).toFixed(1)},${h - padBottom} Z"
            fill="var(--credibility)" opacity="0.09" />
      <path d="${path('aloneValue')}" fill="none" stroke="var(--ink-3)" stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round" />
      <path d="${path('groupEquity')}" fill="none" stroke="var(--credibility)" stroke-width="3"
            stroke-linejoin="round" stroke-linecap="round" />

      <circle cx="${x(last.year).toFixed(1)}" cy="${y(last.groupEquity).toFixed(1)}" r="6"
              fill="var(--paper)" stroke="var(--credibility)" stroke-width="3" />
      <text x="${(x(last.year) + 16).toFixed(1)}" y="${(y(last.groupEquity) - 4).toFixed(1)}"
            font-size="22" font-weight="700" fill="var(--ink)" letter-spacing="-0.5">${esc(moneyShort(last.groupEquity))}</text>
      <text x="${(x(last.year) + 16).toFixed(1)}" y="${(y(last.groupEquity) + 16).toFixed(1)}"
            font-size="13" fill="var(--ink-3)">as a group</text>

      <circle cx="${x(last.year).toFixed(1)}" cy="${y(last.aloneValue).toFixed(1)}" r="5"
              fill="var(--paper)" stroke="var(--ink-3)" stroke-width="2.5" />
      <text x="${(x(last.year) + 16).toFixed(1)}" y="${(y(last.aloneValue) + 2).toFixed(1)}"
            font-size="17" font-weight="600" fill="var(--ink-2)">${esc(moneyShort(last.aloneValue))}</text>
      <text x="${(x(last.year) + 16).toFixed(1)}" y="${(y(last.aloneValue) + 20).toFixed(1)}"
            font-size="13" fill="var(--ink-3)">on your own</text>
    </svg>
    <div class="legend">
      <span><i style="background:var(--credibility)"></i>Buy others alongside it</span>
      <span><i style="background:var(--ink-2)"></i>Keep it and grow it</span>
    </div>
  </figure>`;
}

/**
 * Why a group is worth more than the businesses in it.
 *
 * The whole strategy is one spread: what you pay per pound of profit on the way in against
 * what you are paid per pound on the way out. Drawing it is the fastest way to see that
 * nothing about the businesses has to improve for the arithmetic to work.
 */
export function spreadDiagram({ entry, exit, count = 3, each = 250_000, platform = 0 }) {
  const w = 1000;
  const h = 300;
  const boxW = 150;
  const boxH = 54;
  const leftX = 10;
  const midX = 420;
  const rightX = 760;
  const acquired = count * each;
  const total = acquired + platform;

  const smalls = Array.from({ length: Math.min(count, 3) }, (_, i) => {
    const y = 62 + i * 74;
    return `
      <rect x="${leftX}" y="${y}" width="${boxW}" height="${boxH}" rx="9"
            fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
      <text x="${leftX + boxW / 2}" y="${y + 23}" text-anchor="middle" font-size="13"
            fill="currentColor" opacity="0.75">One business</text>
      <text x="${leftX + boxW / 2}" y="${y + 42}" text-anchor="middle" font-size="15"
            font-weight="600" fill="currentColor">${esc(moneyShort(each))} profit</text>
      <line x1="${leftX + boxW}" y1="${y + boxH / 2}" x2="${midX - 12}" y2="${h / 2}"
            stroke="currentColor" stroke-width="1.5" opacity="0.35" marker-end="url(#spread-arrow)" />`;
  }).join('');

  return `
  <figure>
    <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto;color:var(--ink)" role="img"
         aria-label="You buy at ${turns(entry)} and the group sells at ${turns(exit)}, a spread of ${turns(exit - entry)}">
      <defs>
        <marker id="spread-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor" opacity="0.5" />
        </marker>
      </defs>

      ${smalls}
      <text x="${leftX}" y="30" font-size="13" font-weight="600" fill="currentColor" opacity="0.6"
            letter-spacing="1.2">WHAT YOU BUY</text>
      <text x="${leftX + boxW / 2}" y="${h - 14}" text-anchor="middle" font-size="14"
            font-weight="600" fill="var(--critical)">${esc(turns(entry))} each</text>

      <rect x="${midX}" y="${h / 2 - 46}" width="200" height="92" rx="12"
            fill="currentColor" stroke="none" />
      <text x="${midX + 100}" y="${h / 2 - 18}" text-anchor="middle" font-size="12"
            fill="var(--paper)" opacity="0.7" letter-spacing="1">ONE GROUP</text>
      <text x="${midX + 100}" y="${h / 2 + 10}" text-anchor="middle" font-size="26"
            font-weight="700" fill="var(--paper)">${esc(moneyShort(total))}</text>
      <text x="${midX + 100}" y="${h / 2 + 30}" text-anchor="middle" font-size="12"
            fill="var(--paper)" opacity="0.7">of profit</text>

      <line x1="${midX + 200}" y1="${h / 2}" x2="${rightX - 12}" y2="${h / 2}"
            stroke="currentColor" stroke-width="2" marker-end="url(#spread-arrow)" />
      <text x="${(midX + 200 + rightX) / 2}" y="${h / 2 - 14}" text-anchor="middle" font-size="13"
            fill="currentColor" opacity="0.6">sells as one</text>

      <rect x="${rightX}" y="${h / 2 - 46}" width="230" height="92" rx="12"
            fill="none" stroke="var(--good)" stroke-width="2" />
      <text x="${rightX + 115}" y="${h / 2 - 18}" text-anchor="middle" font-size="12"
            fill="currentColor" opacity="0.6" letter-spacing="1">WHAT IT SELLS FOR</text>
      <text x="${rightX + 115}" y="${h / 2 + 12}" text-anchor="middle" font-size="28"
            font-weight="700" fill="currentColor">${esc(moneyShort(total * exit))}</text>
      <text x="${rightX + 115}" y="${h - 14}" text-anchor="middle" font-size="14"
            font-weight="600" fill="var(--good)">${esc(turns(exit))} for the group</text>
    </svg>
    <figcaption>Nothing about any of these businesses has to improve. You pay
      ${esc(turns(entry))} for each pound of profit and are paid ${esc(turns(exit))} for the same pound
      once it sits inside a group — a spread of ${esc(turns(exit - entry))}.</figcaption>
  </figure>`;
}

/**
 * The two roads, as a shell the year scrubber drives.
 *
 * Both full paths are drawn once and revealed by a clip rectangle the interaction widens,
 * so scrubbing costs one attribute write rather than a re-render.
 */
export function raceChart(rows) {
  const w = 1000;
  const h = 340;
  const padL = 20;
  const padR = 210;
  const padTop = 48;
  const padBottom = 46;
  const max = Math.max(...rows.map((r) => Math.max(r.groupEquity, r.aloneValue))) || 1;
  const lastYear = rows[rows.length - 1].year;

  const x = (year) => padL + ((year - 1) / Math.max(1, lastYear - 1)) * (w - padL - padR);
  const y = (v) => padTop + (1 - v / max) * (h - padTop - padBottom);
  const path = (key) => rows.map((r, i) => `${i ? 'L' : 'M'}${x(r.year).toFixed(1)},${y(r[key]).toFixed(1)}`).join(' ');

  const scale = { padL, padR, padTop, padBottom, w, h, max, lastYear };

  return `
  <figure>
    <svg id="race" viewBox="0 0 ${w} ${h}" style="width:100%;height:auto"
         data-scale='${JSON.stringify(scale)}' role="img"
         aria-label="Value over ${lastYear} years: as a group ${money(rows[rows.length - 1].groupEquity)}, on your own ${money(rows[rows.length - 1].aloneValue)}">
      <defs>
        <clipPath id="race-reveal"><rect id="race-rect" x="0" y="0" width="0" height="${h}" /></clipPath>
      </defs>
      ${[1, 5, 10, 15, 20].filter((v) => v <= lastYear).map((yr) => `
        <line x1="${x(yr).toFixed(1)}" y1="${padTop - 12}" x2="${x(yr).toFixed(1)}" y2="${h - padBottom}"
              stroke="var(--hair)" stroke-width="1" />
        <text x="${x(yr).toFixed(1)}" y="${h - padBottom + 24}" font-size="13" fill="var(--ink-3)"
              text-anchor="middle">Year ${yr}</text>`).join('')}
      ${[0.5, 1].map((frac) => `
        <line x1="${padL}" y1="${y(max * frac).toFixed(1)}" x2="${w - padR}" y2="${y(max * frac).toFixed(1)}"
              stroke="var(--hair)" stroke-width="1" />
        <text x="${w - padR + 10}" y="${(y(max * frac) + 4).toFixed(1)}" font-size="12"
              fill="var(--ink-3)">${esc(moneyShort(max * frac))}</text>`).join('')}
      <g clip-path="url(#race-reveal)">
        <path d="${path('groupEquity')} L${x(lastYear).toFixed(1)},${h - padBottom} L${x(1).toFixed(1)},${h - padBottom} Z"
              fill="var(--credibility)" opacity="0.1" />
        <path d="${path('groupEquity')}" fill="none" stroke="var(--credibility)" stroke-width="3.5"
              stroke-linejoin="round" stroke-linecap="round" />
        <path d="${path('aloneValue')}" fill="none" stroke="var(--ink-2)" stroke-width="3"
              stroke-linejoin="round" stroke-linecap="round" />
      </g>
      <circle id="race-dot-alone" cx="${x(1)}" cy="${y(rows[0].aloneValue)}" r="5.5"
              fill="var(--paper)" stroke="var(--ink-2)" stroke-width="3" />
      <circle id="race-dot-group" cx="${x(1)}" cy="${y(rows[0].groupEquity)}" r="6.5"
              fill="var(--paper)" stroke="var(--credibility)" stroke-width="3.5" />
    </svg>
    <div class="legend">
      <span><i style="background:var(--credibility)"></i>Buy others alongside it</span>
      <span><i style="background:var(--ink-2)"></i>Keep it and grow it</span>
    </div>
  </figure>`;
}

/**
 * What moves the number most, worst answer to best.
 *
 * A tornado: every bar is one question's range around where the business sits today, sorted
 * by how much is at stake. Loss and gain are the only two things being shown, so they take
 * the status colours rather than an identity palette.
 */
export function tornado(items, { limit = 8 } = {}) {
  const rows = items.slice(0, limit);
  const rowH = 42;
  const labelW = 300;
  const h = rows.length * rowH + 46;
  const w = VB;
  const plotL = labelW;
  const plotW = w - labelW - 120;
  const span = Math.max(...rows.map((r) => Math.max(r.downside, r.upside)), 1);
  const mid = plotL + plotW / 2;
  const scale = (v) => (v / span) * (plotW / 2);

  return `
  <figure>
    <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img"
         aria-label="${rows.map((r) => `${r.name}: ${money(r.low)} to ${money(r.high)}`).join('; ')}">
      <line x1="${mid}" y1="26" x2="${mid}" y2="${h - 26}" stroke="var(--ink-3)" stroke-width="1.5" />
      <text x="${mid}" y="16" text-anchor="middle" font-size="12" fill="var(--ink-3)">where you are now</text>
      ${rows.map((r, i) => {
        const y = 32 + i * rowH;
        const down = scale(r.downside);
        const up = scale(r.upside);
        return `
        <text x="0" y="${y + 20}" font-size="14" font-weight="600" fill="var(--ink)">${esc(r.name)}</text>
        <text x="${labelW - 22}" y="${y + 20}" text-anchor="end" font-size="12.5" fill="var(--ink-3)">${r.score}/5</text>
        <rect class="seg-mark" x="${(mid - down).toFixed(1)}" y="${y + 4}" width="${Math.max(0, down - 1).toFixed(1)}"
              height="24" rx="4" fill="var(--critical)" opacity="0.75">
          <title>${esc(r.name)} at its worst: ${esc(money(r.low))}</title></rect>
        <rect class="seg-mark" x="${(mid + 1).toFixed(1)}" y="${y + 4}" width="${Math.max(0, up - 1).toFixed(1)}"
              height="24" rx="4" fill="var(--good)" opacity="0.8">
          <title>${esc(r.name)} at its best: ${esc(money(r.high))}</title></rect>
        <text x="${(mid + up + 12).toFixed(1)}" y="${y + 21}" font-size="13.5" font-weight="600"
              fill="var(--ink)">+${esc(moneyShort(r.upside))}</text>`;
      }).join('')}
    </svg>
    <div class="legend">
      <span><i style="background:var(--critical);opacity:0.75"></i>What you lose if it gets worse</span>
      <span><i style="background:var(--good);opacity:0.8"></i>What you gain if you fix it</span>
    </div>
  </figure>`;
}

/** Where the money for one deal comes from. One hue, because it is all the same price. */
export function fundingStack(node) {
  const h = 46;
  const total = node.price || 1;
  const parts = [
    { label: 'Your cash', value: node.cashNeeded, opacity: 1 },
    { label: 'Borrowed from a bank', value: node.bankDebt, opacity: 0.6 },
    { label: 'Left with the seller', value: node.sellerNote, opacity: 0.32 },
  ].filter((p) => p.value > 0);

  let x = 0;
  const marks = parts.map((p) => {
    const width = Math.max(0, (p.value / total) * VB - GAP);
    const rect = `<rect class="seg-mark" x="${x.toFixed(1)}" y="0" width="${width.toFixed(1)}" height="${h}"
      fill="var(--ink)" opacity="${p.opacity}"><title>${esc(p.label)}: ${esc(money(p.value))}</title></rect>`;
    x += (p.value / total) * VB;
    return rect;
  }).join('');

  return `
  <figure>
    <svg viewBox="0 0 ${VB} ${h}" preserveAspectRatio="none" style="width:100%;height:${h}px" role="img"
         aria-label="${parts.map((p) => `${p.label} ${money(p.value)}`).join(', ')}">
      <defs><clipPath id="clip-${cid()}"><rect x="0" y="0" width="${VB}" height="${h}" rx="7" /></clipPath></defs>
      <g clip-path="url(#clip-${lastId})">
        <rect x="0" y="0" width="${VB}" height="${h}" fill="var(--sunken)" />
        ${marks}
      </g>
    </svg>
    <div class="legend">
      ${parts.map((p) => `<span><i style="background:var(--ink);opacity:${p.opacity}"></i>${esc(p.label)}
        <strong style="margin-left:4px">${esc(money(p.value))}</strong></span>`).join('')}
    </div>
  </figure>`;
}

/**
 * The first six years of one deal: what it earns against what it owes.
 *
 * The payment holiday is the whole reason these structures work, and it is invisible in a
 * single cover ratio — you have to see the year with no bar next to it.
 */
export function dealCashflow(node, { years = 6 } = {}) {
  const w = VB;
  const h = 260;
  const padL = 10;
  const padR = 10;
  const padTop = 40;
  const padBottom = 48;
  const holidayYears = (node.structure?.holidayMonths ?? 0) / 12;

  const rows = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    const covered = Math.max(0, Math.min(1, year - holidayYears));
    return { year, cash: node.freeCashFlow, service: node.service * covered };
  });

  const max = Math.max(...rows.flatMap((r) => [r.cash, r.service]), 1);
  const slot = (w - padL - padR) / years;
  const barW = slot * 0.3;
  const y = (v) => padTop + (1 - v / max) * (h - padTop - padBottom);

  return `
  <figure>
    <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img"
         aria-label="Year by year, ${money(node.freeCashFlow)} of cash against repayments rising to ${money(node.service)}">
      <line x1="${padL}" y1="${h - padBottom}" x2="${w - padR}" y2="${h - padBottom}"
            stroke="var(--hair)" stroke-width="1" />
      ${rows.map((r, i) => {
        const year = r.year;
        const cx = padL + slot * i + slot / 2;
        const shortfall = r.service > r.cash;
        return `
        <rect class="seg-mark" x="${(cx - barW - 3).toFixed(1)}" y="${y(r.cash).toFixed(1)}"
              width="${barW.toFixed(1)}" height="${(h - padBottom - y(r.cash)).toFixed(1)}" rx="4"
              fill="var(--ink)" opacity="0.85">
          <title>Year ${r.year} cash: ${esc(money(r.cash))}</title></rect>
        <rect class="seg-mark" x="${(cx + 3).toFixed(1)}" y="${y(r.service).toFixed(1)}"
              width="${barW.toFixed(1)}" height="${Math.max(0, h - padBottom - y(r.service)).toFixed(1)}" rx="4"
              fill="${shortfall ? 'var(--critical)' : 'var(--loss)'}">
          <title>Year ${r.year} repayments: ${esc(money(r.service))}</title></rect>
        <text x="${cx.toFixed(1)}" y="${h - padBottom + 22}" text-anchor="middle" font-size="13"
              fill="var(--ink-3)">Year ${r.year}</text>
        ${year <= holidayYears + 1 && holidayYears > 0 ? `<text x="${cx.toFixed(1)}" y="${h - padBottom + 40}"
              text-anchor="middle" font-size="12" font-weight="600" fill="var(--good)">${
                r.service === 0 ? 'no payments' : `${Math.round(holidayYears * 12)} months free`
              }</text>` : ''}`;
      }).join('')}
      <text x="${padL}" y="22" font-size="13" fill="var(--ink-3)">Cash the business makes, against what it owes</text>
    </svg>
    <div class="legend">
      <span><i style="background:var(--ink);opacity:0.85"></i>Cash it makes</span>
      <span><i style="background:var(--loss)"></i>Repayments</span>
    </div>
  </figure>`;
}

/**
 * The capital stack: where every pound of the price came from.
 *
 * Two families, because there is only one distinction that matters — money that has to be
 * repaid out of the business's cash, and money that takes a share of it instead. Tints within
 * each family separate the sources; direct labels carry the identity so hue never has to.
 */
export function stackBar(tranches, need) {
  const h = 52;
  const total = Math.max(need, tranches.reduce((s, t) => s + t.amount, 0)) || 1;
  const tone = {
    cash: { fill: 'var(--ink)', opacity: 1 },
    rollover: { fill: 'var(--ink)', opacity: 0.5 },
    investor: { fill: 'var(--ink)', opacity: 0.28 },
    seller: { fill: 'var(--credibility)', opacity: 1 },
    bank: { fill: 'var(--credibility)', opacity: 0.5 },
  };

  let x = 0;
  const parts = tranches.filter((t) => t.amount > 0);
  const marks = parts.map((t) => {
    const style = tone[t.source.id] ?? tone.cash;
    const width = Math.max(0, (t.amount / total) * VB - GAP);
    const rect = `<rect class="seg-mark" x="${x.toFixed(1)}" y="0" width="${width.toFixed(1)}" height="${h}"
      fill="${style.fill}" opacity="${style.opacity}">
      <title>${esc(t.type.name)}: ${esc(money(t.amount))}</title></rect>`;
    x += (t.amount / total) * VB;
    return rect;
  }).join('');

  const gap = Math.max(0, need - parts.reduce((s, t) => s + t.amount, 0));

  return `
  <figure>
    <svg viewBox="0 0 ${VB} ${h}" preserveAspectRatio="none" style="width:100%;height:${h}px" role="img"
         aria-label="${parts.map((t) => `${t.type.name} ${money(t.amount)}`).join(', ')}">
      <defs><clipPath id="clip-${cid()}"><rect x="0" y="0" width="${VB}" height="${h}" rx="7" /></clipPath></defs>
      <g clip-path="url(#clip-${lastId})">
        <rect x="0" y="0" width="${VB}" height="${h}" fill="var(--sunken)" />
        ${marks}
      </g>
    </svg>
    <div class="legend">
      ${parts.map((t) => {
        const style = tone[t.source.id] ?? tone.cash;
        return `<span><i style="background:${style.fill};opacity:${style.opacity}"></i>${esc(t.type.name)}
          <strong style="margin-left:4px">${esc(money(t.amount))}</strong></span>`;
      }).join('')}
      ${gap > 1 ? `<span><i style="background:var(--sunken);border:1px solid var(--hair-strong)"></i>Not funded
        <strong style="margin-left:4px" class="is-critical">${esc(money(gap))}</strong></span>` : ''}
    </div>
  </figure>`;
}

/**
 * What the deal owes, year by year, against what it earns.
 *
 * The balloon sits on top of the payments in its own colour, because a year that looks
 * comfortable on instalments alone can be the year the whole thing falls over.
 */
export function serviceTimeline(schedule, cash, { floor = 1.5 } = {}) {
  const rows = schedule.filter((r) => r.owed > 0 || r.year <= 8).slice(0, 10);
  const w = VB;
  const h = 300;
  const padL = 16;
  const padR = 130;
  const padTop = 40;
  const padBottom = 54;
  const max = Math.max(...rows.map((r) => r.owed), cash, 1) * 1.08;
  const slot = (w - padL - padR) / rows.length;
  const barW = Math.min(64, slot * 0.52);
  const y = (v) => padTop + (1 - v / max) * (h - padTop - padBottom);

  return `
  <figure>
    <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img"
         aria-label="Owed each year against ${money(cash)} of cash a year">
      <line x1="${padL}" y1="${h - padBottom}" x2="${w - padR}" y2="${h - padBottom}"
            stroke="var(--hair)" stroke-width="1" />
      <line x1="${padL}" y1="${y(cash).toFixed(1)}" x2="${w - padR}" y2="${y(cash).toFixed(1)}"
            stroke="var(--ink)" stroke-width="2" />
      <text x="${w - padR + 10}" y="${(y(cash) + 4).toFixed(1)}" font-size="13" fill="var(--ink)"
            font-weight="600">${esc(moneyShort(cash))} cash</text>
      <line x1="${padL}" y1="${y(cash / floor).toFixed(1)}" x2="${w - padR}" y2="${y(cash / floor).toFixed(1)}"
            stroke="var(--ink-3)" stroke-width="1" />
      <text x="${w - padR + 10}" y="${(y(cash / floor) + 4).toFixed(1)}" font-size="12"
            fill="var(--ink-3)">most you can owe</text>
      ${rows.map((r, i) => {
        const cx = padL + slot * i + slot / 2;
        const payTop = y(r.payment);
        const owedTop = y(r.owed);
        const tight = r.payment > cash / floor;
        return `
        <rect class="seg-mark" x="${(cx - barW / 2).toFixed(1)}" y="${payTop.toFixed(1)}"
              width="${barW.toFixed(1)}" height="${Math.max(0, h - padBottom - payTop).toFixed(1)}" rx="4"
              fill="${tight ? 'var(--critical)' : 'var(--credibility)'}" opacity="0.9">
          <title>Year ${r.year} payments: ${esc(money(r.payment))}</title></rect>
        ${r.balloon > 0 ? `
          <rect class="seg-mark" x="${(cx - barW / 2).toFixed(1)}" y="${owedTop.toFixed(1)}"
                width="${barW.toFixed(1)}" height="${Math.max(0, payTop - owedTop - 2).toFixed(1)}" rx="4"
                fill="var(--critical)">
            <title>Year ${r.year} lump due: ${esc(money(r.balloon))}</title></rect>
          <text x="${cx.toFixed(1)}" y="${(owedTop - 8).toFixed(1)}" text-anchor="middle" font-size="12"
                font-weight="600" fill="var(--critical)">${esc(moneyShort(r.balloon))} due</text>` : ''}
        <text x="${cx.toFixed(1)}" y="${h - padBottom + 22}" text-anchor="middle" font-size="12.5"
              fill="var(--ink-3)">Yr ${r.year}</text>`;
      }).join('')}
    </svg>
    <div class="legend">
      <span><i style="background:var(--credibility);opacity:0.9"></i>Payments</span>
      <span><i style="background:var(--critical)"></i>Lump due at the end</span>
    </div>
  </figure>`;
}

/**
 * How cover gets from where it is to where it has to be.
 *
 * A waterfall, because the question is never "what is the number" but "which of these six
 * things moved it". Each action floats from where the last one left off; the floor is drawn
 * across so the moment it clears is visible rather than calculated.
 */
export function coverWaterfall(steps, floor) {
  const w = VB;
  const h = 340;
  const padL = 20;
  const padR = 90;
  const padTop = 44;
  const padBottom = 76;
  const covers = steps.map((s) => (isFinite(s.cover) ? s.cover : floor * 3));
  const max = Math.max(...covers, floor * 1.4) * 1.12;
  const slot = (w - padL - padR) / steps.length;
  const barW = Math.min(96, slot * 0.56);
  const y = (v) => padTop + (1 - bound(v, 0, max) / max) * (h - padTop - padBottom);

  return `
  <figure>
    <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img"
         aria-label="Cover from ${turns(covers[0])} to ${turns(covers[covers.length - 1])} against a floor of ${turns(floor)}">
      <line x1="${padL}" y1="${h - padBottom}" x2="${w - padR}" y2="${h - padBottom}"
            stroke="var(--hair)" stroke-width="1" />
      <line x1="${padL}" y1="${y(floor).toFixed(1)}" x2="${w - padR}" y2="${y(floor).toFixed(1)}"
            stroke="var(--ink)" stroke-width="2" />
      <text x="${w - padR + 10}" y="${(y(floor) + 4).toFixed(1)}" font-size="13" font-weight="600"
            fill="var(--ink)">${esc(turns(floor))}</text>
      <text x="${w - padR + 10}" y="${(y(floor) + 21).toFixed(1)}" font-size="12"
            fill="var(--ink-3)">the floor</text>

      ${steps.map((s, i) => {
        const cx = padL + slot * i + slot / 2;
        const value = covers[i];
        const prev = i === 0 ? 0 : covers[i - 1];
        const isEdge = i === 0 || i === steps.length - 1;
        const top = y(Math.max(value, isEdge ? 0 : prev));
        const bottom = y(isEdge ? 0 : Math.min(value, prev));
        const rising = value >= prev;
        const fill = isEdge
          ? (value >= floor ? 'var(--good)' : 'var(--critical)')
          : (rising ? 'var(--good)' : 'var(--critical)');
        return `
        ${i > 0 ? `<line x1="${(padL + slot * (i - 1) + slot / 2 + barW / 2).toFixed(1)}" y1="${y(prev).toFixed(1)}"
              x2="${(cx - barW / 2).toFixed(1)}" y2="${y(prev).toFixed(1)}"
              stroke="var(--hair-strong)" stroke-width="1" />` : ''}
        <rect class="seg-mark" x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}"
              width="${barW.toFixed(1)}" height="${Math.max(3, bottom - top).toFixed(1)}" rx="4"
              fill="${fill}" opacity="${isEdge ? 0.9 : 0.7}">
          <title>${esc(s.name)}: cover ${esc(turns(value))}</title></rect>
        ${wrapLabel(esc(s.name), cx, h - padBottom + 22, 15)}`;
      }).join('')}
      ${/* Labels last and haloed, so a value sitting on the floor line still reads. */ ''}
      ${steps.map((s, i) => {
        const cx = padL + slot * i + slot / 2;
        const value = covers[i];
        const prev = i === 0 ? 0 : covers[i - 1];
        const isEdge = i === 0 || i === steps.length - 1;
        const top = y(Math.max(value, isEdge ? 0 : prev));
        return `<text x="${cx.toFixed(1)}" y="${(top - 11).toFixed(1)}" text-anchor="middle" font-size="15"
          font-weight="700" fill="var(--ink)" stroke="var(--paper)" stroke-width="4"
          paint-order="stroke">${esc(turns(value))}</text>`;
      }).join('')}
    </svg>
  </figure>`;
}

/** Two short lines of centred label under a column, because names do not fit on one. */
function wrapLabel(text, cx, y, perLine) {
  const words = String(text).split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > perLine && line) { lines.push(line); line = word; }
    else line = (line + ' ' + word).trim();
    if (lines.length === 2) break;
  }
  if (line && lines.length < 2) lines.push(line);
  return lines.map((l, i) => `<text x="${cx.toFixed(1)}" y="${y + i * 16}" text-anchor="middle"
    font-size="12" fill="var(--ink-3)">${l}</text>`).join('');
}

/**
 * Before and after, side by side, at a size you can present from.
 * One row per measure so the eye travels across rather than hunting.
 */
export function beforeAfter(rows, { beforeLabel = 'As it stands', afterLabel = 'After' } = {}) {
  return `
  <div class="ba">
    <div class="ba-head">
      <span></span>
      <span class="ba-col before">${esc(beforeLabel)}</span>
      <span class="ba-col after">${esc(afterLabel)}</span>
    </div>
    ${rows.map((r) => `
      <div class="ba-row">
        <span class="ba-key">${esc(r.label)}</span>
        <span class="ba-val before ${r.beforeBad ? 'is-critical' : ''}">${r.before}</span>
        <span class="ba-val after ${r.afterGood ? 'is-good' : ''}">${r.after}</span>
      </div>`).join('')}
  </div>`;
}
