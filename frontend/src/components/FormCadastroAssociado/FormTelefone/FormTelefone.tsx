import { useState } from 'react';
import styles from '../FormAssociado.module.css'; 
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function FormTelefone({ onAdd }: any) {
    const [tel, setTel] = useState({ ddd: '', numero: '' });
    const [error, setError] = useState<string | null>(null);


    const handleChange = (e: any) => {
        setTel({ ...tel, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleAdd = () => {
        // Validações
        if (tel.ddd.length !== 2 && tel.ddd.length !== 3) {
            setError("DDD inválido (2 ou 3 dígitos).");
            return;
        }

        const numeroLimpo = tel.numero.replace(/\D/g, '');
        if (numeroLimpo.length !== 8 && numeroLimpo.length !== 9) {
            setError("Número inválido (8 ou 9 dígitos).");
            return;
        }

        onAdd(tel);
        setTel({ ddd: '', numero: '' }); 
    };

    return (
        <div className={styles['sub-form-container']}>
            <div className={styles['form-grid']}>
                <div className={`${styles['form-group']} ${styles['small-width']}`}>
                    <label className={styles['label']}>DDD</label>
                    <input 
                        name="ddd" 
                        className={styles['input']} 
                        value={tel.ddd} 
                        onChange={handleChange}
                        placeholder="XX"
                        maxLength={3}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label className={styles['label']}>Número</label>
                    <input 
                        name="numero" 
                        className={styles['input']} 
                        value={tel.numero} 
                        onChange={handleChange}
                        placeholder="000000000"
                        maxLength={10}
                    />
                </div>
                <div className={styles['button-container-inline']}>
                    <button type="button" onClick={handleAdd} className={styles['add-button']}>
                        + Adicionar
                    </button>
                </div>
            </div>
            {error && <ErrorMessage message={error} />}
        </div>
    );
}

export default FormTelefone;