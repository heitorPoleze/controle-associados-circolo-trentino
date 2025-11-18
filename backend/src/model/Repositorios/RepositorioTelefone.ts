import { Telefone } from "../Classes/Telefone";
import { Pool, RowDataPacket, ResultSetHeader, PoolConnection } from 'mysql2/promise';
import { Repositorio } from "./Repositorio";
import { RepositorioAssociado } from "./RepositorioAssociado";
import { Associado } from "../Classes/Associado/Associado";
import { IBuscavelPorAssociado } from "../Interfaces/IBuscavelPorAssociado";

interface TelefoneRow extends RowDataPacket {
    uuidTelefone: string;
    ddd: string;
    numero: string;
    uuidAssociado: string;
}

export class RepositorioTelefone extends Repositorio<Telefone> implements IBuscavelPorAssociado<Telefone> {
    private _uuidAssociado: string
    constructor(conexao: Pool) {
        super(conexao, 'telefones', 'uuidTelefone');
        this._uuidAssociado = 'uuidAssociado_FK';
    }

    async toDomain(row: TelefoneRow): Promise<Telefone | null> {
        try {
            const repAssociado = new RepositorioAssociado(this.conexao);
            const associado = await repAssociado.buscarTodosOsAtributosPorId(row.uuidAssociado_FK);
            if (associado) {
                return new Telefone(
                    row.ddd,
                    row.numero, 
                    associado, 
                    row.uuidTelefone);
            }
            return null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar telefone: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar o telefone.');
        }

    }
    async criar(telefone: Telefone, poolConection: PoolConnection): Promise<Telefone> {
        const sql = `INSERT INTO ${this.tabela} (${this.colunaUuid}, ddd, numero, ${this._uuidAssociado}) VALUES (?, ?, ?, ?)`;

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

    async buscarPorIdAssociado(uuidAssociado: string): Promise<Telefone[] | null> {
        const sql = `SELECT * FROM ${this.tabela} WHERE ${this._uuidAssociado} = ?`;
        try {
            const [rows] = await this.conexao.query<TelefoneRow[]>(sql, [uuidAssociado]);
             
            if (rows.length === 0) {
                return null;
            }

            const telefones: Telefone[] = [];

            for (const row of rows) {
                const telefone = await this.toDomain(row);
                if (telefone) {
                    telefones.push(telefone);
                }
            }
            return telefones;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar o endereço.');
        }
    }

    async buscarTodos(): Promise<TelefoneRow[]> {
        const sql = `SELECT * FROM ${this.tabela};`;
        try {
            const [rows] = await this.conexao.query<TelefoneRow[]>(sql);

            return rows;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar ${this.tabela}: ${error.message}`);
            }
            throw new Error(`Ocorreu um erro desconhecido ao buscar ${this.tabela}.`);
        }
    }
}
