import { useNavigate, useParams } from "react-router-dom";
import {
  TelefoneServices,
  type TelefoneData,
} from "../services/TelefoneServices";
import { useEffect, useState } from "react";
import {
  validarTelefone,
  type ValidationErrors,
} from "../controllers/validarInputs";
import Loading from "../components/Loading/Loading";
import styles from "../components/Form/Form.module.css";
import FormTelefone from "../components/Form/FormTelefone/FormTelefone";

function EditarTelefone() {
  const { id } = useParams();
  const [formData, setFormData] = useState<TelefoneData>({
    ddd: "",
    numero: "",
  });
  const [erro, setErro] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        if (id) {
          const serviceTelefone = new TelefoneServices();
          const telefone = await serviceTelefone.getTelefone(id);
          setFormData(telefone);

          if (!telefone) {
            setErro("Telefone não encontrado.");
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
    const erros = validarTelefone(formData);
    setValidationErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (validar()) {
      const telefoneServices = new TelefoneServices();
      setLoading(true);
      try {
        if (id) {
          await telefoneServices.editarTelefone(id, formData);
          alert(`Telefone editado com sucesso!`);
          navigate(`/associados/`);
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
  };

  const handleDelete = async () => {
    if (!id) throw new Error("Endereço nao encontrado.");
    const confirmacao = window.confirm(
      `Tem certeza que deseja excluir o telefone (${formData.ddd})${formData.numero}?`
    );

    if (confirmacao) {
      setLoading(true);
      const telefoneServices = new TelefoneServices();
      try {
        await telefoneServices.deletarTelefone(id);
        alert(`Endereço excluido com sucesso!`);
        navigate(`/associados/`);
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
        EXCLUIR TELEFONE
      </button>
      <div className={styles["form-container"]}>
        <FormTelefone formData={formData} onChange={handleChange} error={validationErrors} />
        <button onClick={handleSubmit} className={styles['submit-button']}>Editar</button>
        {erro && <p className={styles['error-message']}>{erro}</p>}
      </div>
    </>
  );
}

export default EditarTelefone;
