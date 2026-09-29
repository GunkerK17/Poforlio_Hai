import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs';
const base = '/Poforlio_Hai/';
// Adapt absolute public asset and navigation URLs for GitHub project Pages.
for (const name of readdirSync('dist/assets')) {
  if (!/\.(js|css)$/.test(name)) continue;
  const file = `dist/assets/${name}`;
  let text = readFileSync(file, 'utf8').replaceAll('/images/', `${base}images/`);
  text = text.replaceAll('href:"/wifi"', `href:"${base}wifi/"`).replaceAll('href:"/#products"', `href:"${base}#products"`).replaceAll('href:"/"', `href:"${base}"`);
  writeFileSync(file, text);
}
mkdirSync('dist/wifi', { recursive: true });
copyFileSync('dist/index.html', 'dist/wifi/index.html');
writeFileSync('dist/.nojekyll', '');
