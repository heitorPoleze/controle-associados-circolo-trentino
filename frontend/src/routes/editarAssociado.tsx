import { useEffect, useState } from "react";
import {
  type AssociadoData,
  AssociadoServices,
} from "../services/AssociadoServices";
import { useParams } from "react-router-dom";
import FormDadosPessoais from "../components/Form/FormDadosPessoais/FormDadosPessoais";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loading from "../components/Loading/Loading";
import { validarAssociado, type ValidationErrors } from "../controllers/validarInputs";
import styles from "../components/Form/Form.module.css"

function EditarAssociado() {
  const { id } = useParams();
  const [formData, setFormData] = useState<AssociadoData>({
    nome: "",
    cpf: "",
    dataNascimento: "",
    sexo: "",
    email: "",
    familia: "",
    localOrigem: "",
    condicao: "",
  });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [sucesso, setSucesso] = useState<string | null>(null);

  useEffect (() => {
    async function carregarDados() {
        try{
            if (id){
                const serviceAssociado = new AssociadoServices();
                const associado = await serviceAssociado.getAssociadoDetalhado(id);
                setFormData(associado);

                if(!associado){
                    setErro("Erro ao buscar associado");
                }
            }
        }catch(error) {
            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Erro desconhecido");
            }
        }
        finally{
            setLoading(false);
        }
    }
    carregarDados();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (validationErrors[name])
          setValidationErrors((prev) => ({ ...prev, [name]: null }));
    };

    const validar = (): boolean => {
      const erros = validarAssociado(formData);
      setValidationErrors(erros);
      return Object.keys(erros).length === 0;
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro(null);
        if (validar()) {
            const serviceAssociado = new AssociadoServices();
            try {
                if(id){
                await serviceAssociado.editarAssociado(id, formData);
                setSucesso(`Associado ${formData.nome} editado com sucesso!`);
            }
            } catch (error) {
                if (error instanceof Error) {
                    setErro(error.message);
                } else {
                    setErro("Erro desconhecido");
                }
            }            
        }
    };

    if (loading) {
        return <Loading message="Carregando dados do associado..." />;
    }

  return (
    <>
    <div className={styles['form-container']}>
    <FormDadosPessoais formData={formData} onChange={handleChange} error={validationErrors} />
    </div>
     <button onClick={handleSubmit} className={styles['submit-button']}>Editar</button>
     {erro && <ErrorMessage message={erro} />}  
     {sucesso && <p>{sucesso}</p>}
    </>
  )
}

export default EditarAssociado;
