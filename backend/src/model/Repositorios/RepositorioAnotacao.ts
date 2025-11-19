import { Pool, PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Repositorio } from "./Repositorio";
import { Anotacao } from "../Classes/Anotacao";
import { IBuscavelPorAssociado } from "../Interfaces/IBuscavelPorAssociado";
import { RepositorioAssociado } from "./RepositorioAssociado";

interface AnotacaoRow extends RowDataPacket {
    uuidAnotacao: string;
    descricao: string;
    dataAnotacao: string;
    uuidAssociado: string;
}

export class RepositorioAnotacao extends Repositorio<Anotacao> implements IBuscavelPorAssociado<Anotacao> {
    private _uuidAssociado: string;

    constructor(conexao: Pool) {
        super(conexao, 'anotacoes', 'uuidAnotacao');
        this._uuidAssociado = 'uuidAssociado_FK';
    }

    async toDomain(row: RowDataPacket): Promise<Anotacao | null> {
        const repAssociado = new RepositorioAssociado(this.conexao);
        const associado = await repAssociado.buscarTodosOsAtributosPorId(row.uuidAssociado_FK);
        if (associado) {
            return new Anotacao(
                row.descricao,
                associado,
                row.dataAnotacao,
                row.uuidAnotacao
            );
        }
        return null;    
    }

    async buscarPorIdAssociado(uuidAssociado: string): Promise<Anotacao[] | null> {
        const sql = `SELECT * FROM ${this.tabela} WHERE ${this._uuidAssociado} = ?;`;
        try {
            const [rows] = await this.conexao.query<AnotacaoRow[]>(sql, [uuidAssociado]);

            if (rows.length === 0) {
                return null;
            }

            const anotacoes: Anotacao[] = [];

            for (const row of rows) {
                const anotacao = await this.toDomain(row);
                if (anotacao) {
                    anotacoes.push(anotacao);
                }
            }
            return anotacoes;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a anotação.');
        }
    }

    async criar(anotacao: Anotacao, poolConection: PoolConnection): Promise<Anotacao> {
        const sql = `INSERT INTO ${this.tabela} (${this.colunaUuid}, descricao, dataAnotacao, ${this._uuidAssociado}) VALUES (?, ?, ?, ?)`;

        try {
            const [row] = await poolConection.query<ResultSetHeader>(sql, [anotacao.uuid, anotacao.descricao, anotacao.dataAnotacao, anotacao.associado.uuid]);

            if (row.affectedRows === 0) {
                throw new Error('Nenhuma anotação criada. Falha no banco de dados');
            }

            return anotacao;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao criar a anotação.');
        }
            
    }

    async buscarTodos(): Promise<AnotacaoRow[]> {
        const sql = `SELECT * FROM ${this.tabela};`;
        try {
            const [rows] = await this.conexao.query<AnotacaoRow[]>(sql);
            return rows;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar ${this.tabela}: ${error.message}`);
            }
            throw new Error(`Ocorreu um erro desconhecido ao buscar ${this.tabela}.`);
        }
    }
}