import fs from 'node:fs/promises';
import path from 'node:path';
import { KokoroTTS } from 'kokoro-js';
import { Mp3Encoder } from '@breezystack/lamejs';

const catalog = JSON.parse(await fs.readFile('src/data/catalog.json', 'utf8'));
const words = [...new Map(catalog.flatMap(c => c.words).map(w => [w.audio,w])).values()];
await fs.mkdir('public/audio', { recursive: true });
// Model cache stays outside the published app. Quantized CPU inference runs locally.
const model = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', {
  dtype: 'q8', device: 'cpu', cache_dir: path.resolve('.models'),
});
let count = 0;
for (const word of words) {
  const target = `public${word.audio}`;
  if (await fs.stat(target).then(s => s.size > 100, () => false)) { count++; continue; }
  const result = await model.generate(word.english.replace(/-/g,' '), { voice: 'af_heart', speed: 0.9 });
  const samples = Int16Array.from(result.audio, x => Math.max(-32768, Math.min(32767, Math.round(x * 32767))));
  const encoder = new Mp3Encoder(1, result.sampling_rate, 64);
  const chunks = [];
  for (let i=0;i<samples.length;i+=1152) chunks.push(Buffer.from(encoder.encodeBuffer(samples.subarray(i,i+1152))));
  chunks.push(Buffer.from(encoder.flush()));
  await fs.writeFile(`${target}.tmp`, Buffer.concat(chunks));
  await fs.rename(`${target}.tmp`,target);
  console.log(`${++count}/${words.length} ${word.english}`);
}
await fs.writeFile('public/audio/NOTICE.txt', 'English Games — pre-generated vocabulary audio\nModel: Kokoro-82M v1.0 (Apache-2.0), ONNX conversion by onnx-community\nVoice: af_heart; speed: 0.9\nhttps://huggingface.co/hexgrad/Kokoro-82M\nhttps://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX\n');
