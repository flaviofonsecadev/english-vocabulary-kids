import { openDB } from 'idb';
import { activities, allWords, categories } from '../data/catalog';
import type { GameResult, Progress } from '../types';

const empty = (): Progress => ({ version:1, results:[], visitedWordIds:[] });
const database = () => openDB('english-vocabulary-v1',1,{ upgrade(db) { db.createObjectStore('progress'); } });
export async function readProgress(): Promise<Progress> {
  const db = await database();
  try { return (await db.get('progress','profile')) || empty(); } finally { db.close(); }
}
async function changeProgress(change: (data:Progress) => Progress) {
  const db = await database();
  try {
    const tx = db.transaction('progress','readwrite');
    const data = (await tx.store.get('profile')) || empty();
    await tx.store.put(change(data),'profile');
    await tx.done;
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('progress-changed'));
  } finally { db.close(); }
}
export const visitWord = (id:string) => changeProgress(p => ({ ...p, visitedWordIds:[...new Set([...p.visitedWordIds,id])] }));
export const saveResult = (result:GameResult) => changeProgress(p => ({ ...p, results:p.results.some(r=>r.id===result.id) ? p.results : [...p.results,result], visitedWordIds:[...new Set([...p.visitedWordIds,...result.visitedWordIds])] }));

export function validateBackup(value: unknown): Progress {
  const fail = () => { throw new Error('Este arquivo não é um backup válido do English Games.'); };
  if (!value || typeof value !== 'object') return fail();
  const p = value as Progress;
  const wordIds = new Set(allWords.map(w=>w.id));
  const validWords = (v:unknown): v is string[] => Array.isArray(v) && v.length<=allWords.length && v.every(id=>typeof id==='string' && wordIds.has(id));
  if (p.version!==1 || !Array.isArray(p.results) || p.results.length>100_000 || !validWords(p.visitedWordIds)) return fail();
  const results:GameResult[] = p.results.map(r => {
    if (!r || typeof r.id!=='string' || !/^[a-zA-Z0-9-]{1,80}$/.test(r.id) || !categories.some(c=>c.id===r.categoryId) || !activities.some(a=>a.id===r.activity) || typeof r.completedAt!=='string' || !Number.isFinite(Date.parse(r.completedAt)) || !validWords(r.visitedWordIds) || !Array.isArray(r.answers) || r.answers.length>100_000 || !r.answers.every(a=>a && (a.wordId===null || wordIds.has(a.wordId)) && typeof a.correct==='boolean')) return fail();
    return { id:r.id, categoryId:r.categoryId, activity:r.activity, completedAt:r.completedAt, visitedWordIds:[...new Set(r.visitedWordIds)], answers:r.answers.map(a=>({wordId:a.wordId,correct:a.correct})) };
  });
  return { version:1, results:[...new Map(results.map(r=>[r.id,r])).values()], visitedWordIds:[...new Set(p.visitedWordIds)] };
}
export async function importProgress(value:unknown) {
  const incoming = validateBackup(value);
  await changeProgress(p => ({ version:1, results:[...new Map([...p.results,...incoming.results].map(r=>[r.id,r])).values()], visitedWordIds:[...new Set([...p.visitedWordIds,...incoming.visitedWordIds])] }));
}

