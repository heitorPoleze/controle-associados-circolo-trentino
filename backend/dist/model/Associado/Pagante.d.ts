import { Associado } from "./Associado";
import { sexo } from "../../controller/sexo";
import { Endereco } from "../Endereco";
export declare class Pagante extends Associado {
    constructor(nome: string, cpf: string, dataNascimento: string, sexo: sexo, endereco: Endereco, telefone: number, email: string, condicao: "Ativo");
}
//# sourceMappingURL=Pagante.d.ts.map