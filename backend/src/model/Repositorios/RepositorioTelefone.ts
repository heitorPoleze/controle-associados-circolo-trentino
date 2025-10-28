import { Telefone } from "../Classes/Telefone";
import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Repositorio } from "./Repositorio";

interface TelefoneRow extends RowDataPacket {
    uuidTelefone: string;
    ddd: string;
    numero: string;
}
/*
export class RepositorioTelefone extends Repositorio<Telefone> {
    constructor(conexao: Pool) {
        super(conexao, 'telefones', 'uuidTelefone');
    }

    toDomain(row: TelefoneRow): Telefone {
        return new Telefone(row.ddd, row.numero, row.uuidTelefone);
    }
    async criar(telefone: Telefone): Promise<Telefone> {
        const sql = `INSERT INTO ${this.tabela} (${this.colunaUuid}, ddd, numero) VALUES (?, ?, ?)`;

        try {
            const [result] = await this.conexao.query<ResultSetHeader>(sql, [telefone.uuid, telefone.ddd, telefone.numero]);

            if (result.affectedRows === 0) {
                throw new Error('Nenhum telefone criado. Falha no banco de dados');
            }

            return telefone;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao criar telefone: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao criar o telefone.');
        }


    }
}
*/