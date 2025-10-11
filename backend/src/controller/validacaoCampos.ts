export function camposEstaoVazios ([...dados]): boolean {
    return dados.some(dado => dado === "" ? true : false);

}
