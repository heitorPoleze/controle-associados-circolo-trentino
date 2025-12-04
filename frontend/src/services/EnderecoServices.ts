import { Services } from "./Services";

export interface EnderecoData {
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    pais: string;
    uuidAssociado?: string;
    uuid?: string;
}

export class EnderecoServices extends Services{
    protected _apiEndereco: string;

    constructor() {
        super();
        this._apiEndereco = `${this._apiUrl}/enderecos/`;
    }

    async getEndereco(id: string): Promise<EnderecoData> {
        try{
            const res = await fetch(`${this._apiEndereco}${id}`);
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }   
            throw new Error('Ocorreu um erro desconhecido ao buscar os enderecos.');
        }
    }

    async getEnderecosDoAssociado(uuidAssociado: string): Promise<EnderecoData[]> {
        try{
            const res = await fetch(`${this._apiUrl}/associados/${uuidAssociado}/enderecos`);
            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            const dados = await res.json();
            return dados;
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }   
            throw new Error('Ocorreu um erro desconhecido ao buscar os enderecos.');
        }
    }

    async criarEndereco(payload: EnderecoData): Promise<EnderecoData> {
        try{
            const res = await fetch(this._apiEndereco, {
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
            throw new Error('Ocorreu um erro desconhecido ao buscar os enderecos.');
        }
    }

    async editarEndereco(id: string, payload: EnderecoData): Promise<EnderecoData> {
        try{
            const res = await fetch(`${this._apiEndereco}${id}`, {
                method: 'PUT',
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
            throw new Error('Ocorreu um erro desconhecido ao buscar os enderecos.');
        }
    }

    async deleteEndereco(id: string): Promise<Response> { 
        try{
            const res = await fetch(`${this._apiEndereco}${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error(`Erro ao consultar API: ${res.status}`);
            return res;
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }   
            throw new Error('Ocorreu um erro desconhecido ao buscar os enderecos.');
        }
    }
}