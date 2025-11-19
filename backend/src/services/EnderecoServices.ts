import { RowDataPacket } from "mysql2";

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

export class EnderecoService {
    public static payloadToEndereco (row: RowDataPacket) {
        return {
            logradouro: row.logradouro || "",
            bairro: row.bairro || "",
            cidade: row.cidade || "",
            uf: row.uf || "",
            cep: row.cep || "",
            pais: row.pais || "Brasil",
            uuidAssociado: row.uuidAssociado || "",
        }
    }
}