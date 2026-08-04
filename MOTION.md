# Motion

The site ships with a **declarative motion layer**. Markup states *intent*; a driver
decides *how*. That separation is the whole point: you can swap in a real animation
library later without editing a single page template.

```html
<div data-motion="rise">              <!-- fade + travel up on enter -->
<div data-motion="fade">              <!-- fade on enter -->
<ul  data-motion="stagger">           <!-- children animate in sequence -->
<div data-motion="rise" data-motion-delay="150">
<ul  data-motion="stagger" data-motion-stagger="120">
```

The default driver is [`src/assets/js/motion.js`](src/assets/js/motion.js) — about 120
lines, zero dependencies. It does one job: add `.is-in` when an element enters the
viewport. The actual animation is CSS, in the `MOTION` section at the bottom of
[`site.css`](src/assets/css/site.css).

## What's already handled

- **Reduced motion.** `prefers-reduced-motion: reduce` disables everything, including a
  mid-session change to the OS setting.
- **No JavaScript.** A `<noscript>` block in `layout.js` resets every hidden element.
  Without it, a no-JS visitor would get a page of invisible content.
- **LCP.** Hero content never waits on the IntersectionObserver — `revealHero()` claims
  it and reveals on the next frame, so the largest text on the page is not gated behind
  a JS round trip.
- **The hero sequence.** The passage plan draws its course from the sea waypoint to the
  shore waypoint, waypoints landing in order. This is the one orchestrated moment on the
  site; everything else is quiet.

## Adding a library

You asked to keep the door open for Framer-Motion-style animation. For a vanilla stack
the right choice is **[Motion](https://motion.dev)** — same author as Framer Motion, same
spring and keyframe API, no React required. GSAP works identically if you prefer it.

The contract is: **call `NevoxelMotion.disable()`, then drive the same attributes.**

```html
<!-- in layout.js, after site.js -->
<script type="module">
  import { animate, inView, stagger } from 'https://cdn.jsdelivr.net/npm/motion@11/+esm';

  // Hand over from the built-in CSS driver.
  window.NevoxelMotion.disable();

  inView('[data-motion="rise"]', (el) => {
    animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, easing: [0.16, 1, 0.3, 1] });
  }, { margin: '0px 0px -12% 0px' });

  inView('[data-motion="stagger"]', (el) => {
    animate(el.children, { opacity: [0, 1], y: [24, 0] },
      { delay: stagger(0.09), duration: 0.7 });
  });
</script>
```

`disable()` disconnects the observer, stops the CSS driver claiming new elements, and
sets `data-motion-driver="external"` on `<html>` so you can branch in CSS if you need to.

Two things to keep if you do this:

1. **Guard reduced motion yourself** — `matchMedia('(prefers-reduced-motion: reduce)')`.
   The CSS guard still applies, but your library calls bypass it.
2. **Keep the `<noscript>` block.** A module script that fails to load leaves the page
   hidden otherwise.

### Adding a new animation type

Add the CSS, then use the attribute. No JS change needed:

```css
[data-motion='slide-left'] { opacity: 0; transform: translateX(-24px);
  transition: opacity 700ms var(--ease-out) var(--motion-delay),
              transform 700ms var(--ease-out) var(--motion-delay); }
[data-motion='slide-left'].is-in { opacity: 1; transform: none; }
```

### After injecting markup

Call `NevoxelMotion.scan()` to pick up new `[data-motion]` elements.

### Debugging

`NevoxelMotion.revealAll()` in the console reveals everything immediately — useful when
you want to screenshot a page without waiting for scroll animations.
