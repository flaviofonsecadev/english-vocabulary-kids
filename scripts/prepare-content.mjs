import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import sharp from 'sharp';

const source = await fs.readFile('reference/original/js/data.js', 'utf8');
const data = vm.runInNewContext(`${source.split('// Phrases data:')[0]}; vocabularyData`);
const html = await fs.readFile('reference/original/index.html', 'utf8');
const titles = Object.fromEntries([...html.matchAll(/class="category-card" data-category="([^"]+)">[\s\S]*?<h3>(.*?)<\/h3>/g)].map(m => [m[1], m[2].replace('&amp;', '&')]));
const symbols = ['🍎','🎨','🔢','🔢','💯','🐮','🦁','🎒','🧸','👋','🌿','👕','🌤️','📅','🗓️','🥕','😊','🐶','🏃','✨','🔷','🍞','🏡','🩺','🛠️','💛'];
const emoji = { Engineer: '🏗️', Dentist: '🦷', Driver: '🚗', Pilot: '✈️', Scientist: '🔬', Artist: '🎨', Mechanic: '🔧', Firefighter: '🚒' };
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
await fs.mkdir('public/media', { recursive: true });
await fs.mkdir('public/icons', { recursive: true });
const catalog = [];
const repairs = [];
for (const [index, [id, words]] of Object.entries(data).entries()) {
  const category = { id, title: titles[id] || id, emoji: symbols[index], color: ['peach', 'lavender', 'mint', 'sky', 'rose', 'yellow'][index % 6], words: [] };
  for (const entry of words) {
    const wordId = `${id}:${slug(entry.english)}`;
    let original = entry.image;
    if (!(await fs.access(original).then(() => true, () => false))) {
      const stem = original.replace(/\.[^.]+$/, '');
      original = await Promise.any(['png','svg','jpg','jpeg'].map(async ext => { const p = `${stem}.${ext}`; await fs.access(p); return p; })).catch(() => null);
    }
    let image;
    if (!original || emoji[entry.english] && id === 'jobs-occupations-2') {
      // A translation card is an honest educational fallback for missing artwork.
      // Jobs use distinct pictograms instead of the original identical book placeholder.
      image = `/media/${id}-${slug(entry.english)}.svg`;
      const label = emoji[entry.english] || entry.portuguese;
      const safe = label.replace(/&/g,'&amp;').replace(/</g,'&lt;');
      await fs.writeFile(`public${image}`, `<svg xmlns="http://www.w3.org/2000/svg" width="384" height="320" viewBox="0 0 384 320"><rect x="12" y="12" width="360" height="296" rx="44" fill="#eef0ff"/><text x="192" y="173" text-anchor="middle" dominant-baseline="middle" font-family="Segoe UI Emoji,Arial,sans-serif" font-size="${emoji[entry.english] ? 108 : 24}">${safe}</text></svg>`);
      repairs.push(`${wordId}: ${original ? 'substituído placeholder repetido' : 'cartão de tradução; imagem ausente'}`);
    } else if (original.endsWith('.svg')) {
      image = `/media/${id}-${slug(entry.english)}.svg`;
      await fs.copyFile(original, `public${image}`);
    } else {
      image = `/media/${id}-${slug(entry.english)}.webp`;
      await sharp(original).resize(384, 384, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public${image}`);
    }
    category.words.push({ id: wordId, categoryId: id, english: entry.english, portuguese: entry.portuguese, image, audio: `/audio/${slug(entry.english)}.mp3` });
  }
  catalog.push(category);
}
await fs.writeFile('src/data/catalog.json', JSON.stringify(catalog, null, 2) + '\n');
await fs.writeFile('docs/content-repairs.md', '# Ajustes no catálogo\n\n' + repairs.map(r => `- ${r}`).join('\n') + '\n');
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="116" fill="#5462d6"/><path d="M120 163 Q185 136 256 172 Q328 136 392 163 V346 Q326 324 256 362 Q185 324 120 346Z" fill="#fff"/><path d="M256 178V354" stroke="#d5d9ff" stroke-width="10"/><path d="M153 212h65m-65 42h65m75-42h65m-65 42h65" stroke="#8190ee" stroke-width="12" stroke-linecap="round"/><circle cx="375" cy="119" r="39" fill="#ffd16c"/><path d="m375 94 7 18 19 7-19 7-7 19-7-19-18-7 18-7Z" fill="#fff"/></svg>`;
await fs.writeFile('public/favicon.svg', icon);
for (const size of [180,192,512]) await sharp(Buffer.from(icon)).resize(size,size).png().toFile(`public/icons/icon-${size}.png`);
await sharp(Buffer.from(icon)).resize(410,410).extend({ top:51,bottom:51,left:51,right:51,background:'#5462d6' }).png().toFile('public/icons/maskable-512.png');
console.log(`${catalog.length} categorias, ${catalog.reduce((n,c) => n+c.words.length,0)} palavras. ${repairs.length} ajustes documentados.`);
