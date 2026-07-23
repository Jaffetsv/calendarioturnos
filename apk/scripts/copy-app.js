// Copia la app web (index.html de la raiz del repo) al contenedor www/
// que Capacitor empaqueta dentro del APK. Asi el APK y la version web
// de GitHub Pages salen siempre del mismo archivo fuente.
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const src = path.join(repoRoot, 'index.html');
const wwwDir = path.join(__dirname, '..', 'www');
const dest = path.join(wwwDir, 'index.html');

if (!fs.existsSync(src)) {
  console.error('No se encontro index.html en la raiz del repositorio:', src);
  process.exit(1);
}

fs.mkdirSync(wwwDir, { recursive: true });
fs.copyFileSync(src, dest);

const kb = (fs.statSync(dest).size / 1024).toFixed(0);
console.log(`App copiada -> apk/www/index.html (${kb} KB)`);
