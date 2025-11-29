import styles from "../Form.module.css";
import FormInput from "../FormInput/FormInput";

function FormDadosPessoais({ formData, onChange, error }: any) {

  return (
    <>
      <h3 className={styles["section-title"]}>Dados Pessoais</h3>
      <FormInput
        className={styles["full-width"]}
        label="Nome Completo"
        error={error.nome}
        required={true}
        name="nome"
        onChange={onChange}
        value={formData.nome}
        placeholder="Ex: João da Silva"
      />
    
      <FormInput 
        className={styles["full-width"]}
        label="CPF"
        error={error.cpf}
        required={true}
        name="cpf"
        onChange={onChange}
        value={formData.cpf}
        placeholder="000.000.000-00"
      />

      <FormInput 
        className={styles["full-width"]}
        label="Data de Nascimento"
        error={error.dataNascimento}
        required={true}
        name="dataNascimento"
        onChange={onChange}
        value={formData.dataNascimento}
        placeholder="DD/MM/AAAA"
        type="date"
      />

      <div className={styles["form-group"]}>
        <label className={styles["label"]}>Sexo</label>
        <select
          name="sexo"
          className={styles["select"]}
          value={formData.sexo}
          onChange={onChange}
        >
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>

      <FormInput
        className={styles["full-width"]}
        label="E-mail"
        error={error.email}
        required={true}
        name="email"
        onChange={onChange}
        value={formData.email}
      />
      
      <FormInput
        className={styles["full-width"]}
        label="Família"
        error={error.familia}
        required={false}
        name="familia"
        onChange={onChange}
        value={formData.familia}
      />

      <FormInput
        className={styles["full-width"]}
        label="Local de Origem"
        error={error.localOrigem}
        required={false}
        name="localOrigem"
        onChange={onChange}
        value={formData.localOrigem}
      />

      <div className={styles["form-group"]}>
        <label className={styles["label"]}>Condição</label>
        <select
          name="condicao"
          className={styles["select"]}
          value={formData.condicao}
          onChange={onChange}
        >
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>
    </>
  );
}

export default FormDadosPessoais;
