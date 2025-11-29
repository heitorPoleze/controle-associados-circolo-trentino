import { Services } from "./Services";

export interface AnotacaoData {
    descricao: string;
    dataAnotacao: string;
    uuidAssociado?: string;
    uuid?: string;
}

export class AnotacaoServices extends Services{
    protected _apiAnotacao: string
    constructor() {
        super();
        this._apiAnotacao = `${this._apiUrl}/anotacoes/`;
    }
}