import { useState } from "react";
import styles from "../components/Form/Form.module.css";
import FormEndereco from "../components/Form/FormEndereco/FormEndereco";
import { EnderecoServices, type EnderecoData } from "../services/EnderecoServices";
import { validarEndereco, type ValidationErrors } from "../controllers/validarInputs";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

function CadastrarEndereco() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EnderecoData>({
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    pais: "Brasil",
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

  const validar = (): boolean => {
    const erros = validarEndereco(formData);
    setValidationErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setApiError(null);
      if (validar()) {
        const serviceEndereco = new EnderecoServices();

        try {
            if(id) {
                await serviceEndereco.criarEndereco(formData);
                alert(`Endereço cadastrado com sucesso!`);
                navigate(`/enderecosDoAssociado/${id}`);
            }
        } catch (error) {
          if (error instanceof Error) {
            setApiError(error.message);
          } else {
            setApiError("Erro desconhecido");
          }
        }
      }
  }

  return (
    <div>
      <h1>Cadastrar Endereço</h1>
      <div className={styles["form-container"]}>
        <FormEndereco
          formData={formData}
          onChange={handleChange}
          error={validationErrors}
        />
      </div>
           <button onClick={handleSubmit} className={styles['submit-button']}>Cadastrar</button>
           {apiError && <ErrorMessage message={apiError} />}
    </div>
  );
}

export default CadastrarEndereco;
