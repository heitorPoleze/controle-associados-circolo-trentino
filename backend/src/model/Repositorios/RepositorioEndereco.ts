import { Endereco } from "../Classes/Endereco";;
import { Pool, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Repositorio } from "./Repositorio";
import { RepositorioAssociado } from "./RepositorioAssociado";

//isto é um DTO?
interface EnderecoRow extends RowDataPacket {
    uuid: string
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    pais: string;
    uuidAssociado: string
}

export class RepositorioEndereco extends Repositorio<Endereco> {

    constructor(conexao: Pool) {
        super(conexao, 'enderecos', 'uuidEndereco');
    }

    async toDomain(row: EnderecoRow): Promise<Endereco | null> {
        const repAssociado = new RepositorioAssociado(this.conexao);
        const associado = await repAssociado.buscarTodosOsAtributosPorId(row.uuidAssociado);
        if (associado) {
        return new Endereco(
            row.logradouro,
            row.bairro,
            row.cidade,
            row.uf,
            row.cep,
            row.pais,
            associado,
            row.uuid
        );   
        }
        return null;
        
    }


    async criar(endereco: Endereco, poolConection: PoolConnection): Promise<Endereco> {
        const sql = `INSERT INTO ${this.tabela} (${this.colunaUuid}, logradouro, bairro, cidade, uf, cep, pais, uuidAssociado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        try{
            const [row] = await poolConection.query<ResultSetHeader>(sql, [endereco.uuid, endereco.logradouro, endereco.bairro, endereco.cidade, endereco.uf, endereco.cep, endereco.pais, endereco.associado.uuid]);
            if (row.affectedRows === 0) {
                throw new Error('Nenhum endereço criado. Falha no banco de dados');
            }
            return endereco;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao criar o endereço.');
        }
    }
   async buscarPorIdAssociado(uuidAssociado: string): Promise<Endereco | null> {
        const sql = `SELECT * FROM ${this.tabela} WHERE uuidAssociado = ?`;
        try{
            const [rows] = await this.conexao.query<EnderecoRow[]>(sql, [uuidAssociado]);

            const [result] = rows

             if (!result){
                return null;
            }

            return this.toDomain(result);
        }catch(error){
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar o endereço.');
        }
   }
}