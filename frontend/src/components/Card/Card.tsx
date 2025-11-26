import { Link } from "react-router-dom";
import "./Card.css";
function Card(props: any){
    return(
        <div className="card">
            <Link to={props.id}>
                <h2 className="titulo">{props.titulo}</h2>
                <div className="props">{props.children}</div>
            </Link>
        </div>    
    )
}

export default Card;