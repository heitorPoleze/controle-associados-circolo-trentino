export class Services {
    protected _apiUrl: string;
    constructor() {
        this._apiUrl = import.meta.env.VITE_API_URL;
    }

}