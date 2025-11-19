import { Pool } from "mysql2/promise"
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
        this._repAnotacao = new RepositorioAnotacao(conexao);
        this._repAssociado = new RepositorioAssociado(conexao);
    }

    async criarAnotacao(payload: AnotacaoPayload): Promise<Anotacao> {
        
        console.log('seguiu')
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
} 