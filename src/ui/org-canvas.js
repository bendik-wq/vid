/**
 * The org chart you build by hand.
 *
 * Three bands — board, head office, and one column per business — and every band is a drop
 * zone. Drag a role in from the palette, or drag somebody from one band to another. The seats
 * are not decoration: filling one moves the audit, so the chart and the valuation are the
 * same object seen twice.
 */

import { TIERS, ROLES, rolesForTier, STAGE_BY_ID } from '../data/roles.js';
import { money, pct, esc } from './format.js';

const seatCard = (role, where, unit, index) => `
  <div class="seat filled" draggable="false"
       data-seat="${role.id}" data-where="${where}" data-unit="${unit ?? ''}" data-index="${index}"
       tabindex="0" role="button" aria-label="${esc(role.title)}, drag to move">
    <span class="seat-title">${esc(role.title)}</span>
    <span class="seat-cost">${role.cost ? money(role.cost) : `${pct(role.equityPct, 0)} equity`}</span>
    <button class="seat-x" data-act="unseat" data-role="${role.id}" data-where="${where}"
            data-unit="${unit ?? ''}" aria-label="Remove ${esc(role.title)}">×</button>
  </div>`;

const emptySeat = (role) => `
  <div class="seat empty" aria-hidden="true">
    <span class="seat-title">${esc(role.title)}</span>
    <span class="seat-cost">empty</span>
  </div>`;

/** One band: a labelled drop zone holding whoever is in it, plus the seats still open. */
function band(tier, filledIds, { unit = null, label, sub, accent } = {}) {
  const filled = filledIds.map((id) => ROLES.find((r) => r.id === id)).filter(Boolean);
  const open = rolesForTier(tier).filter((r) => !filledIds.includes(r.id) && r.essential);

  return `
  <div class="band" data-zone="${tier}" data-zone-unit="${unit ?? ''}" style="${accent ? `--band:${accent}` : ''}">
    <div class="band-head">
      <span class="band-name">${esc(label)}</span>
      <span class="band-sub">${esc(sub)}</span>
    </div>
    <div class="band-seats">
      ${filled.map((r, i) => seatCard(r, tier, unit, i)).join('')}
      ${open.map(emptySeat).join('')}
      ${filled.length === 0 && open.length === 0 ? '<span class="band-hint">Drop somebody here</span>' : ''}
    </div>
  </div>`;
}

export function orgChart(org, units, { platformUnit = 'platform' } = {}) {
  const boardTier = TIERS[0];
  const holdcoTier = TIERS[1];

  return `
  <div class="org" data-org>
    ${band('board', org.board ?? [], {
      label: boardTier.name, sub: boardTier.plain, accent: 'var(--credibility)',
    })}
    <div class="org-spine" aria-hidden="true"></div>
    ${band('holdco', org.holdco ?? [], {
      label: holdcoTier.name, sub: holdcoTier.plain, accent: 'var(--capital)',
    })}
    <div class="org-spine" aria-hidden="true"></div>
    <div class="org-units">
      ${units.map((u) => band('unit', org.units?.[u.id] ?? [], {
        unit: u.id,
        label: u.name,
        sub: u.id === platformUnit ? 'Your own business' : u.sub ?? 'Bought',
        accent: 'var(--closing)',
      })).join('')}
    </div>
  </div>`;
}

/** The bench you drag from. Grouped by tier, with what each one is for. */
export function rolePalette(org, activeUnit) {
  const taken = new Set([
    ...(org.board ?? []),
    ...(org.holdco ?? []),
    ...(org.units?.[activeUnit] ?? []),
  ]);

  return TIERS.map((tier) => `
    <div style="margin-bottom:22px">
      <p class="eyebrow" style="margin:0 0 10px">${esc(tier.name)}
        <span class="muted" style="text-transform:none;letter-spacing:0;font-weight:400">
          — paid in ${tier.currency === 'equity' ? 'equity' : 'salary'}</span></p>
      <div class="bench">
        ${rolesForTier(tier.id).map((role) => `
          <button class="chit ${taken.has(role.id) ? 'used' : ''}" data-role-drag="${role.id}"
                  data-act="seat" data-role="${role.id}" data-tier="${role.tier}"
                  title="${esc(role.plain)}">
            <span class="chit-title">${esc(role.title)}</span>
            <span class="chit-meta">${role.cost ? money(role.cost) : `${pct(role.equityPct, 0)} equity`}
              · ${esc(STAGE_BY_ID[role.stage].name.toLowerCase())}</span>
          </button>`).join('')}
      </div>
    </div>`).join('');
}
