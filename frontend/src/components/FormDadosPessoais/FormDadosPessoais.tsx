import type { ChangeEvent } from "react";

interface FormDadosPessoaisProps {
    data: {
        nome: string;
        dataNascimento: string;
        sexo: string;
        email: string;
        cpf: string;
        familia: string;
        localOrigem: string;
    };
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function FormDadosPessoais({ data, onChange }: FormDadosPessoaisProps) {
    return (
        <fieldset>
            <legend>Dados Pessoais</legend>
            <div>
                <label htmlFor="nome">Nome Completo:</label>
                <input type="text" id="nome" name="nome" value={data.nome} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                <input type="date" id="dataNascimento" name="dataNascimento" value={data.dataNascimento} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="sexo">Sexo:</label>
                <select id="sexo" name="sexo" value={data.sexo} onChange={onChange} required>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                </select>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={data.email} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="cpf">CPF:</label>
                <input type="number" id="cpf" name="cpf" value={data.cpf} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="familia">Familia:</label>
                <input type="text" id="familia" name="familia" value={data.familia} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="localOrigem">Local de Origem:</label>
                <input type="text" id="localOrigem" name="localOrigem" value={data.localOrigem} onChange={onChange} />
            </div>
        </fieldset>
    );
}

export default FormDadosPessoais;