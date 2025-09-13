"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocioArtistico = void 0;
const Associado_1 = require("./Associado");
class SocioArtistico extends Associado_1.Associado {
    constructor(nome, cpf, dataNascimento, sexo, endereco, telefone, email, condicao) {
        super(nome, cpf, dataNascimento, sexo, endereco, telefone, email, condicao);
    }
}
exports.SocioArtistico = SocioArtistico;
//# sourceMappingURL=SocioArtistico.js.map