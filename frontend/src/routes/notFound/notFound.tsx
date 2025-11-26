import { Link } from 'react-router-dom';
// A importação correta para CSS Modules é "import styles from ..."
// e o arquivo deve ter a extensão .module.css
import styles from './NotFound.module.css';

export function NotFound() {
    return (
        <div className={styles['not-found-container']}>
            <h1 className={styles['not-found-title']}>404</h1>
            <h2 className={styles['not-found-subtitle']}>Ops! Página não encontrada.</h2>
            <p className={styles['not-found-text']}>
                Parece que o caminho que você tentou acessar não existe ou foi movido.
            </p>
            <Link to="/" className={styles['not-found-button']}>
                Voltar para o Início
            </Link>
        </div>
    );
}