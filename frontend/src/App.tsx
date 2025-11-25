import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import FormTelefone from './components/FormTelefone/FormTelefone';
import FormEndereco from './components/FormEndereco';
import Home from './routes/home';

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />  
      <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/telefones' element={<FormTelefone />} />
        <Route path='/enderecos' element={<FormEndereco />} />        
      </Routes>
      </main>
    </BrowserRouter>
    </>
  )
}

export default App
