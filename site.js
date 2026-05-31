// ── Microsoft Clarity — privacy-first analytics + session replay.
// Loads sitewide (this file is included on every page). Input values
// are masked by default, so typed data (e.g. emails) is not recorded.
(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "wzmryz7rc6");

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

  window.syncThemeToggle = syncThemeToggle;
  window.buildBriquesBricks = buildBricks;

  document.addEventListener('DOMContentLoaded', function () {
    syncThemeToggle();
    buildBricks();
  });
})();
