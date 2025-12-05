import { useState } from "react";
import { useAuth } from "../controllers/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styles from "../components/Form/Form.module.css";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      await signIn(login, senha);
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro desconhecido ao logar");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={handleLogin} className={styles["submit-button"]}> Entrar </button>

      {erro && <ErrorMessage message={erro} />}
    </div>
  );
};
