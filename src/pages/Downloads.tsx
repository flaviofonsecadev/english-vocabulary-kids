import { useEffect, useRef, useState } from 'react';
import { Check, Download, Trash2, RefreshCw, X } from 'lucide-react';
import { categories } from '../data/catalog';
import { downloadPack, formatBytes, packs, removePack } from '../lib/offline';
import { useData } from '../App';
import styles from './Pages.module.css';
export function DownloadsPage(){
  const {downloads,online,refresh}=useData();
  const [busy,setBusy]=useState<string|null>(null);const [percent,setPercent]=useState(0);const [errors,setErrors]=useState<Record<string,string>>({});
  const controller=useRef<AbortController|null>(null);
  useEffect(()=>()=>controller.current?.abort(),[]);
  useEffect(()=>{if(location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({block:'center'});},[]);
  async function download(id:string){
    if(busy)return;setBusy(id);setPercent(0);setErrors(e=>({...e,[id]:''}));controller.current=new AbortController();
    try{await downloadPack(id,setPercent,controller.current.signal);}
    catch(e){setErrors(errors=>({...errors,[id]:e instanceof DOMException&&e.name==='AbortError'?'Download cancelado. Você pode tentar novamente.':e instanceof TypeError?'Sem conexão para completar o download. Tente novamente.':(e as Error).message}));}
    finally{setBusy(null);controller.current=null;await refresh();window.dispatchEvent(new Event('downloads-changed'));}
  }
  async function remove(id:string){try{await removePack(id);await refresh();}catch{setErrors(e=>({...e,[id]:'Não foi possível remover o pacote. Tente novamente.'}));}}
  const ready=categories.filter(c=>downloads[c.id]==='ready');
  return <><div className={styles.pageIntro}><span className={styles.eyebrow}>APRENDER EM QUALQUER LUGAR</span><h1>Minha mochila offline <span>🎒</span></h1><p>Escolha o que levar. Imagens, palavras e áudios ficam prontos para a próxima aventura.</p></div><div className={styles.downloadSummary}><Download size={25}/><div><strong>{ready.length} categorias na mochila</strong><p>{formatBytes(ready.reduce((n,c)=>n+packs[c.id].bytes,0))} em conteúdo • Remover downloads mantém seu progresso.</p></div></div><p className="muted">O primeiro download precisa de internet. A instalação do app não baixa todas as categorias. Se o navegador limpar os arquivos, será preciso baixá-los novamente.</p>{!online&&<p className="notice">Você está offline. Seus pacotes completos continuam disponíveis.</p>}<div className={styles.downloadList}>{categories.map(c=>{const state=downloads[c.id];return <article className={styles.downloadRow} id={c.id} key={c.id}><span className={`${styles.downloadIcon} ${c.color}`}>{c.emoji}</span><div className={styles.downloadText}><h3>{c.title}</h3><p>{c.words.length} palavras • {formatBytes(packs[c.id].bytes)} • imagens e áudio</p>{busy===c.id?<><progress value={percent} max={100} aria-label={`Download de ${c.title}`}/><small>{percent}% — preparando sua mochila…</small></>:state==='ready'?<span className={styles.ready}><Check size={14}/> Disponível offline</span>:state==='outdated'?<span className={styles.warning}>Pacote incompleto ou desatualizado. Baixe novamente.</span>:state==='unsupported'?<span className={styles.warning}>Downloads indisponíveis neste navegador.</span>:null}{errors[c.id]&&<p role="alert" className="error">{errors[c.id]}</p>}</div><div className={styles.downloadActions}>{busy===c.id?<button className="secondary" onClick={()=>controller.current?.abort()}><X size={16}/> Cancelar</button>:state==='ready'?<button className="iconButton" aria-label={`Remover ${c.title}`} disabled={!!busy} onClick={()=>void remove(c.id)}><Trash2 size={19}/></button>:<button className="secondary" disabled={!!busy||!online||state==='unsupported'} onClick={()=>void download(c.id)}>{state==='outdated'?<RefreshCw size={16}/>:<Download size={16}/>} {state==='outdated'||errors[c.id]?'Tentar novamente':'Baixar'}</button>}</div></article>;})}</div></>;
}
