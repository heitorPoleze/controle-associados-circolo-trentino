import styles from '../Form.module.css';
import FormInput from '../FormInput/FormInput';

function FormTelefone({ formData, onChange, error }: any) {
    return (
        <>
            <FormInput 
                className={styles["full-width"]}
                label="DDD"
                error={error.ddd}
                required={true}
                name="ddd"
                onChange={onChange}
                value={formData.ddd}
            />

            <FormInput 
                className={styles["full-width"]}
                label="Número"
                error={error.numero}
                required={true}
                name="numero"
                onChange={onChange}
                value={formData.numero}
            />

        </>
    );
}

export default FormTelefone;