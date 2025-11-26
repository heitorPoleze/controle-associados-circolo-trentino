import { useEffect, useState } from "react";
import { AssociadoServices, type AssociadoData } from "../services/AssociadoServices";
import { useParams } from "react-router-dom";

function AssociadoDetalhado(){
    const {id} = useParams();
    const [associado, setAssociado] = useState<AssociadoData>();
      useEffect(() => {
        async function buscarAssociado(): Promise<void> {
          const assServices = new AssociadoServices();
          if(id){
            const associado = await assServices.getAssociadoDetalhado(id);
            setAssociado(associado);
          }
          
        }
        buscarAssociado();
      }, [id]);
    
    return (
        <>
        <h1>{associado?.nome}</h1>
        <p>{associado?.familia}</p>
        <p>{associado?.localOrigem}</p>
        <p>{associado?.dataNascimento}</p>
        <p>{associado?.sexo}</p>
        <p>{associado?.email}</p>
        <p>{associado?.cpf}</p>
        <p>{associado?.dataAssociacao}</p>
        <p>{associado?.condicao}</p>
        </>
    )
}

export default AssociadoDetalhado;