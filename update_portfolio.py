from pathlib import Path

root = Path.cwd()
html_path = root / 'index.html'
css_path = root / 'css' / 'style.css'
js_path = root / 'js' / 'theme.js'
if not html_path.exists() or not css_path.exists():
    raise SystemExit('Run this from your Sudip-Portfolio repository root (where index.html lives).')
html = html_path.read_text(encoding='utf-8')
css = css_path.read_text(encoding='utf-8')

old = '<a class="nav-resume" href="resume.html">Resume ↗</a></div>'
new = '<a class="nav-resume" href="resume.html">Resume ↗</a><button class="theme-toggle" type="button" aria-label="Switch to light mode" aria-pressed="false" title="Switch to light mode"><span class="theme-icon" aria-hidden="true">☀</span></button></div>'
if 'class="theme-toggle"' not in html:
    if old not in html:
        raise SystemExit('Cannot locate the Resume button in index.html. No changes made.')
    html = html.replace(old, new, 1)

if 'src="js/theme.js"' not in html:
    script_tag = '<script src="js/theme.js"></script>'
    if '<script src="js/main.js"></script>' not in html:
        raise SystemExit('Cannot locate main.js script tag. No changes made.')
    html = html.replace('<script src="js/main.js"></script>', script_tag + '\n<script src="js/main.js"></script>', 1)

# This early snippet applies the stored theme before the stylesheet is rendered.
bootstrap = '''<script>
try { if (localStorage.getItem('portfolio-theme') === 'light') document.documentElement.dataset.theme = 'light'; } catch (_) {}
</script>'''
if "localStorage.getItem('portfolio-theme')" not in html:
    html = html.replace('<link rel="stylesheet" href="css/style.css">', bootstrap + '\n<link rel="stylesheet" href="css/style.css">', 1)

marker = '/* === Portfolio theme toggle and skills hover (2026) === */'
addition = r'''
/* === Portfolio theme toggle and skills hover (2026) === */
.nav-cta { align-items: center; }
.theme-toggle {
  display: inline-grid; place-items: center; flex: 0 0 42px;
  width: 42px; height: 42px; padding: 0;
  border: 1px solid var(--line); border-radius: 999px;
  background: rgba(255,255,255,.07); color: var(--text);
  font: 600 21px var(--font); cursor: pointer;
  transition: transform .25s, border-color .25s, background .25s, box-shadow .25s;
}
.theme-toggle:hover { transform: translateY(-2px); border-color: var(--accent); box-shadow: 0 0 18px rgba(216,180,95,.22); }
.theme-toggle:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.theme-icon { line-height: 1; }

/* Treat each Skills category as a project-like card. */
.skills { border: 0; gap: 16px; }
.skills > div {
  min-width: 0; border: 1px solid var(--line) !important;
  border-radius: 9px; background: var(--surface);
  padding: 25px 18px;
  transition: transform .3s ease, border-color .3s ease,
              box-shadow .3s ease, background .3s ease;
}
.skills > div:hover {
  transform: translateY(-8px); border-color: var(--accent2) !important;
  background: var(--surface2);
  box-shadow: 0 22px 50px rgba(0,0,0,.2), 0 0 20px rgba(169,200,227,.12);
}
.skills .tags li { transition: background .2s, border-color .2s, color .2s, transform .2s; }
.skills .tags li:hover {
  background: rgba(216,180,95,.15); border-color: var(--accent);
  color: var(--text); transform: translateY(-2px);
}

/* Light mode: override the hard-coded dark colors used by the original design. */
html[data-theme="light"] {
  color-scheme: light;
  --bg: #f8f5ee;
  --bg2: #eee9df;
  --surface: rgba(255,255,255,.88);
  --surface2: rgba(255,252,244,.98);
  --line: rgba(57,65,76,.20);
  --text: #202838;
  --muted: #536071;
  --accent: #9b6c18;
  --accent2: #386b8b;
  background: var(--bg);
}
html[data-theme="light"] body {
  background: radial-gradient(55% 60% at 75% 28%,rgba(220,189,133,.22),transparent 70%),
              radial-gradient(40% 40% at 8% 90%,rgba(169,200,227,.22),transparent 70%),
              linear-gradient(180deg,#faf8f3,#eeeae2 55%,#f8f5ee);
}
html[data-theme="light"] .nav {
  background: rgba(250,248,243,.85);
  border-bottom: 1px solid var(--line);
}
html[data-theme="light"] .nav nav a,
html[data-theme="light"] .nav-github { color: var(--muted); }
html[data-theme="light"] .nav nav a:hover,
html[data-theme="light"] .nav-github:hover { color: var(--text); }
html[data-theme="light"] .nav-cta a,
html[data-theme="light"] .theme-toggle { background: rgba(255,255,255,.7); color: var(--text); }
html[data-theme="light"] .nav-cta .nav-resume {
  background: #d4ac59; border-color: #d4ac59; color: #1a1608 !important;
}
html[data-theme="light"] .lead,
html[data-theme="light"] .tags li { color: #344254; }
html[data-theme="light"] .strip { color: #596576; }
html[data-theme="light"] .btn,
html[data-theme="light"] .btn.primary { background: rgba(255,255,255,.78); color: var(--text); }
html[data-theme="light"] .btn span { background: #d4ac59; color: #1a1608; }
html[data-theme="light"] .chip { background: rgba(255,255,255,.86); }
html[data-theme="light"] .learn li { background: rgba(255,255,255,.68); }
html[data-theme="light"] .panel:nth-of-type(even) { background: rgba(166,150,124,.07); }
html[data-theme="light"] footer { background: #e7e3db; }
html[data-theme="light"] .skills > div:hover,
html[data-theme="light"] .card:hover { box-shadow: 0 22px 50px rgba(40,52,70,.14), 0 0 18px rgba(56,107,139,.10); }
html[data-theme="light"] .skills .tags li:hover { background: rgba(155,108,24,.12); }
@media (max-width: 900px) {
  .skills { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 560px) {
  .skills { grid-template-columns: 1fr; }
  .theme-toggle { width: 36px; height: 36px; flex-basis: 36px; font-size: 18px; }
  .nav-cta { gap: 6px; }
}
@media (prefers-reduced-motion: reduce) {
  .skills > div, .skills .tags li, .theme-toggle { transition: none; }
}
'''
if marker not in css:
    css += '\n' + addition

js = '''(() => {
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
'''
html_path.write_text(html, encoding='utf-8')
css_path.write_text(css, encoding='utf-8')
js_path.write_text(js, encoding='utf-8')
print('Updated index.html, css/style.css, and created js/theme.js')
