import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  TelefoneServices,
  type TelefoneData,
} from "../services/TelefoneServices";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styles from "../components/Form/Form.module.css";
import Card from "../components/Cards/Card/Card";

function TelefonesDoAssociado() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [telefones, setTelefones] = useState<TelefoneData[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        if (!id) {
          setErro("Não foi possível identificar o associado.");
        }
        const serviceTelefone = new TelefoneServices();
        const telefones = await serviceTelefone.getTelefonesDoAssociado(id!);
        setTelefones(telefones);
      } catch {
        setErro("Telefones não encontrados.");
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [id]);

  if (loading) return <Loading message="Buscando enderecos..." />;

  if (erro)
    return (
      <>
        <ErrorMessage message={erro} />
        <Link to={`/associado/${id}/telefones`}>Criar Novo Telefone</Link>
      </>
    );

  return (
  <>
    <Link to={`/associado/${id}/telefones`}>Criar Novo Telefone</Link>
    <h2>Telefones do Associado</h2>
  <div className={styles['form-container']}>
    {telefones.map((telefone) => {
        return (
       <Card
         key={telefone.uuid}
         titulo={telefone.ddd + " " + telefone.numero}
         destino={`/telefones/${telefone.uuid}`}
         />
        )
    })}
  </div>
  </>
);
}

export default TelefonesDoAssociado;
