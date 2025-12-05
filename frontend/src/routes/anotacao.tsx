import { useParams } from "react-router-dom";
import { AnotacaoServices, type AnotacaoData } from "../services/AnotacaoServices";
import { useEffect, useState } from "react";

function Anotacao () {
    const { id } = useParams();
    const [formData, setFormData] = useState<AnotacaoData>({
        descricao: "",
        uuidAssociado: id,
    });

    const [erro, setErro] = useState<string | null>(null);

     useEffect(() => {
        async function carregarDados() {
          try {
            if (id) {
              const anotacaoServices = new AnotacaoServices();
              const endereco = await anotacaoServices.getAnotacao(id);
              setFormData(endereco);
    
              if (!endereco) {
                setErro("Erro ao buscar endereço");
              }
            }
          } catch (error) {
            if (error instanceof Error) {
              setErro(error.message);
            } else {
              setErro("Erro desconhecido");
            }
          }
        }
        carregarDados();
      }, [id]);

      const handleDelete = async () => {
        if(!id) throw new Error("Anotação não encontrada");

        const confirmacao = window.confirm("Tem certeza que deseja deletar esta anotação?");
        if (confirmacao) {
            try {
                const anotacaoServices = new AnotacaoServices();
                await anotacaoServices.deletarAnotacao(id);
                window.location.href = "/associados";
            } catch (error) {
                if (error instanceof Error) {
                    setErro(error.message);
                } else {
                    setErro("Erro desconhecido");
                }
            }
        }
      };    

    return (
        <div>
            <h1>Anotação</h1>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <p><strong>Descrição:</strong> {formData.descricao}</p>
            <p><strong>Data da Anotação:</strong>{formData.dataAnotacao}</p>
            <button onClick={handleDelete}>Deletar Anotação</button>
        </div>
    );
}
export default Anotacao;