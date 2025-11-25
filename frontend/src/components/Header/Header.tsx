import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../../assets/logo.png";
function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Logo" className="logoimg" />
        </div>
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/associados"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Associado
          </NavLink>
          <NavLink
            to="/anotacoes"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Anotações
          </NavLink>
          <NavLink
            to="/grupos-artisticos"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Grupos Artísticos
          </NavLink>
          <NavLink
            to="/pagamentos"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
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
