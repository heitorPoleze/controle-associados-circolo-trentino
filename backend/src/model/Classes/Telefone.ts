import { v4 as uuidv4 } from "uuid";
export class Telefone {
    private _uuid: string;
    private _ddd: string;
    private _numero: string;

    constructor(ddd: string, numero: string, uuid?: string) {
        this.isNumero(ddd, numero);
        this.verificaLengthDdd(ddd);
        this.verificaLengthNumero(numero);
        
        this._uuid = uuid ?? uuidv4();
        this._ddd = ddd.padStart(3, "0");
        this._numero = numero;
    }

    verificaLengthDdd(ddd: string): void {
        if (ddd.length !== 2 && ddd.length !== 3){
            throw new Error("DDD inválido. O DDD deve ter 2 ou 3 dígitos.");
        }
    }

    verificaLengthNumero(numero: string): void {
        if (numero.length !== 9 && numero.length !== 8) {
            throw new Error("Número inválido. O número deve ter 8 ou 9 dígitos.");
        }
    }

    isNumero(...atributos: string[]){
        atributos.forEach((atributo) => {
        if(isNaN(Number(atributo)))
        throw new Error(atributo + " não é um número")
        });
    }
    get uuid(): string {
        return this._uuid;
    }

    get ddd(): string {
        return this._ddd;
    }

    get numero(): string {
        return this._numero;
    }

    get numeroFormatado(): string {
        if(this._numero.length === 8) {
        const numTelefone4PrimeirosDigitos = this._numero.slice(0, 4);

        const numTelefoneRestante = this._numero.slice(4);

        return `${numTelefone4PrimeirosDigitos}-${numTelefoneRestante}`;
        }

        const numTelefone5PrimeirosDigitos = this._numero.slice(0, 5);

        const numTelefoneRestante = this._numero.slice(5);

        return `${numTelefone5PrimeirosDigitos}-${numTelefoneRestante}`;
    }

    get numeroCompleto(): string {
        return `(${this.ddd}) ${this.numeroFormatado}`;
    }
}