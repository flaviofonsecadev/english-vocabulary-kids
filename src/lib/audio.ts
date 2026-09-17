let current:HTMLAudioElement|undefined;
export function stopAudio() { if(current) {current.pause();current.src='';current=undefined;} }
export async function playWord(url:string) {
  stopAudio();
  current=new Audio(url);
  await current.play();
}
