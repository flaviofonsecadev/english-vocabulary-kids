import manifests from '../data/packs.json';
import type { PackManifest } from '../types';
export const packs = manifests as Record<string,PackManifest>;
const prefix='vocabulary-pack-';
const cacheName=(id:string)=>`${prefix}${id}--${packs[id].version}`;
export type PackState='ready'|'missing'|'outdated'|'unsupported';
export const packAssets=(id:string)=>[...packs[id].assets.map(a=>a.url),`/packs/${id}.json`];
export async function packState(id:string):Promise<PackState> {
  if (!('caches' in globalThis)) return 'unsupported';
  const names=await caches.keys();
  const name=cacheName(id);
  if (names.includes(name)) {
    const cache=await caches.open(name);
    const complete=await Promise.all(packAssets(id).map(url=>cache.match(url)));
    if (complete.every(Boolean)) return 'ready';
  }
  return names.some(n=>n.startsWith(`${prefix}${id}--`)) ? 'outdated' : 'missing';
}
const inFlight=new Set<string>();
export async function downloadPack(id:string,onProgress:(percent:number)=>void,signal?:AbortSignal) {
  if (!packs[id] || !('caches' in globalThis)) throw new Error('Este navegador não permite downloads offline. Você ainda pode jogar com internet.');
  if(inFlight.has(id)) throw new Error('Esta categoria já está sendo baixada.');
  inFlight.add(id);
  const staging=`vocabulary-staging-${id}-${crypto.randomUUID()}`;
  const target=cacheName(id);
  let committing=false;
  try {
    if (navigator.storage?.estimate) {
      const {quota,usage}=await navigator.storage.estimate();
      if(quota && quota-(usage||0)<packs[id].bytes*2) throw new Error('Pouco espaço disponível. Remova um pacote e tente novamente.');
    }
    const cache=await caches.open(staging);
    const urls=packAssets(id);
    let done=0;
    for (const url of urls) {
      signal?.throwIfAborted();
      const response=await fetch(url,{cache:'no-store',signal});
      if(!response.ok || response.headers.get('content-type')?.includes('text/html')) throw new Error('Um arquivo não pôde ser baixado. Tente novamente com internet.');
      const asset=packs[id].assets.find(a=>a.url===url);
      if(asset) {
        const bytes=await response.clone().arrayBuffer();
        const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(v=>v.toString(16).padStart(2,'0')).join('');
        if(hash!==asset.hash) throw new Error('O conteúdo foi atualizado. Atualize o aplicativo antes de baixar novamente.');
      } else {
        const downloaded=await response.clone().json();
        if(downloaded.manifest?.version!==packs[id].version) throw new Error('Atualize o aplicativo para baixar este conteúdo.');
      }
      await cache.put(url,response);
      onProgress(Math.round(++done/urls.length*95));
    }
    signal?.throwIfAborted();
    committing=true;
    const final=await caches.open(target);
    for(const url of urls) await final.put(url,(await cache.match(url))!);
    for(const name of await caches.keys()) if(name.startsWith(`${prefix}${id}--`) && name!==target) await caches.delete(name);
    onProgress(100);
    if(navigator.storage?.persist) void navigator.storage.persist().catch(()=>{});
  } catch(error) {
    if(committing) await caches.delete(target);
    if(error instanceof DOMException && error.name==='QuotaExceededError') throw new Error('O armazenamento ficou cheio. Remova um pacote e tente novamente.');
    throw error;
  } finally { await caches.delete(staging); inFlight.delete(id); }
}
export async function removePack(id:string) {
  for(const name of await caches.keys()) if(name.startsWith(`${prefix}${id}--`)) await caches.delete(name);
}
export const formatBytes=(n:number)=>n<1_000_000 ? `${Math.round(n/1000)} KB` : `${(n/1_000_000).toFixed(1).replace('.',',')} MB`;
