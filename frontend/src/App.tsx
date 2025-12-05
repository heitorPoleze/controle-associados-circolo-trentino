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
import TelefonesDoAssociado from './routes/telefonesDoAssociado';
import EditarTelefone from './routes/editarTelefone';
import CadastrarTelefone from './routes/cadastrarTelefone';
import CadastrarAnotacao from './routes/cadastrarAnotacao';
import AnotacoesDoAssociado from './routes/anotacoesDoAssociado';
import Anotacao from './routes/anotacao';

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
        <Route path='/anotacoesDoAssociado/:id' element={<AnotacoesDoAssociado />} />
        <Route path='/telefonesDoAssociado/:id' element={<TelefonesDoAssociado />} />
        <Route path='/associado/:id/enderecos' element = {<CadastrarEndereco/>} />
        <Route path='/associado/:id/telefones' element = {<CadastrarTelefone/>} />
        <Route path='/associado/:id/anotacoes' element = {<CadastrarAnotacao/>} />
        <Route path='/enderecos/:id' element = {<EditarEndereco />} />
        <Route path='/telefones/:id' element = {<EditarTelefone />} />
        <Route path='/anotacoes/:id' element = {<Anotacao />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      </main>
    </BrowserRouter>
    </>
  )
}

export default App