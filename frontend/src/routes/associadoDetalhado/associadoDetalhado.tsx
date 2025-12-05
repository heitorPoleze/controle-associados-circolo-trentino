import { useEffect, useState } from "react";
import {
  AssociadoServices,
  type AssociadoData,
} from "../../services/AssociadoServices";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [associado, setAssociado] = useState<AssociadoData>();
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "pessoal" | "contato" | "enderecos" | "anotacoes"
  >("pessoal");

  const [showEditMenu, setShowEditMenu] = useState(false);

  useEffect(() => {
    async function buscarAssociado(): Promise<void> {
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

  const toggleEditMenu = () => setShowEditMenu(!showEditMenu);

  const handleDelete = async () => {
    if (!associado || !id) throw new Error("Associado não encontrado.");

    const confirmacao = window.confirm(
      `Você realmente deseja deletar o usuário ${associado.nome}?`
    );

    if (confirmacao) {
      setLoading(true);
      const assServices = new AssociadoServices();
      try {
        await assServices.deleteAssociado(id);

        alert(`Associado ${associado.nome} deletado com sucesso.`);
        navigate("/associados");
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro("Erro ao tentar deletar o associado.");
        }
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loading message="Carregando dados do associado..." />;
  }

  if (erro) {
    return <ErrorMessage message={erro} />;
  }

  return (
    <>
      {associado && (
        <>
          <div className={styles.actions}>
            {/* Container do Dropdown */}
            <div className={styles["dropdown-container"]}>
              <button
                className={`${styles["btn-action"]} ${styles["btn-edit"]} ${
                  showEditMenu ? styles.active : ""
                }`}
                onClick={toggleEditMenu}
              >
                ✏️ Editar ▼
              </button>

              {showEditMenu && (
                <div
                  className={styles["dropdown-menu"]}
                  onMouseLeave={() => setShowEditMenu(false)}
                >
                  <Link
                    to={`/editarAssociado/${associado.uuid}`}
                    className={styles["dropdown-item"]}
                  >
                    Dados Pessoais
                  </Link>
                  <Link
                    to={`/telefonesDoAssociado/${associado.uuid}`}
                    className={styles["dropdown-item"]}
                  >
                    Telefones
                  </Link>
                  <Link
                    to={`/enderecosDoAssociado/${associado.uuid}`}
                    className={styles["dropdown-item"]}
                  >
                    Endereços
                  </Link>
                  <Link
                    to={`/anotacoesDoAssociado/${associado.uuid}`}
                    className={styles["dropdown-item"]}
                  >
                    Anotações
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={handleDelete}
              className={`${styles["btn-action"]} ${styles["btn-delete"]}`}
            >
              🗑️ Deletar
            </button>
          </div>
          <div className={styles.container}>
            {/* CABEÇALHO */}
            <div className={styles.header}>
              <div className={styles["header-left"]}>
                <div className={styles["title-group"]}>
                  <h1>{associado.nome}</h1>
                  <p className={styles.subtitle}>
                    Cadastrado em: {formatDate(associado.dataAssociacao)}
                  </p>
                </div>
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
                        <span className={styles["note-date"]}>
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
                    <Link to={`/associado/${id}/anotacoes`} className={styles["empty-state"]}>
                      Criar Anotação
                    </Link>
                  )}
                    <Link to={`/associado/${id}/anotacoes`} className={styles["empty-state"]}>
                      Criar Anotação
                    </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AssociadoDetalhado;
