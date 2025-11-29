import styles from '../Form.module.css';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function FormInput({ label, error, className = "", required, col=12,...props }: any) {
    const gridClass = styles[`col-${col}`];
    return (
        <div className={`${gridClass}`}>
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