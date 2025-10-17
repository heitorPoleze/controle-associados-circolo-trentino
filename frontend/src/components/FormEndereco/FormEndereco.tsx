import type { ChangeEvent } from "react";


interface FormEnderecoProps {
    data: {
        logradouro: string;
        bairro: string;
        cidade: string;
        uf: string;
        cep: string;
        pais: string;
    };
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormEndereco({ data, onChange }: FormEnderecoProps) {
    return (
        <fieldset>
            <legend>Endereço</legend>
            <div>
                <label htmlFor="logradouro">Logradouro:</label>
                <input type="text" id="logradouro" name="logradouro" value={data.logradouro} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="bairro">Bairro:</label>
                <input type="text" id="bairro" name="bairro" value={data.bairro} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" value={data.cidade} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="uf">UF:</label>
                <input type="text" id="uf" name="uf" value={data.uf} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="cep">CEP:</label>
                <input type="number" id="cep" name="cep" value={data.cep} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="pais">País:</label>
                <input type="text" id="pais" name="pais" value={data.pais} onChange={onChange} />
            </div>
        </fieldset>
    );
}

export default FormEndereco;