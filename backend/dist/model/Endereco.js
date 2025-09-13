"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endereco = void 0;
class Endereco {
    constructor(logradouro, bairro, cidade, uf, cep) {
        this._logradouro = logradouro;
        this._bairro = bairro;
        this._cidade = cidade;
        this._uf = uf;
        this._cep = cep;
    }
    get logradouro() {
        return this._logradouro;
    }
    set logradouro(value) {
        this._logradouro = value;
    }
    get bairro() {
        return this._bairro;
    }
    set bairro(value) {
        this._bairro = value;
    }
    get cidade() {
        return this._cidade;
    }
    set cidade(value) {
        this._cidade = value;
    }
    get uf() {
        return this._uf;
    }
    set uf(value) {
        this._uf = value;
    }
    get cep() {
        return this._cep;
    }
    set cep(value) {
        this._cep = value;
    }
}
exports.Endereco = Endereco;
//# sourceMappingURL=Endereco.js.map