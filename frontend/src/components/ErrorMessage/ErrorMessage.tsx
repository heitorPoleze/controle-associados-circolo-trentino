import style from './ErrorMessage.module.css'

function ErrorMessage({ message }: { message: string }) {
    return <div className={style['errorMessage']}>{message}</div>
}

export default ErrorMessage;