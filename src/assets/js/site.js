/**
 * Site behaviour: navigation, routed forms, testimonials, cookie consent.
 * No dependencies. Every interactive control is keyboard-operable.
 */
(function () {
  'use strict';

  var ROUTING = {
    candidate: 'resume@nevoxel.com',
    employer: 'recruitment@nevoxel.com',
  };

  /* =================================================================== NAV */

  function initNav() {
    var masthead = document.querySelector('[data-masthead]');
    var triggers = document.querySelectorAll('.nav__trigger');
    var openTrigger = null;

    function closeMenu() {
      if (!openTrigger) return;
      var panel = document.getElementById(openTrigger.getAttribute('aria-controls'));
      openTrigger.setAttribute('aria-expanded', 'false');
      if (panel) panel.hidden = true;
      openTrigger = null;
    }

    function openMenu(trigger) {
      closeMenu();
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', 'true');
      if (panel) panel.hidden = false;
      openTrigger = trigger;
    }

    Array.prototype.forEach.call(triggers, function (trigger) {
      var item = trigger.closest('.nav__item');
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));

      trigger.addEventListener('click', function () {
        if (trigger.getAttribute('aria-expanded') === 'true') closeMenu();
        else openMenu(trigger);
      });

      // Pointer users get hover; the click handler above keeps it usable
      // for keyboard and touch.
      item.addEventListener('mouseenter', function () {
        if (window.matchMedia('(hover: hover)').matches) openMenu(trigger);
      });

      item.addEventListener('mouseleave', function () {
        if (window.matchMedia('(hover: hover)').matches) closeMenu();
      });

      // Close once focus leaves the whole item.
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) closeMenu();
      });

      if (panel) {
        panel.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') {
            closeMenu();
            trigger.focus();
          }
        });
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openTrigger) {
        var t = openTrigger;
        closeMenu();
        t.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (openTrigger && !e.target.closest('.nav__item--has-menu')) closeMenu();
    });

    /* ---- mobile ---- */
    var burger = document.querySelector('.burger');
    var mobileNav = document.getElementById('mobile-nav');

    if (burger && mobileNav) {
      burger.addEventListener('click', function () {
        var open = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!open));
        burger.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
        mobileNav.hidden = open;
      });

      mobileNav.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          burger.setAttribute('aria-expanded', 'false');
          mobileNav.hidden = true;
        }
      });
    }

    /* ---- condense on scroll ---- */
    if (masthead) {
      var onScroll = function () {
        masthead.classList.toggle('is-condensed', window.scrollY > 12);
      };

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }
  }

  /* ========================================================= ROUTED FORMS */

  /**
   * One form, two destinations — this is what replaces the seven scattered
   * addresses the audit found. The segment choice decides the address,
   * swaps the conditional fields, and re-labels the message box.
   */
  function initRoutedForms() {
    var forms = document.querySelectorAll('[data-routed-form]');

    Array.prototype.forEach.call(forms, function (form) {
      var radios = form.querySelectorAll('input[name="segment"]');
      var address = form.querySelector('[data-routing-address]');
      var labels = form.querySelectorAll('[data-label-for]');

      function applySegment(segment) {
        // Conditional fields.
        Array.prototype.forEach.call(form.querySelectorAll('[data-when]'), function (field) {
          var match = field.getAttribute('data-when') === segment;
          field.hidden = !match;
          var input = field.querySelector('input, textarea, select');
          if (input) input.disabled = !match;
        });

        // Message label.
        Array.prototype.forEach.call(labels, function (label) {
          label.hidden = label.getAttribute('data-label-for') !== segment;
        });

        if (address) address.textContent = ROUTING[segment] || ROUTING.candidate;
        form.setAttribute('data-segment', segment);
      }

      Array.prototype.forEach.call(radios, function (radio) {
        radio.addEventListener('change', function () {
          if (radio.checked) applySegment(radio.value);
        });
      });

      // Deep link: /contact?for=employer preselects the employer path, which
      // is what the "Hire talent" button in the header uses.
      var wanted = new URLSearchParams(window.location.search).get('for');
      if (wanted && ROUTING[wanted]) {
        var target = form.querySelector('input[name="segment"][value="' + wanted + '"]');
        if (target) target.checked = true;
      }

      var checked = form.querySelector('input[name="segment"]:checked');
      applySegment(checked ? checked.value : 'candidate');

      form.addEventListener('submit', handleSubmit);
    });
  }

  /* ------------------------------------------------------------ validation */

  function fieldError(input, message) {
    input.setAttribute('aria-invalid', 'true');
    var wrap = input.closest('.field') || input.parentElement;
    var msg = wrap.querySelector('.field__error');
    if (!msg) {
      msg = document.createElement('span');
      msg.className = 'field__error';
      wrap.appendChild(msg);
    }
    msg.textContent = message;
  }

  function clearError(input) {
    input.removeAttribute('aria-invalid');
    var wrap = input.closest('.field') || input.parentElement;
    var msg = wrap.querySelector('.field__error');
    if (msg) msg.remove();
  }

  function validate(form) {
    var ok = true;
    var first = null;
    var fields = form.querySelectorAll('input, textarea, select');

    Array.prototype.forEach.call(fields, function (input) {
      if (input.disabled || input.type === 'radio') return;
      clearError(input);

      if (input.required && !input.value.trim() && input.type !== 'checkbox') {
        fieldError(input, 'Required');
        ok = false;
        first = first || input;
        return;
      }

      if (input.type === 'checkbox' && input.required && !input.checked) {
        fieldError(input, 'Please tick to continue');
        ok = false;
        first = first || input;
        return;
      }

      if (input.type === 'email' && input.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)) {
        fieldError(input, 'Check this email address');
        ok = false;
        first = first || input;
      }
    });

    if (first) first.focus();
    return ok;
  }

  /**
   * Submission handler.
   *
   * NO BACKEND IS WIRED UP. This validates, then reports what *would* happen.
   * Point `endpoint` at a real handler (Formspree, Netlify Forms, or your own
   * route) before launch — see README.
   */
  function handleSubmit(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var status = form.querySelector('[data-status]');

    if (!validate(form)) {
      if (status) {
        status.textContent = 'Check the highlighted fields.';
        status.className = 'form__status is-error';
      }
      return;
    }

    var segment = form.getAttribute('data-segment') || 'candidate';
    var to = ROUTING[segment];

    if (status) {
      status.textContent =
        'Validated. Connect a form endpoint to deliver this to ' + to + '.';
      status.className = 'form__status is-ok';
    }
  }

  /* --------------------------------------------------------- newsletter */

  function initNewsletter() {
    var forms = document.querySelectorAll('[data-newsletter]');
    Array.prototype.forEach.call(forms, function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var status = form.querySelector('[data-status]');
        var email = form.querySelector('input[type="email"]');

        if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
          fieldError(email, 'Check this email address');
          if (status) {
            status.textContent = 'Enter a valid email address.';
            status.className = 'form__status is-error';
          }
          email.focus();
          return;
        }

        clearError(email);
        if (status) {
          status.textContent = 'Validated. Connect a list provider to subscribe.';
          status.className = 'form__status is-ok';
        }
      });
    });
  }

  /* ======================================================== TESTIMONIALS */

  function initQuotes() {
    var root = document.querySelector('[data-quotes]');
    if (!root) return;

    var slides = root.querySelectorAll('.quotes__slide');
    var dotsWrap = root.querySelector('[data-quotes-dots]');
    var prev = root.querySelector('[data-quotes-prev]');
    var next = root.querySelector('[data-quotes-next]');
    var index = 0;

    if (slides.length < 2) {
      if (slides[0]) slides[0].classList.add('is-active');
      var controls = root.querySelector('.quotes__controls');
      if (controls) controls.hidden = true;
      return;
    }

    var dots = [];
    Array.prototype.forEach.call(slides, function (_slide, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'quotes__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
      dot.addEventListener('click', function () {
        show(i);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function show(i) {
      index = (i + slides.length) % slides.length;
      Array.prototype.forEach.call(slides, function (slide, n) {
        slide.classList.toggle('is-active', n === index);
        slide.setAttribute('aria-hidden', String(n !== index));
      });
      dots.forEach(function (dot, n) {
        dot.setAttribute('aria-selected', String(n === index));
      });
    }

    prev.addEventListener('click', function () {
      show(index - 1);
    });
    next.addEventListener('click', function () {
      show(index + 1);
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });

    show(0);
  }

  /* ======================================================= COOKIE CONSENT */

  function initCookies() {
    var KEY = 'nevoxel-consent';
    if (localStorage.getItem(KEY)) return;

    var bar = document.createElement('div');
    bar.className = 'cookie';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie choices');
    bar.innerHTML =
      '<p class="cookie__text">We use essential cookies to run this site. ' +
      'Analytics cookies are optional and off until you accept. ' +
      '<a href="/privacy">Privacy notice</a>.</p>' +
      '<div class="cookie__actions">' +
      '<button class="btn btn--ghost btn--sm" type="button" data-consent="essential">Essential only</button>' +
      '<button class="btn btn--solid btn--sm" type="button" data-consent="all">Accept analytics</button>' +
      '</div>';

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (!btn) return;
      localStorage.setItem(KEY, btn.getAttribute('data-consent'));
      bar.remove();
    });

    document.body.appendChild(bar);
  }

  /* ================================================================ INIT */

  function init() {
    initNav();
    initRoutedForms();
    initNewsletter();
    initQuotes();
    initCookies();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
