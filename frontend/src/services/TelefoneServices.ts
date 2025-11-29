import { Services } from "./Services";

export interface TelefoneData {
    ddd: string;
    numero: string;
    uuidAssociado?: string;
    uuid?: string;
}

export class TelefoneServices extends Services{
  
    protected _apiTelefone: string
    constructor() {
        super();
        this._apiTelefone = `${this._apiUrl}/telefones/`;
    }

}