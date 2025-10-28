import { Endereco } from "../Endereco";
import { sexo } from "../../../controller/types/sexo";
import {v4 as uuidv4} from 'uuid';
import { Telefone } from "../Telefone";
import { condicao } from "../../../controller/types/condicao";


export class Associado {
    private _uuid: string;
    private _nome: string;
    private _familia: string;
    private _localOrigem: string;
    private _dataNascimento: string;
    private _sexo: sexo;
    private _email: string;
    private _dataAssociacao: Date | undefined;
    private _cpf: string;
    private _condicao: condicao;
    constructor(nome: string,  dataNascimento: string, sexo: sexo, email: string, cpf: string, familia: string = "", localOrigem: string = "",condicao: condicao = "Ativo", uuid?: string, dataAssociacao?: Date) {
        this._uuid = uuid ?? uuidv4();
        this._dataAssociacao = dataAssociacao;
        
        if (familia.length < 0 || familia.length > 100) throw new Error("Familia inválida. A familia deve ter entre 1 e 100 caracteres."); 
        if(localOrigem.length < 0 || localOrigem.length > 100) throw new Error("Local de origem inválido. O local de origem deve ter entre 1 e 100 caracteres.");
        if(nome.length < 0 || nome.length > 100) throw new Error("Nome inválido. O nome deve ter entre 1 e 100 caracteres.");
        if(cpf.length !== 11) throw new Error("CPF inválido. O CPF deve ter 11 caracteres.");
        if(dataNascimento.length !== 10) throw new Error("Data de nascimento inválida. A data de nascimento deve ter 10 caracteres.");
        if(sexo.length !== 1) throw new Error("Sexo inválido. O sexo deve ser M ou F.");
        if(email.length < 0 || email.length > 100) throw new Error("Email inválido. O email deve ter entre 1 e 100 caracteres.");
        if(condicao !== "Ativo" && condicao !== "Inativo" && condicao !== "Cancelado") throw new Error("Condicao inválida. A condicao deve ser Ativo, Inativo ou Cancelado.");

        this._familia = familia;
        this._localOrigem = localOrigem;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._sexo = sexo;
        this._email = email;
        this._condicao = condicao;
    }

    get dataAssociacao(): Date | undefined {
        return this._dataAssociacao;
    }
    get uuid(): string {
        return this._uuid;
    }

    get nome(): string {
        return this._nome;
    }
    set nome(nome: string) {
        if(nome.length < 0 || nome.length > 100) throw new Error("Nome inválido. O nome deve ter entre 1 e 100 caracteres.");
        this._nome = nome;
    }

    get cpf(): string {
        return this._cpf;
    }
    set cpf(cpf: string) {
        if(cpf.length !== 11) throw new Error("CPF inválido. O CPF deve ter 11 caracteres.");
        this._cpf = cpf;
    }

    get dataNascimento(): string {
        
        return this._dataNascimento;
    }
    set dataNascimento(dataNascimento: string) {
        if(dataNascimento.length !== 10) throw new Error("Data de nascimento inválida. A data de nascimento deve ter 10 caracteres.");
        this._dataNascimento = dataNascimento;
    }

    get sexo(): sexo {
        return this._sexo;
    }
    set sexo(sexo: sexo) {
        if(sexo.length !== 1) throw new Error("Sexo inválido. O sexo deve ser M ou F.");
        this._sexo = sexo;
    }

    get email(): string {
        return this._email;
    }
    set email(email: string) {
        if(email.length < 0 || email.length > 100) throw new Error("Email inválido. O email deve ter entre 1 e 100 caracteres.");
        this._email = email;
    }

    get condicao(): condicao {
        return this._condicao;
    }
    set condicao(condicao: condicao) {
        if(condicao !== "Ativo" && condicao !== "Inativo" && condicao !== "Cancelado") throw new Error("Condicao inválida. A condicao deve ser Ativo, Inativo ou Cancelado.");
        this._condicao = condicao;
    }

    get familia(): string {
        
        return this._familia;
    }
    set familia(familia: string) {
        if (familia.length < 0 || familia.length > 100) throw new Error("Familia inválida. A familia deve ter entre 1 e 100 caracteres."); 
        this._familia = familia;
    }

    get localOrigem(): string {
        return this._localOrigem;
    }
    set localOrigem(localOrigem: string) {
        if(localOrigem.length < 0 || localOrigem.length > 100) throw new Error("Local de origem inválido. O local de origem deve ter entre 1 e 100 caracteres.");
        this._localOrigem = localOrigem;
    }
}