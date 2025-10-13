const apiUrl = import.meta.env.VITE_API_URL;
const apiTelefone = `${apiUrl}/telefones`;

interface TelefoneData {
    ddd: string;
    numero: string;
}

export async function criarTelefone(telefoneData: TelefoneData) {
    try{
        const resposta = await fetch(apiTelefone, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(telefoneData)
        });
        
        const telefone = await resposta.json();
        if (!resposta.ok) {
            throw new Error(telefone.mensagem);
        }
        return telefone;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
}