const apiUrl = import.meta.env.VITE_API_URL;
const apiEndereco = `${apiUrl}/enderecos`;

interface EnderecoData {
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    pais: string;
}

export async function criarEndereco (enderecoData: EnderecoData) {
    try{
        const resposta = await fetch(apiEndereco, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enderecoData)
        });

        const endereco = await resposta.json();

        if (!resposta.ok) {
            throw new Error(endereco.mensagem);
        }
        return endereco;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}