import { useState } from "react";
import { criarTelefone } from "../../services/telefoneServices";


function FormTelefone() {
  const [ddd, setDdd] = useState('');
  const [numero, setNumero] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
 
    event.preventDefault();

    const formData = { ddd, numero };
    
    try {
        await criarTelefone(formData);
        alert('Telefone criado com sucesso!');
    }catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
    
    setDdd('');
    setNumero('');
  };

    return (
    <form onSubmit={handleSubmit}>
      <h2>Formulário de Cadastro</h2>
      <div>
        <label htmlFor="ddd">DDD:</label>
        <input
          type="number"
          id="ddd"
          name="ddd"
          placeholder="DDD"
          value={ddd}
          onChange={(e) => setDdd(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="numero">Número:</label>
        <input
          type="number"
          id="numero"
          name="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormTelefone;