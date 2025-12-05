import 'dotenv/config';
import { conexao } from "../config/sql";
import { AdminRow, RepositorioAdmin } from "../model/Repositorios/RepositorioAdmin";
import bycript from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
    private _repositorioAdmin: RepositorioAdmin;
    constructor() {
        this._repositorioAdmin = new RepositorioAdmin(conexao);
    }

    async autenticar(login: string, senha: string): Promise<{ admin: string; token: string }> {
        const admin =  await this._repositorioAdmin.buscarPorEmail(login);
        if (!admin) {
            throw new Error('E-mail ou senha inválidos.');
        }
        const senhaCorreta = await bycript.compare(senha, admin.senha); 
        if (!senhaCorreta) {
            throw new Error('E-mail ou senha inválidos.');
        }
        
        const token = jwt.sign(
            { login: admin.login },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        return { admin: admin.login, token: token };
    }
}