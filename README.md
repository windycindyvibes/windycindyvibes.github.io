# One-page personal portfolio for GitHub Pages

A responsive site with separate `index.html`, `sustainability-project.html`, `style.css`, and `script.js` files. It includes a Sustainability project showcase page, Robotics, a light/dark theme switch, and switchable previews for two robotics portfolio PDFs.

## Before publishing

1. Open `index.html` and `sustainability-project.html` in a text editor and replace any remaining example or placeholder project descriptions.
2. Put BOTH portfolio PDFs in the `docs` folder, with these exact filenames:
   - `docs/robotics-portfolio-2024-25.pdf`
   - `docs/robotics-portfolio-2025-26.pdf`
3. Create a **public** repository named `YOUR-USERNAME.github.io` on GitHub, replacing `YOUR-USERNAME` with your *actual* username.
4. Upload `index.html`, `style.css`, `script.js`, the `docs` folder containing both PDFs, and optionally `README.md` to the repository's root (not inside another folder).
5. On GitHub go to **Settings → Pages → Build and deployment → Source: Deploy from a branch → main / (root) → Save**.
6. Visit `https://YOUR-USERNAME.github.io/` when publishing completes. The first publish can take several minutes.

## Preview locally

Open `index.html` in your browser. For the PDF preview to work most reliably, use a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## PDF options

- On-page preview: click the **2024–25** or **2025–26** tab to display that portfolio in the embedded PDF viewer.
- Full PDF: the **Open PDF** button updates to link to the selected year’s PDF in a new tab.
- Only want a link? Remove the `<div class="pdf-frame">...</div>` block from `index.html`.

GitHub Pages sites (and documents uploaded to them) are public. Only upload material you have permission to share.

## What each file does

- `index.html`: main portfolio content and page structure.
- `sustainability-project.html`: Sustainability project showcase page.
- `style.css`: layout, colors, responsiveness, and both light/dark palettes.
- `script.js`: saved theme preference, portfolio switching, and footer year.


## Sustainability dashboard

The existing homepage card links to `sustainability-project.html`. This page embeds the existing static HTML widget `dashboards/drought_dashboard.html`, so upload the `dashboards` folder as well. The dashboard is not rebuilt or modified. The theme preference applies to the surrounding site; the embedded chart keeps its own styling.
