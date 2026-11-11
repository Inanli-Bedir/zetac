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
    // 180ms apart, top to bottom. Counted per parent, so unrelated reveals don't wait.
    var STAGGER = 180;
    var lastStart = typeof WeakMap === 'function' ? new WeakMap() : null;
    var observer = new IntersectionObserver(function (entries) {
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
            if (prev !== undefined) start = Math.max(now, prev + STAGGER);
            lastStart.set(el.parentElement, start);
          }
          // Wait for images inside (e.g. the app collage) to decode, so the
          // animation isn't swallowed by a decoding pause. Max 800ms.
          var imgs = Array.prototype.slice.call(el.querySelectorAll('img'));
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
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('reveal-pending');
      observer.observe(el);
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

    range.addEventListener('input', function () { set(Number(range.value)); });

    // Mouse: jump on press, then drag. Touch/pen: only start dragging once the
    // movement is clearly horizontal, so vertical swipes just scroll the page.
    var drag = null; // { id, x0, y0, mode: 'pending' | 'drag' }
    frame.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, mode: e.pointerType === 'mouse' ? 'drag' : 'pending' };
      if (drag.mode === 'drag') {
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
        frame.setPointerCapture(e.pointerId);
      }
      set(fromPointer(e));
    });
    frame.addEventListener('pointerup', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      // A short tap (no real movement) also moves the divider.
      if (drag.mode === 'pending' && Math.abs(e.clientX - drag.x0) <= 6 && Math.abs(e.clientY - drag.y0) <= 6) set(fromPointer(e));
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

  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
