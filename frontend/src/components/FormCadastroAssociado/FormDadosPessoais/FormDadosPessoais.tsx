import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import styles from '../FormAssociado.module.css'

function FormDadosPessoais({ formData, onChange, errors = {} }: any) {
    return (
        <>
            <h3 className={styles['section-title']}>Dados Pessoais</h3>

            <div className={`${styles['form-group']} ${styles['full-width']}`}>
                <label className={styles['label']}>Nome Completo *</label>
                <input 
                    name="nome" 
                    className={styles['input']} 
                    value={formData.nome} 
                    onChange={onChange} 
                    placeholder="Ex: João da Silva"
                />
                {errors.nome && <ErrorMessage message={errors.nome} />}
            </div>

            <div className={styles['form-group']}>
                <label className={styles['label']}>CPF *</label>
                <input 
                    name="cpf" 
                    className={styles['input']} 
                    value={formData.cpf} 
                    onChange={onChange} 
                    maxLength={14} 
                    placeholder="000.000.000-00"
                />
                {errors.cpf && <ErrorMessage message={errors.cpf} />}
            </div>

            <div className={styles['form-group']}>
                <label className={styles['label']}>Nascimento *</label>
                <input 
                    type="date" 
                    name="dataNascimento" 
                    className={styles['input']} 
                    value={formData.dataNascimento} 
                    onChange={onChange} 
                />
                {errors.dataNascimento && <ErrorMessage message={errors.dataNascimento} />}
            </div>

            <div className={styles['form-group']}>
                <label className={styles['label']}>Sexo *</label>
                <select 
                    name="sexo" 
                    className={styles['select']} 
                    value={formData.sexo} 
                    onChange={onChange}
                >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
                {errors.sexo && <ErrorMessage message={errors.sexo} />}
            </div>

            <div className={`${styles['form-group']} ${styles['full-width']}`}>
                <label className={styles['label']}>E-mail</label>
                <input 
                    type="email" 
                    name="email" 
                    className={styles['input']} 
                    value={formData.email} 
                    onChange={onChange} 
                    placeholder="exemplo@email.com"
                />
                {errors.email && <ErrorMessage message={errors.email} />}
            </div>

            <div className={styles['form-group']}>
                <label className={styles['label']}>Família</label>
                <input 
                    name="familia" 
                    className={styles['input']} 
                    value={formData.familia} 
                    onChange={onChange} 
                />
                {errors.familia && <ErrorMessage message={errors.familia} />}
            </div>

            <div className={styles['form-group']}>
                <label className={styles['label']}>Local Origem</label>
                <input 
                    name="localOrigem" 
                    className={styles['input']} 
                    value={formData.localOrigem} 
                    onChange={onChange} 
                />
                {errors.localOrigem && <ErrorMessage message={errors.localOrigem} />}
            </div>

            <div className={styles['form-group']}>
                <label className={styles['label']}>Condição *</label>
                <select 
                    name="condicao" 
                    className={styles['select']} 
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