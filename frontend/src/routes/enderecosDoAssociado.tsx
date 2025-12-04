import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  EnderecoServices,
  type EnderecoData,
} from "../services/EnderecoServices";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Card from "../components/Cards/Card/Card";
import styles from "../components/Form/Form.module.css";

function EnderecosDoAssociado() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [enderecos, setEnderecos] = useState<EnderecoData[]>([]);
  useEffect(() => {
    async function carregarDados() {
      try{
        if(!id) {
        setErro("Não foi possível identificar o associado.");
      }
        const serviceEndereco = new EnderecoServices();
        const enderecos = await serviceEndereco.getEnderecosDoAssociado(id!);
        setEnderecos(enderecos);
      }catch{
        setErro("Endereços não encontrados.");
      }finally{
        setLoading(false);
      }
    }
    carregarDados();
  }, [id]);


  if (loading) return <Loading message="Buscando enderecos..." />;

  if (erro) return (
    <>
    <ErrorMessage message={erro} />  
    <Link to={`/associado/${id}/enderecos`}>Criar Novo Endereço</Link>
    </>
  
  );
  return (
    <>
      <Link to={`/associado/${id}/enderecos`}>Criar Novo Endereço</Link>
      <h2>Enderecos do Associado</h2>
      <div className={styles['form-container']}>
      {enderecos.map((endereco) => {
        return (
          <Card
            key={endereco.uuid}
            titulo={endereco.logradouro}
            destino={`/enderecos/${endereco.uuid}`}
          >
            <p>{endereco.bairro}</p>
            <p>{endereco.cidade}</p>
            <p>{endereco.uf}</p>
            <p>{endereco.cep}</p>
            <p>{endereco.pais}</p>
          </Card>
        );
      })}
      </div>
    </>
  );
}

export default EnderecosDoAssociado;
