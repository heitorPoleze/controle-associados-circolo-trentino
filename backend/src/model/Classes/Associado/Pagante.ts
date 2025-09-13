import { Associado } from "./Associado";
import { sexo } from "../../../controller/types/sexo";
import { Endereco } from "../Endereco";
export class Pagante extends Associado{
    constructor(nome: string, cpf: string ,dataNascimento: string, sexo: sexo, endereco: Endereco, telefone: number, email: string) {
        super(nome, cpf, dataNascimento, sexo, endereco, telefone, email);
    }
}