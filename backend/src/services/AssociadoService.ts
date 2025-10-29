import { conexao } from "../config/sql";
import { condicao } from "../controller/types/condicao";
import { sexo } from "../controller/types/sexo";
import { Associado } from "../model/Classes/Associado/Associado";
import { Endereco } from "../model/Classes/Endereco";
import { Telefone } from "../model/Classes/Telefone";
import { RepositorioAssociado } from "../model/Repositorios/RepositorioAssociado";
import { RepositorioEndereco } from "../model/Repositorios/RepositorioEndereco";
import { RepositorioTelefone } from "../model/Repositorios/RepositorioTelefone";

interface CriarAssociadoPayload {
    nome: string;
    familia: string;
    localOrigem: string;
    dataNascimento: string;
    sexo: sexo;
    email: string;
    cpf: string;
    condicao: condicao;
    endereco: {
        logradouro: string;
        bairro: string;
        cidade: string;
        uf: string;
        cep: string;
        pais: string;
    };
    telefone: {
        ddd: string;
        numero: string;
    };
}

interface AssociadoCompletoPayload {
    nome: string;
    familia: string;
    localOrigem: string;
    dataNascimento: string;
    sexo: sexo;
    email: string;
    cpf: string;
    condicao: condicao;
    dataAssociacao: Date;
    endereco: {
        logradouro: string;
        bairro: string;
        cidade: string;
        uf: string;
        cep: string;
        pais: string;
    };
    telefone: {
        ddd: string;
        numero: string;
    };
}

export class AssociadoService {
    private _repAssociado: RepositorioAssociado;
    private _repEndereco: RepositorioEndereco;
    private _repTelefone: RepositorioTelefone;
    
    constructor(){
        this._repAssociado = new RepositorioAssociado(conexao);
        this._repEndereco = new RepositorioEndereco(conexao);
        this._repTelefone = new RepositorioTelefone(conexao);
    }

    async criarAssociadoCompleto(dados: CriarAssociadoPayload): Promise<Associado> {
        const connection = await conexao.getConnection();
        try{
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

            const endereco = new Endereco(
                dados.endereco.logradouro,
                dados.endereco.bairro,
                dados.endereco.cidade,
                dados.endereco.uf,
                dados.endereco.cep,
                dados.endereco.pais,
                associado
            );
            await this._repEndereco.criar(endereco, connection);

            const telefone = new Telefone(
                dados.telefone.ddd, 
                dados.telefone.numero, 
                associado
            );
            await this._repTelefone.criar(telefone, connection);
            
            await connection.commit();
            return associado;

        }catch(error){
            connection.rollback();
            if (error instanceof Error) {
                throw new Error(`Erro ao criar a transação: ${error.message}`); 
            }
            throw new Error('Ocorreu um erro desconhecido ao criar a transação.');
        }finally {
            connection.release();
        }
    }


    async buscarAssociadoCompletoPorId(uuidAssociado: string): Promise<AssociadoCompletoPayload | null> {
        try{
        const associado = await this._repAssociado.buscarTodosOsAtributosPorId(uuidAssociado);

        const endereco = await this._repEndereco.buscarPorIdAssociado(uuidAssociado);
        const telefone = await this._repTelefone.buscarPorIdAssociado(uuidAssociado);

        
        if (!associado || !associado.dataAssociacao || !endereco || !telefone){ 
            return null; 
        }

        return {
            nome: associado.nome,
            familia: associado.familia,
            localOrigem: associado.localOrigem,
            dataNascimento: associado.dataNascimento, 
            sexo: associado.sexo,
            email: associado.email,
            cpf: associado.cpf,
            condicao: associado.condicao,
            dataAssociacao: associado.dataAssociacao,
            endereco: {
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                uf: endereco.uf,
                cep: endereco.cep,
                pais: endereco.pais,
            },
            telefone: {
                ddd: telefone.ddd,
                numero: telefone.numero,
            }
        };
    }catch(error){
        if (error instanceof Error) {
            throw new Error(`Erro ao buscar a transação: ${error.message}`); 
        }
        throw new Error('Ocorreu um erro desconhecido ao buscar a transação.');
    }
    }
}