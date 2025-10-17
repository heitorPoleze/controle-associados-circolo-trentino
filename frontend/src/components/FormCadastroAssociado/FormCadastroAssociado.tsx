import { useState, type ChangeEvent, type FormEvent } from "react";
import FormDadosPessoais from "../FormDadosPessoais/FormDadosPessoais";
import FormTelefone from "../FormTelefone/FormTelefone";
import FormEndereco from "../FormEndereco/FormEndereco";

const initialState = {
    nome: '',
    dataNascimento: '', 
    sexo: '', 
    email: '', 
    cpf: '', 
    familia: '', 
    localOrigem: '', 
    
    ddd: '', 
    numero: '', 
    
    logradouro: '', 
    bairro: '', 
    cidade: '', 
    uf: '', 
    cep: '', 
    pais: 'Brasil',
};

function FormCadastroAssociado() {
    const [formData, setFormData] = useState(initialState);
    const [erro, setErro] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErro(null);


        const payload = {
            nome: formData.nome,
            dataNascimento: formData.dataNascimento,
            sexo: formData.sexo,
            email: formData.email,
            cpf: formData.cpf,
            familia: formData.familia,
            localOrigem: formData.localOrigem,
            telefone: {
                ddd: formData.ddd,
                numero: formData.numero
            },
            endereco: {
                logradouro: formData.logradouro,
                bairro: formData.bairro,
                cidade: formData.cidade,
                uf: formData.uf,
                cep: formData.cep,
                pais: formData.pais,
            },
        };

        try {
            // await criarAssociado(payload);
            // mudar payload

            alert('Associado cadastrado com sucesso!');
            setFormData(initialState); 

        } catch (error) {
            console.error("Erro ao cadastrar associado:", error);
            if (error instanceof Error) {
                setErro(`Falha ao cadastrar associado: ${error.message}`);
            } else {
                setErro("Ocorreu um erro desconhecido. Tente novamente.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <h1>Cadastro de Associados</h1>

            <FormDadosPessoais data={formData} onChange={handleChange} />
            <FormTelefone data={formData} onChange={handleChange} />
            <FormEndereco data={formData} onChange={handleChange} />

            <button type="submit">Cadastrar</button>
            
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
        </form>
    );
}

export default FormCadastroAssociado;