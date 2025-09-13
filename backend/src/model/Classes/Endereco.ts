export class Endereco {
    private _logradouro: string;
    private _bairro: string;
    private _cidade: string;
    private _uf: string;
    private _cep: string;

    constructor(logradouro: string, bairro: string, cidade: string, uf: string, cep: string) {
        this._logradouro = logradouro;
        this._bairro = bairro;
        this._cidade = cidade;
        this._uf = uf;
        this._cep = cep;
    }

    get logradouro(): string {
        return this._logradouro;
    }
    set logradouro(value: string) {
        this._logradouro = value;
    }

    get bairro(): string {
        return this._bairro;
    }
    set bairro(value: string) {
        this._bairro = value;
    }

    get cidade(): string {
        return this._cidade;
    }
    set cidade(value: string) {
        this._cidade = value;
    }

    get uf(): string {
        return this._uf;
    }
    set uf(value: string) {
        this._uf = value;
    }

    get cep(): string {
        return this._cep;
    }
    set cep(value: string) {
        this._cep = value;
    }
}