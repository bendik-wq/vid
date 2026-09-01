/** Presentation helpers. Currency symbol is a display concern only — the engine is unitless. */

export const state_currency = { symbol: '$' };

export const money = (n) => {
  if (!isFinite(n)) return '—';
  const sign = n < 0 ? '-' : '';
  return sign + state_currency.symbol + Math.round(Math.abs(n)).toLocaleString('en-US');
};

export const moneyShort = (n) => {
  if (!isFinite(n)) return '—';
  const a = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  const s = state_currency.symbol;
  if (a >= 1e9) return `${sign}${s}${(a / 1e9).toFixed(2)}b`;
  if (a >= 1e6) return `${sign}${s}${(a / 1e6).toFixed(2)}m`;
  if (a >= 1e3) return `${sign}${s}${Math.round(a / 1e3)}k`;
  return `${sign}${s}${Math.round(a)}`;
};

export const turns = (n) => (isFinite(n) ? `${n.toFixed(2)}x` : '—');
export const pct = (n, dp = 1) => (isFinite(n) ? `${(n * 100).toFixed(dp)}%` : '—');
export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const num = (v, fallback = 0) => {
  const n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : fallback;
};
