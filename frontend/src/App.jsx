import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';
import useStore from './stateManager';
import Login from './components/Login';
import Practica from './components/Practica';
import Cronometro from './components/Cronometro';
import Principal from './components/Principal';
import "./assets/App.css"
import { useEffect } from 'react';
import p5 from 'p5';
import cubo3D from './assets/cubo3d';
import "./assets/App.css"
function App() {
  //const { numero, incrementaNumero } = useStore();
  //<nav><Link to="/">Login</Link> <Link to="/principal">principal</Link> <Link to="/cronometro">cronometro</Link> <Link to="/practica">practica</Link></nav>
  useEffect(()=>{
    let sketchInstance;
    sketchInstance = new p5(cubo3D, 'cubo');
    return () => {
      sketchInstance.remove();
    };    
},[])
  return (
    <BrowserRouter>
      <div id='cubo'></div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/principal" element={<Principal/>} />
        <Route path="/cronometro" element={<Cronometro/>} />
        <Route path="/practica" element={<Practica/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
