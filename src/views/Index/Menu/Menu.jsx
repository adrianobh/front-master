import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  faStore,
  faAppleAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";

const Menu = () => {
  return (
    <>
      <Nav
        defaultActiveKey="/home"
        className={`flex-column ${styles.nav}`}
        bg="light"
        variant="light"
      >
        <Nav.Link className={styles.textNavLink}>
          <Link to="/home/usuarios" className={styles.textNavLink}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            Usuário
          </Link>
        </Nav.Link>
        <Nav.Link className={styles.textNavLink}>
          <Link to="/home/produtos" className={styles.textNavLink}>
            <FontAwesomeIcon icon={faAppleAlt} className={styles.icon} />
            Produtos
          </Link>
        </Nav.Link>
        <Nav.Link className={styles.textNavLink}>
          <Link to="/home/pedidos" className={styles.textNavLink}>
            <FontAwesomeIcon icon={faStore} className={styles.icon} />
            Pedidos
          </Link>
        </Nav.Link>
      </Nav>
    </>
  );
};

export default Menu;
