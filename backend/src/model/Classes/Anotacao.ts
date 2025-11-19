import {v4 as uuidv4} from 'uuid';
import { Associado } from "./Associado/Associado";

export class Anotacao {
    private _uuid: string;
    private _dataAnotacao: Date | undefined;
    private _descricao: string;
    private _associado: Associado;
    //private _admin: Admin;
    constructor(descricao: string, associado: Associado, dataAnotacao?: Date, uuid?: string) {
        if (descricao.length > 250) throw new Error("Anotação inválida. A anotação deve ter entre 1 e 250 caracteres.");
        this._descricao = descricao;
        this._associado = associado;
        this._dataAnotacao = dataAnotacao
        this._uuid = uuid ?? uuidv4();
    }

    get uuid(): string {
        return this._uuid;
    }

    get descricao(): string {
        return this._descricao;
    }
    set descricao(value: string) {
        this._descricao = value;
    }

    get associado(): Associado {
        return this._associado;
    }
    set associado(value: Associado) {
        this._associado = value;
    }

    get dataAnotacao(): Date | undefined {
        return this._dataAnotacao;
    }
    set dataAnotacao(value: Date) {
        this._dataAnotacao = value;
    }
    
}
