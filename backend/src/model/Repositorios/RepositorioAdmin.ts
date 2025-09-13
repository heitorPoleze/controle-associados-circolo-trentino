import { ResultSetHeader } from "mysql2";
import { conexao } from "../../config/sql";
import { formaPagamento } from "../../controller/types/formaPagamento";
import { Admin } from "../Classes/Admin";
import { Pagante } from "../Classes/Associado/Pagante";
import { sexo } from "../../controller/types/sexo";
import { Endereco } from "../Classes/Endereco";

export class RepositorioAdmin {
    async cadastrarPagamento(admin: Admin, associado: Pagante, formaPagamento: formaPagamento) {
        const pagamento = admin.cadastrarPagamento(associado, formaPagamento);

        const [result] = await conexao.query<ResultSetHeader>('INSERT INTO pagamentos (idPagamento, dataPagamento, valor, formaPagamento, idAssociado) VALUES (?, ?, ?, ?, ?)', [pagamento.idPagamento, pagamento.dataPagamento, pagamento.valor, pagamento.formaPagamento, pagamento.associado.idAssociado]);

        if (result.affectedRows === 0) return false;
        return true;
    }

    async cadastrarAssociado(admin: Admin, nome: string, cpf: string, dataNascimento: string, sexo: sexo, endereco: Endereco, telefone: number, email: string) {
        const associado = admin.cadastrarAssociado(nome, cpf, dataNascimento, sexo, endereco, telefone, email);

        // ver heranca banco de dados para saber insert em qual tabela
        const [result] = await conexao.query<ResultSetHeader>('INSERT INTO associados ()')

        if (result.affectedRows === 0) return false;
        return true;
    } 


}