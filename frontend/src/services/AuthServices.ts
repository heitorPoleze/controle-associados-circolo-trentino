import { Services } from "./Services";

interface AdminData {
    login: string;
    senha: string;
}

export interface AuthResponse {
    admin: string;
    token: string;
}

export class AuthServices extends Services {
    protected _apiAuth: string;
    constructor() {
        super();
        this._apiAuth = `${this._apiUrl}/login`;
    }

    async autenticar(payload: AdminData): Promise<AuthResponse> {
        try {
            const res = await fetch(this._apiAuth, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao tentar logar.');
        }
    }
}