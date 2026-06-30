// ── Microsoft Clarity, gated behind cookie consent ──────────────
// Clarity (analytics + session replay) is NON-essential, so under
// GDPR / ePrivacy it must not load until the visitor accepts. The
// theme preference in localStorage is functional and exempt, so it
// is unaffected. The choice persists in localStorage and is
// withdrawable via the "Cookie settings" link injected into the
// footer. Input values are masked by Clarity, so typed data is not
// recorded even after consent.
(function () {
  var CONSENT_KEY = 'briques-cookie-consent'; // 'accepted' | 'declined'
  var CLARITY_ID = 'wzmryz7rc6';
  var clarityLoaded = false;

  function readConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function writeConsent(v) {
    try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {}
  }

  function loadClarity() {
    if (clarityLoaded) return;
    clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }

  // Returning visitor who already accepted: start Clarity immediately,
  // no need to wait for the DOM.
  if (readConsent() === 'accepted') loadClarity();

  function dismissBanner(banner) {
    banner.classList.remove('is-visible');
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 320);
  }

  function showBanner() {
    if (document.querySelector('.cookie-banner')) return;
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie choices');
    banner.innerHTML =
      '<p class="cookie-banner__title">A quick note on cookies</p>' +
      '<p class="cookie-banner__body">By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. See our <a href="/privacy.html">privacy policy</a>.</p>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="btn btn--ghost" data-cookie="decline">Decline</button>' +
      '<button type="button" class="btn" data-cookie="accept">Accept All Cookies</button>' +
      '</div>';
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add('is-visible'); });

    banner.querySelector('[data-cookie="accept"]').addEventListener('click', function () {
      writeConsent('accepted');
      loadClarity();
      dismissBanner(banner);
    });
    banner.querySelector('[data-cookie="decline"]').addEventListener('click', function () {
      var wasAccepted = readConsent() === 'accepted';
      writeConsent('declined');
      dismissBanner(banner);
      // If Clarity was already running this session (withdrawal after a
      // prior accept), reload so it stops collecting.
      if (wasAccepted && clarityLoaded) window.location.reload();
    });
  }

  // Footer "Cookie settings" reopener (lets visitors change their mind).
  window.openCookieSettings = showBanner;

  function injectCookieSettingsLink() {
    var cols = document.querySelectorAll('.footer__col');
    for (var i = 0; i < cols.length; i++) {
      var title = cols[i].querySelector('.footer__col-title');
      if (title && /legal/i.test(title.textContent)) {
        if (cols[i].querySelector('[data-cookie-settings]')) return;
        var a = document.createElement('a');
        a.href = '#';
        a.textContent = 'Cookie settings';
        a.setAttribute('data-cookie-settings', '');
        a.addEventListener('click', function (e) { e.preventDefault(); showBanner(); });
        cols[i].appendChild(a);
        return;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectCookieSettingsLink();
    if (!readConsent()) showBanner();
  });
})();

(function () {
  function syncThemeToggle() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    var current = document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark' : 'light';
    btn.setAttribute(
      'aria-label',
      current === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  function buildBricks() {
    // Kept as a public hook for older pages. Bricks are now PNG-backed CSS.
  }

  // Mobile nav disclosure — the link row hides under 720px and the
  // hamburger toggles it as a dropdown sheet. Closes on link tap,
  // Escape, or tapping outside the nav.
  function initMobileMenu() {
    var nav = document.querySelector('.nav');
    var btn = document.querySelector('.nav__menu-btn');
    if (!nav || !btn) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    btn.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav__links a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        btn.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) setOpen(false);
    });
  }

  window.syncThemeToggle = syncThemeToggle;
  window.buildBriquesBricks = buildBricks;

  document.addEventListener('DOMContentLoaded', function () {
    syncThemeToggle();
    buildBricks();
    initMobileMenu();
  });
})();

/* ── design-system motion (reveals · nav-scroll · cursor-spotlight) ── */
(function () {
const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    reveals.forEach(el => {
      const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
      const i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--d', (i * 0.07).toFixed(2) + 's');
      io.observe(el);
    });
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  document.querySelectorAll('.cell').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();


/* ── Examples picker — swap real screenshots in the browser + phone frame ── */
(function () {
  function initExamples() {
    var root = document.querySelector('.showcase .ex');
    if (!root) return;
    var items = root.querySelectorAll('.ex__item');
    var desk = root.querySelector('[data-ex-desk]');
    var mob = root.querySelector('[data-ex-mob]');
    var rig = root.querySelector('.rig');
    if (!items.length || !desk || !mob) return;

    // Preload every screenshot so swaps are instant.
    items.forEach(function (b) {
      ['data-desk', 'data-mob'].forEach(function (a) {
        var src = b.getAttribute(a);
        if (src) { var im = new Image(); im.src = src; }
      });
    });

    function select(btn) {
      if (btn.classList.contains('is-active')) return;
      items.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      if (rig) rig.classList.add('is-swapping');
      var d = btn.getAttribute('data-desk');
      var m = btn.getAttribute('data-mob');
      setTimeout(function () {
        if (d) desk.src = d;
        if (m) mob.src = m;
        if (rig) rig.classList.remove('is-swapping');
      }, 150);
    }

    items.forEach(function (b) {
      b.addEventListener('click', function () { select(b); });
    });
  }
  document.addEventListener('DOMContentLoaded', initExamples);
})();

/* ── "See it however you like" — view-type tabs swap the phone mockup ── */
(function () {
  function initViewTabs() {
    var root = document.querySelector('.cell--showcase');
    if (!root) return;
    var tabs = root.querySelectorAll('.vchip');
    var img = root.querySelector('[data-view-mock]');
    if (!tabs.length || !img) return;

    // Preload the four view mockups so the swap is instant.
    tabs.forEach(function (t) {
      var s = t.getAttribute('data-mock');
      if (s) { var im = new Image(); im.src = s; }
    });

    function select(tab) {
      if (tab.classList.contains('is-active')) return;
      tabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      var src = tab.getAttribute('data-mock');
      img.classList.add('is-swapping');
      setTimeout(function () {
        if (src) img.src = src;
        img.classList.remove('is-swapping');
      }, 150);
    }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () { select(t); });
    });
  }
  document.addEventListener('DOMContentLoaded', initViewTabs);
})();
