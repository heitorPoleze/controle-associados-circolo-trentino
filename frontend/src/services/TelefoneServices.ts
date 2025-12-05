import { Services } from "./Services";

export interface TelefoneData {
    ddd: string;
    numero: string;
    uuidAssociado?: string;
    uuid?: string;
}

export class TelefoneServices extends Services {

    protected _apiTelefone: string
    constructor() {
        super();
        this._apiTelefone = `${this._apiUrl}/telefones/`;
    }

    async getTelefone(id: string): Promise<TelefoneData> {
        try {
            const res = await fetch(`${this._apiTelefone}${id}`);
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os telefones.');
        }
    }

    async getTelefonesDoAssociado(uuidAssociado: string): Promise<TelefoneData[]> {
        try {
            const res = await fetch(`${this._apiUrl}/associados/${uuidAssociado}/telefones`);
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os telefones.');
        }
    }

    async criarTelefone(payload: TelefoneData): Promise<TelefoneData> {
        try {
            const res = await fetch(this._apiTelefone, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os telefones.');
        }
    }

    async editarTelefone(id: string, payload: TelefoneData): Promise<TelefoneData> {
        try {
            const res = await fetch(`${this._apiTelefone}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os telefones.');
        }
    }

    async deletarTelefone(id: string): Promise<Response> {
        try {
            const res = await fetch(`${this._apiTelefone}${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            return res;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os telefones.');
        }
    }
}