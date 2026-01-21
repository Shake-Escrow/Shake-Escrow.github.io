# Shake Defi: Cryptocurrency Escrow Management

Shake Defi WEBSITE is a React-based single-page application (SPA) for content on Shake Defi app. Built with Vite, React Router, Tailwind CSS, and TypeScript, it provides pages for home, how-it-works, get-paid, send-payments, FAQ, and privacy policy.

Live site: [https://shakedefi.com](https://shakedefi.com)

## Features
- Client-side routing with React Router v6.
- Responsive design with Tailwind CSS.
- Static privacy policy generation from JSON for app store compliance.
- Deployed as a GitHub User Pages site with custom domain support.

## Prerequisites
- Node.js (v18+ recommended) and npm/yarn.
- GitHub account with a repository named `<username>.github.io` (e.g., `Shake-Escrow.github.io` for user pages).
- For custom domain: DNS provider (e.g., Cloudflare) to set CNAME record.

## Local Setup
1. Clone the repo:
   ```
   git clone https://github.com/Shake-Escrow/Shake-Escrow.github.io.git
   cd Shake-Escrow.github.io
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```
   - Opens at `http://localhost:5173`
   - Test routes: Navigate to `/how-it-works`, `/privacy-policy`, etc.

4. Lint and type-check (optional):
   ```
   npm run lint
   ```

## Building for Production
The app uses Vite for fast builds. A custom script generates a static `privacy-policy.html` from `src/content/privacy.json` to ensure bot-friendly access (e.g., for app stores).

1. Update content if needed (e.g., `privacy.json` for policy changes).

2. Build the app:
   ```
   npm run build:full
   ```
   - This runs:
     - `vite build`: Generates `dist/` with bundled JS/CSS/HTML.
     - `generate-privacy`: Creates/updates `public/privacy-policy.html` from JSON.
   - Output: `dist/` folder with `index.html`, `assets/`, and `privacy-policy.html`.

3. Preview locally:
   ```
   npm run preview
   ```
   - Serves `dist/` at `http://localhost:4173`.
   - Test reloads on routes (e.g., `/how-it-works`) to verify SPA fallback.

## Deployment to GitHub Pages
This is a GitHub User Pages setup (URL: `https://github.com/Shake-Escrow/Shake-Escrow.github.io`), deploying to the `main` branch root. For project pages, adjust to a `gh-pages` branch.

### Step 1: Configure GitHub Repo
1. In your repo: Settings > Pages.
   - Source: **Deploy from a branch**.
   - Branch: `main` / `/ (root)`.
   - Save.

### Step 2: Custom Domain (Optional but Recommended)
1. In repo Settings > Pages > Custom domain:
   - Enter `shakedefi.com` (or your domain).
   - Save → GitHub creates a `CNAME` file in root.

2. At your DNS provider:
   - Add CNAME: `shakedefi.com` → `shake-escrow.github.io` (use lowercase).
   - For `www`: Add CNAME `www` → `shakedefi.com`.
   - Enable HTTPS (GitHub provides free cert; may take 1-2 hours).

3. Verify: `dig shakedefi.com` (should resolve to GitHub IPs).

### Step 3: Deploy
1. Build the app:
   ```
   npm run build:full
   ```

2. Copy `dist/` contents to repo root (overwrite existing files):
   - Manual: Copy-paste via file explorer or:
     ```
     rm -rf * && cp -r dist/* . && rm -rf dist/
     ```
   - Automated (add to `package.json` scripts for ease):
     ```json
     "deploy": "npm run build:full && rm -rf * && cp -r dist/* . && git add . && git commit -m 'Deploy update' && git push"
     ```
     Then: `npm run deploy`.

3. Commit and push:
   ```
   git add .
   git commit -m "Deploy vX.Y.Z"
   git push origin main
   ```

4. Wait 1-5 minutes for GitHub Pages to build/deploy.
   - Monitor: Actions tab > Pages workflow (if enabled).

### Step 4: Verify Deployment
- Visit: `https://shakedefi.com` (or `https://shake-escrow.github.io`).
- Test routes: `/how-it-works`, `/privacy-policy`.
- Reload deep links (e.g., F5 on `/faq`) → Should redirect via `404.html` script.
- Bot test: `curl https://shakedefi.com/privacy-policy` → Full HTML output (not empty).
- Custom domain: Check HTTPS and no mixed content errors.

## Key Files for SPA Routing on GitHub Pages
- **`public/404.html`**: Redirects missing paths to `/?/path` (SPA fallback). Set `pathSegmentsToKeep = 0` for user pages/custom domains.
- **`public/index.html`**: Includes reverse SPA script to clean `/?/path` back to `/path`.
- **`src/App.tsx`**: Uses `<BrowserRouter basename="/">` for root-relative paths.
- **`public/privacy-policy.html`**: Static version of policy (generated from JSON).

## Custom Scripts
Add these to `package.json` (already included):
- `"build:full": "npm run build && npm run generate-privacy"` → Full prod build + static gen.
- `"generate-privacy": "npx tsx scripts/generate-privacy-html.ts"` → Creates `public/privacy-policy.html` from `src/content/privacy.json`.

Requires `tsx` (`npm i -D tsx`) for TS script execution.

## Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| **404 on route reload** | Missing `404.html` or wrong `pathSegmentsToKeep`. | Ensure `public/404.html` has `pathSegmentsToKeep = 0`; re-build/deploy. Test with DevTools Network tab (expect 404 → redirect to `/?/path`). |
| **Privacy policy fails app store validation** | Bot sees empty page (no JS execution). | Run `npm run generate-privacy`; verify `dist/privacy-policy.html` exists. Update JSON and rebuild. |
| **Custom domain not resolving** | DNS/CNAME misconfig. | Check `dig CNAME shakedefi.com`; ensure GitHub CNAME file pushed. Wait 1-48h for propagation. |
| **Build fails (JSON import)** | Node version or tsx missing. | Use Node 18+; `npm i -D tsx`. Run `npm run generate-privacy` standalone. |
| **Styles/fonts broken** | Asset paths or Google Fonts. | Ensure `public/index.html` has font preconnects; check Console for 404s on `/assets/`. |
| **Routes show home on reload** | Basename mismatch. | Set `basename = '/'` in `App.tsx` for root deploys. |

- Logs: Check GitHub Actions for build errors.
- Debug: Use `npm run preview` + browser DevTools.

## Contributing
1. Fork/clone.
2. Create branch: `git checkout -b feature/x`.
3. Commit: `git commit -m "Add X"`.
4. Push/PR to `main`.

## License
MIT – See [LICENSE](LICENSE) (add if needed).

---
