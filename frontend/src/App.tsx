import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormTelefone from './components/FormTelefone/FormTelefone';
import FormEndereco from './components/FormEndereco';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/telefones' element={<FormTelefone />} />
        <Route path='/enderecos' element={<FormEndereco />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
