import React, { useState } from "react";
import {
  AssociadoServices,
  type AssociadoData,
} from "../services/AssociadoServices";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import FormDadosPessoais from "../components/Form/FormDadosPessoais/FormDadosPessoais";
import FormTelefone from "../components/Form/FormTelefone/FormTelefone";
import FormEndereco from "../components/Form/FormEndereco/FormEndereco";
import {
  regexManterApenasNumeros,
  validarAssociado,
  validarEndereco,
  validarTelefone,
  type ValidationErrors,
} from "../controllers/validarInputs";
import type { TelefoneData } from "../services/TelefoneServices";
import type { EnderecoData } from "../services/EnderecoServices";
import styles from "../components/Form/Form.module.css"

function CadastrarAssociado() {
  const [formData, setFormData] = useState<AssociadoData>({
    nome: "",
    cpf: "",
    dataNascimento: "",
    sexo: "M",
    email: "",
    familia: "",
    localOrigem: "",
    condicao: "Ativo",
  });

  const [telefone, setTelefone] = useState<TelefoneData>({
    ddd: "",
    numero: "",
  });
  const [endereco, setEndereco] = useState<EnderecoData>({
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    pais: "Brasil",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [criado, setCriado] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name])
        setValidationErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTelefone((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name])
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name])
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
  };


  const validar = (): boolean => {
    let errosTotais: ValidationErrors = {};

    const errosPessoais = validarAssociado(formData);
    errosTotais = { ...errosTotais, ...errosPessoais };

    const errosTel = validarTelefone(telefone);
    errosTotais = { ...errosTotais, ...errosTel };

    const errosEnd = validarEndereco(endereco);
    errosTotais = { ...errosTotais, ...errosEnd };

    setValidationErrors(errosTotais);
    return Object.keys(errosTotais).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setCriado(null);
    
    if (validar()) {
      const payload: AssociadoData = {
        ...formData,
        cpf: regexManterApenasNumeros(formData.cpf),
        telefones: [{...telefone, numero:regexManterApenasNumeros(telefone.numero)}],
        enderecos: [{...endereco, cep: regexManterApenasNumeros(endereco.cep)}],
      } 
      const serviceAssociado = new AssociadoServices();
      try {
        await serviceAssociado.criarAssociado(payload);
        setCriado(`Associado ${formData.nome} cadastrado com sucesso!`);
        
        setFormData({
          nome: "",
          cpf: "",
          dataNascimento: "",
          sexo: "M",
          email: "",
          familia: "",
          localOrigem: "",
          condicao: "Ativo",
        });

        setTelefone({
          ddd: "",
          numero: "",
        });

        setEndereco({
          logradouro: "",
          bairro: "",
          cidade: "",
          uf: "",
          cep: "",
          pais: "Brasil",
        });
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        }
      }
    }
  };

  return (
    <>
      <h1>Cadastrar Associado</h1>
      <div className={styles['form-container']}>
        <FormDadosPessoais
        formData={formData}
        onChange={handleChange}
        error={validationErrors}
      />
      <FormTelefone formData={telefone} onChange={handleTelefoneChange} error={validationErrors} />
      <FormEndereco formData={endereco} onChange={handleEnderecoChange} error={validationErrors} />
      </div>
      <button onClick={handleSubmit} className={styles['submit-button']}>Cadastrar</button>
      {apiError && <ErrorMessage message={apiError} />}
      {criado && <p>{criado}</p>}
    </>
  );
}

export default CadastrarAssociado;
