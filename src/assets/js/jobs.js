/**
 * Job board filtering.
 *
 * Every role is rendered server-side into the HTML at build time, so the board
 * works and is fully crawlable with JavaScript disabled. This script only
 * hides and shows what is already on the page — search engines and Google Jobs
 * see the complete list either way.
 */
(function () {
  'use strict';

  var board = document.querySelector('[data-board]');
  if (!board) return;

  var search = board.querySelector('[data-filter-search]');
  var selects = board.querySelectorAll('[data-filter]');
  var clear = board.querySelector('[data-filter-clear]');
  var count = board.querySelector('[data-filter-count]');
  var list = board.querySelector('[data-job-list]');
  var empty = board.querySelector('[data-empty]');
  var jobs = Array.prototype.slice.call(list.querySelectorAll('.job'));

  function currentFilters() {
    var active = {};
    Array.prototype.forEach.call(selects, function (select) {
      if (select.value) active[select.getAttribute('data-filter')] = select.value;
    });
    return active;
  }

  function apply() {
    var term = (search.value || '').trim().toLowerCase();
    var active = currentFilters();
    var shown = 0;

    jobs.forEach(function (job) {
      var matches = true;

      for (var key in active) {
        if (job.getAttribute('data-' + key) !== active[key]) {
          matches = false;
          break;
        }
      }

      if (matches && term) {
        matches = (job.getAttribute('data-keywords') || '').indexOf(term) !== -1;
      }

      job.hidden = !matches;
      if (matches) shown++;
    });

    count.textContent = shown === 1 ? '1 open role' : shown + ' open roles';
    empty.hidden = shown !== 0;

    var hasFilters = term !== '' || Object.keys(active).length > 0;
    clear.hidden = !hasFilters;

    syncUrl(term, active);
  }

  /** Keep filters in the URL so a filtered board can be linked and shared. */
  function syncUrl(term, active) {
    var params = new URLSearchParams();
    if (term) params.set('q', term);
    for (var key in active) params.set(key, active[key]);

    var query = params.toString();
    var url = window.location.pathname + (query ? '?' + query : '');
    window.history.replaceState(null, '', url);
  }

  function restoreFromUrl() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('q')) search.value = params.get('q');

    Array.prototype.forEach.call(selects, function (select) {
      var value = params.get(select.getAttribute('data-filter'));
      if (value) select.value = value;
    });
  }

  var debounce;
  search.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(apply, 140);
  });

  Array.prototype.forEach.call(selects, function (select) {
    select.addEventListener('change', apply);
  });

  clear.addEventListener('click', function () {
    search.value = '';
    Array.prototype.forEach.call(selects, function (select) {
      select.value = '';
    });
    apply();
    search.focus();
  });

  restoreFromUrl();
  apply();
})();
