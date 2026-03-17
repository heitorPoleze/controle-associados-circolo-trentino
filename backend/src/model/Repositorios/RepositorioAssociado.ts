import { Pool, PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { sexo } from "../../controller/types/sexo";
import { condicao } from "../../controller/types/condicao";
import { Repositorio } from "./Repositorio";
import { Associado } from "../Classes/Associado/Associado";
interface AssociadoRow extends RowDataPacket{
    uuidAssociado: string;
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
        super(conexao, 'associados', 'uuidAssociado');
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
            row.uuidAssociado,
            row.dataAssociacao
        )
    }

    async criar(associado: Associado, poolConection: PoolConnection): Promise<Associado> {
        const sql = `INSERT INTO ${this.tabela} (${this.colunaUuid}, nome, familia, localOrigem, dataNascimento, sexo, email, cpf, condicao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        try{
            const [row] = await poolConection.query<ResultSetHeader>(sql, [associado.uuid,associado.nome, associado.familia, associado.localOrigem, associado.dataNascimento, associado.sexo, associado.email, associado.cpf, associado.condicao]);
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

    //TODO: implementar o código do associado e dar ORDER BY nele
    async buscarTodos(): Promise<Associado[]> {
        const sql = `SELECT * FROM ${this.tabela} ORDER BY dataAssociacao DESC;`;
        try {
            const [rows] = await this.conexao.query<AssociadoRow[]>(sql);
            
            return rows.map((row) => this.toDomain(row));
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar ${this.tabela}: ${error.message}`);
            }
            throw new Error(`Ocorreu um erro desconhecido ao buscar ${this.tabela}.`);
        }
    }

    async buscarAssociadoCompletoPorId(uuid: string): Promise<any> {
        const sql = `
        SELECT
            a.uuidAssociado, a.nome, a.familia, a.localOrigem, a.dataNascimento, a.sexo, a.email, a.cpf, a.condicao, a.dataAssociacao,
            e.uuidEndereco, e.logradouro, e.bairro, e.cidade, e.uf, e.cep, e.pais,
            t.uuidTelefone, t.ddd, t.numero,
            an.uuidAnotacao, an.descricao, an.dataAnotacao
        FROM
            associados a
        LEFT JOIN
            enderecos e ON a.uuidAssociado = e.uuidAssociado_FK
        LEFT JOIN
            telefones t ON a.uuidAssociado = t.uuidAssociado_FK
        LEFT JOIN
            anotacoes an ON a.uuidAssociado = an.uuidAssociado_FK
        WHERE
            a.uuidAssociado = ?;
        `;
        try {
            const [rows] = await this.conexao.query<RowDataPacket[]>(sql, [uuid]);
            return rows;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar associado completo: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar associado completo.');
        }
    }


}
