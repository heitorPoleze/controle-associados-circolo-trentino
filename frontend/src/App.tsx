import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './routes/home';
import Associados from './routes/associados';
import AssociadoDetalhado from './routes/associadoDetalhado';

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />  
      <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/associados' element={<Associados />} />
        <Route path='/associados/:id' element={<AssociadoDetalhado />} />
      </Routes>
      </main>
    </BrowserRouter>
    </>
  )
}

export default App
