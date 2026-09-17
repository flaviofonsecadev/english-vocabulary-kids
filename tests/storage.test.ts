import 'fake-indexeddb/auto';
import { afterEach,describe,expect,it } from 'vitest';
import { deleteDB } from 'idb';
import { importProgress,readProgress,saveResult,validateBackup,visitWord } from '../src/lib/storage';
import type { GameResult } from '../src/types';
const result:GameResult={id:'test-session',categoryId:'fruits',activity:'image',completedAt:'2026-09-16T12:00:00.000Z',answers:[{wordId:'fruits:apple',correct:true}],visitedWordIds:['fruits:apple']};
afterEach(async()=>{await deleteDB('english-vocabulary-v1');});
describe('progresso local',()=>{
  it('visitas não contam como acertos nem atividades completas',async()=>{await visitWord('fruits:apple');await visitWord('fruits:apple');expect(await readProgress()).toEqual({version:1,results:[],visitedWordIds:['fruits:apple']});});
  it('salva o resultado uma única vez mesmo com chamadas concorrentes',async()=>{await Promise.all([saveResult(result),saveResult(result)]);expect((await readProgress()).results).toHaveLength(1);});
  it('combina backups e preserva resultados existentes',async()=>{await saveResult(result);const second={...result,id:'session-2',answers:[{wordId:null,correct:false}]};await importProgress({version:1,results:[result,second],visitedWordIds:['fruits:banana']});await importProgress({version:1,results:[second],visitedWordIds:[]});const p=await readProgress();expect(p.results).toHaveLength(2);expect(p.visitedWordIds).toEqual(['fruits:apple','fruits:banana']);});
  it('rejeita arquivos inválidos antes de modificar o banco',async()=>{await saveResult(result);for(const payload of [{version:2,results:[],visitedWordIds:[]},{version:1,results:[{...result,activity:'unknown'}],visitedWordIds:[]},{version:1,results:[],visitedWordIds:['invalid']}]){await expect(importProgress(payload)).rejects.toThrow();}expect((await readProgress()).results).toEqual([result]);});
  it('remove campos desconhecidos de um backup',()=>{expect(validateBackup({version:1,results:[{...result,token:'x'}],visitedWordIds:[],token:'x'})).not.toHaveProperty('token');});
});
