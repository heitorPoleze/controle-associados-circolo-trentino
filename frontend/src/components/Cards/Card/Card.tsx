import { Link } from "react-router-dom";
import styles from "./Card.module.css";
function Card(props: any){
    return(
        <div className={styles['card']}>
            <Link to={props.id}>
                <h2 className={styles['titulo']}>{props.titulo}</h2>
                <div className={styles['props']}>{props.children}</div>
            </Link>
        </div>    
    )
}

export default Card;