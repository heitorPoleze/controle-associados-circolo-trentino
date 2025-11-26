import { useEffect, useState } from "react";
import { AssociadoServices, type AssociadoData } from "../services/AssociadoServices";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loading from "../components/Loading/Loading";

function AssociadoDetalhado(){
    const {id} = useParams();
    const [associado, setAssociado] = useState<AssociadoData>();
    const [erro, setErro] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

      useEffect(() => {
        async function buscarAssociado(): Promise<void> {
          const assServices = new AssociadoServices();
          setLoading(true);
          try{
              if(id){
              const associado = await assServices.getAssociadoDetalhado(id);
              setAssociado(associado);
              if(!associado) {
                throw new Error("Associado não encontrado");
              }
            }
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
        buscarAssociado();
      }, [id]);
      
      if (loading) {
        return <Loading message="Buscando detalhes do associado..." />;
    }

    if (erro) {
      return <ErrorMessage message={erro} />;
    }
        return (
          <>
            {associado && (
                <>
                    <h1 style={{ color: 'var(--color-vinho)' }}>{associado.nome}</h1>
                    
                    <div style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                        <p><strong>Família:</strong> {associado.familia}</p>
                        <p><strong>Origem:</strong> {associado.localOrigem}</p>
                        <p><strong>CPF:</strong> {associado.cpf}</p>
                        <p><strong>Email:</strong> {associado.email}</p>
                        <p><strong>Condição:</strong> {associado.condicao}</p>
                        <p><strong>Desde:</strong> {associado.dataAssociacao}</p>
                    </div> 
                </>                
            )}
          </>
        )
           
}

export default AssociadoDetalhado;