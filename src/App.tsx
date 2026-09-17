import { createContext, useContext, useEffect } from 'react';
import { NavLink, Route, Routes, Link, useLocation } from 'react-router-dom';
import { BookOpen, LayoutGrid, ChartNoAxesCombined, Download, Wifi, WifiOff, Sparkles } from 'lucide-react';
import { useAppData } from './lib/useAppData';
import { stopAudio } from './lib/audio';
import { PwaControls } from './components/PwaControls';
import { Home, CategoryPage } from './pages/Categories';
import { ProgressPage } from './pages/Progress';
import { DownloadsPage } from './pages/Downloads';
import { GamePage } from './games/GamePage';
import styles from './App.module.css';
type Data=ReturnType<typeof useAppData>;
const DataContext=createContext<Data|null>(null);
export function useData(){return useContext(DataContext)!;}
export default function App(){
  const data=useAppData(); const location=useLocation();
  const playing=location.pathname.includes('/play/');
  useEffect(()=>{window.scrollTo(0,0);stopAudio();},[location.pathname]);
  return <DataContext.Provider value={data}><a href="#main" className="skipLink">Pular para o conteúdo</a><div className={styles.shell}>
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.brand}><span className={styles.brandIcon}><BookOpen size={25}/></span><span>English<span className={styles.brandAccent}>Games</span><small>UM MUNDO DE PALAVRAS</small></span></Link>
      <p className={styles.navLabel}>SEU ESPAÇO DE APRENDER</p>
      <nav className={styles.navigation} aria-label="Navegação principal">
        <NavLink to="/" end className={({isActive})=>isActive||location.pathname.startsWith('/category')?styles.active:''}><LayoutGrid size={21}/><span>Categorias</span></NavLink>
        <NavLink to="/progress" className={({isActive})=>isActive?styles.active:''}><ChartNoAxesCombined size={21}/><span>Meu progresso</span></NavLink>
        <NavLink to="/downloads" className={({isActive})=>isActive?styles.active:''}><Download size={21}/><span>Downloads</span></NavLink>
      </nav>
      <div className={styles.sidebarTip}><span>🌱</span><strong>Um pouquinho, todo dia.</strong><p>Cada palavra é uma nova descoberta. Vamos nessa?</p><Link to="/progress">Ver minha jornada <span aria-hidden="true">→</span></Link></div>
      <div className={styles.sidebarBottom}><Sparkles size={16}/><span>Feito para aprender brincando</span></div>
    </aside>
    <div className={styles.content}>
      <header className={styles.topbar}><span className={styles.breadcrumb}>English Games <span>/</span> <strong>Vocabulary</strong></span><div className={styles.headerActions}><span className={`${styles.connection} ${!data.online?styles.offline:''}`}>{data.online?<Wifi size={15}/>:<WifiOff size={15}/>}<span>{data.online?'Online':'Offline'}</span></span><PwaControls playing={playing}/></div></header>
      <main id="main" className={styles.main}>{data.storageError && <p role="alert" className="error">{data.storageError}</p>}<Routes>
        <Route path="/" element={<Home/>}/><Route path="/category/:categoryId" element={<CategoryPage/>}/>
        <Route path="/category/:categoryId/play/:activityId" element={<GamePage/>}/>
        <Route path="/progress" element={<ProgressPage/>}/><Route path="/downloads" element={<DownloadsPage/>}/>
        <Route path="*" element={<div className="empty"><h1>Vamos encontrar outro caminho?</h1><Link className="primary" to="/">Explorar categorias</Link></div>}/>
      </Routes></main>
      <footer className={styles.footer}><span>Pequenas descobertas. Grandes possibilidades.</span><span>Seu progresso fica neste dispositivo.</span></footer>
    </div>
  </div></DataContext.Provider>;
}
