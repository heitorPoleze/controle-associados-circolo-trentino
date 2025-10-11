import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Telefone } from "../Classes/Telefone";
import { IPesquisavel } from "../Interfaces/IPesquisavel";
import { Pool } from 'mysql2/promise';

interface TelefoneRow extends RowDataPacket {
    uuidTelefone: string;
    ddd: number;
    numero: number;
}
export class RepostorioTelefone implements IPesquisavel<Telefone> {
    private _conexao: Pool
    constructor(conexao: Pool) {
        this._conexao = conexao
     }
    async criarTelefone(telefone: Telefone): Promise<Telefone> {
        const sql = 'INSERT INTO telefones (uuidTelefone, ddd, numero) VALUES (?, ?, ?)';

        const [result] = await this._conexao.query<ResultSetHeader>(sql, [telefone.uuid, telefone.ddd, telefone.numero]);

        if(result.affectedRows === 0) {
            throw new Error('Erro ao criar telefone no banco de dados');
        }

        return telefone;
    }

    async buscarTodosOsTelefones(): Promise<Telefone[]>{
        const sql = 'SELECT * FROM telefones';
        const [result] = await this._conexao.query<TelefoneRow[]>(sql);
        const telefones = result.map((telefone) => new Telefone(telefone.ddd, telefone.numero, telefone.uuidTelefone));
        //dar console.log(telefones) para entender como é retornado (para saber se coloco .json nas rotas ou não)
        return telefones;
    }

    async buscarTodosOsAtributosPorId(id: string): Promise<Telefone | null> {
        const sql = 'SELECT * FROM telefones WHERE idTelefone = ?';
        const [result] = await this._conexao.query<TelefoneRow[]>(sql, [id]);

        const [telefoneEncontrado] = result; 

        if (!telefoneEncontrado) {
            return null;
        }

        return new Telefone(
            telefoneEncontrado.ddd, 
            telefoneEncontrado.numero, 
            telefoneEncontrado.uuidTelefone);
    }

    get conexao() {
        return this._conexao;
    }
    set conexao(value: Pool) {
        this._conexao = value;
    }
}