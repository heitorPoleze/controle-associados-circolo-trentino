import { RowDataPacket } from "mysql2";
import { RepositorioTelefone } from "../model/Repositorios/RepositorioTelefone";
import { conexao } from "../config/sql";
import { RepositorioAssociado } from "../model/Repositorios/RepositorioAssociado";
import { Pool } from "mysql2/promise";
import { Telefone } from "../model/Classes/Telefone";

export interface TelefonePayload {
    ddd: string;
    numero: string;
    uuidAssociado?: string;
    uuid?: string
}

export class TelefoneServices {
    private _repTelefone: RepositorioTelefone;
    private _repAssociado: RepositorioAssociado;
    private _conexao: Pool;
    constructor() {
        this._conexao = conexao;
        this._repTelefone = new RepositorioTelefone(this._conexao);
        this._repAssociado = new RepositorioAssociado(this._conexao);
    }
    static payloadToTelefone(row: RowDataPacket): TelefonePayload {
        return {
            ddd: row.ddd || "",
            numero: row.numero || "",
            uuidAssociado: row.uuidAssociado || "",
            uuid: row.uuid
        }
    }
    async buscarTodosOsTelefonesDoAssociado(uuidAssociado: string): Promise<TelefonePayload[]> {
        const telefones = await this._repTelefone.buscarPorIdAssociado(uuidAssociado);

        if (!telefones) {
            throw new Error('Telefone não encontrado.');
        }

        const payload = telefones.map(telefone => {
            return {
                ddd: telefone.ddd,
                numero: telefone.numero,
                uuidAssociado: telefone.associado.uuid,
                uuid: telefone.uuid
            }
        });

        return payload;
    }

    async updateTelefone(id: string, payload: TelefonePayload): Promise<TelefonePayload> {
        const updatedPayload = {
            ddd: payload.ddd,
            numero: payload.numero,
        }
        try {
            const telefone = await this._repTelefone.update(id, updatedPayload);
            if (!telefone) {
                throw new Error('Telefone não encontrado');
            }
            return telefone;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }

    async getTelefone(id: string): Promise<TelefonePayload> {
        try {
            const telefone = await this._repTelefone.buscarTodosOsAtributosPorId(id);

            if (!telefone) {
                throw new Error('Telefone não encontrado');
            }

            const payload = {
                ddd: telefone.ddd,
                numero: telefone.numero
            }
            return payload;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }

    async criarTelefone(payload: TelefonePayload): Promise<TelefonePayload> {
        const connection = await this._conexao.getConnection();

        if(!payload.uuidAssociado) throw new Error('Associado não encontrado.');

        try {
            await connection.beginTransaction();

            const associado = await this._repAssociado.buscarTodosOsAtributosPorId(payload.uuidAssociado);

            if(!associado) throw new Error('Associado não encontrado.');

            const telefone = new Telefone(
                payload.ddd,
                payload.numero,
                associado
            );

            const telefoneCriado = await this._repTelefone.criar(telefone, connection);

            await connection.commit();
            return telefoneCriado;

        } catch (error) {
            connection.rollback();
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao criar o telefone.');
        } finally {
            connection.release();
        }
    }

    async deleteTelefone(id: string): Promise<void> {
        try{
            return await this._repTelefone.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }
}