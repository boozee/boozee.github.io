(function () {
  const KEY = 'theme';
  function setCookie(name, value) {
    // 1 year, path=/ so it applies to all pages, SameSite=Lax for safety
    document.cookie = name + '=' + encodeURIComponent(value) +
      '; Max-Age=' + (60 * 60 * 24 * 365) + '; Path=/; SameSite=Lax';
  }
  function setTheme(next) {
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    setCookie(KEY, next);
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    const curr = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(curr === 'light' ? 'dark' : 'light');
  }, false);
})();
