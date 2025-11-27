import { useEffect, useState } from "react";
import {
  AssociadoServices,
  type AssociadoData,
} from "../../services/AssociadoServices";
import CardAssociadoGeral from "../../components/CardAssociadoGeral/CardAssociadoGeral";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import styles from "./associados.module.css";

function Associados() {
  const [associados, setAssociados] = useState<AssociadoData[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function buscarAssociados(): Promise<void> {
      setLoading(true);
      const assServices = new AssociadoServices();
      try {
        const associados = await assServices.getAssociados();
        setAssociados(associados);
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    }

    buscarAssociados();
  }, []);

  if (loading) {
    return <Loading message="Buscando associados..." />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Associados</h1>
        <Link
          to="/criarAssociado"
          className={styles["link-cadastrar"]}
        >
          + Cadastrar Associado
        </Link>
      </div>

      {erro ? (
        <ErrorMessage message={erro} />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {associados?.map((associado: AssociadoData) => (
            <CardAssociadoGeral
              key={associado.uuid}
              id={associado.uuid}
              titulo={associado.nome}
              dataAssociacao={associado.dataAssociacao.split("T")[0]}
              condicao={associado.condicao}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Associados;
