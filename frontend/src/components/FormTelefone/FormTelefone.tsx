import { useState } from "react";
import { criarTelefone } from "../../services/telefoneServices";


function FormTelefone() {
  const [ddd, setDdd] = useState('');
  const [numero, setNumero] = useState('');
  const [erro, setErro] = useState<string | null>(null); 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // testar o envio do formulario sem essa linha

    setErro(null);
    const formData = { ddd: ddd, numero: numero };
    
    try {
        await criarTelefone(formData);
        alert('Telefone criado com sucesso!');
        setDdd('');
        setNumero('');
    }catch (error) {
        if (error instanceof Error) setErro(error.message); 
    }
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
          type="text"
          id="numero"
          name="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      {erro && <p className="erro">{erro}</p>}
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormTelefone;