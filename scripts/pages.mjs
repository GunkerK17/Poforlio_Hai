import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs';
const base = '/Poforlio_Hai/';
// Adapt absolute public asset and navigation URLs for GitHub project Pages.
for (const name of readdirSync('dist/assets')) {
  if (!/\.(js|css)$/.test(name)) continue;
  const file = `dist/assets/${name}`;
  let text = readFileSync(file, 'utf8').replaceAll('/images/', `${base}images/`);
  text = text.replaceAll('href:"/wifi"', `href:"${base}wifi/"`).replaceAll('href:"/#products"', `href:"${base}#products"`).replaceAll('href:"/"', `href:"${base}"`);
  text = text.replace(/href:(["'`])\/(wifi\/?|#products)?\1/g, (_, quote, route = '') => `href:${quote}${base}${route.startsWith('wifi') ? 'wifi/' : route}${quote}`);
  text = text.replaceAll(base + base.slice(1), base);
  writeFileSync(file, text);
}
mkdirSync('dist/wifi', { recursive: true });
const wifiHtml = readFileSync('dist/index.html', 'utf8')
 .replaceAll('brand/gun', 'brand/hai-wifi')
 .replaceAll('gun.webmanifest', 'hai-wifi.webmanifest')
 .replace('content="GUN"', 'content="Hải Wi-Fi"')
 .replace('<title>Nguyễn Chí Hải (GUN) — Portfolio</title>', '<title>Hải Wi-Fi · Internet FPT Cần Thơ</title>');
writeFileSync('dist/wifi/index.html', wifiHtml);
copyFileSync('dist/brand/hai-wifi-ios-v2-180.png', 'dist/wifi/apple-touch-icon.png');
writeFileSync('dist/.nojekyll', '');

// A fresh entry URL avoids reusing an old Safari Web Clip page identity.
mkdirSync('dist/gun', { recursive: true });
const gunHtml = readFileSync('dist/index.html', 'utf8')
 .replace('<title>Nguyễn Chí Hải (GUN) — Portfolio</title>', '<title>GUN · Hồ sơ Nguyễn Chí Hải</title>');
writeFileSync('dist/gun/index.html', gunHtml);
copyFileSync('dist/brand/gun-apple-touch-icon.png', 'dist/gun/apple-touch-icon.png');
