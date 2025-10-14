import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { sexo } from "../../controller/types/sexo";
import { condicao } from "../../controller/types/condicao";
import { Repositorio } from "./Repositorio";
import { Associado } from "../Classes/Associado/Associado";
import { Telefone } from "../Classes/Telefone";
import { Endereco } from "../Classes/Endereco";

interface AssociadoRow extends RowDataPacket{
    uuid: string;
    nome: string;
    familia: string;
    localOrigem: string;
    dataNascimento: string;
    sexo: sexo;
    uuidEndereco: string;
    uuidTelefone: string;
    email: string;
    dataAssociacao?: Date;
    cpf: string;
    condicao: condicao;
}   

export class RepositorioAssociado extends Repositorio<Associado>{
    private _telefone: Telefone;
    private _endereco: Endereco;
    constructor(conexao: Pool, telefone: Telefone, endereco: Endereco) {
        super(conexao, 'associados', 'uuidAssociado');
        this._telefone = telefone;
        this._endereco = endereco;
    }
    toDomain(row: AssociadoRow): Associado {
        return new Associado(
            row.nome,
            row.dataNascimento,
            row.sexo,
            this._endereco, 
            this._telefone,
            row.email,
            row.cpf,
            row.familia,
            row.localOrigem,
            row.condicao,
            row.uuid,
            row.dataAssociacao
        )
    }

    async criar(associado: Associado): Promise<Associado> {
        const sql = `INSERT INTO ${this.tabela} (${this.colunaUuid}, nome, familia, localOrigem, dataNascimento, sexo, uuidEndereco, uuidTelefone, email, dataAssociacao, cpf, condicao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        try{
            const [row] = await this.conexao.query<ResultSetHeader>(sql, [associado.nome, associado.familia, associado.localOrigem, associado.dataNascimento, associado.sexo, associado.endereco.uuid, associado.telefone.uuid, associado.email, associado.dataAssociacao, associado.cpf, associado.condicao]);
            if(row.affectedRows === 0) {
                throw new Error('Nenhum associado criado. Falha no banco de dados.');
            }
            return associado;
        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao criar o associado.');
        }
    }

    get telefone(): Telefone {
        return this._telefone;
    }
    set telefone(value: Telefone) {
        this._telefone = value;
    }

    get endereco(): Endereco {
        return this._endereco;
    }
    set endereco(value: Endereco) {
        this._endereco = value;
    }
}
