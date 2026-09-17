import data from './catalog.json';
import type { Category, ActivityId } from '../types';
export const categories: Category[] = data;
export const allWords = categories.flatMap(c => c.words);
export const categoryById = (id: string) => categories.find(c => c.id === id);
export const activities: { id: ActivityId; title: string; description: string; icon: string; color: string }[] = [
  { id:'learn', title:'Aprender', description:'Conheça cada palavra, imagem e som.', icon:'📖',color:'lavender' },
  { id:'memory',title:'Memória',description:'Encontre os pares de imagens e palavras.',icon:'🃏',color:'rose' },
  { id:'match',title:'Correspondência',description:'Ligue cada palavra à sua imagem.',icon:'🧩',color:'mint' },
  { id:'categorize',title:'Categorização',description:'Descubra a qual grupo cada palavra pertence.',icon:'🗂️',color:'peach' },
  { id:'listen',title:'Escuta',description:'Ouça com atenção e escolha a palavra.',icon:'🎧',color:'sky' },
  { id:'two-choice',title:'Quiz de duas alternativas',description:'Uma pergunta, duas possibilidades!',icon:'✌️',color:'yellow' },
  { id:'image',title:'Image Quiz',description:'Qual palavra combina com a imagem?',icon:'🖼️',color:'rose' },
  { id:'spell',title:'Word Find Puzzle',description:'Coloque as letras na ordem certa.',icon:'🔤',color:'lavender' },
  { id:'search',title:'Caça-Palavras',description:'Encontre as palavras escondidas.',icon:'🔎',color:'mint' },
];
