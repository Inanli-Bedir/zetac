// Zetac redesign prototype — shared behaviour for the redesigned pages.

(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  // Reveal sections marked [data-reveal] once, when they first scroll into view.
  // Content is only hidden after this runs, so it stays visible without JS.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    // Elements that enter the viewport together (e.g. two Leistungen rows) start
    // 180ms apart (or the parent's data-reveal-stagger), top to bottom. Counted per
    // parent, so unrelated reveals don't wait.
    var STAGGER = 180;
    var lastStart = typeof WeakMap === 'function' ? new WeakMap() : null;
    var onReveal = function (entries, observer) {
      entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })
        .forEach(function (entry) {
          var el = entry.target;
          observer.unobserve(el);
          var now = performance.now();
          var start = now;
          if (lastStart && el.parentElement) {
            var prev = lastStart.get(el.parentElement);
            var attr = el.parentElement.getAttribute('data-reveal-stagger');
            var gap = attr !== null && attr !== '' ? Number(attr) : STAGGER;
            if (prev !== undefined) start = Math.max(now, prev + gap);
            lastStart.set(el.parentElement, start);
          }
          // Wait for images inside (e.g. the app collage) to decode, so the
          // animation isn't swallowed by a decoding pause. Max 800ms.
          // data-reveal-nowait skips this (e.g. two cards that must start together).
          var imgs = el.hasAttribute('data-reveal-nowait') ? [] : Array.prototype.slice.call(el.querySelectorAll('img'));
          var ready = Promise.all(imgs.map(function (img) {
            return img.decode ? img.decode().catch(function () {}) : null;
          }));
          var timeout = new Promise(function (resolve) { setTimeout(resolve, 800); });
          Promise.race([ready, timeout]).then(function () {
            setTimeout(function () {
              requestAnimationFrame(function () { el.classList.add('is-revealed'); });
            }, Math.max(0, start - performance.now()));
          });
        });
    };
    // One observer per threshold. Default 0.15; an element can ask for more of itself
    // to be visible first with data-reveal-threshold (e.g. the Ablauf band opens from
    // its centre, so that centre should be on screen).
    var observers = {};
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      var threshold = Number(el.getAttribute('data-reveal-threshold')) || 0.15;
      if (!observers[threshold]) {
        observers[threshold] = new IntersectionObserver(onReveal, { threshold: threshold, rootMargin: '0px 0px -10% 0px' });
      }
      el.classList.add('reveal-pending');
      observers[threshold].observe(el);
    });
  }

  // Before/after comparison ([data-compare]): drag with mouse or touch, or use the
  // range input (arrow keys, Home/End, PageUp/PageDown, screen readers).
  document.querySelectorAll('[data-compare]').forEach(function (frame) {
    var range = frame.querySelector('.compare-range');
    if (!range) return;
    range.hidden = false;
    frame.classList.add('is-ready');

    var set = function (value) {
      var v = Math.max(0, Math.min(100, value));
      var rounded = Math.round(v);
      frame.style.setProperty('--pos', v.toFixed(2) + '%');
      range.value = String(rounded);
      range.setAttribute('aria-valuetext', rounded + ' % Vorher, ' + (100 - rounded) + ' % Nachher');
      frame.classList.toggle('hide-before', v < 14);
      frame.classList.toggle('hide-after', v > 86);
    };
    var fromPointer = function (e) {
      var box = frame.getBoundingClientRect();
      return ((e.clientX - box.left) / box.width) * 100;
    };

    // One-time demo ([data-compare-demo]): when the slider first comes into view, the
    // divider sweeps 50 → 62 → 38 → 50 % (~2.5s) to show that it can be dragged.
    // Any interaction with the slider stops it at once; skipped with reduced motion.
    var demo = null; // { raf, timer }
    var stopDemo = function () {
      if (!demo) return;
      cancelAnimationFrame(demo.raf);
      clearTimeout(demo.timer);
      demo = null;
      frame.classList.remove('is-demo');
    };
    if (frame.hasAttribute('data-compare-demo') && !reduceMotion &&
        'IntersectionObserver' in window && window.requestAnimationFrame) {
      // Keyframes [position %, time ms]; each leg eases in and out (sine).
      var KEYS = [[50, 0], [62, 625], [38, 1875], [50, 2500]];
      var ease = function (t) { return 0.5 - Math.cos(Math.PI * t) / 2; };
      var runDemo = function () {
        var t0 = null;
        frame.classList.add('is-demo');
        var step = function (now) {
          if (!demo) return;
          if (t0 === null) t0 = now;
          var t = now - t0;
          var i = 1;
          while (i < KEYS.length - 1 && t > KEYS[i][1]) i++;
          var a = KEYS[i - 1], b = KEYS[i];
          var p = Math.min(1, Math.max(0, (t - a[1]) / (b[1] - a[1])));
          set(a[0] + (b[0] - a[0]) * ease(p));
          if (t < KEYS[KEYS.length - 1][1]) demo.raf = requestAnimationFrame(step);
          else { set(50); stopDemo(); }
        };
        demo.raf = requestAnimationFrame(step);
      };
      var demoObserver = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        demoObserver.disconnect();
        if (frame.getAttribute('data-touched')) return;
        // Short pause so the visitor sees the frame settle before it moves.
        demo = { raf: 0, timer: setTimeout(runDemo, 400) };
      }, { threshold: 0.6 });
      demoObserver.observe(frame);
    }
    var interacted = function () {
      frame.setAttribute('data-touched', '1');
      stopDemo();
    };

    range.addEventListener('input', function () { interacted(); set(Number(range.value)); });
    range.addEventListener('keydown', interacted);

    // Mouse: jump on press, then drag. Touch/pen: only start dragging once the
    // movement is clearly horizontal, so vertical swipes just scroll the page.
    var drag = null; // { id, x0, y0, mode: 'pending' | 'drag' }
    frame.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, mode: e.pointerType === 'mouse' ? 'drag' : 'pending' };
      if (drag.mode === 'drag') {
        interacted();
        e.preventDefault();
        frame.setPointerCapture(e.pointerId);
        set(fromPointer(e));
      }
    });
    frame.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.mode === 'pending') {
        var dx = Math.abs(e.clientX - drag.x0), dy = Math.abs(e.clientY - drag.y0);
        if (dy > 6 && dy >= dx) { drag = null; return; }       // vertical: let the page scroll
        if (dx <= 6) return;                                      // not decided yet
        drag.mode = 'drag';
        interacted();
        frame.setPointerCapture(e.pointerId);
      }
      set(fromPointer(e));
    });
    frame.addEventListener('pointerup', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      // A short tap (no real movement) also moves the divider.
      if (drag.mode === 'pending' && Math.abs(e.clientX - drag.x0) <= 6 && Math.abs(e.clientY - drag.y0) <= 6) {
        interacted();
        set(fromPointer(e));
      }
      drag = null;
    });
    // The browser took over (page scroll): stop.
    frame.addEventListener('pointercancel', function () { drag = null; });

    set(Number(range.value));
  });

  // Hero background video ([.cover-video]): only loaded when motion is allowed and
  // the visitor hasn't asked to save data. If the files are missing, playback fails
  // or autoplay is blocked, the video is removed and the still image stays.
  var cover = document.querySelector('.cover');
  var heroVideo = cover && cover.querySelector('.cover-video');
  if (heroVideo) {
    var conn = navigator.connection;
    var saveData = conn && conn.saveData;
    if (reduceMotion || saveData || typeof heroVideo.play !== 'function') {
      heroVideo.remove();
    } else {
      var failed = false;
      var fail = function () {
        if (failed) return;
        failed = true;
        cover.classList.remove('video-pending', 'has-video');
        heroVideo.remove();
      };
      var sources = heroVideo.querySelectorAll('source[data-src]');
      sources.forEach(function (source) { source.src = source.getAttribute('data-src'); });
      if (sources.length) sources[sources.length - 1].addEventListener('error', fail); // all sources failed
      heroVideo.addEventListener('error', fail);
      heroVideo.addEventListener('playing', function () {
        cover.classList.add('has-video');
        cover.classList.remove('video-pending');
      });
      heroVideo.muted = true;          // required for autoplay
      cover.classList.add('video-pending');
      heroVideo.preload = 'auto';
      heroVideo.load();
      var attempt = heroVideo.play();
      if (attempt && attempt.catch) attempt.catch(function (err) {
        // AbortError just means load() restarted; anything else: no playback.
        if (!err || err.name !== 'AbortError') fail();
      });
      // Pause while the hero is off screen (saves battery), resume when it's back.
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          if (failed) return;
          if (entries[0].isIntersecting) {
            var p = heroVideo.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            heroVideo.pause();
          }
        }).observe(cover);
      }
    }
  }

  // Contact form ([data-contact-form], contact.html): validated here with German
  // messages, then sent as JSON to the form's action (same-origin endpoint that mails
  // info@zetac.de). Errors are shown under each field; the status line announces
  // sending / success / failure. A filled-in spam trap is silently "accepted".
  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    var statusEl = form.querySelector('.kt-status');
    var button = form.querySelector('[type="submit"]');
    var label = button && button.querySelector('.kt-submit-label');
    var buttonText = label ? label.textContent : '';
    var tried = false;
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var PHONE_CHARS = /^[0-9+()\/\-.\s]+$/;

    var rules = {
      name: function (v) {
        if (!v) return 'Bitte geben Sie Ihren Namen ein.';
        if (v.length < 2) return 'Bitte geben Sie Ihren vollständigen Namen ein.';
      },
      email: function (v) {
        if (!v) return 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
        if (!EMAIL.test(v)) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@firma.de.';
      },
      phone: function (v) {
        if (!v) return 'Bitte geben Sie Ihre Telefonnummer ein.';
        var digits = v.replace(/\D/g, '').length;
        if (!PHONE_CHARS.test(v) || digits < 6 || digits > 20) {
          return 'Bitte geben Sie eine gültige Telefonnummer ein (Ziffern, Leerzeichen sowie + - / und Klammern).';
        }
      },
      message: function (v) {
        if (v.length > 5000) return 'Ihre Nachricht ist zu lang (höchstens 5.000 Zeichen).';
      }
    };

    var check = function (name) {
      var field = form.elements[name];
      if (!field) return true;
      var msg = rules[name](field.value.trim());
      var err = document.getElementById(field.id + '-error');
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) { err.textContent = msg || ''; err.hidden = !msg; }
      return !msg;
    };
    var setStatus = function (kind, html) {
      if (!statusEl) return;
      statusEl.className = 'kt-status' + (kind ? ' is-' + kind : '');
      statusEl.innerHTML = html || '';
      statusEl.hidden = !html;
    };
    var busy = function (on) {
      if (!button) return;
      button.disabled = on;
      if (label) label.textContent = on ? 'Wird gesendet …' : buttonText;
    };

    // After the first attempt, fields are re-checked as the visitor fixes them.
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener('blur', function () { if (tried) check(name); });
      field.addEventListener('input', function () {
        if (tried && field.getAttribute('aria-invalid') === 'true') check(name);
      });
    });

    var MAIL_FALLBACK = ' oder schreiben Sie uns direkt an <a href="mailto:info@zetac.de">info@zetac.de</a>.';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (button && button.disabled) return;
      tried = true;
      var invalid = Object.keys(rules).filter(function (name) { return !check(name); });
      if (invalid.length) {
        setStatus('error', invalid.length === 1
          ? 'Bitte prüfen Sie das markierte Feld.'
          : 'Bitte prüfen Sie die ' + invalid.length + ' markierten Felder.');
        form.elements[invalid[0]].focus();
        return;
      }
      var data = {
        name: form.elements.name.value.trim(),
        company: form.elements.company ? form.elements.company.value.trim() : '',
        email: form.elements.email.value.trim(),
        phone: form.elements.phone.value.trim(),
        message: form.elements.message ? form.elements.message.value.trim() : ''
      };
      var done = function () {
        busy(false);
        form.reset();
        tried = false;
        Object.keys(rules).forEach(function (name) {
          var f = form.elements[name];
          if (f) f.removeAttribute('aria-invalid');
        });
        setStatus('success', '<strong>Vielen Dank für Ihre Anfrage!</strong> Sie ist bei uns eingegangen. Wir melden uns so bald wie möglich persönlich bei Ihnen.');
      };
      // Spam trap filled in: behave as if sent, send nothing.
      if (form.elements.website && form.elements.website.value) { done(); return; }

      busy(true);
      setStatus('pending', 'Ihre Anfrage wird gesendet …');
      var controller = 'AbortController' in window ? new AbortController() : null;
      var timer = setTimeout(function () { if (controller) controller.abort(); }, 15000);
      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
        signal: controller ? controller.signal : undefined
      }).then(function (res) {
        clearTimeout(timer);
        if (res.ok) { done(); return; }
        busy(false);
        if (res.status === 429) {
          setStatus('error', 'Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte versuchen Sie es in einigen Minuten erneut' + MAIL_FALLBACK);
        } else if (res.status === 400 || res.status === 422) {
          setStatus('error', 'Einige Angaben konnten nicht verarbeitet werden. Bitte prüfen Sie Ihre Eingaben' + MAIL_FALLBACK);
        } else {
          setStatus('error', 'Ihre Anfrage konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut' + MAIL_FALLBACK);
        }
      }).catch(function () {
        clearTimeout(timer);
        busy(false);
        setStatus('error', 'Ihre Anfrage konnte nicht gesendet werden – bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut' + MAIL_FALLBACK);
      });
    });
  });

  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
