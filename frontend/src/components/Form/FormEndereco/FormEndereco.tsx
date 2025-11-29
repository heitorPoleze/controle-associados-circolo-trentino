import FormInput from '../FormInput/FormInput';
import styles from '../Form.module.css';
function FormEndereco({ formData, onChange, error }: any) {
    return (
        <>
      <h3 className={styles["section-title"]}>Endereço</h3>
        <FormInput 
            col={8}
            label="Logradouro"
            error={error.logradouro}
            required={true}
            name="logradouro"
            onChange={onChange}
            value={formData.logradouro}
        />
        <FormInput 
            col={4}
            label="Bairro"
            error={error.bairro}
            required={true}
            name="bairro"
            onChange={onChange}
            value={formData.bairro}
        />

        <FormInput 
            col={4}
            label="Cidade"
            error={error.cidade}
            required={true}
            name="cidade"
            onChange={onChange}
            value={formData.cidade}
        />

        <FormInput 
            col={2}
            label="UF"
            error={error.uf}
            required={true}
            name="uf"
            onChange={onChange}
            value={formData.uf}
        />

        <FormInput 
            col={3}
            label="CEP"
            error={error.cep}
            required={true}
            name="cep"
            onChange={onChange}
            value={formData.cep}
            placeholder="00000-000"
        />

        <FormInput 
            col={3}
            label="País"
            error={error.pais}
            required={true}
            name="pais"
            onChange={onChange}
            value={formData.pais}
        />

        </>
    );
}

export default FormEndereco;