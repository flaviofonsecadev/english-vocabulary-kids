import { describe,it,expect } from 'vitest';
import { categories } from '../src/data/catalog';
import { categoryRounds,createWordSearch,lettersOf,lineBetween,optionsFor,shuffle } from '../src/lib/rules';
const seeded=()=>{let seed=13;return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};};
describe('regras de atividades',()=>{
  it('embaralha sem alterar a origem nem perder palavras',()=>{const original=[1,2,3,4,5];expect(shuffle(original,seeded()).sort()).toEqual(original);expect(original).toEqual([1,2,3,4,5]);});
  it('inclui uma única resposta correta com alternativas distintas',()=>{const words=categories[0].words;const options=optionsFor(words[0],[...words,words[0]],4,seeded());expect(options).toHaveLength(4);expect(options.filter(w=>w.id===words[0].id)).toHaveLength(1);expect(new Set(options.map(w=>w.english)).size).toBe(4);});
  it('não cria rodadas de categorização com respostas ambíguas',()=>{const groups=categories.filter(c=>['pets','farm-animals','zoo-animals'].includes(c.id));const rounds=categoryRounds(groups,seeded());expect(rounds.length).toBeGreaterThan(0);for(const word of rounds)expect(groups.filter(g=>g.words.some(w=>w.english===word.english))).toHaveLength(1);});
  it('aceita linhas horizontais, verticais e diagonais em ambos os sentidos',()=>{expect(lineBetween(0,18,8)).toEqual([0,9,18]);expect(lineBetween(18,0,8)).toEqual([18,9,0]);expect(lineBetween(0,2,8)).toEqual([0,1,2]);expect(lineBetween(1,17,8)).toEqual([1,9,17]);expect(lineBetween(0,10,8)).toEqual([]);});
  it('gera uma grade resolúvel para todas as categorias',()=>{for(const c of categories){const puzzle=createWordSearch(c.words,seeded());expect(puzzle.placed.length).toBeGreaterThan(0);expect(puzzle.grid).toHaveLength(puzzle.size**2);for(const p of puzzle.placed){expect(p.cells.map(i=>puzzle.grid[i]).join('')).toBe(lettersOf(p.word.english));expect(p.cells).toEqual(lineBetween(p.cells[0],p.cells.at(-1)!,puzzle.size));}}});
  it('normaliza palavras compostas para os jogos de letras',()=>{expect(lettersOf('Self-Control')).toBe('SELFCONTROL');expect(lettersOf('Ice Cream')).toBe('ICECREAM');});
});
