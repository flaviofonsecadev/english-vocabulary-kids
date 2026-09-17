import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { playWord } from '../lib/audio';
export function AudioButton({url,label='Ouvir palavra',large=false}:{url:string;label?:string;large?:boolean}) {
  const [error,setError]=useState('');
  return <><button className={large?'audioLarge':'iconButton'} aria-label={label} onClick={()=>{setError('');void playWord(url).catch(()=>setError('Não foi possível tocar o áudio. Confira a conexão ou baixe esta categoria.'));}}><Volume2 size={large?32:21}/>{large && <span>Toque para ouvir</span>}</button>{error && <p className="error" role="alert">{error}</p>}</>;
}
