export interface EnderecoPayload{
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    pais: string;
    uuidAssociado?: string;
    uuid?: string
}