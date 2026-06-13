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
      '<p class="cookie-banner__body">We use Microsoft Clarity to understand how the site is used, with heatmaps and session recordings (your typing stays masked). It only runs if you accept. See our <a href="/privacy.html">privacy policy</a>.</p>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="btn btn--ghost" data-cookie="decline">Decline</button>' +
      '<button type="button" class="btn" data-cookie="accept">Accept</button>' +
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
