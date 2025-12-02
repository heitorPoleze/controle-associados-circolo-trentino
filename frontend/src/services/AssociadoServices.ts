import type { EnderecoData } from "./EnderecoServices";
import { Services } from "./Services";
import type { TelefoneData } from "./TelefoneServices";

export interface AssociadoData {
    uuid?: string;
    nome: string;
    familia?: string;
    localOrigem?: string;
    dataNascimento: string;
    sexo: string;
    email: string;
    cpf: string;
    condicao: string;
    dataAssociacao?: string;
    enderecos?: EnderecoData[]; 
    telefones?: TelefoneData[];
    anotacoes?: any[];
}

export class AssociadoServices extends Services {
    protected _apiAssociados: string;
    
    constructor() {
        super();
        this._apiAssociados = `${this._apiUrl}/associados/`;
    }

     async getAssociados(): Promise<AssociadoData[]> {
        try {
            const res = await fetch(this._apiAssociados);
            
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);

            const dados = await res.json();
            return dados;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os associados.');
        }
    }

    async getAssociadoDetalhado(id: string): Promise<AssociadoData> {
        try {
            const res = await fetch(`${this._apiAssociados}${id}`);
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os associados.');
        }
    }

    async deleteAssociado(id: string): Promise<true> {
        try{
            const res = await fetch(`${this._apiAssociados}${id}`, {
                method: 'DELETE'
            })
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            return true
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Ocorreu um erro desconhecido ao buscar os associados.');

        }
    }

    async criarAssociado(payload: AssociadoData): Promise<AssociadoData> {
        try {
            const res = await fetch(this._apiAssociados, {
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
            throw new Error('Ocorreu um erro desconhecido ao buscar os associados.');
        }
    }

    async editarAssociado(id: string, payload: AssociadoData): Promise<AssociadoData> {
        try {
            const res = await fetch(`${this._apiAssociados}${id}`, {
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
            throw new Error('Ocorreu um erro desconhecido ao buscar os associados.');
        }
    }
}