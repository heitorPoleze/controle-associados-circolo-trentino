import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormTelefone from './components/FormTelefone/FormTelefone';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/telefones' element={<FormTelefone />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
