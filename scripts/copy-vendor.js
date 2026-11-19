// Copies Leaflet into www/vendor so the map library works without a CDN.
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'node_modules', 'leaflet', 'dist');
const dest = path.join(__dirname, '..', 'www', 'vendor', 'leaflet');

if (!fs.existsSync(src)) {
  console.warn('Leaflet not installed (run npm install). The app will fall back to the CDN copy.');
  process.exit(0);
}
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(src, dest, { recursive: true });
console.log('Leaflet copied to www/vendor/leaflet');
