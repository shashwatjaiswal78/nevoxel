/**
 * Nevoxel motion layer.
 *
 * Markup declares intent, not implementation:
 *
 *   <div data-motion="rise">                 fade + translate on enter
 *   <div data-motion="fade">                 fade on enter
 *   <div data-motion="stagger">              children animate in sequence
 *   <div data-motion="rise" data-motion-delay="150">
 *
 * This file is the *default driver* and ships with zero dependencies — the
 * animation itself is CSS, and all this does is add `.is-in` at the right
 * moment. Because the contract is the attribute rather than the code, a
 * library can take over the same markup later without touching a single page.
 * See MOTION.md for the Motion (motion.dev) and GSAP swap recipes.
 *
 * window.NevoxelMotion is exposed so a library driver can call
 * `NevoxelMotion.disable()` and claim the elements itself.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var STAGGER_MS = 90;
  var observer = null;
  var disabled = false;

  /** Elements already handled, so re-scans stay cheap and idempotent. */
  var seen = new WeakSet();

  function reveal(el) {
    var delay = parseInt(el.getAttribute('data-motion-delay') || '0', 10);
    if (delay) el.style.setProperty('--motion-delay', delay + 'ms');

    if (el.getAttribute('data-motion') === 'stagger') {
      var step = parseInt(el.getAttribute('data-motion-stagger') || STAGGER_MS, 10);
      Array.prototype.forEach.call(el.children, function (child, i) {
        child.style.transitionDelay = delay + i * step + 'ms';
      });
    }

    el.classList.add('is-in');
  }

  function observe(el) {
    if (seen.has(el)) return;
    seen.add(el);

    if (disabled || reduced.matches || !('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    observer.observe(el);
  }

  function scan(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-motion]');
    Array.prototype.forEach.call(nodes, observe);
  }

  function init() {
    if ('IntersectionObserver' in window && !reduced.matches) {
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            reveal(entry.target);
            observer.unobserve(entry.target);
          });
        },
        // Fire a little before the element reaches the fold so the motion
        // reads as arrival rather than as a delayed pop.
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
      );
    }

    revealHero();
    scan();
    heroSequence();
  }

  /**
   * Hero content is above the fold on every page, so it must never wait on an
   * IntersectionObserver callback — that would put the largest text on the
   * page behind a JS round trip and hurt LCP. Claim it first and reveal it on
   * the next frame with a short stagger.
   */
  function revealHero() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var items = hero.querySelectorAll('[data-motion]');
    Array.prototype.forEach.call(items, function (el, i) {
      seen.add(el);
      if (disabled || reduced.matches) {
        el.classList.add('is-in');
        return;
      }
      el.style.setProperty('--motion-delay', i * 110 + 'ms');
      requestAnimationFrame(function () {
        reveal(el);
      });
    });
  }

  /* ------------------------------------------------- hero page-load sequence */
  /**
   * The one orchestrated moment on the site: the passage plan draws its course
   * from the sea waypoint to the shore waypoint, waypoints landing in order.
   */
  function heroSequence() {
    var passage = document.querySelector('[data-passage]');
    if (!passage) return;

    if (reduced.matches) {
      passage.classList.add('is-ready');
      return;
    }

    var marks = passage.querySelectorAll(
      '.passage__waypoint, .passage__vessel, .passage__label'
    );
    Array.prototype.forEach.call(marks, function (mark, i) {
      mark.style.setProperty('--motion-delay', 320 + i * 150 + 'ms');
    });

    // Wait a frame so the animation starts from a painted state.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        passage.classList.add('is-ready');
      });
    });
  }

  /* ----------------------------------------------------------------- public */

  window.NevoxelMotion = {
    /** Re-scan after injecting markup (job board re-render, etc.). */
    scan: scan,

    /**
     * Hand control to a library driver. Stops the CSS driver from claiming
     * new elements; anything already revealed stays revealed.
     */
    disable: function () {
      disabled = true;
      if (observer) observer.disconnect();
      document.documentElement.setAttribute('data-motion-driver', 'external');
    },

    /** Reveal everything immediately — useful when debugging. */
    revealAll: function () {
      Array.prototype.forEach.call(
        document.querySelectorAll('[data-motion]'),
        function (el) {
          el.classList.add('is-in');
        }
      );
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Honour a mid-session change to the OS reduced-motion setting.
  reduced.addEventListener('change', function () {
    if (reduced.matches) window.NevoxelMotion.revealAll();
  });
})();
