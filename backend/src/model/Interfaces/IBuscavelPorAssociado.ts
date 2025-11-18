export interface IBuscavelPorAssociado<T> {
    buscarPorIdAssociado(uuidAssociado: string): Promise<T[] | null>;

}