import { Pool, RowDataPacket } from "mysql2/promise"
import { conexao } from "../config/sql"
import { RepositorioAnotacao } from "../model/Repositorios/RepositorioAnotacao"
import { Anotacao } from "../model/Classes/Anotacao"
import { RepositorioAssociado } from "../model/Repositorios/RepositorioAssociado"

export interface AnotacaoPayload {
    descricao: string
    dataAnotacao: Date | undefined
    uuidAssociado?: string
    uuid?: string
}

export class AnotacaoService {
    private _repAnotacao: RepositorioAnotacao;
    private _repAssociado: RepositorioAssociado
    private _conexao: Pool;
    constructor() {
        this._conexao = conexao;
        this._repAnotacao = new RepositorioAnotacao(this._conexao);
        this._repAssociado = new RepositorioAssociado(this._conexao);
    }

    public static payloadToAnotacao (row: RowDataPacket) {
        return {
            descricao: row.descricao || "",
            dataAnotacao: row.dataAnotacao,
            uuidAnotacao: row.uuidAnotacao
        }
    }
    async criarAnotacao(payload: AnotacaoPayload): Promise<Anotacao> {
        
        const connection = await this._conexao.getConnection();        
        try {
            await connection.beginTransaction();

            if(!payload.uuidAssociado){
                throw new Error('Associado não encontrado.');
            }
            const associado = await this._repAssociado.buscarTodosOsAtributosPorId(payload.uuidAssociado);
            if(!associado){
                throw new Error('Associado não encontrado.');
            }

            const anotacao = new Anotacao(
                payload.descricao,
                associado,
                payload.dataAnotacao
            );
           
            const anotacaoCriada = await this._repAnotacao.criar(anotacao, connection);
            await connection.commit();
            return anotacaoCriada;

        } catch (error) {
             connection.rollback();
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao criar a anotacao.');
        }finally{
            connection.release();
        }
    }

    async buscarTodasAsAnotacoesDoAssociado(uuidAssociado: string): Promise<AnotacaoPayload[]> {
        const anotacoes = await this._repAnotacao.buscarPorIdAssociado(uuidAssociado);
        if (!anotacoes) {
            throw new Error('Anotação não encontrada.');
        }
        const payload = anotacoes.map(anotacao => {
            return {
                descricao: anotacao.descricao,
                dataAnotacao: anotacao.dataAnotacao,
                uuidAnotacao: anotacao.uuid
            }
        });
        return payload;
    }

    async getAnotacao(id: string): Promise<AnotacaoPayload> {
        try{
            const anotacao = await this._repAnotacao.buscarTodosOsAtributosPorId(id);

            if (!anotacao) {
                throw new Error('Anotação não encontrada.');
            }
            
            const payload = {
                descricao: anotacao.descricao,
                dataAnotacao: anotacao.dataAnotacao
            }

            return payload;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }

    async updateAnotacao(id: string, payload: AnotacaoPayload): Promise<AnotacaoPayload> {
        const updatedPayload = {
            descricao: payload.descricao,
            dataAnotacao: payload.dataAnotacao,
        }
        try{
            const anotacao = await this._repAnotacao.update(id, updatedPayload);
            if (!anotacao) {
                throw new Error('Anotação não encontrada.');
            }
            return anotacao;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }

    async deleteAnotacao(id: string): Promise<void> {
        try{
            return await this._repAnotacao.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }
} 