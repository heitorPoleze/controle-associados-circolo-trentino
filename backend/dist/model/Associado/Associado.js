"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Associado = void 0;
class Associado {
    constructor(nome, cpf, dataNascimento, sexo, endereco, telefone, email, condicao) {
        const data = new Date();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        this._dataAssociacao = `${data.getFullYear()}-${mes}-${dia}`;
        this._id = Associado._qtdAssociado++;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._sexo = sexo;
        this._endereco = endereco;
        this._telefone = telefone;
        this._email = email;
        this._condicao = condicao;
    }
    get dataAssociacao() {
        return this._dataAssociacao;
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }
    get cpf() {
        return this._cpf;
    }
    set cpf(value) {
        this._cpf = value;
    }
    get dataNascimento() {
        return this._dataNascimento;
    }
    set dataNascimento(value) {
        this._dataNascimento = value;
    }
    get sexo() {
        return this._sexo;
    }
    set sexo(value) {
        this._sexo = value;
    }
    get endereco() {
        return this._endereco;
    }
    set endereco(value) {
        this._endereco = value;
    }
    get telefone() {
        return this._telefone;
    }
    set telefone(value) {
        this._telefone = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get condicao() {
        return this._condicao;
    }
    set condicao(value) {
        this._condicao = value;
    }
}
exports.Associado = Associado;
Associado._qtdAssociado = 0;
//# sourceMappingURL=Associado.js.map