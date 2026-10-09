(() => {
  const button = document.querySelector('.theme-toggle');
  if (!button) return;
  const root = document.documentElement;
  const applyTheme = (theme) => {
    const light = theme === 'light';
    if (light) root.dataset.theme = 'light';
    else delete root.dataset.theme;
    button.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    button.setAttribute('title', light ? 'Switch to dark mode' : 'Switch to light mode');
    button.setAttribute('aria-pressed', String(light));
    button.querySelector('.theme-icon').textContent = light ? '☾' : '☀';
  };
  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  button.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('portfolio-theme', next); } catch (_) {}
  });
})();
