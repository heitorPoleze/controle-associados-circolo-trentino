import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormCadastroAssociado from './components/FormCadastroAssociado/FormCadastroAssociado';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormCadastroAssociado />} />
        <Route path='/cadastrar/associado' element={<FormCadastroAssociado />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
