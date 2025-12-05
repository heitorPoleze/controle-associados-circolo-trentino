import { Services } from "./Services";

export interface AnotacaoData {
    descricao: string;
    dataAnotacao?: string;
    uuidAssociado?: string;
    uuid?: string;
}

export class AnotacaoServices extends Services{
    protected _apiAnotacao: string
    constructor() {
        super();
        this._apiAnotacao = `${this._apiUrl}/anotacoes/`;
    }

    async getAnotacao(id: string): Promise<AnotacaoData> {
        try{
            const res = await fetch(`${this._apiAnotacao}${id}`);
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }   
            throw new Error('Ocorreu um erro desconhecido ao buscar as anotacoes.');
        }
    }

    async getAnotacoesDoAssociado(uuidAssociado: string): Promise<AnotacaoData[]> {
        try{
            const res = await fetch(`${this._apiUrl}/associados/${uuidAssociado}/anotacoes`);
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }   
            throw new Error('Ocorreu um erro desconhecido ao buscar as anotacoes.');
        }
    }

    async criarAnotacao(payload: AnotacaoData): Promise<AnotacaoData> {
        try{
            const res = await fetch(this._apiAnotacao, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }   
            throw new Error('Ocorreu um erro desconhecido ao buscar as anotacoes.');
        }
    }

    async deletarAnotacao(id: string): Promise<Response> {
        try{
            const res = await fetch(`${this._apiAnotacao}${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            return res;
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }   
            throw new Error('Ocorreu um erro desconhecido ao buscar as anotacoes.');
        }
    }
}