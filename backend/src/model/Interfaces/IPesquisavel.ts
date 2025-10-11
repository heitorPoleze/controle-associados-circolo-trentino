export interface IPesquisavel<Classe> {
    buscarTodosOsAtributosPorId(id: string): Promise<Classe | null>;
}   