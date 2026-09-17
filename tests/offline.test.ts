import { beforeEach,afterEach,describe,expect,it,vi } from 'vitest';
import fs from 'node:fs/promises';
import { downloadPack,packState,removePack,packs,packAssets } from '../src/lib/offline';
class MemoryCache { values=new Map<string,Response>();async match(url:string){return this.values.get(url)?.clone();}async put(url:string,response:Response){this.values.set(url,response.clone());} }
let stores:Map<string,MemoryCache>;
beforeEach(()=>{
  stores=new Map();vi.stubGlobal('caches',{keys:async()=>[...stores.keys()],open:async(name:string)=>{if(!stores.has(name))stores.set(name,new MemoryCache());return stores.get(name);},delete:async(name:string)=>stores.delete(name)});
  vi.stubGlobal('navigator',{storage:{estimate:async()=>({quota:1e9,usage:0}),persist:async()=>true}});
  vi.stubGlobal('fetch',vi.fn(async(url:string)=>{const bytes=await fs.readFile(`public${url}`);return new Response(bytes,{headers:{'Content-Type':url.endsWith('json')?'application/json':'application/octet-stream'}});}));
});
afterEach(()=>vi.unstubAllGlobals());
describe('pacotes offline',()=>{
  it('só marca pronto depois de baixar e verificar todos os arquivos',async()=>{expect(await packState('fruits')).toBe('missing');const progress:number[]=[];await downloadPack('fruits',p=>progress.push(p));expect(await packState('fruits')).toBe('ready');expect(progress.at(-1)).toBe(100);expect([...stores.keys()].some(n=>n.includes('staging'))).toBe(false);});
  it('não marca pronto após falha de rede e permite tentar novamente',async()=>{vi.mocked(fetch).mockRejectedValueOnce(new TypeError('offline'));await expect(downloadPack('fruits',()=>{})).rejects.toThrow();expect(await packState('fruits')).toBe('missing');await downloadPack('fruits',()=>{});expect(await packState('fruits')).toBe('ready');});
  it('rejeita conteúdo corrompido mesmo com HTTP 200',async()=>{vi.mocked(fetch).mockResolvedValueOnce(new Response('wrong'));await expect(downloadPack('fruits',()=>{})).rejects.toThrow('atualizado');expect(await packState('fruits')).toBe('missing');});
  it('detecta remoção parcial dos dados pelo navegador',async()=>{await downloadPack('fruits',()=>{});stores.get(`vocabulary-pack-fruits--${packs.fruits.version}`)!.values.delete(packAssets('fruits')[0]);expect(await packState('fruits')).toBe('outdated');await removePack('fruits');expect(await packState('fruits')).toBe('missing');});
  it('não deixa pacotes incompletos ao cancelar',async()=>{const abort=new AbortController();abort.abort();await expect(downloadPack('fruits',()=>{},abort.signal)).rejects.toThrow();expect(stores.size).toBe(0);});
  it('informa falta de espaço antes do download',async()=>{vi.stubGlobal('navigator',{storage:{estimate:async()=>({quota:100,usage:99})}});await expect(downloadPack('fruits',()=>{})).rejects.toThrow('espaço');expect(fetch).not.toHaveBeenCalled();});
});
