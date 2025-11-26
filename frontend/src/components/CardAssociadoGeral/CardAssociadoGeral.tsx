import Card from "../Card/Card";
import styles from "./CardAssociadoGeral.module.css";
function CardAssociadoGeral(props: any) {
  return (
    <Card id={props.id} titulo={props.titulo}>
      {props.children}
      {props.dataAssociacao && (
        <div className={styles['dataAssociacao']}>Desde {props.dataAssociacao}</div>
      )}
          {props.condicao == "Ativo" && <div className={styles['ativo']}>{props.condicao}</div>}
          {props.condicao == "Inativo" && <div className={styles['inativo']}>{props.condicao}</div>}
          {props.condicao == "Cancelado" && <div className={styles['cancelado']}>{props.condicao}</div>}
    </Card>
  );
}

export default CardAssociadoGeral;
