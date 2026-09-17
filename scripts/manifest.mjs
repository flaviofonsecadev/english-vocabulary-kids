import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
const catalog = JSON.parse(await fs.readFile('src/data/catalog.json','utf8'));
await fs.mkdir('public/packs', { recursive:true });
const manifests = {};
for (const category of catalog) {
  const assets = [];
  for (const url of [...new Set(category.words.flatMap(w => [w.image,w.audio]))]) {
    const bytes = await fs.readFile(`public${url}`);
    assets.push({ url, bytes: bytes.length, hash: createHash('sha256').update(bytes).digest('hex') });
  }
  const version = createHash('sha256').update(JSON.stringify({category,assets})).digest('hex').slice(0,16);
  const manifest = { categoryId:category.id, version, bytes:assets.reduce((n,a)=>n+a.bytes,0), assets };
  await fs.writeFile(`public/packs/${category.id}.json`, JSON.stringify({category,manifest}));
  manifests[category.id] = manifest;
}
await fs.writeFile('src/data/packs.json',JSON.stringify(manifests,null,2)+'\n');
console.log('Pacotes versionados preparados.');
