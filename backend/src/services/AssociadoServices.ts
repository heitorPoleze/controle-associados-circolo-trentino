import { Pool, RowDataPacket } from "mysql2/promise";
import { conexao } from "../config/sql";
import { condicao } from "../controller/types/condicao";
import { sexo } from "../controller/types/sexo";
import { Associado } from "../model/Classes/Associado/Associado";
import { Endereco } from "../model/Classes/Endereco";
import { Telefone } from "../model/Classes/Telefone";
import { RepositorioAssociado } from "../model/Repositorios/RepositorioAssociado";
import { RepositorioEndereco } from "../model/Repositorios/RepositorioEndereco";
import { RepositorioTelefone } from "../model/Repositorios/RepositorioTelefone";
import { TelefonePayload } from "./TelefoneServices";
import { EnderecoPayload } from "./EnderecoServices";
import { AnotacaoPayload} from "./AnotacaoServices";
import { RepositorioAnotacao } from "../model/Repositorios/RepositorioAnotacao";

interface AssociadoPayload {
    nome: string;
    familia: string;
    localOrigem: string;
    dataNascimento: string;
    sexo: sexo;
    email: string;
    cpf: string;
    condicao: condicao;
    uuid?: string;
    dataAssociacao?: Date | undefined;
    enderecos?: EnderecoPayload[];
    telefones?: TelefonePayload[];
    anotacoes?: AnotacaoPayload[];
}

interface AssociadoCompletoRow extends RowDataPacket {
    uuidAssociado: string;
    nome: string;
    familia: string;
    localOrigem: string;
    dataNascimento: string;
    sexo: sexo;
    email: string;
    cpf: string;
    condicao: condicao;
    dataAssociacao: Date;
    uuidEndereco: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    pais: string;
    uuidTelefone: string;
    ddd: string;
    numero: string;
    uuidAnotacao: string;
    descricao: string;
    dataAnotacao: Date;
}

export class AssociadoService {
    private _repAssociado: RepositorioAssociado;
    private _repEndereco: RepositorioEndereco;
    private _repTelefone: RepositorioTelefone;
    private _repAnotacao: RepositorioAnotacao;
    private _conexao: Pool
    constructor() {
        this._conexao = conexao;
        this._repAssociado = new RepositorioAssociado(this._conexao);
        this._repEndereco = new RepositorioEndereco(this._conexao);
        this._repTelefone = new RepositorioTelefone(this._conexao);
        this._repAnotacao = new RepositorioAnotacao(this._conexao);
    }

    payloadToAssociado = (row: AssociadoCompletoRow): AssociadoPayload => {
        return {
            nome: row.nome ?? "",
            familia: row.familia ?? "",
            localOrigem: row.localOrigem ?? "",
            dataNascimento: row.dataNascimento ?? "",
            sexo: row.sexo ?? "",
            email: row.email ?? "",
            cpf: row.cpf ?? "",
            condicao: row.condicao ?? "",
            uuid: row.uuidAssociado,
            dataAssociacao: row.dataAssociacao,
            enderecos: [],
            telefones: [],
            anotacoes: []
        }
    }

    async buscarTodos(): Promise<AssociadoPayload[]> {
        try{
            const vetAssociados = await this._repAssociado.buscarTodos();

            const payloadAssociados = vetAssociados.map((associado) => {
                return {
                    nome: associado.nome,
                    familia: associado.familia,
                    localOrigem: associado.localOrigem,
                    dataNascimento: associado.dataNascimento,
                    sexo: associado.sexo,
                    email: associado.email,
                    cpf: associado.cpf,
                    condicao: associado.condicao,
                    uuid: associado.uuid,
                    dataAssociacao: associado.dataAssociacao,
                    enderecos: [],
                    telefones: [],
                    anotacoes: []
                }
            });

            return payloadAssociados;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar associados: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os associados.');
        }
    }

    async criarAssociadoCompleto(dados: AssociadoPayload): Promise<Associado> {
        const connection = await this._conexao.getConnection();
        try {
            await connection.beginTransaction();

            const associado = new Associado(
                dados.nome,
                dados.dataNascimento,
                dados.sexo,
                dados.email,
                dados.cpf,
                dados.familia,
                dados.localOrigem,
                dados.condicao
            );
            await this._repAssociado.criar(associado, connection);

            if (dados.enderecos) {
                for (const endereco of dados.enderecos) {
                    const enderecoObjeto = new Endereco(
                        endereco.logradouro,
                        endereco.bairro,
                        endereco.cidade,
                        endereco.uf,
                        endereco.cep,
                        endereco.pais,
                        associado
                    );
                    await this._repEndereco.criar(enderecoObjeto, connection);
                }
            }

            if (dados.telefones) {
                for (const telefone of dados.telefones) {
                    const telefoneObjeto = new Telefone(
                        telefone.ddd,
                        telefone.numero,
                        associado
                    );
                    await this._repTelefone.criar(telefoneObjeto, connection);
                }
            }
            
            await connection.commit();
            return associado;
        } catch (error) {
            await connection.rollback();
            if (error instanceof Error) {
                throw new Error(`Erro ao criar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao criar a transação.');
        } finally {
            connection.release();
        }
    }

    async buscarAssociadoCompletoPorId(uuidAssociado: string): Promise<AssociadoPayload | null> {
        try {
            const rows = await this._repAssociado.buscarAssociadoCompletoPorId(uuidAssociado);

            if (!rows || rows.length === 0) {
                return null;
            }

            const associado = this.payloadToAssociado(rows[0]);

            const enderecos = new Map<string, EnderecoPayload>();
            const telefones = new Map<string, TelefonePayload>();
            const anotacoes = new Map<string, AnotacaoPayload>();

            rows.forEach((row: AssociadoCompletoRow) => {
                if (row.uuidEndereco && !enderecos.has(row.uuidEndereco)) {
                    enderecos.set(row.uuidEndereco, {
                        logradouro: row.logradouro,
                        bairro: row.bairro,
                        cidade: row.cidade,
                        uf: row.uf,
                        cep: row.cep,
                        pais: row.pais,
                        uuid: row.uuidEndereco
                    });
                }
                if (row.uuidTelefone && !telefones.has(row.uuidTelefone)) {
                    telefones.set(row.uuidTelefone, {
                        ddd: row.ddd,
                        numero: row.numero,
                        uuid: row.uuidTelefone
                    });
                }
                if (row.uuidAnotacao && !anotacoes.has(row.uuidAnotacao)) {
                    anotacoes.set(row.uuidAnotacao, {
                        descricao: row.descricao,
                        dataAnotacao: row.dataAnotacao,
                        uuid: row.uuidAnotacao
                    });
                }
            });

            associado.enderecos = [...enderecos.values()];
            associado.telefones = [...telefones.values()];
            associado.anotacoes = [...anotacoes.values()];

            return associado;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }

    async updateAssociado(id: string, payload: AssociadoPayload): Promise<AssociadoPayload> {
        try{
            const updatedPayload = {
                nome: payload.nome,
                familia: payload.familia,
                localOrigem: payload.localOrigem,
                dataNascimento: payload.dataNascimento,
                sexo: payload.sexo,
                email: payload.email,
                cpf: payload.cpf,
                condicao: payload.condicao
            }
            const associado = await this._repAssociado.update(id, updatedPayload);

            if (!associado) {
                throw new Error('Associado não encontrado.');
            }
            
            return updatedPayload;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }

    async deleteAssociado(id: string): Promise<void> {
       try{
            return await this._repAssociado.delete(id);
       } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }

}