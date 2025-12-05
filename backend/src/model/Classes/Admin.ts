
export class Admin {
    private _login: string;
    private _senha: string;
    constructor(login: string, senha: string) {
        this._login = login;
        this._senha = senha;
    }   

    get login(): string {
        return this._login;
    }
    set login(value: string) {
        this._login = value;
    }

    get senha(): string {
        return this._senha;
    }
    set senha(value: string) {
        this._senha = value;
    }
}