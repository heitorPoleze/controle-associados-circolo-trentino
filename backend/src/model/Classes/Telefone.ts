import { v4 as uuidv4 } from "uuid";
export class Telefone {
    private _uuid: string;
    private _ddd: number;
    private _numero: number;

    constructor(ddd: number, numero: number, uuid?: string) {
        this._uuid = uuid ?? uuidv4();
        if (String(ddd).length !== 2 || String(ddd).length !== 3) {
            throw new Error("DDD inválido. O DDD deve ter 2 ou 3 dígitos.");
        }

        if (String(numero).length !== 9 || String(numero).length !== 8) {
            throw new Error("Número inválido. O número deve ter 8 ou 9 dígitos.");
        }
        this._ddd = ddd;
        this._numero = numero;
    }

    get uuid(): string {
        return this._uuid;
    }

    get ddd(): number {
        return this._ddd;
    }

    get numero(): number {
        return this._numero;
    }
    get numeroFormatado(): string {
        const numeroStr = String(this._numero);

        const numTelefone5PrimeirosDigitos = numeroStr.slice(0, 5);

        const numTelefoneRestante = numeroStr.slice(5);

        return `${numTelefone5PrimeirosDigitos}-${numTelefoneRestante}`;
    }
    get numeroCompleto(): string {
        return `(${this._ddd}) ${this.numeroFormatado}`;
    }
}