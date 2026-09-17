import { useCallback, useEffect, useState } from 'react';
import { categories } from '../data/catalog';
import { readProgress } from './storage';
import { packState, type PackState } from './offline';
import type { Progress } from '../types';
export function useAppData() {
  const [progress,setProgress]=useState<Progress>({version:1,results:[],visitedWordIds:[]});
  const [downloads,setDownloads]=useState<Record<string,PackState>>({});
  const [online,setOnline]=useState(navigator.onLine);
  const [storageError,setStorageError]=useState('');
  const refresh=useCallback(async()=>{
    setOnline(navigator.onLine);
    try {setProgress(await readProgress());setStorageError('');}
    catch {setStorageError('Não foi possível acessar seu progresso. O navegador pode estar bloqueando o armazenamento. Você pode continuar praticando.');}
    try {setDownloads(Object.fromEntries(await Promise.all(categories.map(async c=>[c.id,await packState(c.id)]))));}
    catch {setDownloads(Object.fromEntries(categories.map(c=>[c.id,'unsupported'])));}
  },[]);
  useEffect(()=>{
    void refresh();
    const events=['online','offline','focus','progress-changed','downloads-changed'];
    events.forEach(e=>window.addEventListener(e,refresh));
    const visible=()=>{if(document.visibilityState==='visible') void refresh();};
    document.addEventListener('visibilitychange',visible);
    return ()=>{events.forEach(e=>window.removeEventListener(e,refresh));document.removeEventListener('visibilitychange',visible);};
  },[refresh]);
  return {progress,downloads,online,storageError,refresh};
}
