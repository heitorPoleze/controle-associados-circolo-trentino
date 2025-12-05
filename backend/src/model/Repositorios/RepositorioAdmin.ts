import { Pool } from "mysql2/promise";
import { RowDataPacket } from "mysql2/promise";
import { Admin } from "../Classes/Admin";
export interface AdminRow extends RowDataPacket {
    login: string;
    senha:  string;
}
export class RepositorioAdmin {
    private _conexao: Pool;
    constructor(conexao: Pool) {
        this._conexao = conexao;
    }
    async buscarPorEmail(email: string): Promise<Admin | null> { 
        const sql = `SELECT * FROM admin WHERE login = ? LIMIT 1;`;
        try {
            const [rows] = await this._conexao.query<AdminRow[]>(sql, [email]);

            if (rows[0]) {
            const admin = new Admin(rows[0].login, rows[0].senha);
            return admin;
            }

            return null;

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar o admin.');
        }
    }      
}