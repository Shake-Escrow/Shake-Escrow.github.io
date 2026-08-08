import fs from 'fs-extra';
import path from 'path';
import puppeteer from 'puppeteer';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3456;
const DIST_DIR = path.resolve(__dirname, '../dist');

// The routes we want to statically generate for SEO
const ROUTES = [
  '/e-commerce',
  '/how-it-works',
  '/get-paid',
  '/send-payments',
  '/faq',
  '/privacy-policy',
  '/terms-of-service',
  '/end-user-license-agreement',
  '/delete-account',
  '/provision',
  '/api-docs'
];

async function prerender() {
  // 1. Start a local server to serve the dist folder
  const app = express();
  
  // Important: We need a fallback for SPA routing so Puppeteer doesn't get a 404
  // when navigating to routes initially
  app.use(express.static(DIST_DIR));
  app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);

    try {
      // 2. Launch Puppeteer
      const executablePath = process.env.GITHUB_ACTIONS
        ? '/usr/bin/google-chrome' // Ubuntu path for GitHub Actions
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // Mac local path

      const browser = await puppeteer.launch({
        executablePath,
        headless: 'new', // Use new headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();

      // Enable JavaScript and wait for network to be idle to ensure React renders
      for (const route of ROUTES) {
        console.log(`Prerendering ${route}...`);
        
        // Navigate to the route
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: 'networkidle2', // Wait until no more than 2 network connections for at least 500 ms.
          timeout: 10000 // Reduced timeout to prevent hangs
        }).catch(e => console.log('Navigation timeout hit, proceeding with extraction...'));

        // Wait an extra second to ensure React hydration and any internal animations finish
        await new Promise(r => setTimeout(r, 2000));

        // 3. Extract the fully rendered HTML
        const html = await page.content();

        // 4. Save it to route directory (e.g. dist/terms-of-service/index.html)
        const routeName = route.substring(1);
        const routeFolder = path.join(DIST_DIR, routeName);
        await fs.ensureDir(routeFolder);
        
        const outputIndexPath = path.join(routeFolder, 'index.html');
        await fs.writeFile(outputIndexPath, html);
        
        // Also save flat file fallback (e.g. dist/terms-of-service.html) for GitHub Pages compatibility
        const outputFlatPath = path.join(DIST_DIR, `${routeName}.html`);
        await fs.writeFile(outputFlatPath, html);
        
        console.log(`✅ Generated ${routeFolder}/index.html and ${routeName}.html`);
      }

      await browser.close();
      console.log('All routes prerendered successfully!');
    } catch (error) {
      console.error('Error during prerendering:', error);
      process.exitCode = 1;
    } finally {
      // 5. Shut down the server
      server.close();
    }
  });
}

prerender();
