import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';
//import useStore from './stateManager';


function App() {
  //const { numero, incrementaNumero } = useStore();

  return (
    <BrowserRouter>
    <div>hiola</div>
    <Link to="/cronometro">a</Link>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cronometro" element={<Cronometro/>} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h1>Weh</h1>
    </div>
  );
}
function Cronometro() {
  return (
    <div>
      <h1>WEEEEEEEEEEEEEEEEEEH</h1>
    </div>
  );
}

export default App;
