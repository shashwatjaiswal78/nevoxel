/** Small shared helpers for the templates. */

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text for HTML body content. Allows nothing through. */
function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

/** Escape for use inside a double-quoted attribute. */
function attr(value = '') {
  return esc(value);
}

/**
 * Prose fields in content files may contain <em> and <strong> — the chart
 * convention of italicising water features depends on it. Everything else is
 * escaped.
 */
function prose(value = '') {
  return esc(value)
    .replace(/&lt;(\/?)(em|strong|i|b)&gt;/g, '<$1$2>')
    .replace(/&amp;(#?\w+);/g, '&$1;');
}

/** 2026-07-28 -> "28 July 2026" */
function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** 2026-07-28 -> "28 Jul" */
function formatShortDate(iso) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
}

/** "2 days ago" style, relative to build time. */
function relativeDate(iso) {
  const then = new Date(iso + 'T00:00:00Z').getTime();
  const days = Math.floor((Date.now() - then) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

/** 2800000 -> "28,00,000" (Indian digit grouping) */
function inr(n) {
  return n.toLocaleString('en-IN');
}

function salaryLabel(salary) {
  if (!salary) return '';
  const unit = salary.period === 'YEAR' ? 'per year' : salary.period.toLowerCase();
  return `₹${inr(salary.min)}–${inr(salary.max)} ${unit}`;
}

module.exports = { esc, attr, prose, formatDate, formatShortDate, relativeDate, inr, salaryLabel };
