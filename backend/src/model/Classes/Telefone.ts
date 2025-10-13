import { v4 as uuidv4 } from "uuid";
export class Telefone {
    private _uuid: string;
    private _ddd: string;
    private _numero: string;

    constructor(ddd: string, numero: string, uuid?: string) {
        this._uuid = uuid ?? uuidv4();
        this.verificaLengthDdd(ddd);
        this.verificaLengthNumero(numero);
        this._ddd = ddd;
        this._numero = numero;
    }

    verificaLengthDdd(ddd: string): void {
        if (String(ddd).length !== 2 && String(ddd).length !== 3)
            throw new Error("DDD inválido. O DDD deve ter 2 ou 3 dígitos.");
    }

    verificaLengthNumero(numero: string): void {
        if (String(numero).length !== 9 && String(numero).length !== 8) {
            throw new Error("Número inválido. O número deve ter 8 ou 9 dígitos.");
        }
    }

    get uuid(): string {
        return this._uuid;
    }

    get ddd(): string {
        return this._ddd;
    }

    get numero(): string {
        return this._ddd;
    }
    get numeroFormatado(): string {
        const numTelefone5PrimeirosDigitos = this._numero.slice(0, 5);

        const numTelefoneRestante = this._numero.slice(5);

        return `${numTelefone5PrimeirosDigitos}-${numTelefoneRestante}`;
    }
    get numeroCompleto(): string {
        return `(${this.ddd}) ${this.numeroFormatado}`;
    }
}