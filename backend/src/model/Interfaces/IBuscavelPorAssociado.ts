export interface IBuscavelPorAssociado<T> {
    //uuidAssociado: string;

    buscarPorIdAssociado(uuidAssociado: string): Promise<T[] | null>;

}