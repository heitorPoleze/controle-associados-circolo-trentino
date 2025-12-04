import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './routes/home';
import Associados from './routes/associados/associados';
import AssociadoDetalhado from './routes/associadoDetalhado/associadoDetalhado';
import { NotFound } from './routes/notFound/notFound';
import CadastrarAssociado from './routes/cadastrarAssociado';
import EditarAssociado from './routes/editarAssociado';
import EnderecosDoAssociado from './routes/enderecosDoAssociado';
import EditarEndereco from './routes/editarEndereco';
import CadastrarEndereco from './routes/cadastrarEndereco';

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
        <Route path='/editarAssociado/:id' element= {<EditarAssociado />} />
        <Route path='/enderecosDoAssociado/:id' element={<EnderecosDoAssociado />} />
        <Route path='/associado/:id/enderecos' element = {<CadastrarEndereco/>} />
        <Route path='/enderecos/:id' element = {<EditarEndereco />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      </main>
    </BrowserRouter>
    </>
  )
}

export default App