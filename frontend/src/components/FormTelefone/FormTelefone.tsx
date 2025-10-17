import type { ChangeEvent } from "react";


interface FormTelefoneProps {
    data: {
        ddd: string;
        numero: string;
    };
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormTelefone({ data, onChange }: FormTelefoneProps) {
    return (
        <fieldset>
            <legend>Telefone</legend>
            <div>
                <label htmlFor="ddd">DDD:</label>
                <input type="number" id="ddd" name="ddd" value={data.ddd} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="numero">Número:</label>
                <input type="text" id="numero" name="numero" value={data.numero} onChange={onChange} />
            </div>
        </fieldset>
    );
}

export default FormTelefone;