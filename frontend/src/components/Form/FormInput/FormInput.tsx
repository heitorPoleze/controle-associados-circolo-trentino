import styles from '../Form.module.css';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function FormInput({ label, error, className = "", required, ...props }: any) {
    return (
        <div className={`${styles['form-group']} ${className}`}>
            <label className={styles['label']}>
                {label}
            </label>
            
            <input 
                className={styles['input']} 
                required={required}
                {...props} 
            />

            {error && <ErrorMessage message={error} />}
        </div>
    );
}

export default FormInput;