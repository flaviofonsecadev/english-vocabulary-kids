import type { Word, Category } from '../types';
export function shuffle<T>(items:readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let i=result.length-1;i>0;i--) { const j = Math.floor(random()*(i+1)); [result[i],result[j]]=[result[j],result[i]]; }
  return result;
}
export const lettersOf = (word:string) => word.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z]/g,'');
export function optionsFor(word:Word, pool:Word[], count:number, random = Math.random) {
  const others = [...new Map(pool.filter(w=>w.english.toLowerCase()!==word.english.toLowerCase()).map(w=>[w.english.toLowerCase(),w])).values()];
  return shuffle([word,...shuffle(others,random).slice(0,count-1)],random);
}
export function categoryRounds(groups:Category[], random = Math.random): Word[] {
  return shuffle(groups.flatMap(c => shuffle(c.words.filter(w=>groups.filter(g=>g.words.some(x=>x.english.toLowerCase()===w.english.toLowerCase())).length===1),random).slice(0,3)),random);
}
export function lineBetween(start:number,end:number,size:number):number[] {
  const r1=Math.floor(start/size),c1=start%size,r2=Math.floor(end/size),c2=end%size;
  const dr=r2-r1,dc=c2-c1;
  if (dr!==0 && dc!==0 && Math.abs(dr)!==Math.abs(dc)) return [];
  return Array.from({length:Math.max(Math.abs(dr),Math.abs(dc))+1},(_,i)=>(r1+i*Math.sign(dr))*size+c1+i*Math.sign(dc));
}
export function createWordSearch(words:Word[], random = Math.random) {
  const selected = shuffle(words.filter(w=>lettersOf(w.english).length<=12),random).slice(0,5);
  const size = Math.max(8,...selected.map(w=>lettersOf(w.english).length));
  const grid = Array<string>(size*size).fill('');
  const placed:{word:Word; cells:number[]}[]=[];
  const directions = [[0,1],[1,0],[1,1],[0,-1],[-1,0],[-1,-1],[1,-1],[-1,1]];
  for (const word of selected.sort((a,b)=>lettersOf(b.english).length-lettersOf(a.english).length)) {
    const text=lettersOf(word.english);
    const candidates=shuffle(Array.from({length:size*size},(_,i)=>i).flatMap(start=>directions.map(([dr,dc])=>({start,dr,dc}))),random);
    for (const {start,dr,dc} of candidates) {
      const row=Math.floor(start/size), col=start%size;
      const endRow=row+dr*(text.length-1),endCol=col+dc*(text.length-1);
      if (endRow<0||endRow>=size||endCol<0||endCol>=size) continue;
      const cells=Array.from(text,(_,i)=>(row+dr*i)*size+col+dc*i);
      if (cells.some((cell,i)=>grid[cell] && grid[cell]!==text[i])) continue;
      cells.forEach((cell,i)=>grid[cell]=text[i]); placed.push({word,cells}); break;
    }
  }
  return {size,grid:grid.map(c=>c||'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(random()*26)]),placed};
}
