import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
const catalog = JSON.parse(await fs.readFile('src/data/catalog.json','utf8'));
const packs = JSON.parse(await fs.readFile('src/data/packs.json','utf8'));
const ids = new Set();
for (const c of catalog) {
  for (const w of c.words) {
    if (ids.has(w.id)) throw new Error(`Duplicate word ID: ${w.id}`);
    ids.add(w.id);
  }
  for (const asset of packs[c.id].assets) {
    const bytes = await fs.readFile(`public${asset.url}`);
    if (createHash('sha256').update(bytes).digest('hex') !== asset.hash) throw new Error(`Stale asset: ${asset.url}. Run npm run content:manifest.`);
  }
}
console.log(`Conteúdo validado: ${catalog.length} categorias, ${ids.size} palavras.`);
