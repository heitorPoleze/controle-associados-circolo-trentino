import { useEffect, useState, useCallback } from "react";
import {
  AssociadoServices,
  type AssociadoData,
} from "../../services/AssociadoServices";
import CardAssociadoGeral from "../../components/Cards/CardAssociadoGeral/CardAssociadoGeral";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import styles from "./associados.module.css";

const assServices = new AssociadoServices();

function Associados() {
  const [associados, setAssociados] = useState<AssociadoData[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const buscarAssociados = useCallback(async (): Promise<void> => {
    setLoading(true);
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
  }, []);

  useEffect(() => {
    buscarAssociados();
  }, [buscarAssociados]);

  if (loading) {
    return <Loading message="Buscando associados..." />;
  }

  return (
    <div className={styles["associados-container"]}>
      <div
       className={styles["header-container"]}
      >
        <h1>Associados</h1>
        <Link
          to="/cadastrarAssociado"
          className={styles["link-cadastrar"]}
        >
          + Cadastrar Associado
        </Link>
      </div>

      {erro? (
        <ErrorMessage message={erro} />
      ) : (
        <div className={styles["cards-container"]}>
          {associados?.map((associado: AssociadoData) => (
            <CardAssociadoGeral
              key={associado.uuid}
              destino={`/associados/${associado.uuid}`}
              titulo={associado.nome}
              dataAssociacao={associado.dataAssociacao?.split("T")[0]}
              condicao={associado.condicao}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Associados;
