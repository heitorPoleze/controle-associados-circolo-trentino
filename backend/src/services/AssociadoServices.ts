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
}

export class AssociadoService {
    private _repAssociado: RepositorioAssociado;
    private _repEndereco: RepositorioEndereco;
    private _repTelefone: RepositorioTelefone;
    private _conexao: Pool;

    constructor() {
        this._conexao = conexao;
        this._repAssociado = new RepositorioAssociado(conexao);
        this._repEndereco = new RepositorioEndereco(conexao);
        this._repTelefone = new RepositorioTelefone(conexao);
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

    //FUNÇÃO EXTREMAMENTE GRANDE. COMO REFATORAR?
    async buscarAssociados(): Promise<AssociadoPayload[]> {
        const sql = `SELECT * FROM associados a
                    LEFT JOIN enderecos e 
                    ON a.uuidAssociado = e.uuidAssociado_FK
                    LEFT JOIN telefones t
                    ON a.uuidAssociado = t.uuidAssociado_FK;`;

        const vetAssociados: AssociadoPayload[] = [];
        try {
            const [rows] = await this._conexao.query<RowDataPacket[]>(sql);

            for (const row of rows) {
                const associadoEncontrado = vetAssociados.find(associado => associado.uuid === row.uuidAssociado);
                
                if (!associadoEncontrado) {

                    const payload: AssociadoPayload = {
                        nome: row.nome,
                        familia: row.familia,
                        localOrigem: row.localOrigem,
                        dataNascimento: row.dataNascimento,
                        sexo: row.sexo,
                        email: row.email,
                        cpf: row.cpf,
                        condicao: row.condicao,
                        uuid: row.uuidAssociado,
                        dataAssociacao: row.dataAssociacao,
                        enderecos: [],
                        telefones: []
                    };

                    vetAssociados.push(payload);
                }
                const endereco: EnderecoPayload | null = (row.logradouro) ? {
                    logradouro: row.logradouro,
                    bairro: row.bairro,
                    cidade: row.cidade,
                    uf: row.uf,
                    cep: row.cep,
                    pais: row.pais,
                    uuid: row.uuidEndereco
                } : null;
                if (endereco) {
                    const enderecoDoAssociado = vetAssociados.find(associado => associado.uuid == row.uuidAssociado_FK);

                    if (enderecoDoAssociado) {
                        enderecoDoAssociado.enderecos.push(endereco);
                    }
                }

                const telefone: TelefonePayload | null = (row.numero) ? {
                    ddd: row.ddd,
                    numero: row.numero,
                    uuid: row.uuidTelefone
                } : null;
                if (telefone) {
                    const telefoneDoAssociado = vetAssociados.find(associado => associado.uuid == row.uuidAssociado_FK);

                    if (telefoneDoAssociado) {
                        telefoneDoAssociado.telefones.push(telefone);
                    }
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar associados: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os associados.');
        } finally {
            return vetAssociados;
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
            }): null;
            
            const telefones = await this._repTelefone.buscarPorIdAssociado(uuidAssociado);
            console.log(telefones);
            const telefonesEmPayload = telefones ? telefones.map(telefone => {
                return {
                    ddd: telefone.ddd,
                    numero: telefone.numero,
                    uuid: telefone.uuid
                }
            }): null;

            const payload: AssociadoPayload  = {
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
                telefones: telefonesEmPayload || []
            }
            return payload;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar a transação: ${error.message}`);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
        }
    }
}