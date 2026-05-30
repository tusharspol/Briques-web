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
