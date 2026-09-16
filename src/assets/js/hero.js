/**
 * Home hero slideshow — one slide per practice desk.
 *
 * Progressive enhancement: the markup renders all three slides with the first
 * marked `is-active`, and CSS shows that one. If this file never loads, the
 * hero is simply the static maritime hero it was before — nothing is hidden
 * behind JS, and no content becomes unreachable.
 *
 * Accessibility, in order of how easy each is to get wrong:
 *
 *   1. WCAG 2.2.2 (Pause, Stop, Hide). Anything that auto-advances for more
 *      than five seconds needs a control to stop it. The pause button is that
 *      control, and it is a real button in the markup, not a hover affordance.
 *   2. prefers-reduced-motion. No auto-advance and no cross-fade at all — the
 *      slides cut instantly and only when the visitor asks for them.
 *   3. Focus containment. An inactive slide contains a link. Fading it to
 *      opacity 0 would leave that link in the tab order, focusable but
 *      invisible, which is worse than useless. `visibility: hidden` in CSS
 *      removes it, and `aria-hidden` keeps it out of the accessibility tree.
 *   4. Autoplay stops for good on any deliberate interaction. Someone who has
 *      taken control should not have the page start moving under them again.
 */
(function () {
  'use strict';

  var INTERVAL = 6500;

  function init() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;

    var layers = hero.querySelectorAll('[data-hero-layer]');
    var slides = hero.querySelectorAll('[data-hero-slide]');
    var dots = hero.querySelectorAll('[data-hero-dot]');
    var controls = hero.querySelector('[data-hero-controls]');
    var deck = hero.querySelector('[data-hero-deck]');
    var prev = hero.querySelector('[data-hero-prev]');
    var next = hero.querySelector('[data-hero-next]');
    var pause = hero.querySelector('[data-hero-pause]');
    var pauseLabel = hero.querySelector('[data-hero-pause-label]');

    // One slide is not a slideshow. Leave the static hero alone.
    if (slides.length < 2) return;

    // The controls are hidden in the markup so they never appear without the
    // behaviour behind them.
    if (controls) controls.hidden = false;
    if (prev) prev.hidden = false;
    if (next) next.hidden = false;

    var reduced = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: false };

    var index = 0;
    var timer = null;
    var playing = false;
    var stopped = false; // set once the visitor takes control — never auto-resumes

    function show(i, announce) {
      index = (i + slides.length) % slides.length;

      for (var s = 0; s < slides.length; s++) {
        var on = s === index;
        slides[s].classList.toggle('is-active', on);
        // Keeps the inactive slide's desk link out of the tab order and out
        // of the accessibility tree. CSS does the visibility half.
        slides[s].setAttribute('aria-hidden', on ? 'false' : 'true');
        if (layers[s]) layers[s].classList.toggle('is-active', on);
        if (dots[s]) {
          dots[s].classList.toggle('is-current', on);
          if (on) dots[s].setAttribute('aria-current', 'true');
          else dots[s].removeAttribute('aria-current');
        }
      }

      // Only announce a change the visitor asked for. Announcing every
      // auto-advance would make a screen reader talk over the page forever.
      if (deck) deck.setAttribute('aria-live', announce ? 'polite' : 'off');
    }

    function start() {
      if (stopped || reduced.matches) return;
      stop(true);
      playing = true;
      setPauseUi();
      timer = window.setInterval(function () {
        show(index + 1, false);
      }, INTERVAL);
    }

    /** @param {boolean} [keepUi] true while restarting, so the label doesn't flicker. */
    function stop(keepUi) {
      if (timer) window.clearInterval(timer);
      timer = null;
      playing = false;
      if (!keepUi) setPauseUi();
    }

    function setPauseUi() {
      if (!pause) return;
      pause.setAttribute(
        'aria-label',
        playing ? 'Pause the slideshow' : 'Play the slideshow'
      );
      pause.classList.toggle('is-paused', !playing);
      if (pauseLabel) pauseLabel.textContent = playing ? 'Pause slideshow' : 'Play slideshow';
    }

    /** A deliberate choice: move, and stop advancing for the rest of the visit. */
    function take(i) {
      stopped = true;
      stop();
      show(i, true);
    }

    if (prev) prev.addEventListener('click', function () { take(index - 1); });
    if (next) next.addEventListener('click', function () { take(index + 1); });

    for (var d = 0; d < dots.length; d++) {
      (function (i) {
        dots[i].addEventListener('click', function () { take(i); });
      })(d);
    }

    if (pause) {
      pause.addEventListener('click', function () {
        if (playing) {
          stopped = true;
          stop();
        } else {
          // An explicit play overrides an earlier stop — the visitor is asking
          // for it this time.
          stopped = false;
          start();
        }
      });
    }

    // Pause while the pointer is over the hero or focus is inside it, then
    // resume — unless the visitor has taken control, in which case start()
    // returns immediately.
    hero.addEventListener('mouseenter', function () { if (playing) stop(true); });
    hero.addEventListener('mouseleave', function () { if (!stopped && !timer) start(); });
    hero.addEventListener('focusin', function () { if (playing) stop(true); });
    hero.addEventListener('focusout', function (e) {
      if (!hero.contains(e.relatedTarget) && !stopped && !timer) start();
    });

    // Nothing should animate in a background tab.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(true);
      else if (!stopped && !timer) start();
    });

    // Left/right arrows move between slides when a control has focus.
    hero.addEventListener('keydown', function (e) {
      var el = document.activeElement;
      if (!(controls && controls.contains(el)) && el !== prev && el !== next) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); take(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); take(index + 1); }
    });

    // If the visitor turns reduced-motion on mid-visit, stop immediately.
    if (reduced.addEventListener) {
      reduced.addEventListener('change', function () {
        if (reduced.matches) stop();
      });
    }

    show(0, false);
    start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
