import { Endereco } from "../Endereco";
import { sexo } from "../../controller/sexo";
export declare class Associado {
    private _dataAssociacao;
    private _id;
    private _nome;
    private _cpf;
    private _dataNascimento;
    private _sexo;
    private _endereco;
    private _telefone;
    private _email;
    private _condicao;
    private static _qtdAssociado;
    constructor(nome: string, cpf: string, dataNascimento: string, sexo: sexo, endereco: Endereco, telefone: number, email: string, condicao: "Ativo");
    get dataAssociacao(): string;
    get id(): number;
    get nome(): string;
    set nome(value: string);
    get cpf(): string;
    set cpf(value: string);
    get dataNascimento(): string;
    set dataNascimento(value: string);
    get sexo(): sexo;
    set sexo(value: sexo);
    get endereco(): Endereco;
    set endereco(value: Endereco);
    get telefone(): number;
    set telefone(value: number);
    get email(): string;
    set email(value: string);
    get condicao(): string;
    set condicao(value: string);
}
//# sourceMappingURL=Associado.d.ts.map