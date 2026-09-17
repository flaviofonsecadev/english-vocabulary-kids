import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, RotateCcw, Trophy } from 'lucide-react';
import { activities, categories, categoryById } from '../data/catalog';
import { useData } from '../App';
import { saveResult, visitWord } from '../lib/storage';
import { categoryRounds, optionsFor, shuffle } from '../lib/rules';
import { stopAudio } from '../lib/audio';
import { AudioButton } from '../components/AudioButton';
import { MemoryGame, MatchGame } from './Pairs';
import { SpellingGame, WordSearchGame } from './Words';
import type { ActivityId, Answer, Category, GameResult, Word } from '../types';
import styles from './Games.module.css';

export type Finish=(answers:Answer[],visited?:string[])=>void;
export function GamePage(){
  const {categoryId='',activityId=''}=useParams();const {downloads,online}=useData();
  const category=categoryById(categoryId);const activity=activities.find(a=>a.id===activityId);
  if(!category||!activity)return <div className="empty"><h1>Atividade não encontrada</h1><Link to="/">Explorar categorias</Link></div>;
  if(!online && !downloads[categoryId])return <p role="status">Conferindo sua mochila…</p>;
  if(!online&&downloads[categoryId]!=='ready')return <div className="empty"><h1>Vamos preparar esta categoria?</h1><p>Conecte-se e baixe as palavras, imagens e áudios antes de jogar offline.</p><Link className="primary" to={`/downloads#${categoryId}`}>Ver downloads</Link></div>;
  return <Session key={`${categoryId}-${activityId}`} category={category} activity={activity.id}/>;
}
function Session({category,activity}:{category:Category;activity:ActivityId}){
  const {downloads,online}=useData();const [result,setResult]=useState<GameResult|null>(null);const [run,setRun]=useState(0);
  const [groups]=useState(()=>{
    const available=categories.filter(c=>(online||downloads[c.id]==='ready')&&!c.id.startsWith('numbers-'));
    const base=available.find(c=>c.id===category.id)||available[0];
    return base?[base,...shuffle(available.filter(c=>c.id!==base.id)).slice(0,2)]:[];
  });
  const meta=activities.find(a=>a.id===activity)!;
  const finish:Finish=(answers,visited=[])=>{stopAudio();setResult({id:crypto.randomUUID(),categoryId:category.id,activity,completedAt:new Date().toISOString(),answers,visitedWordIds:[...new Set([...visited,...answers.flatMap(a=>a.wordId?[a.wordId]:[])])]});};
  const mixedAvailable=groups.every(g=>online||downloads[g.id]==='ready');
  return <div className={styles.gamePage}><Link className="backLink" to={`/category/${category.id}`}><ArrowLeft size={17}/> Voltar para {category.title}</Link><div className={styles.gameHeading}><span className={`${styles.headingIcon} ${meta.color}`}>{meta.icon}</span><div><span className={styles.eyebrow}>{category.title.toLocaleUpperCase()}</span><h1>{meta.title}</h1></div><span className={styles.practiceBadge}>Um passo de cada vez ✨</span></div>
    {result?<Result result={result} restart={()=>{setResult(null);setRun(r=>r+1);}}/>:<div className={styles.gamePanel} key={run}>
      {activity==='learn'&&<LearnGame category={category} finish={finish}/>}
      {activity==='memory'&&<MemoryGame words={category.words} finish={finish}/>}
      {activity==='match'&&<MatchGame words={category.words} finish={finish}/>}
      {['listen','two-choice','image'].includes(activity)&&<QuizGame words={category.words} mode={activity as 'listen'|'two-choice'|'image'} finish={finish}/>}
      {activity==='spell'&&<SpellingGame words={category.words} finish={finish}/>}
      {activity==='search'&&<WordSearchGame words={category.words} finish={finish}/>}
      {activity==='categorize'&&(groups.length<2||!mixedAvailable?<div className="empty"><span>🗂️</span><h2>Vamos misturar as descobertas?</h2><p>A categorização precisa de pelo menos duas categorias de temas diferentes, sem números. Baixe mais categorias para jogar offline.</p><Link className="primary" to="/downloads">Escolher categorias</Link></div>:<CategorizeGame groups={groups} finish={finish}/>)}
    </div>}
  </div>;
}
function Result({result,restart}:{result:GameResult;restart:()=>void}){
  const [saved,setSaved]=useState(false);const [error,setError]=useState('');
  const persist=()=>{setError('');void saveResult(result).then(()=>setSaved(true)).catch(()=>setError('A atividade terminou, mas o navegador não conseguiu salvar. Tente novamente ou exporte este resultado.'));};
  useEffect(persist,[result]);
  function exportResult(){const url=URL.createObjectURL(new Blob([JSON.stringify({version:1,results:[result],visitedWordIds:result.visitedWordIds})],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='english-games-atividade.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  return <section className={`${styles.gamePanel} ${styles.result}`}><span className={styles.resultTrophy}><Trophy size={48}/></span><span className={styles.eyebrow}>MAIS UMA DESCOBERTA PARA A COLEÇÃO</span><h2>Você foi até o fim! 🎉</h2><p>{result.activity==='learn'?'Cada palavra visitada é um novo começo. Volte para praticar quando quiser.':'Aprender é praticar. Que tal experimentar outra brincadeira?'}</p><div className={styles.resultStats}>{result.activity==='learn'?<div><strong>{result.visitedWordIds.length}</strong><span>palavras visitadas</span></div>:<><div><strong>{result.answers.filter(a=>a.correct).length}</strong><span>acertos</span></div><div><strong>{result.answers.length}</strong><span>tentativas</span></div></>}</div><p role="status" className="muted">{saved?'✓ Progresso salvo neste dispositivo.':error||'Salvando sua descoberta…'}</p>{error&&<div className={styles.controls}><button className="secondary" onClick={persist}>Tentar salvar novamente</button><button className="secondary" onClick={exportResult}>Exportar resultado</button></div>}<div className={styles.controls}><button className="secondary" onClick={restart}><RotateCcw size={17}/> Jogar de novo</button><Link className="primary" to={`/category/${result.categoryId}`}>Mais atividades <ArrowRight size={17}/></Link></div><Link className={styles.progressLink} to="/progress">Ver meu progresso</Link></section>;
}
export function RoundProgress({current,total,label='Rodada'}:{current:number;total:number;label?:string}){return <div className={styles.roundProgress}><span>{label} <strong>{Math.min(current,total)} de {total}</strong></span><progress value={current} max={total}/></div>;}
function LearnGame({category,finish}:{category:Category;finish:Finish}){
  const [index,setIndex]=useState(0);const [show,setShow]=useState(false);const [error,setError]=useState('');
  const word=category.words[index];
  useEffect(()=>{void visitWord(word.id).catch(()=>setError('Não foi possível salvar esta visita. Você pode continuar estudando.'));setShow(false);stopAudio();},[word.id]);
  return <><RoundProgress current={index+1} total={category.words.length} label="Palavra"/><p className={styles.instruction}>Olhe, ouça e descubra uma nova palavra.</p><div className={styles.flashcard}><img src={word.image} alt={word.portuguese}/><div className={styles.flashcardTitle}><h2 lang="en">{word.english}</h2><AudioButton url={word.audio}/></div><button className={styles.translation} onClick={()=>setShow(!show)} aria-expanded={show}>{show?word.portuguese:'Toque para ver a tradução'}</button></div>{error&&<p role="alert" className="error">{error}</p>}<div className={styles.controls}><button className="secondary" disabled={index===0} onClick={()=>setIndex(i=>i-1)}><ArrowLeft size={17}/> Anterior</button><button className="primary" onClick={()=>index===category.words.length-1?finish([],category.words.map(w=>w.id)):setIndex(i=>i+1)}>{index===category.words.length-1?'Concluir':'Próxima palavra'}<ArrowRight size={17}/></button></div><p className={styles.bottomHint}>Ouvir e repetir é uma ótima maneira de praticar.</p></>;
}
function QuizGame({words,mode,finish}:{words:Word[];mode:'listen'|'two-choice'|'image';finish:Finish}){
  const [rounds]=useState(()=>shuffle(words).slice(0,8).map(word=>({word,options:optionsFor(word,words,mode==='two-choice'?2:4)})));
  const [index,setIndex]=useState(0);const [selected,setSelected]=useState<string|null>(null);const [answers,setAnswers]=useState<Answer[]>([]);
  const round=rounds[index];const good=selected===round.word.id;
  function choose(word:Word){if(selected)return;setSelected(word.id);setAnswers(a=>[...a,{wordId:round.word.id,correct:word.id===round.word.id}]);}
  function next(){stopAudio();if(index===rounds.length-1)finish(answers);else {setIndex(i=>i+1);setSelected(null);}}
  return <><RoundProgress current={index+1} total={rounds.length}/><h2 className={styles.question}>{mode==='listen'?'Qual palavra você ouviu?':mode==='image'?'Qual palavra combina com a imagem?':`Como se diz “${round.word.portuguese}” em inglês?`}</h2><div className={styles.quizPrompt}>{mode==='listen'?<AudioButton key={index} url={round.word.audio} label="Ouvir pergunta" large/>:<img src={round.word.image} alt={round.word.portuguese}/>}</div><div className={styles.options}>{round.options.map(w=><button key={w.id} className={`${styles.option} ${selected===w.id?(good?styles.correct:styles.incorrect):''} ${selected&&w.id===round.word.id?styles.correct:''}`} disabled={!!selected} onClick={()=>choose(w)} lang="en">{w.english}{selected&&w.id===round.word.id&&<Check size={18}/>}</button>)}</div>{selected&&<div className={`${styles.feedback} ${good?styles.goodFeedback:styles.tryFeedback}`} role="status"><span>{good?'Isso mesmo! ✨':`Mais uma descoberta: ${round.word.english} = ${round.word.portuguese}.`}</span><button className="primary" onClick={next}>{index===rounds.length-1?'Ver resultado':'Continuar'}<ArrowRight size={17}/></button></div>}</>;
}
function CategorizeGame({groups,finish}:{groups:Category[];finish:Finish}){
  const [words]=useState(()=>categoryRounds(groups));const [index,setIndex]=useState(0);const [selected,setSelected]=useState('');const [answers,setAnswers]=useState<Answer[]>([]);
  const word=words[index];const good=selected===word.categoryId;
  if(!word)return <div className="empty"><h2>Escolha outros temas para misturar.</h2><Link to="/">Explorar categorias</Link></div>;
  return <><RoundProgress current={index+1} total={words.length}/><h2 className={styles.question}>A qual categoria esta palavra pertence?</h2><div className={styles.categorizeWord}><img src={word.image} alt={word.portuguese}/><h3 lang="en">{word.english}</h3><AudioButton url={word.audio}/></div><div className={styles.options}>{groups.map(g=><button className={`${styles.option} ${selected===g.id?(good?styles.correct:styles.incorrect):''}`} key={g.id} disabled={!!selected} onClick={()=>{setSelected(g.id);setAnswers(a=>[...a,{wordId:word.id,correct:g.id===word.categoryId}]);}}>{g.emoji} {g.title}</button>)}</div>{selected&&<div className={`${styles.feedback} ${good?styles.goodFeedback:styles.tryFeedback}`} role="status"><span>{good?'Boa descoberta! ✨':`Esta palavra pertence a ${categoryById(word.categoryId)?.title}.`}</span><button className="primary" onClick={()=>{stopAudio();if(index===words.length-1)finish(answers);else{setIndex(i=>i+1);setSelected('');}}}>{index===words.length-1?'Ver resultado':'Continuar'}<ArrowRight size={17}/></button></div>}</>;
}
