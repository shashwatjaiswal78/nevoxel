/**
 * Infinite logo cloud — a dependency-free port of the 21st.dev LogoCloud +
 * InfiniteSlider (framer-motion) components.
 *
 * Markup comes from logoCloud() in src/components.js: a track holding the logo
 * set twice. The track moves by exactly one set width and wraps, so the loop is
 * seamless.
 *
 * Why requestAnimationFrame and not a CSS keyframe: the component slows down on
 * hover (speed 80 → 25 px/s). Changing a CSS animation's duration mid-flight
 * makes the row jump, because the browser recomputes progress against the new
 * duration. Integrating position from a velocity keeps the slowdown smooth —
 * the same thing framer-motion's re-timed `animate` call does.
 *
 * Progressive enhancement: until `is-running` is added the clone set is hidden
 * and the logos sit as a static centred row. Reduced motion never gets it.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function init(cloud) {
    var track = cloud.querySelector('[data-logo-track]');
    var firstSet = track && track.firstElementChild;
    if (!firstSet) return;

    var speed = parseFloat(cloud.getAttribute('data-speed')) || 80;
    var speedHover = parseFloat(cloud.getAttribute('data-speed-hover')) || speed;
    var reverse = cloud.hasAttribute('data-reverse');

    var setWidth = 0;
    var offset = 0; // 0 … setWidth
    var velocity = speed;
    var target = speed;
    var last = 0;
    var frame = 0;
    var visible = false;

    function measure() {
      // Includes the set's trailing padding, which equals the gap between sets.
      setWidth = firstSet.getBoundingClientRect().width;
    }

    function paint() {
      var x = reverse ? offset - setWidth : -offset;
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
    }

    function tick(now) {
      frame = 0;
      if (!visible || reduced.matches) return;

      // Cap dt so a backgrounded tab does not leap forward when it returns.
      var dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      // Ease velocity toward its target (~150ms time constant).
      velocity += (target - velocity) * (1 - Math.exp(-dt * 6.5));

      if (setWidth > 0) {
        offset = (offset + velocity * dt) % setWidth;
        paint();
      }
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (frame || reduced.matches) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }

    function enable() {
      if (reduced.matches) return;
      cloud.classList.add('is-running');
      measure();
      paint();
      if (visible) start();
    }

    function disable() {
      stop();
      cloud.classList.remove('is-running');
      track.style.transform = '';
    }

    cloud.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'mouse') target = speedHover;
    });
    cloud.addEventListener('pointerleave', function () {
      target = speed;
    });

    // Logo widths are reserved by width/height attributes, but fonts and the
    // viewport can still change the set width — re-measure rather than guess.
    if ('ResizeObserver' in window) {
      new ResizeObserver(function () {
        var before = setWidth;
        measure();
        if (before && setWidth) offset = (offset / before) * setWidth;
      }).observe(firstSet);
    }

    // Only animate while on screen.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start();
        else stop();
      }).observe(cloud);
    } else {
      visible = true;
    }

    var onMotionChange = function () {
      if (reduced.matches) disable();
      else enable();
    };
    if (reduced.addEventListener) reduced.addEventListener('change', onMotionChange);
    else if (reduced.addListener) reduced.addListener(onMotionChange);

    enable();
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-logo-cloud]'), init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
