import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import stylesForm from "../Form/Form.module.css";
import logo from "../../../assets/logo.png";
import { useAuth } from "../../controllers/AuthContext";
import { memo, useCallback } from "react";
const Header = memo(() => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleLogout = useCallback(() => {
    signOut();
    navigate("/");
  }, [navigate, signOut]);
  return (
    <header className={styles['header']}>
      <div className={styles['header-container']}>
        <div className={styles['logo']}>
          <img src={logo} alt="Logo" className={styles['logoimg']} />
        </div>
        <nav className={styles['header-nav']}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? `${styles["nav-link"]} ${styles["active"]}` : styles["nav-link"]
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/associados"
            className={({ isActive }) =>
              isActive ? `${styles["nav-link"]} ${styles["active"]}` : styles["nav-link"]
            }
          >
            Associado
          </NavLink>
          <NavLink
            to="/grupos-artisticos"
            className={({ isActive }) =>
              isActive ? `${styles["nav-link"]} ${styles["active"]}` : styles["nav-link"]
            }
          >
            Grupos Artísticos
          </NavLink>
          <NavLink
            to="/pagamentos"
            className={({ isActive }) =>
              isActive ? `${styles["nav-link"]} ${styles["active"]}` : styles["nav-link"]
            }
          >
            Pagamentos
          </NavLink>
           <button onClick={handleLogout} className={stylesForm["submit-button"]}> Sair </button>
        </nav>
      </div>
    </header>
  );
})

export default Header;
