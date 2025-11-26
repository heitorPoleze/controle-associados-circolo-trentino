import { useEffect, useState } from "react";
import { AssociadoServices, type AssociadoData } from "../services/AssociadoServices";
import CardAssociadoGeral from "../components/CardAssociadoGeral/CardAssociadoGeral";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

function Associados() {
  const [associados, setAssociados] = useState<AssociadoData[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    async function buscarAssociados(): Promise<void> {
      setLoading(true);
      const assServices = new AssociadoServices();
      try{
        const associados = await assServices.getAssociados();
        setAssociados(associados);
      }catch (error) {
        if(error instanceof Error) {
          setErro(error.message)
        }else{
          setErro("Erro desconhecido");
        }
      }finally{
        setLoading(false);
      }
    }

    buscarAssociados();
  }, []);

    if (loading) {
      return <Loading message="Buscando detalhes do associado..." />;
    }

    if (erro) {
      return <ErrorMessage message={erro} />;
    }
  return (
    <>
      <h1>Associados</h1>
      <div style={{display: "flex", flexWrap: "wrap"}}>
      {associados.map((associado: AssociadoData) => (
        <CardAssociadoGeral key={associado.uuid}  id={associado.uuid} titulo={associado.nome} dataAssociacao={associado.dataAssociacao.split("T")[0]} condicao={associado.condicao}/>
      ))}
      </div>
    </>
  );
}

export default Associados;
