// Builds a single-file web preview (dist-preview/index.html): `expo export -p web`, then inlines the JS bundle,
// the fonts the app loads and small images as data URIs, so the prototype opens from one HTML file.
// Run: npm run preview
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
execSync('npx expo export -p web', { cwd: root, stdio: 'inherit' });

const dist = join(root, 'dist');
const jsDir = join(dist, '_expo/static/js/web');
let js = readdirSync(jsDir).filter((f) => f.endsWith('.js')).map((f) => readFileSync(join(jsDir, f), 'utf8')).join('\n');

const used = /(Geologica_(500Medium|600SemiBold|700Bold)|GolosText_(400Regular|500Medium|600SemiBold|700Bold))\./;
const mime = { ttf: 'font/ttf', png: 'image/png' };
js = js.replace(/"\/assets\/([^"]+?\.(ttf|png))"/g, (m, path, ext) => {
  if (ext === 'ttf' && !used.test(path)) return m;
  const file = join(dist, 'assets', path);
  try {
    return `"data:${mime[ext]};base64,${readFileSync(file).toString('base64')}"`;
  } catch {
    return m;
  }
});
// A literal "</script" inside the bundle would end the inline <script> early.
js = js.replace(/<\/script/gi, '<\\/script');

const icon = readFileSync(join(root, 'assets/images/favicon.png')).toString('base64');
const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Qalqan App Preview</title>
<link rel="icon" href="data:image/png;base64,${icon}">
<style>
html,body{height:100%;margin:0;background:#EEF1F6}
body{overflow:hidden}
#root{display:flex;height:100%;flex:1}
</style>
</head>
<body>
<div id="root"></div>
<script>try{history.replaceState(null,'','/')}catch(e){}</script>
<script>${js}</script>
</body>
</html>
`;
mkdirSync(join(root, 'dist-preview'), { recursive: true });
writeFileSync(join(root, 'dist-preview/index.html'), html);
console.log(`dist-preview/index.html: ${(html.length / 1024 / 1024).toFixed(1)} MB`);
