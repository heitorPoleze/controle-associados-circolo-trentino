import { useEffect, useState } from "react";
import {
  AssociadoServices,
  type AssociadoData,
} from "../../services/AssociadoServices";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import styles from "./AssociadoDetalhado.module.css";

const formatDate = (isoString?: string) => {
  if (!isoString) return "-";
  try {
    return new Date(isoString).toLocaleDateString("pt-BR");
  } catch {
    return isoString;
  }
};

function AssociadoDetalhado() {
  const { id } = useParams();
  const [associado, setAssociado] = useState<AssociadoData>();
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Controle das Abas
  const [activeTab, setActiveTab] = useState<
    "pessoal" | "contato" | "enderecos" | "anotacoes"
  >("pessoal");

  useEffect(() => {
    async function buscarAssociado(): Promise<void> {
      setLoading(true);
      try {
        if (id) {
          const assServices = new AssociadoServices();
          const associado = await assServices.getAssociadoDetalhado(id);
          setAssociado(associado);

          if (!associado) {
            throw new Error("Associado não encontrado");
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    }
    buscarAssociado();
  }, [id]);

  const getStatusClass = (status?: string) => {
    if (!status) return "";
    return styles[status.toLowerCase()] || "";
  };

  if (loading) {
    return <Loading message="Buscando detalhes do associado..." />;
  }

  if (erro) {
    return <ErrorMessage message={erro} />;
  }

  return (
    <>
      {associado && (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles["title-group"]}>
              <h1>{associado.nome}</h1>
              <p className={styles.subtitle}>
                Cadastrado em: {formatDate(associado.dataAssociacao)}
              </p>
            </div>
            <span
              className={`${styles.badge} ${getStatusClass(
                associado.condicao
              )}`}
            >
              {associado.condicao}
            </span>
          </div>

          <nav className={styles.tabs}>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === "pessoal" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("pessoal")}
            >
              Dados Pessoais
            </button>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === "contato" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("contato")}
            >
              Contato
            </button>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === "enderecos" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("enderecos")}
            >
              Endereços
            </button>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === "anotacoes" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("anotacoes")}
            >
              Anotações
            </button>
          </nav>
          <div className={styles["content-area"]}>
            {activeTab === "pessoal" && (
              <div className={styles["info-grid"]}>
                <div className={styles["info-item"]}>
                  <span className={styles.label}>CPF</span>
                  <span className={styles.value}>{associado.cpf}</span>
                </div>
                <div className={styles["info-item"]}>
                  <span className={styles.label}>Nascimento</span>
                  <span className={styles.value}>
                    {formatDate(associado.dataNascimento)}
                  </span>
                </div>
                <div className={styles["info-item"]}>
                  <span className={styles.label}>Sexo</span>
                  <span className={styles.value}>
                    {associado.sexo === "M" ? "Masculino" : "Feminino"}
                  </span>
                </div>
                <div className={styles["info-item"]}>
                  <span className={styles.label}>Família</span>
                  <span className={styles.value}>
                    {associado.familia || "-"}
                  </span>
                </div>
                <div className={styles["info-item"]}>
                  <span className={styles.label}>Origem</span>
                  <span className={styles.value}>
                    {associado.localOrigem || "-"}
                  </span>
                </div>
              </div>
            )}

            {activeTab === "contato" && (
              <div className={styles["list-container"]}>
                <div
                  className={styles["info-item"]}
                  style={{ marginBottom: "1.5rem" }}
                >
                  <span className={styles.label}>E-mail</span>
                  <span className={styles.value}>
                    {associado.email || "Não informado"}
                  </span>
                </div>

                <h3 className={styles.label}>Telefones</h3>
                {associado.telefones && associado.telefones.length > 0 ? (
                  associado.telefones.map((tel, idx) => (
                    <div key={idx} className={styles["card-item"]}>
                      <span className={styles["card-title"]}>
                        Telefone {idx + 1}
                      </span>
                      <div className={styles.value}>
                        ({tel.ddd}) {tel.numero}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles["empty-state"]}>
                    Nenhum telefone cadastrado.
                  </div>
                )}
              </div>
            )}

            {activeTab === "enderecos" && (
              <div className={styles["list-container"]}>
                {associado.enderecos && associado.enderecos.length > 0 ? (
                  associado.enderecos.map((end, idx) => (
                    <div key={idx} className={styles["card-item"]}>
                      <span className={styles["card-title"]}>
                        Endereço {idx + 1}
                      </span>
                      <div style={{ lineHeight: "1.6" }}>
                        <div>
                          {end.logradouro}, {end.bairro}
                        </div>
                        <div>
                          {end.cidade} - {end.uf}
                        </div>
                        <div style={{ color: "#666", fontSize: "0.9rem" }}>
                          CEP: {end.cep}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles["empty-state"]}>
                    Nenhum endereço cadastrado.
                  </div>
                )}
              </div>
            )}

            {activeTab === "anotacoes" && (
              <div className={styles["list-container"]}>
                {associado.anotacoes && associado.anotacoes.length > 0 ? (
                  associado.anotacoes.map((nota, idx) => (
                    <div
                      key={idx}
                      className={styles["card-item"]}
                      style={{ borderLeftColor: "var(--color-vinho)" }}
                    >
                      <span
                        className={styles.label}
                        style={{ marginBottom: "0.5rem", display: "block" }}
                      >
                        {formatDate(nota.dataAnotacao)}
                      </span>
                      <div
                        className={styles.value}
                        style={{ fontSize: "1rem" }}
                      >
                        {nota.descricao}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles["empty-state"]}>
                    Nenhuma anotação cadastrada.
                  </div>
                )}  
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AssociadoDetalhado;
