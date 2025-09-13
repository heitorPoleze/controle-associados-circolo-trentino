import { Endereco } from "../Endereco";
import { sexo } from "../../../controller/types/sexo";
type condicao = "Ativo" | "Inativo" | "Cancelado";
export class Associado {
    private _dataAssociacao: string;
    private _idAssociado: number;
    private _nome: string;
    private _cpf: string;
    private _dataNascimento: string;
    private _sexo: sexo;
    private _endereco: Endereco;
    private _telefone: number;
    private _email: string;
    private _condicao: condicao;
    private static _qtdAssociado: number = 0;
    constructor(nome: string, cpf: string ,dataNascimento: string, sexo: sexo, endereco: Endereco, telefone: number, email: string) {
        const data = new Date();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        this._dataAssociacao = `${data.getFullYear()}-${mes}-${dia}`;
        this._idAssociado = Associado._qtdAssociado++;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._sexo = sexo;
        this._endereco = endereco;
        this._telefone = telefone;
        this._email = email;
        this._condicao = "Ativo";
    }

    get dataAssociacao(): string {
        return this._dataAssociacao;
    }

    get idAssociado(): number {
        return this._idAssociado;
    }

    get nome(): string {
        return this._nome;
    }
    set nome(value: string) {
        this._nome = value;
    }

    get cpf(): string {
        return this._cpf;
    }
    set cpf(value: string) {
        this._cpf = value;
    }

    get dataNascimento(): string {
        return this._dataNascimento;
    }
    set dataNascimento(value: string) {
        this._dataNascimento = value;
    }

    get sexo(): sexo {
        return this._sexo;
    }
    set sexo(value: sexo) {
        this._sexo = value;
    }

    get endereco(): Endereco {
        return this._endereco;
    }
    set endereco(value: Endereco) {
        this._endereco = value;
    }

    get telefone(): number {
        return this._telefone;
    }
    set telefone(value: number) {
        this._telefone = value;
    }

    get email(): string {
        return this._email;
    }
    set email(value: string) {
        this._email = value;
    }

    get condicao(): condicao {
        return this._condicao;
    }
    set condicao(value: condicao) {
        this._condicao = value;
    }
}