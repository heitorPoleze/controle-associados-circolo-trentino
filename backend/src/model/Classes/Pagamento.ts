import { formaPagamento } from "../../controller/types/formaPagamento";
import { Pagante } from "./Associado/Pagante";

export class Pagamento {
    private static _qtdPagamento = 0;
    private _idPagamento: string;
    private _dataPagamento: string;
    private _valor: number;
    private _formaPagamento: formaPagamento;
    private _associado: Pagante;

    constructor(formaPagamento: formaPagamento, associado: Pagante) {
        const data = new Date();
        this._dataPagamento = "" + data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
        this._idPagamento = Pagamento._qtdPagamento++ + this._dataPagamento;
        this._valor = 150;
        this._formaPagamento = formaPagamento;
        this._associado = associado;
    }

    get idPagamento(): string {
        return this._idPagamento;
    }

    get dataPagamento(): string {
        return this._dataPagamento;
    }

    get valor(): number {
        return this._valor;
    }
    set valor(value: number) {
        this._valor = value;
    }

    get formaPagamento(): formaPagamento {
        return this._formaPagamento;
    }
    set formaPagamento(value: formaPagamento) {
        this._formaPagamento = value;
    }

    get associado(): Pagante {
        return this._associado;
    }
    set associado(value: Pagante) {
        this._associado = value;
    }
}