import { RowDataPacket } from "mysql2";

export interface TelefonePayload {
    ddd: string;
    numero: string;
    uuidAssociado?: string;
    uuid?: string
}

export class TelefoneServices {
    static payloadToTelefone(row: RowDataPacket): TelefonePayload {
        return {
            ddd: row.ddd || "",
            numero: row.numero || "",
            uuidAssociado: row.uuidAssociado || "",
            uuid: row.uuid
        }
    }
}