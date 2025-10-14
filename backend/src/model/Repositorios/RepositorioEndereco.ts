import { Endereco } from "../Classes/Endereco";;
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Repositorio } from "./Repositorio";
interface EnderecoRow extends RowDataPacket {
    uuid: string
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    pais: string;
}

export class RepositorioEndereco extends Repositorio<Endereco> {

    constructor(conexao: Pool) {
        super(conexao, 'enderecos', 'uuidEndereco');
    }

    toDomain(row: EnderecoRow): Endereco {
        return new Endereco(
            row.logradouro,
            row.bairro,
            row.cidade,
            row.uf,
            row.cep,
            row.pais,
            row.uuid
        )
    }

    async criar(endereco: Endereco): Promise<Endereco> {
        const sql = `INSERT INTO ${this.tabela} (${this.colunaUuid}, logradouro, bairro, cidade, uf, cep, pais) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        try{
            const [row] = await this.conexao.query<ResultSetHeader>(sql, [endereco.uuid, endereco.logradouro, endereco.bairro, endereco.cidade, endereco.uf, endereco.cep, endereco.pais]);
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
   
}