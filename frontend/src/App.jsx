import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';
import useStore from './stateManager';
import Login from './components/Login';
import Practica from './components/Practica';
import Cronometro from './components/Cronometro';
import Principal from './components/Principal';
import "./assets/App.css"

function App() {
  //const { numero, incrementaNumero } = useStore();
  //<nav><Link to="/">Login</Link> <Link to="/principal">principal</Link> <Link to="/cronometro">cronometro</Link> <Link to="/practica">practica</Link></nav>

  return (
    <BrowserRouter>
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
