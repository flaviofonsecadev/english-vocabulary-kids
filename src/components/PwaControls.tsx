import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';
interface InstallPrompt extends Event {prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>}
export function PwaControls({playing}:{playing:boolean}) {
  const [install,setInstall]=useState<InstallPrompt|null>(null);
  const [help,setHelp]=useState(false);
  const [installed,setInstalled]=useState(window.matchMedia('(display-mode: standalone)').matches || !!(navigator as Navigator & {standalone?:boolean}).standalone);
  const {needRefresh:[needRefresh],updateServiceWorker}=useRegisterSW({onRegisteredSW(_url,registration){ if(registration) window.addEventListener('online',()=>void registration.update()); }});
  useEffect(()=>{
    const prompt=(e:Event)=>{e.preventDefault();setInstall(e as InstallPrompt);};
    const done=()=>{setInstalled(true);setInstall(null);};
    window.addEventListener('beforeinstallprompt',prompt);window.addEventListener('appinstalled',done);
    return ()=>{window.removeEventListener('beforeinstallprompt',prompt);window.removeEventListener('appinstalled',done);};
  },[]);
  return <>{!installed && <button className="installButton" onClick={async()=>{if(install){await install.prompt();const result=await install.userChoice;if(result.outcome==='accepted')setInstalled(true);setInstall(null);}else setHelp(!help);}}><Download size={17}/> Instalar app</button>}
    {help && <div className="installHelp" role="status"><button className="iconButton" aria-label="Fechar instruções" onClick={()=>setHelp(false)}><X size={18}/></button><strong>Leve o inglês com você</strong><p>No iPhone: abra no Safari, toque em Compartilhar e em “Adicionar à Tela de Início”. No Android ou computador: procure “Instalar aplicativo” no menu do navegador.</p><small>Depois, baixe suas categorias para estudar sem internet.</small></div>}
    {needRefresh && <div className="updateNotice" role="status">Uma nova versão está pronta. {playing ? 'Você pode atualizar ao terminar a atividade.' : <button className="primary" onClick={()=>void updateServiceWorker(true)}>Atualizar app</button>}</div>}
  </>;
}
