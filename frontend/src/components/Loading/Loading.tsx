import styles from './Loading.module.css';


function Loading({message = "Carregando..."}) {
    return (
        <div className={styles['container']}>
            <div className={styles['spinner']} />
            <div className={styles['text']}>{message}</div>
        </div>
    );
}   

export default Loading;