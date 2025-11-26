import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../assets/logo.png";
function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['header-container']}>
        <div className={styles['logo']}>
          <img src={logo} alt="Logo" className={styles['logoimg']} />
        </div>
        <nav className={styles['header-nav']}>
          <NavLink
            to="/"
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
            to="/anotacoes"
            className={({ isActive }) =>
              isActive ? `${styles["nav-link"]} ${styles["active"]}` : styles["nav-link"]
            }
          >
            Anotações
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
        </nav>
      </div>
    </header>
  );
}

export default Header;
