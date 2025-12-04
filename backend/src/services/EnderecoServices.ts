import { RowDataPacket } from "mysql2";
import { RepositorioEndereco } from "../model/Repositorios/RepositorioEndereco";
import { conexao } from "../config/sql";
import { Pool } from "mysql2/promise";
import { RepositorioAssociado } from "../model/Repositorios/RepositorioAssociado";
import { Endereco } from "../model/Classes/Endereco";

export interface EnderecoPayload {
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    pais: string;
    uuidAssociado?: string;
    uuid?: string
}

export class EnderecoService {
    private _repEndereco: RepositorioEndereco;
    private _repAssociado: RepositorioAssociado;
    private _conexao: Pool
    constructor() {
        this._conexao = conexao;
        this._repEndereco = new RepositorioEndereco(this._conexao);
        this._repAssociado = new RepositorioAssociado(this._conexao);
    }
    payloadToEndereco(row: RowDataPacket) {
        return {
            logradouro: row.logradouro || "",
            bairro: row.bairro || "",
            cidade: row.cidade || "",
            uf: row.uf || "",
            cep: row.cep || "",
            pais: row.pais || "Brasil",
            uuidAssociado: row.uuidAssociado || "",
        }
    }

    async buscarTodosOsEnderecosDoAssociado(uuidAssociado: string): Promise<EnderecoPayload[]> {
        const enderecos = await this._repEndereco.buscarPorIdAssociado(uuidAssociado);
        if (!enderecos) {
            throw new Error('Endereço não encontrado');
        }
        const payload = enderecos.map(endereco => {
            return {
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                uf: endereco.uf,
                cep: endereco.cep,
                pais: endereco.pais,
                uuidAssociado: endereco.associado.uuid,
                uuid: endereco.uuid
            }
        });
        return payload;
    }

    async updateEndereco(id: string, payload: EnderecoPayload): Promise<EnderecoPayload> {
        try {
            const updatedPayload = {
                logradouro: payload.logradouro,
                bairro: payload.bairro,
                cidade: payload.cidade,
                uf: payload.uf,
                cep: payload.cep,
                pais: payload.pais
            }
            const endereco = await this._repEndereco.update(id, updatedPayload);

            if (!endereco) {
                throw new Error('Endereço não encontrado');
            }

            return endereco;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação');
        }
    }

    async getEndereco(id: string): Promise<EnderecoPayload> {
        try {
            const endereco = await this._repEndereco.buscarTodosOsAtributosPorId(id);

            if (!endereco) {
                throw new Error('Endereço não encontrado');
            }

            const payload = {
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                uf: endereco.uf,
                cep: endereco.cep,
                pais: endereco.pais
            };
            return payload;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação');
        }
    }

    async criarEndereco(payload: EnderecoPayload): Promise<EnderecoPayload> {
        const connection = await this._conexao.getConnection();
        
        if(!payload.uuidAssociado) throw new Error('Associado não encontrado.');

        try {
            await connection.beginTransaction();

            const associado = await this._repAssociado.buscarTodosOsAtributosPorId(payload.uuidAssociado);

            if(!associado) throw new Error('Associado não encontrado.');

            const endereco = new Endereco(
                payload.logradouro,
                payload.bairro,
                payload.cidade,
                payload.uf,
                payload.cep,
                payload.pais,
                associado
            );

            const enderecoCriado = await this._repEndereco.criar(endereco, connection);

            await connection.commit();
            return enderecoCriado;

        } catch (error) {
            connection.rollback();
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação');
        } finally {
            connection.release();
        }
    }

    async deleteEndereco(id: string): Promise<void> {
        try {
            return await this._repEndereco.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação');
        }
    }
}