import { useParams } from "react-router-dom";
import {
  EnderecoServices,
  type EnderecoData,
} from "../services/EnderecoServices";
import { useEffect, useState } from "react";
import {
  validarEndereco,
  type ValidationErrors,
} from "../controllers/validarInputs";
import Loading from "../components/Loading/Loading";
import FormEndereco from "../components/Form/FormEndereco/FormEndereco";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styles from "../components/Form/Form.module.css";
function EditarEndereco() {
  const { id } = useParams();
  const [formData, setFormData] = useState<EnderecoData>({
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    pais: "Brasil",
  });

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [sucesso, setSucesso] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        if (id) {
          const serviceEndereco = new EnderecoServices();
          const endereco = await serviceEndereco.getEndereco(id);
          setFormData(endereco);

          if (!endereco) {
            setLoading(false);
            setErro("Erro ao buscar endereço");
          }
        }
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
    const erros = validarEndereco(formData);
    setValidationErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (validar()) {
      const enderecoServices = new EnderecoServices();
      try {
        if (id) {
          await enderecoServices.editarEndereco(id, formData);
          setSucesso(`Endereço editado com sucesso!`);
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

  const handleDelete = async () => {
    if(!id) throw new Error("Endereço nao encontrado.");
    const confirmacao = window.confirm(
      `Tem certeza que deseja excluir o endereço ${formData.logradouro}?`
    );

    if (confirmacao) {
      setLoading(true);
      const enderecoServices = new EnderecoServices();
      try {
        await enderecoServices.deleteEndereco(id);
        setSucesso(`Endereço excluido com sucesso!`);
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
  };

  if (loading) {
    return <Loading message="Carregando..." />;
  }

  return (
    <>
      <button onClick={handleDelete} className={styles["submit-button"]}>
        EXCLUIR ENDEREÇO
      </button>
      <div className={styles["form-container"]}>
        <FormEndereco
          formData={formData}
          onChange={handleChange}
          error={validationErrors}
        />
      </div>
      <button onClick={handleSubmit} className={styles["submit-button"]}>
        Editar
      </button>
      {erro && <ErrorMessage message={erro} />}
      {sucesso && <p>{sucesso}</p>}
    </>
  );
}

export default EditarEndereco;
