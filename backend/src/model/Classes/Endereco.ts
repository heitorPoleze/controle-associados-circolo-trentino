import { v4 as uuidv4 } from "uuid";
import { Associado } from "./Associado/Associado";

export class Endereco {
    private _uuid: string
    private _logradouro: string;
    private _bairro: string;
    private _cidade: string;
    private _uf: string;
    private _cep: string;
    private _pais: string;
    private _associado: Associado;

    constructor(logradouro: string, bairro: string, cidade: string, uf: string, cep: string, pais: string = "Brasil", associado: Associado, uuid?:string) {
        if (logradouro.length > 255 || logradouro.length === 0)throw new Error("Logradouro inválido. O logradouro deve ter entre 1 e 255 caracteres.");
        if(bairro.length > 100 || bairro.length === 0)throw new Error("Bairro inválido. O bairro deve ter entre 1 e 100 caracteres.");
        if(cidade.length > 100 || cidade.length === 0)throw new Error("Cidade inválido. A cidade deve ter entre 1 e 100 caracteres.");
        if(uf.length !== 2)throw new Error("UF inválida. O UF deve ter 2 dígitos.");
        if(cep.length !== 8 ||  isNaN(Number(cep)))throw new Error("CEP inválido.");
        if(pais.length > 50 || pais.length === 0)throw new Error("País inválido. O país deve ter entre 1 e 50 caracteres.");
        
        this._uuid = uuid ?? uuidv4();
        this._logradouro = logradouro;
        this._bairro = bairro;
        this._cidade = cidade;
        this._uf = uf.toUpperCase();
        this._cep = cep;
        this._pais = pais;
        this._associado = associado;
    }

    get logradouro(): string {
        
        return this._logradouro;
    }
    set logradouro(logradouro: string) {
        if (logradouro.length > 255 || logradouro.length === 0)throw new Error("Logradouro inválido. O logradouro deve ter entre 1 e 255 caracteres.");
        this._logradouro = logradouro;
    }

    get bairro(): string {
        return this._bairro;
    }
    set bairro(bairro: string) {
        if(bairro.length > 100 || bairro.length === 0)throw new Error("Bairro inválido. O bairro deve ter entre 1 e 100 caracteres.");
        this._bairro = bairro;
    }

    get cidade(): string {
        return this._cidade;
    }
    set cidade(cidade: string) {
        if(cidade.length > 100 || cidade.length === 0)throw new Error("Cidade inválido. A cidade deve ter entre 1 e 100 caracteres.");
        this._cidade = cidade;
    }

    get uf(): string {
        return this._uf;
    }
    set uf(uf: string) {        
        if(uf.length !== 2)throw new Error("UF inválida. O UF deve ter 2 dígitos.");     
        this._uf = uf;
    }

    get cep(): string {
        return this._cep;
    }
    set cep(cep: string) {
         if(cep.length !== 8 && isNaN(Number(cep)))throw new Error("CEP inválido.");
        this._cep = cep;
    }

    get pais(): string {
        return this._pais;
    }
    set pais(pais: string) {
        if(pais.length > 50 || pais.length === 0)throw new Error("País inválido. O país deve ter entre 1 e 50 caracteres.");
        this._pais = pais;
    }

    get associado(): Associado {
        return this._associado;
    }

    set associado(associado: Associado) {
        this._associado = associado;
    }
    get uuid(): string {
        return this._uuid;
    }


}