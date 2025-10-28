import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { sexo } from "../../controller/types/sexo";
import { condicao } from "../../controller/types/condicao";
import { Repositorio } from "./Repositorio";
import { Associado } from "../Classes/Associado/Associado";
import { Telefone } from "../Classes/Telefone";
import { Endereco } from "../Classes/Endereco";

interface AssociadoRow extends RowDataPacket{
    uuid: string;
    nome: string;
    familia: string;
    localOrigem: string;
    dataNascimento: string;
    sexo: sexo;
    email: string;
    dataAssociacao?: Date;
    cpf: string;
    condicao: condicao;
}   

export class RepositorioAssociado extends Repositorio<Associado>{
    constructor(conexao: Pool) {
        super(conexao, 'associados', 'uuid');
    }
    toDomain(row: AssociadoRow): Associado {
        return new Associado(
            row.nome,
            row.dataNascimento,
            row.sexo,
            row.email,
            row.cpf,
            row.familia,
            row.localOrigem,
            row.condicao,
            row.uuid,
            row.dataAssociacao
        )
    }

    async criar(associado: Associado): Promise<Associado> {
        const sql = `INSERT INTO ${this.tabela} (${this.colunaUuid}, nome, familia, localOrigem, dataNascimento, sexo, email, cpf, condicao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        try{
            const [row] = await this.conexao.query<ResultSetHeader>(sql, [associado.uuid,associado.nome, associado.familia, associado.localOrigem, associado.dataNascimento, associado.sexo, associado.email, associado.cpf, associado.condicao]);
            if(row.affectedRows === 0) {
                throw new Error('Nenhum associado criado. Falha no banco de dados.');
            }
            return associado;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao criar o associado.');
        }
    }

}
