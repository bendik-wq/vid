/**
 * The group canvas.
 *
 * Your business sits in the middle. Everything you buy hangs off it. Positions are stored
 * as fractions of the box so the whole thing scales, and a node with no stored position
 * takes its place on a ring — you never have to drag anything, but you can.
 */

import { SECTORS_BY_ID } from '../data/sectors.js';
import { STRUCTURES_BY_ID } from '../data/structures.js';
import { money, moneyShort, turns, esc } from './format.js';

export const NODE_W = 0.19;   // fractions of the canvas box
export const NODE_H = 0.20;
const RING_RX = 0.34;
const RING_RY = 0.30;

/** Where a node sits: its own position if it has been moved, otherwise its place on the ring. */
export function nodePosition(node, index, total) {
  if (node.pos) return node.pos;
  const angle = -Math.PI / 2 + (index / Math.max(1, total)) * Math.PI * 2;
  return { x: 0.5 + Math.cos(angle) * RING_RX, y: 0.5 + Math.sin(angle) * RING_RY };
}

export function groupCanvas(result, { selected } = {}) {
  const nodes = result.nodes;
  const total = nodes.length;
  const placed = nodes.map((n, i) => ({ node: n, pos: nodePosition(n, i, total) }));

  const lines = placed.map(({ node, pos }) => {
    const strong = node.passes;
    return `<line data-line="${node.id}" x1="50" y1="50" x2="${(pos.x * 100).toFixed(2)}" y2="${(pos.y * 100).toFixed(2)}"
      stroke="${strong ? 'var(--hair-strong)' : 'var(--critical)'}" stroke-width="0.25"
      vector-effect="non-scaling-stroke" opacity="${strong ? 0.9 : 1}" />`;
  }).join('');

  const cards = placed.map(({ node, pos }) => {
    const industry = SECTORS_BY_ID[node.industryId] ?? SECTORS_BY_ID.generic;
    const structure = STRUCTURES_BY_ID[node.structureId];
    return `
    <div class="gnode ${selected === node.id ? 'on' : ''} ${node.passes ? '' : 'warn'}"
         data-node="${node.id}" tabindex="0" role="button"
         aria-label="${esc(industry.name)}, ${esc(money(node.ebitda))} profit"
         style="left:${(pos.x * 100).toFixed(2)}%;top:${(pos.y * 100).toFixed(2)}%">
      <span class="gnode-industry">${esc(industry.name)}</span>
      <span class="gnode-profit">${esc(moneyShort(node.ebitda))}</span>
      <span class="gnode-meta">${esc(structure?.name ?? '')}</span>
      <span class="gnode-cover ${node.passes ? 'ok' : 'bad'}">${esc(turns(node.dscr))} cover</span>
      ${node.interestOnly ? '<span class="gnode-meta">interest only</span>' : ''}
    </div>`;
  }).join('');

  return `
  <div class="canvas" id="canvas" data-canvas>
    <svg class="canvas-web" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      ${lines}
    </svg>
    <div class="ghub" data-hub>
      <span class="ghub-label">Your business</span>
      <span class="ghub-profit">${esc(moneyShort(result.holdcoEbitda))}</span>
      <span class="ghub-meta">${total} bought${total ? ` · ${esc(moneyShort(result.groupProfit))} together` : ''}</span>
    </div>
    ${cards}
    ${total === 0 ? `
      <div class="canvas-empty">
        <p>Add a business below and it appears here.</p>
      </div>` : ''}
  </div>`;
}

/** Cards you add from. One tap adds; the web rearranges itself. */
export function industryTray(sectors) {
  return `
  <div class="tray">
    ${sectors.map((s) => `
      <button class="tray-card" data-act="add-node" data-industry="${s.id}">
        <span class="tray-name">${esc(s.name)}</span>
        <span class="tray-eg">${esc(s.example)}</span>
        <span class="tray-mult">${s.low.toFixed(1)}x to buy · ${s.ceiling.toFixed(1)}x to sell</span>
      </button>`).join('')}
  </div>`;
}
