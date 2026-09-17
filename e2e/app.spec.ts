import { test,expect,type Page } from '@playwright/test';
import catalog from '../src/data/catalog.json' with { type: 'json' };
const fruits=catalog.find(c=>c.id==='fruits')!.words;
const all=catalog.flatMap(c=>c.words);
async function result(page:Page){await expect(page.getByRole('heading',{name:'Você foi até o fim!'})).toBeVisible();await expect(page.getByText('✓ Progresso salvo neste dispositivo.')).toBeVisible();}
async function finishLearning(page:Page){for(let i=0;i<7;i++)await page.getByRole('button',{name:'Próxima palavra'}).click();await page.getByRole('button',{name:'Concluir',exact:true}).click();await result(page);}
test('navegação, busca e layout em 320, 390, 768 e 1440 pixels',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900});await page.goto('/');
    await expect(page.getByRole('heading',{name:/Um mundo de palavras/})).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`test-results/home-${width}.png`,fullPage:width===1440});
    await page.getByRole('searchbox').fill('frutas');await expect(page.locator('a[href="/category/fruits"]').last()).toBeVisible();
    await page.getByRole('searchbox').fill('zzzzz');await expect(page.getByText('Ainda não encontramos esse tema')).toBeVisible();
  }
  expect(errors).toEqual([]);
});
test('Aprender salva visitas e conclusão; backup exporta e importa sem duplicar',async({page})=>{
  await page.goto('/category/fruits/play/learn');await page.getByRole('button',{name:'Toque para ver a tradução'}).click();await expect(page.getByRole('button',{name:'Maçã',exact:true})).toBeVisible();
  await finishLearning(page);await page.reload();await page.goto('/progress');
  await expect(page.getByText('8 de 8 palavras visitadas')).toBeVisible();
  const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Exportar backup'}).click();const download=await downloadPromise;const path=await download.path();
  await page.locator('input[type=file]').setInputFiles(path!);await expect(page.getByText(/Backup importado!/)).toBeVisible();
  await expect(page.locator('[class*="history"]>div')).toHaveCount(1);
});
for(const mode of ['image','two-choice','listen'])test(`quiz ${mode}: responde todas as rodadas e grava resultado`,async({page})=>{
  await page.addInitScript(()=>{const original=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){(window as unknown as {lastAudio:string}).lastAudio=this.src;return original.call(this);};});
  await page.goto(`/category/fruits/play/${mode}`);
  for(let round=0;round<8;round++){
    let word;
    if(mode==='listen'){await page.getByRole('button',{name:'Ouvir pergunta'}).click();const src=await page.evaluate(()=>(window as unknown as {lastAudio:string}).lastAudio);word=fruits.find(w=>src.endsWith(w.audio));}
    else{const alt=await page.locator('[class*="quizPrompt"] img').getAttribute('alt');word=fruits.find(w=>w.portuguese===alt);}
    expect(word).toBeTruthy();await page.getByRole('button',{name:word!.english,exact:true}).click();await expect(page.getByRole('status').filter({hasText:'Isso mesmo'})).toBeVisible();await page.getByRole('button',{name:round===7?'Ver resultado':'Continuar',exact:true}).click();
  }
  await result(page);await expect(page.locator('[class*="resultStats"] strong').first()).toHaveText('8');
});
test('correspondência por toque e erro recuperável',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const page=await context.newPage();await page.goto('http://127.0.0.1:4173/category/fruits/play/match');
  const left=page.locator('[class*="matchBoard"]>div').first();const right=page.locator('[class*="matchBoard"]>div').last();
  const text=(await left.locator('button').first().innerText()).trim();const first=fruits.find(w=>w.english===text)!;
  await left.getByRole('button',{name:first.english,exact:true}).tap();await right.locator(`button:not([aria-label="${first.portuguese}"])`).first().tap();await expect(page.getByText('Essas duas não combinam.')).toBeVisible();
  for(const button of await left.locator('button').all()){const english=(await button.innerText()).trim();const word=fruits.find(w=>w.english===english)!;await button.tap();await right.getByRole('button',{name:word.portuguese,exact:true}).tap();}
  await page.getByRole('button',{name:'Ver resultado'}).tap();await result(page);await expect(page.locator('[class*="resultStats"] strong').last()).toHaveText('7');await context.close();
});
test('memória: vira cartas, tenta novamente e conclui seis pares',async({page})=>{
  await page.goto('/category/fruits/play/memory');const cards=page.locator('[class*="memoryGrid"] button');const revealed=new Map<number,string>();
  for(let i=0;i<12;i+=2){for(const index of [i,i+1]){await cards.nth(index).click();const label=(await cards.nth(index).getAttribute('aria-label'))!;const word=fruits.find(w=>label===w.english||label===w.portuguese||label.startsWith(w.english+',')||label.startsWith(w.portuguese+','));revealed.set(index,word!.id);}if(await page.getByRole('button',{name:'Tentar outro par'}).isVisible())await page.getByRole('button',{name:'Tentar outro par'}).click();}
  for(const id of new Set(revealed.values())){const pair=[...revealed].filter(([,word])=>word===id).map(([index])=>index);if(await cards.nth(pair[0]).isEnabled()){await cards.nth(pair[0]).click();await cards.nth(pair[1]).click();}}
  await page.getByRole('button',{name:'Ver resultado'}).click();await result(page);
});
test('categorização atribui resultados às palavras de cada categoria',async({page})=>{
  await page.goto('/category/fruits/play/categorize');
  for(let i=0;i<12;i++){
    const english=await page.locator('[class*="categorizeWord"] h3').innerText();const options=page.locator('[class*="options"] button');
    for(const button of await options.all()){const title=(await button.innerText()).trim();const group=catalog.find(c=>title.includes(c.title));if(group?.words.some(w=>w.english===english)){await button.click();break;}}
    const finish=page.getByRole('button',{name:'Ver resultado'});if(await finish.isVisible()){await finish.click();break;}await page.getByRole('button',{name:'Continuar',exact:true}).click();
  }
  await result(page);
});
test('montagem de palavras permite corrigir e concluir',async({page})=>{
  await page.goto('/category/fruits/play/spell');
  for(let round=0;round<5;round++){
    const alt=await page.locator('[class*="spellingPrompt"] img').getAttribute('alt');const word=fruits.find(w=>w.portuguese===alt)!;
    for(const letter of word.english.toUpperCase().replace(/[^A-Z]/g,''))await page.getByRole('button',{name:`Letra ${letter}`,exact:true}).and(page.locator(':enabled')).first().click();
    await page.getByRole('button',{name:'Conferir'}).click();await expect(page.getByText('Você montou a palavra!')).toBeVisible();await page.getByRole('button',{name:round===4?'Ver resultado':'Próxima palavra',exact:true}).click();
  }
  await result(page);
});
test('caça-palavras é resolúvel por teclado e arraste',async({page})=>{
  await page.goto('/category/fruits/play/search');const buttons=page.locator('[data-cell]');const grid=await buttons.allTextContents();const size=Math.sqrt(grid.length);const targets=await page.locator('[class*="searchWords"] span[lang=en]').allTextContents();
  for(const [index,target] of targets.entries()){
    const word=target.replace(/[^a-z]/gi,'').toUpperCase();let solution:number[]=[];
    for(let start=0;start<grid.length;start++)for(const [dr,dc] of [[0,1],[1,0],[1,1],[0,-1],[-1,0],[-1,-1],[1,-1],[-1,1]]){const r=Math.floor(start/size),c=start%size;const cells=Array.from(word,(_,i)=>({r:r+dr*i,c:c+dc*i}));if(cells.every(p=>p.r>=0&&p.r<size&&p.c>=0&&p.c<size)&&cells.map(p=>grid[p.r*size+p.c]).join('')===word)solution=cells.map(p=>p.r*size+p.c);}
    expect(solution.length).toBeGreaterThan(1);
    if(index===0){const first=(await buttons.nth(solution[0]).boundingBox())!;const last=(await buttons.nth(solution.at(-1)!).boundingBox())!;await page.mouse.move(first.x+first.width/2,first.y+first.height/2);await page.mouse.down();await page.mouse.move(last.x+last.width/2,last.y+last.height/2,{steps:10});await page.mouse.up();}
    else{await buttons.nth(solution[0]).focus();await page.keyboard.press('Enter');await buttons.nth(solution.at(-1)!).focus();await page.keyboard.press('Enter');}
    await expect(page.getByRole('status')).toContainText('Você encontrou');
  }
  await page.getByRole('button',{name:'Ver resultado'}).click();await result(page);
});
test('PWA: baixa pacote, reabre offline com imagem e áudio, remove sem perder progresso',async({page,context})=>{
  await page.goto('/category/fruits/play/learn');await finishLearning(page);await page.goto('/downloads');
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();
  const pack=page.locator('#fruits');await pack.getByRole('button',{name:'Baixar',exact:true}).click();await expect(pack.getByText('Disponível offline')).toBeVisible();
  await context.setOffline(true);await page.close();const reopened=await context.newPage();await reopened.goto('http://127.0.0.1:4173/category/fruits/play/learn');await expect(reopened.getByRole('heading',{name:'Apple',exact:true})).toBeVisible();
  expect(await reopened.locator('[class*="flashcard"]>img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  const audio=await reopened.evaluate(async()=>{const response=await fetch('/audio/apple.mp3');const bytes=await response.arrayBuffer();const audioContext=new AudioContext();const decoded=await audioContext.decodeAudioData(bytes);await audioContext.close();return{duration:decoded.duration,size:bytes.byteLength};});expect(audio.duration).toBeGreaterThan(.2);expect(audio.size).toBeGreaterThan(1000);
  await reopened.getByRole('button',{name:'Ouvir palavra'}).click();await expect(reopened.locator('[role=alert]')).toHaveCount(0);
  await reopened.goto('http://127.0.0.1:4173/category/fruits/play/categorize');await expect(reopened.getByText('A categorização precisa de pelo menos duas categorias')).toBeVisible();
  await reopened.goto('http://127.0.0.1:4173/downloads');await reopened.locator('#fruits').getByRole('button',{name:'Remover Frutas'}).click();await expect(reopened.locator('#fruits').getByText('Disponível offline')).toHaveCount(0);
  await reopened.goto('http://127.0.0.1:4173/progress');await expect(reopened.getByText('8 de 8 palavras visitadas')).toBeVisible();
});
test('arquivos publicados não incluem o original ou dependências externas obrigatórias',async({page,request})=>{
  const external:string[]=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4173')&&!r.url().startsWith('data:'))external.push(r.url());});await page.goto('/');await page.getByRole('link',{name:'Vamos começar'}).click();expect(external).toEqual([]);
  const manifest=await request.get('/manifest.webmanifest');const data=await manifest.json();expect(data.display).toBe('standalone');expect(data.icons.some((i:{purpose:string})=>i.purpose==='maskable')).toBe(true);
});
