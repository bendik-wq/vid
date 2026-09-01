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
