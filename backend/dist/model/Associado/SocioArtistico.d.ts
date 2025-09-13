import { sexo } from "../../controller/sexo";
import { Endereco } from "../Endereco";
import { Associado } from "./Associado";
export declare class SocioArtistico extends Associado {
    constructor(nome: string, cpf: string, dataNascimento: string, sexo: sexo, endereco: Endereco, telefone: number, email: string, condicao: "Ativo");
}
//# sourceMappingURL=SocioArtistico.d.ts.map