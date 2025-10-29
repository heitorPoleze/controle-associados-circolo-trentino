import { Telefone } from "../Classes/Telefone";
import { Pool, RowDataPacket, ResultSetHeader, PoolConnection } from 'mysql2/promise';
import { Repositorio } from "./Repositorio";
import { RepositorioAssociado } from "./RepositorioAssociado";
import { Associado } from "../Classes/Associado/Associado";

interface TelefoneRow extends RowDataPacket {
    uuidTelefone: string;
    ddd: string;
    numero: string;
    uuidAssociado: string;
}

export class RepositorioTelefone extends Repositorio<Telefone> {
    constructor(conexao: Pool) {
        super(conexao, 'telefones', 'uuidTelefone');
    }

    async toDomain(row: TelefoneRow): Promise<Telefone | null> {
        try {
            const repAssociado = new RepositorioAssociado(this.conexao);
            const associado = await repAssociado.buscarTodosOsAtributosPorId(row.uuidAssociado);
            if (associado) {
                return new Telefone(row.ddd, row.numero, associado, row.uuidTelefone);
            }
            return null
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar telefone: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar o telefone.');
        }

    }
    async criar(telefone: Telefone, poolConection: PoolConnection): Promise<Telefone> {
        const sql = `INSERT INTO ${this.tabela} (${this.colunaUuid}, ddd, numero, uuidAssociado) VALUES (?, ?, ?, ?)`;

        try {
            const [result] = await poolConection.query<ResultSetHeader>(sql, [telefone.uuid, telefone.ddd, telefone.numero, telefone.associado.uuid]);

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

       async buscarPorIdAssociado(uuidAssociado: string): Promise<Telefone | null> {
        const sql = `SELECT * FROM ${this.tabela} WHERE uuidAssociado = ?`;
        try{
            const [rows] = await this.conexao.query<TelefoneRow[]>(sql, [uuidAssociado]);

            const [result] = rows

             if (!result){
                return null;
            }

            return this.toDomain(result);
        }catch(error){
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar o endereço.');
        }
   }
}
