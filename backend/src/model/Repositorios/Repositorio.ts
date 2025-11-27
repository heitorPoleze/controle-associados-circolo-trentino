import { Pool, PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { IPesquisavel } from "../Interfaces/IPesquisavel";

export abstract class Repositorio<Classe> implements IPesquisavel<Classe> {
    private _conexao: Pool
    private _tabela: string
    private _colunaUuid: string
    constructor(conexao: Pool, tabela: string, colunaUuid: string) {
        this._conexao = conexao;
        this._tabela = tabela;
        this._colunaUuid = colunaUuid
    }

    abstract toDomain(row: RowDataPacket): Classe | Promise<Classe | null>;
    abstract criar(objeto: Classe, poolConection: PoolConnection): Promise<Classe>;
    abstract buscarTodos(): Promise<RowDataPacket[] | Classe[]>
    async buscarTodosOsAtributosPorId(id: string): Promise<Classe | null> {
        const sql = `SELECT * FROM ${this.tabela} WHERE ${this.colunaUuid} = ?;`;

        try {
            const [rows] = await this.conexao.query<RowDataPacket[]>(sql, [id]);

            const [result] = rows;

            if (!result) {
                return null;
            }
            return this.toDomain(result);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar ${this.tabela} por ID: ${error.message}`);
            }
            throw new Error(`Ocorreu um erro desconhecido ao buscar ${this.tabela} por ID.`);
        }
    }

    async update(id: string, atributos: Record<string, any>): Promise<Classe | null> {
        const colunas = Object.keys(atributos);
        const valores = Object.values(atributos);
        const setClause = colunas.map(col => `${col} = ?`).join(', ');

        const sql = `UPDATE ${this.tabela} SET ${setClause} WHERE ${this.colunaUuid} = ?;`;

        try {
            const params = [...valores, id];

            const [rows] = await this.conexao.query<ResultSetHeader>(sql, params);
            
            if (rows.affectedRows === 0) {
                throw new Error(`Não foi possivel atualizar ${this.tabela} com o ID ${id}.`);
            }
            return await this.buscarTodosOsAtributosPorId(id);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar ${this._tabela} por ID: ${error.message}`);
            }
            throw new Error(`Ocorreu um erro desconhecido ao buscar ${this._tabela} por ID.`);
        }
    }

    async delete(id: string): Promise<void> {
        const sql = `DELETE FROM ${this.tabela} WHERE ${this.colunaUuid} = ?;`;

        try {
            const [rows] = await this.conexao.query<ResultSetHeader>(sql, [id]);

            if (rows.affectedRows === 0) {
                throw new Error(`Não foi possivel atualizar ${this.tabela} com o ID ${id}.`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar ${this._tabela} por ID: ${error.message}`);
            }
            throw new Error(`Ocorreu um erro desconhecido ao buscar ${this._tabela} por ID.`);
        }
    }

    get conexao(): Pool {
        return this._conexao;
    }

    get tabela(): string {
        return this._tabela;
    }

    get colunaUuid(): string {
        return this._colunaUuid;
    }

}