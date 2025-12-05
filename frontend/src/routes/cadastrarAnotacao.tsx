import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AnotacaoServices,
  type AnotacaoData,
} from "../services/AnotacaoServices";
import {
  validarAnotacao,
  type ValidationErrors,
} from "../controllers/validarInputs";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styles from "../components/Form/Form.module.css";
import FormInput from "../components/Form/FormInput/FormInput";
function CadastrarAnotacao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AnotacaoData>({
    descricao: "",
    uuidAssociado: id,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name])
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (validarAnotacao(formData.descricao)) {
      const serviceAnotacao = new AnotacaoServices();
      try {
        if (id) {
          await serviceAnotacao.criarAnotacao(formData);
          alert(`Anotação criada com sucesso!`);
          navigate(`/associados/${id}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError("Erro desconhecido");
        }
      }
    }
  };

  return (
    <div>
      <h1>Cadastrar Anotação</h1>
      <div className={styles["form-container"]}>
        <FormInput
          col={6}
          label="Descrição"
          error={validarAnotacao(formData.descricao)}
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit} className={styles["submit-button"]}>
        Cadastrar
      </button>
      {apiError && <ErrorMessage message={apiError} />}
    </div>
  );
}
export default CadastrarAnotacao;
