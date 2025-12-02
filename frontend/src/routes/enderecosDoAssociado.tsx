import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EnderecoServices, type EnderecoData } from "../services/EnderecoServices";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Card from "../components/Cards/Card/Card";

function EnderecosDoAssociado() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null); 
    const [enderecos, setEnderecos] = useState<EnderecoData[]>([]);
    useEffect (() => {
        async function carregarDados() {
            if(id){
                const serviceEndereco = new EnderecoServices();
                const enderecos = await serviceEndereco.getEnderecosDoAssociado(id);
                setEnderecos(enderecos);
                if(!enderecos) setErro('Ocorreu um erro ao buscar os enderecos.');
                setLoading(false);
            }
        }
        carregarDados();
    } , [id]);

    if(loading) return <Loading message="Buscando enderecos..." />

    return (
        <>
            <h2>Enderecos do Associado</h2>
            {enderecos.map((endereco) => {
                return <Card key={endereco.uuid} titulo={endereco.logradouro} destino={`/enderecos/${endereco.uuid}`}>
                    <p>{endereco.bairro}</p>
                    <p>{endereco.cidade}</p>
                    <p>{endereco.uf}</p>
                    <p>{endereco.cep}</p>
                    <p>{endereco.pais}</p>
                </Card>;
            })}

            {erro && <ErrorMessage message={erro} />}
        
        </> 
    );
}

export default EnderecosDoAssociado;