import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const sourceIndexPath = path.join(rootDir, 'index.source.html');
const rootIndexPath = path.join(rootDir, 'index.html');

async function deploy() {
  console.log('🚀 Starting deployment...');

  // Step 1: Always restore index.html from index.source.html before building
  if (fs.existsSync(sourceIndexPath)) {
    console.log('📄 Restoring index.html from index.source.html...');
    fs.copySync(sourceIndexPath, rootIndexPath);
  } else {
    console.error('❌ Error: index.source.html not found. This is your source file.');
    process.exit(1);
  }

  // Step 2: Verify dist folder exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: dist folder not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Step 3: List of source files to preserve
  const preserve = [
    'src',
    'public',
    'scripts',
    'node_modules',
    '.git',
    '.gitignore',
    'index.source.html',  // Preserve the clean source
    'package.json',
    'package-lock.json',
    'vite.config.ts',
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.node.json',
    'tailwind.config.js',
    'postcss.config.js',
    'eslint.config.js',
    'README.md',
    'MIGRATION.md',
    'LICENSE',
    'CNAME'
  ];

  // Step 4: Delete old build artifacts
  console.log('🗑️  Removing old build artifacts...');
  const rootItems = fs.readdirSync(rootDir);
  for (const item of rootItems) {
    if (!preserve.includes(item) && item !== 'dist') {
      const itemPath = path.join(rootDir, item);
      console.log(`   - ${item}`);
      fs.removeSync(itemPath);
    }
  }

  // Step 5: Copy everything from dist to root (including built index.html)
  console.log('📦 Copying build artifacts to root...');
  const distItems = fs.readdirSync(distDir);
  for (const item of distItems) {
    const srcPath = path.join(distDir, item);
    const destPath = path.join(rootDir, item);
    console.log(`   - ${item}`);
    fs.copySync(srcPath, destPath, { overwrite: true });
  }

  console.log('✅ Deployment complete!');
  console.log('');
  console.log('📂 Your repository now has:');
  console.log('   ✓ index.source.html - Clean source version (never modified)');
  console.log('   ✓ index.html - Built version with hashed assets (for GitHub Pages)');
  console.log('   ✓ assets/ - Hashed JS/CSS files');
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. git add .');
  console.log('   2. git commit -m "Deploy update"');
  console.log('   3. git push origin main');
}

deploy().catch(err => {
  console.error('❌ Deployment failed:', err);
  process.exit(1);
});