"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagante = void 0;
const Associado_1 = require("./Associado");
class Pagante extends Associado_1.Associado {
    constructor(nome, cpf, dataNascimento, sexo, endereco, telefone, email, condicao) {
        super(nome, cpf, dataNascimento, sexo, endereco, telefone, email, condicao);
    }
}
exports.Pagante = Pagante;
//# sourceMappingURL=Pagante.js.map