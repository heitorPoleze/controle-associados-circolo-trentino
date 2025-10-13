/*
import { formaPagamento } from "../../controller/types/formaPagamento";
import { sexo } from "../../controller/types/sexo";
import { Anotacao } from "./Anotacao";
import { Associado } from "./Associado/Associado";
import { Pagante } from "./Associado/Pagante";
import { Endereco } from "./Endereco";
import { Pagamento } from "./Pagamento";

export class Admin {
    private _login: string
    private _senha: string
    private _email: string
    constructor(login: string, senha: string , email: string) {
        this._login = login;
        this._senha = senha;
        this._email = email;
    }   

    get login(): string {
        return this._login;
    }
    set login(value: string) {
        this._login = value;
    }

    get senha(): string {
        return this._senha;
    }
    set senha(value: string) {
        this._senha = value;
    }

    get email(): string {
        return this._email;
    }
    set email(value: string) {
        this._email = value;
    }

    cadastrarPagamento(associado: Pagante, formaPagamento: formaPagamento) {
        return new Pagamento(formaPagamento, associado);
    }

    cadastrarAssociado(nome: string, cpf: string, dataNascimento: string, sexo: sexo, endereco: Endereco, telefone: number, email: string) {
        return new Associado(nome, cpf, dataNascimento, sexo, endereco, telefone, email);
    }

    cadastrarAnotacao(descricao: string, associado: Associado, admin: Admin) {
        return new Anotacao(descricao, associado, admin);
    }
}

*/