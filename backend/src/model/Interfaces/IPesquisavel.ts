import { RowDataPacket } from "mysql2";

export interface IPesquisavel<Classe> {
    buscarTodosOsAtributosPorId(id: string): Promise<Classe | null>;

    buscarTodos(): Promise<RowDataPacket[] | Classe[]>
}   