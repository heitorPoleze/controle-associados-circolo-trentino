import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './routes/home';
import Associados from './routes/associados/associados';
import AssociadoDetalhado from './routes/associadoDetalhado';
import { NotFound } from './routes/notFound/notFound';
import CadastrarAssociado from './routes/cadastrarAssociado';

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />  
      <main>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/associados' element={<Associados />} />
        <Route path='/associados/:id' element={<AssociadoDetalhado />} />
        <Route path='/cadastrarAssociado' element={<CadastrarAssociado />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      </main>
    </BrowserRouter>
    </>
  )
}

export default App