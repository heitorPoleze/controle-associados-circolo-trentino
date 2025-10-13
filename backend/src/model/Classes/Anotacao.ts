/*
import { Admin } from "./Admin";
import { Associado } from "./Associado/Associado";

export class Anotacao {
    private static _qtdAnotacoes = 0;
    private _idAnotacao: string;
    private _dataAnotacao: string;
    private _descricao: string;
    private _associado: Associado;
    private _admin: Admin;
    constructor(descricao: string, associado: Associado, admin: Admin) {
        const data = new Date();
        this._dataAnotacao = "" + data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
        this._idAnotacao = Anotacao._qtdAnotacoes++ + this._dataAnotacao;
        this._descricao = descricao;
        this._associado = associado;
        this._admin = admin;
    }

    get idAnotacao(): string {
        return this._idAnotacao;
    }

    get dataAnotacao(): string {
        return this._dataAnotacao;
    }

    get descricao(): string {
        return this._descricao;
    }
    set descricao(value: string) {
        this._descricao = value;
    }

    get associado(): Associado {
        return this._associado;
    }
    set associado(value: Associado) {
        this._associado = value;
    }

    get admin(): Admin {
        return this._admin;
    }
    
}
*/