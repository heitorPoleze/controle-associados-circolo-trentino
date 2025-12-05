import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { type AnotacaoData, AnotacaoServices } from "../services/AnotacaoServices";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Card from "../components/Cards/Card/Card";
import styles from "../components/Form/Form.module.css";
function AnotacoesDoAssociado() {
    const { id } = useParams();
    const [erro, setErro] = useState<string | null>(null);
    const [anotacoes, setAnotacoes] = useState<AnotacaoData[]>([]);

    useEffect(() => {
        async function carregarAnotacoes() {
            try {
                if (!id) {
                    setErro("Nao foi possivel identificar o associado.");
                }
                const serviceAnotacao = new AnotacaoServices();
                const anotacoes = await serviceAnotacao.getAnotacoesDoAssociado(id!);
                setAnotacoes(anotacoes);
            } catch {
                setErro("Anotacoes nao encontradas.");
            }
        }
        carregarAnotacoes();
    }, [id]);

    if (erro) 
        return (
        <>
                <ErrorMessage message={erro} />
                <Link to={`/associado/${id}/anotacoes`}>Criar Nova Anotação</Link>
        </>
        );
    

        return (
        <>
            <Link to={`/associado/${id}/anotacoes`}>Criar Nova Anotação</Link>
            <h2>Anotações do Associado</h2>
            <div className={styles['form-container']}>
            {anotacoes.map((anotacao) => {
                return (
                <Card
                    key={anotacao.uuid}
                    titulo={anotacao.descricao}
                    destino={`/anotacoes/${anotacao.uuid}`}
                    />
                )
            })}
            </div>
        </>
        );
}

export default AnotacoesDoAssociado;