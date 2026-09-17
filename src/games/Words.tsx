import { useRef, useState } from 'react';
import { ArrowRight, Delete, RotateCcw } from 'lucide-react';
import { createWordSearch, lettersOf, lineBetween, shuffle } from '../lib/rules';
import { AudioButton } from '../components/AudioButton';
import { stopAudio } from '../lib/audio';
import type { Answer, Word } from '../types';
import { type Finish, RoundProgress } from './GamePage';
import styles from './Games.module.css';
export function SpellingGame({words,finish}:{words:Word[];finish:Finish}){
  const [rounds]=useState(()=>shuffle(words).slice(0,5).map(word=>({word,bank:shuffle([...lettersOf(word.english)].map((letter,id)=>({letter,id})))})));
  const [index,setIndex]=useState(0);const [chosen,setChosen]=useState<number[]>([]);const [answers,setAnswers]=useState<Answer[]>([]);const [feedback,setFeedback]=useState('');const [correct,setCorrect]=useState(false);
  const {word,bank}=rounds[index];const value=chosen.map(id=>bank.find(b=>b.id===id)!.letter).join('');
  function check(){if(correct||chosen.length!==bank.length)return;const good=value===lettersOf(word.english);setAnswers(a=>[...a,{wordId:word.id,correct:good}]);setCorrect(good);setFeedback(good?'Você montou a palavra! ✨':'Quase lá! Ajuste as letras e tente novamente.');}
  return <><RoundProgress current={index+1} total={rounds.length}/><h2 className={styles.question}>Uma letra de cada vez. Qual é a palavra?</h2><div className={styles.spellingPrompt}><img src={word.image} alt={word.portuguese}/><p>{word.portuguese}</p><AudioButton url={word.audio}/></div><div className={styles.letterSlots} aria-label={`Palavra montada: ${value||'vazia'}`}>{bank.map((_,i)=><span key={i} className={correct?styles.correct:''}>{value[i]||''}</span>)}</div><p className={styles.bottomHint}>Monte sem espaços ou hífens.</p><div className={styles.letterBank}>{bank.map(b=><button key={b.id} disabled={correct||chosen.includes(b.id)} onClick={()=>{setChosen(c=>[...c,b.id]);setFeedback('');}} aria-label={`Letra ${b.letter}`}>{b.letter}</button>)}</div><div className={styles.controls}><button className="secondary" disabled={correct||!chosen.length} aria-label="Apagar última letra" onClick={()=>setChosen(c=>c.slice(0,-1))}><Delete size={19}/></button><button className="secondary" disabled={correct||!chosen.length} aria-label="Limpar letras" onClick={()=>setChosen([])}><RotateCcw size={18}/></button>{!correct&&<button className="primary" disabled={chosen.length!==bank.length} onClick={check}>Conferir</button>}</div><p role="status" className={styles.pairFeedback}>{feedback}</p>{correct&&<button className="primary" onClick={()=>{stopAudio();if(index===rounds.length-1)finish(answers);else {setIndex(i=>i+1);setChosen([]);setCorrect(false);setFeedback('');}}}>{index===rounds.length-1?'Ver resultado':'Próxima palavra'}<ArrowRight size={17}/></button>}</>;
}
export function WordSearchGame({words,finish}:{words:Word[];finish:Finish}){
  const [puzzle]=useState(()=>createWordSearch(words));const [found,setFound]=useState<string[]>([]);const [selection,setSelection]=useState<number[]>([]);const [start,setStart]=useState<number|null>(null);const [answers,setAnswers]=useState<Answer[]>([]);const [feedback,setFeedback]=useState('');
  const drag=useRef<{start:number;end:number}|null>(null);const board=useRef<HTMLDivElement>(null);
  const allFound=found.length===puzzle.placed.length;
  const highlight=new Set(puzzle.placed.filter(p=>found.includes(p.word.id)).flatMap(p=>p.cells));
  function submit(first:number,last:number){if(allFound)return;const cells=lineBetween(first,last,puzzle.size);const text=cells.map(i=>puzzle.grid[i]).join('');
    const match=puzzle.placed.find(p=>!found.includes(p.word.id)&&(lettersOf(p.word.english)===text||lettersOf(p.word.english)===[...text].reverse().join('')));
    if(match){setFound(f=>[...f,match.word.id]);setAnswers(a=>[...a,{wordId:match.word.id,correct:true}]);setFeedback(`Você encontrou ${match.word.english}! ✨`);}
    else if(cells.length>1){setAnswers(a=>[...a,{wordId:null,correct:false}]);setFeedback('Essa seleção ainda não corresponde a uma palavra da lista.');}
    setSelection([]);setStart(null);
  }
  function choose(index:number){if(start===null){setStart(index);setSelection([index]);}else submit(start,index);}
  function at(x:number,y:number){const el=document.elementFromPoint(x,y)?.closest('[data-cell]');return el&&board.current?.contains(el)?Number(el.getAttribute('data-cell')):null;}
  return <><div className={styles.pairInfo}><span><strong>{found.length}</strong> de {puzzle.placed.length} palavras</span><span>{answers.length} tentativas</span></div><h2 className={styles.question}>Encontre as palavras escondidas.</h2><p className={styles.instruction}>Toque na primeira e na última letra, ou arraste em linha reta. Com o teclado, use as setas e Enter.</p><div className={styles.searchLayout}><div ref={board} className={styles.wordGrid} style={{gridTemplateColumns:`repeat(${puzzle.size},1fr)`}} aria-label="Grade de caça-palavras"
    onPointerMove={e=>{if(drag.current){const end=at(e.clientX,e.clientY);if(end!==null){drag.current.end=end;setSelection(lineBetween(drag.current.start,end,puzzle.size));}}}}
    onPointerUp={()=>{if(drag.current){const {start:first,end}=drag.current;drag.current=null;if(first!==end)submit(first,end);else choose(first);}}}
    onPointerCancel={()=>{drag.current=null;setSelection([]);setStart(null);}}>
      {puzzle.grid.map((letter,i)=><button data-cell={i} key={i} className={`${highlight.has(i)?styles.found:''} ${selection.includes(i)?styles.cellSelected:''}`} aria-label={`${letter}, linha ${Math.floor(i/puzzle.size)+1}, coluna ${i%puzzle.size+1}`} aria-pressed={selection.includes(i)||highlight.has(i)} disabled={allFound}
        onPointerDown={e=>{if(e.button!==0)return;drag.current={start:i,end:i};setSelection([i]);e.currentTarget.setPointerCapture(e.pointerId);}}
        onClick={e=>{if(e.detail===0)choose(i);}}
        onKeyDown={e=>{const step=({ArrowRight:1,ArrowLeft:-1,ArrowDown:puzzle.size,ArrowUp:-puzzle.size} as Record<string,number>)[e.key];if(step){e.preventDefault();const next=Math.max(0,Math.min(puzzle.grid.length-1,i+step));board.current?.querySelector<HTMLButtonElement>(`[data-cell="${next}"]`)?.focus();}else if(e.key==='Escape'){setStart(null);setSelection([]);}}}>{letter}</button>)}
    </div><div className={styles.searchWords}><span className={styles.columnLabel}>SUAS DESCOBERTAS</span>{puzzle.placed.map(p=><span key={p.word.id} className={found.includes(p.word.id)?styles.crossed:''} lang="en">{found.includes(p.word.id)?'✓':'○'} {p.word.english}</span>)}</div></div><p role="status" className={styles.pairFeedback}>{feedback||'As palavras podem aparecer em qualquer direção.'}</p>{start!==null&&<button className="secondary" onClick={()=>{setStart(null);setSelection([]);}}>Cancelar seleção</button>}{allFound&&<button className="primary" onClick={()=>finish(answers)}>Ver resultado <ArrowRight size={17}/></button>}</>;
}
