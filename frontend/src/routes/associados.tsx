import { useEffect, useState } from "react";
import { AssociadoServices, type AssociadoData } from "../services/AssociadoServices";
import CardAssociadoGeral from "../components/CardAssociadoGeral/CardAssociadoGeral";

function Associados() {
  const [associados, setAssociados] = useState<AssociadoData[]>([]);
  useEffect(() => {
    async function buscarAssociados(): Promise<void> {
      const assServices = new AssociadoServices();
      const associados = await assServices.getAssociados();
      setAssociados(associados);
    }
    buscarAssociados();
  }, []);

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
