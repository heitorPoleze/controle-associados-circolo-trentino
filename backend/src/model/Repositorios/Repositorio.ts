import { Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
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
    abstract criar(objeto: Classe, poolConection: PoolConnection ): Promise<Classe>;
    async buscarTodosOsAtributosPorId(id: string): Promise<Classe | null>{
        const sql = `SELECT * FROM ${this.tabela} WHERE ${this.colunaUuid} = ?;`;
        
        try{
            const [rows] = await this.conexao.query<RowDataPacket[]>(sql, [id]);
            
            const [result] = rows;

            if (!result){
                return null;
            }
             return this.toDomain(result);
        }
        catch (error){
            if (error instanceof Error){
                throw new Error(`Erro ao buscar ${this.tabela} por ID: ${error.message}`);
            }
            throw new Error(`Ocorreu um erro desconhecido ao buscar ${this.tabela} por ID.`);
        }
    }
    async buscarTodos(): Promise<Classe[]>{
        const sql = `SELECT * FROM ${this.tabela};`;
        try{
            const [rows] = await this.conexao.query<RowDataPacket[]>(sql);

            const result = rows.map((row) => this.toDomain(row));

            const promiseResult = await Promise.all(result);

            const filteredResult = promiseResult.filter((item) => item !== null) as Classe[];

            return filteredResult;
        } catch (error){
            if (error instanceof Error){
                throw new Error(`Erro ao buscar todos os ${this.tabela}: ${error.message}`);
            }
            throw new Error(`Ocorreu um erro desconhecido ao buscar todos os ${this.tabela}.`);
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