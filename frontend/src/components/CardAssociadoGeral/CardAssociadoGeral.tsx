import Card from "../Card/Card";

function CardAssociadoGeral(props: any) {
  return (
    <Card id={props.id} titulo={props.titulo}>
      {props.children}
      {props.dataAssociacao && (
        <div className="dataAssociacao">{props.dataAssociacao}</div>
      )}
      {props.condicao && <div className="condicao">{props.condicao}</div>}
    </Card>
  );
}

export default CardAssociadoGeral;
