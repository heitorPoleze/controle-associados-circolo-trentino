import { Endereco } from "../Endereco";
import { sexo } from "../../../controller/types/sexo";
import {v4 as uuidv4} from 'uuid';
import { Telefone } from "../Telefone";

type condicao = "Ativo" | "Inativo" | "Cancelado";
export class Associado {
    private _uuid: string;
    private _nome: string;
    private _familia: string;
    private _localOrigem: string;
    private _dataNascimento: string;
    private _sexo: sexo;
    private _endereco: Endereco;
    private _telefone: Telefone;
    private _email: string;
    private _dataAssociacao: Date;
    private _cpf: string;
    private _condicao: condicao;
    constructor(nome: string,  dataNascimento: string, sexo: sexo, endereco: Endereco, telefone: Telefone, email: string, cpf: string, familia: string = "", localOrigem: string = "", uuid?: string, dataAssociacao?: Date) {
        this._uuid = uuid ?? uuidv4();
        this._dataAssociacao = dataAssociacao ?? new Date(); //data de associação pode ser implementada no banco de dados ao invés do construtor
        this._familia = familia;
        this._localOrigem = localOrigem;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._sexo = sexo;
        this._endereco = endereco;
        this._telefone = telefone;
        this._email = email;
        this._condicao = "Ativo";
    }

    get dataAssociacaoComDetalhes(): Date {
        return this._dataAssociacao;
    }

    get dataAssociacao(): string {
        const date = this._dataAssociacao;
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const dia = String(date.getDate()).padStart(2, "0");
        return `${date.getFullYear()}-${mes}-${dia}`;
    }

    get uuid(): string {
        return this._uuid;
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

    get telefone(): Telefone {
        return this._telefone;
    }
    set telefone(value: Telefone) {
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