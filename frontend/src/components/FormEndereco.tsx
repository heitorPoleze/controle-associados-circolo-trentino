/*
import { useState } from "react";
import { criarEndereco } from "../services/enderecoServices";

function FormEndereco(){
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [cep, setCep] = useState('');
    const [pais, setPais] = useState('');
    const [erro, setErro] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const enderecoData = {
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            cep: cep,
            pais: pais
        };
        setErro(null);
        try {
            await criarEndereco(enderecoData);
            alert('Endereço criado com sucesso!');
            setLogradouro('');
            setBairro('');
            setCidade('');
            setUf('');
            setCep('');
            setPais('');
        }catch (error){
            if (error instanceof Error) {
                setErro(error.message);
            }
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Formulário de cadastro de endereço</h2>
            <div>
                <label>Logradouro:</label>
                <input type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />

                <label>Bairro:</label>
                <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />

                <label>Cidade:</label>
                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />

                <label>UF:</label>
                <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} />

                <label>CEP:</label>
                <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />

                <label>País:</label>
                <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} />

                {erro && <p>{erro}</p>}

                <button type="submit">Cadastrar</button>
            </div>
        </form>
    )
}

export default FormEndereco;*/