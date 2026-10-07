# Portfolio

Static site: HTML, CSS, JS. No build step, no backend. All paths are relative, so it works on GitHub Pages.

## Deploy
1. Put this folder's contents at the root of a GitHub repo.
2. Settings > Pages > deploy from branch main, folder / (root).

## Fill in the placeholders
Amber dashed links in index.html are placeholders (search for data-placeholder).
For each one: set the real href, then delete the data-placeholder attribute.

- Resume: add assets/resume.pdf
- Email, GitHub, LinkedIn: Contact section
- Project GitHub / live demo links and "My part" lines: Projects section
- Organization names and dates: Experience section
- Optional: add a profile photo to assets/ and an <img> in the hero

Colors and font live at the top of css/style.css.
