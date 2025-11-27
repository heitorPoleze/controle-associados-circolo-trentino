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
    enderecos: EnderecoPayload[];
    telefones: TelefonePayload[];
    anotacoes: AnotacaoPayload[];
}

export class AssociadoService {
    private _repAssociado: RepositorioAssociado;
    private _repEndereco: RepositorioEndereco;
    private _repTelefone: RepositorioTelefone;
    private _repAnotacao: RepositorioAnotacao;
    constructor() {
        this._repAssociado = new RepositorioAssociado(conexao);
        this._repEndereco = new RepositorioEndereco(conexao);
        this._repTelefone = new RepositorioTelefone(conexao);
        this._repAnotacao = new RepositorioAnotacao(conexao);
    }

    payloadToAssociado = (row: RowDataPacket) => {
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
/*
    async buscarDadosCompletosDosAssociados(): Promise<AssociadoPayload[]> {
        const sql = `SELECT * FROM associados a
                    LEFT JOIN enderecos e 
                    ON a.uuidAssociado = e.uuidAssociado_FK
                    LEFT JOIN telefones t
                    ON a.uuidAssociado = t.uuidAssociado_FK
                    LEFT JOIN anotacoes an
                    ON a.uuidAssociado = an.uuidAssociado_FK;`;

        const mapAssociados = new Map<string, AssociadoPayload>();
        try {
            const [rows] = await this._conexao.query<RowDataPacket[]>(sql);

            for (const row of rows) {
                if (!mapAssociados.has(row.uuidAssociado)) {

                    mapAssociados.set(row.uuidAssociado, this.payloadToAssociado(row));
                }

                const associado = mapAssociados.get(row.uuidAssociado);
                if (!associado) {
                    throw new Error('Ocorreu um erro ao buscar os associados.');
                }

                if (row.uuidEndereco) {
                    if (!associado.enderecos.some(endereco => endereco.uuid == row.uuidEndereco)) {
                        const endereco = EnderecoService.payloadToEndereco(row);
                        associado.enderecos.push(endereco);
                    }
                }
                if (row.uuidTelefone) {
                    if (!associado.telefones.some(telefone => telefone.uuid == row.uuidTelefone)) {
                        const telefone = TelefoneServices.payloadToTelefone(row);
                        associado.telefones.push(telefone)
                    }
                }

                if (row.uuidAnotacao) {
                    if (!associado.anotacoes.some(anotacao => anotacao.uuid == row.uuidAnotacao)) {
                        const anotacao = AnotacaoService.payloadToAnotacao(row);
                        associado.anotacoes.push(anotacao);
                    }
                }
            }
            return Array.from(mapAssociados.values());
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar associados: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os associados.');
        }
    }
*/
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
        const connection = await conexao.getConnection();
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

            dados.enderecos.map(endereco => {
                const enderecoObjeto = new Endereco(
                    endereco.logradouro,
                    endereco.bairro,
                    endereco.cidade,
                    endereco.uf,
                    endereco.cep,
                    endereco.pais,
                    associado
                );
                return this._repEndereco.criar(enderecoObjeto, connection);
            });

            dados.telefones.map(telefone => {
                const telefoneObjeto = new Telefone(
                    telefone.ddd,
                    telefone.numero,
                    associado
                );
                return this._repTelefone.criar(telefoneObjeto, connection);
            })
            await connection.commit();
            return associado;
        } catch (error) {
            connection.rollback();
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
            const associado = await this._repAssociado.buscarTodosOsAtributosPorId(uuidAssociado);
            if (!associado) {
                return null;
            }

            const enderecos = await this._repEndereco.buscarPorIdAssociado(uuidAssociado);
            const enderecosEmPayload = enderecos ? enderecos.map(endereco => {
                return {
                    logradouro: endereco.logradouro,
                    bairro: endereco.bairro,
                    cidade: endereco.cidade,
                    uf: endereco.uf,
                    cep: endereco.cep,
                    pais: endereco.pais,
                    uuid: endereco.uuid
                }
            }) : null;

            const telefones = await this._repTelefone.buscarPorIdAssociado(uuidAssociado);
            const telefonesEmPayload = telefones ? telefones.map(telefone => {
                return {
                    ddd: telefone.ddd,
                    numero: telefone.numero,
                    uuid: telefone.uuid
                }
            }) : null;

            const anotacoes = await this._repAnotacao.buscarPorIdAssociado(uuidAssociado);
            const anotacoesEmPayload = anotacoes ? anotacoes.map(anotacao => {
                return {
                    descricao: anotacao.descricao,
                    dataAnotacao: anotacao.dataAnotacao,
                    uuid: anotacao.uuid
                }
            }) : null;

            const payload: AssociadoPayload = {
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
                enderecos: enderecosEmPayload || [],
                telefones: telefonesEmPayload || [],
                anotacoes: anotacoesEmPayload || []
            }
            return payload;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }

    async updateAssociado(id: string, atributos: string[]): Promise<AssociadoPayload | null> {
        try{
            const associado = await this._repAssociado.update(id, atributos);

            if (!associado) {
                return null;
            }
            return {
                uuid: associado.uuid,
                nome: associado.nome,
                familia: associado.familia,
                localOrigem: associado.localOrigem,
                dataNascimento: associado.dataNascimento,
                sexo: associado.sexo,
                email: associado.email,
                cpf: associado.cpf,
                condicao: associado.condicao,
                dataAssociacao: associado.dataAssociacao,
                enderecos: [],
                telefones: [],
                anotacoes: []
            }
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