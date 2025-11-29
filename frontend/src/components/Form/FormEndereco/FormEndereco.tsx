import styles from '../Form.module.css';
import FormInput from '../FormInput/FormInput';

function FormEndereco({ formData, onChange, error }: any) {
    return (
        <>
        <h3>Endereço</h3>
        <FormInput 
            className={styles["full-width"]}
            label="logradouro"
            error={error.logradouro}
            required={true}
            name="logradouro"
            onChange={onChange}
            value={formData.logradouro}
        />
        <FormInput 
            className={styles["full-width"]}
            label="bairro"
            error={error.bairro}
            required={true}
            name="bairro"
            onChange={onChange}
            value={formData.bairro}
        />

        <FormInput 
            className={styles["full-width"]}
            label="cidade"
            error={error.cidade}
            required={true}
            name="cidade"
            onChange={onChange}
            value={formData.cidade}
        />

        <FormInput 
            className={styles["full-width"]}
            label="UF"
            error={error.uf}
            required={true}
            name="uf"
            onChange={onChange}
            value={formData.uf}
        />

        <FormInput 
            className={styles["full-width"]}
            label="CEP"
            error={error.cep}
            required={true}
            name="cep"
            onChange={onChange}
            value={formData.cep}
            placeholder="00000-000"
        />

        <FormInput 
            className={styles["full-width"]}
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