import { useState } from 'react';
import styles from '../FormAssociado.module.css';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function FormEndereco({ onAdd }: any) {
    const [end, setEnd] = useState({
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        pais: 'Brasil'
    });
    
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setEnd(prev => ({ 
            ...prev, 
            [name]: name === 'uf' ? value.toUpperCase() : value 
        }));
        setError(null);
    };

    const handleAdd = () => {
        // Validações
        if (!end.logradouro || end.logradouro.length > 255) return setError("Logradouro obrigatório (1-255).");
        if (!end.bairro || end.bairro.length > 100) return setError("Bairro obrigatório (1-100).");
        if (!end.cidade || end.cidade.length > 100) return setError("Cidade obrigatória (1-100).");
        if (end.uf.length !== 2) return setError("UF deve ter 2 letras.");
        
        const cepLimpo = end.cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8 || isNaN(Number(cepLimpo))) return setError("CEP inválido (8 números).");
        
        if (!end.pais || end.pais.length > 50) return setError("País obrigatório.");

        onAdd(end);
        
        setEnd({ logradouro: '', bairro: '', cidade: '', uf: '', cep: '', pais: 'Brasil' });
    };

    return (
        <div className={styles['sub-form-container']}>
            <div className={styles['form-grid']}>
                <div className={styles['form-group']}>
                    <label className={styles['label']}>CEP</label>
                    <input 
                        name="cep" 
                        className={styles['input']} 
                        value={end.cep} 
                        onChange={handleChange} 
                        maxLength={9} 
                        placeholder="00000-000"
                    />
                </div>
                <div className={`${styles['form-group']} ${styles['full-width']}`}>
                    <label className={styles['label']}>Logradouro</label>
                    <input 
                        name="logradouro" 
                        className={styles['input']} 
                        value={end.logradouro} 
                        onChange={handleChange} 
                        placeholder="Rua, Av, etc."
                    />
                </div>
                <div className={styles['form-group']}>
                    <label className={styles['label']}>Bairro</label>
                    <input 
                        name="bairro" 
                        className={styles['input']} 
                        value={end.bairro} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles['form-group']}>
                    <label className={styles['label']}>Cidade</label>
                    <input 
                        name="cidade" 
                        className={styles['input']} 
                        value={end.cidade} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles['form-group']}>
                    <label className={styles['label']}>UF</label>
                    <input 
                        name="uf" 
                        className={styles['input']} 
                        value={end.uf} 
                        onChange={handleChange} 
                        maxLength={2} 
                        placeholder="XX"
                    />
                </div>
                <div className={styles['form-group']}>
                    <label className={styles['label']}>País</label>
                    <input 
                        name="pais" 
                        className={styles['input']} 
                        value={end.pais} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={`${styles['button-container-inline']} ${styles['full-width']}`}>
                    <button type="button" onClick={handleAdd} className={styles['add-button']}>
                        + Adicionar Endereço
                    </button>
                </div>
            </div>
            {error && <ErrorMessage message={error} />}
        </div>
    );
}

export default FormEndereco;