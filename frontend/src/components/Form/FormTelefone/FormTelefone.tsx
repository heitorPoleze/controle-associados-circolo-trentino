import FormInput from "../FormInput/FormInput";
import styles from "../Form.module.css";
function FormTelefone({ formData, onChange, error }: any) {
  return (
    <>
      <h3 className={styles["section-title"]}>Telefone</h3>
      <div className={styles["center"]}>
        <FormInput
          col={2}
          label="DDD"
          error={error.ddd}
          required={true}
          name="ddd"
          onChange={onChange}
          value={formData.ddd}
        />

        <FormInput
          col={4}
          label="Número"
          error={error.numero}
          required={true}
          name="numero"
          onChange={onChange}
          value={formData.numero}
        />
      </div>
    </>
  );
}

export default FormTelefone;
