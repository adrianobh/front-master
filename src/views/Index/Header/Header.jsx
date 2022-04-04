import { faSignOutAlt, faUserCircle, faEllipsisV, faUsers, faAppleAlt, faStore, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Nav, Navbar, Col, Dropdown } from "react-bootstrap";
import logo from "../../../assets/img/logo.png";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { logoutAction } from "../../../store/ducks/auth";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";

const history = createBrowserHistory({ forceRefresh: true });

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const permissao = user.role.permission;
  function logout(data) {
    dispatch(logoutAction());
    history.push("/");
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Col xs={1} style={{ display: "flex", justifyContent: "center" }}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
        </Col>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className={styles.a}>
            <Navbar.Brand href="#home" className={styles.center}>
              <Dropdown>

                <Dropdown.Toggle variant="light" drop={"down"} className={styles.mobile}>
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className={styles.icon}
                  />
                  Menu
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ left: "-3rem" }}>
                  {permissao === 'Admin' &&
                    <>
                      <Dropdown.Item>
                        <Link to="/home/usuarios" className={styles.center}>
                          <FontAwesomeIcon
                            icon={faUsers}
                            className={styles.icon}
                          />
                          <span className={styles.spanNav}>Usuarios</span>
                        </Link>
                      </Dropdown.Item>
                    </>
                  }
                  {permissao !== 'Usuario' &&
                    <Dropdown.Item>
                      <Link to="/home/produtos" className={styles.center}>
                        <FontAwesomeIcon
                          icon={faAppleAlt}
                          className={styles.icon}
                        />
                        <span className={styles.spanNav}>Produtos</span>
                      </Link>
                    </Dropdown.Item>
                  }
                  <Dropdown.Item>
                    <Link to="/home/pedidos" className={styles.center}>
                      <FontAwesomeIcon
                        icon={faStore}
                        className={styles.icon}
                      />
                      <span className={styles.spanNav}>Pedidos</span>
                    </Link>
                  </Dropdown.Item>
                  {permissao === 'Admin' && 
                   <Dropdown.Item>
                   <Link to="/home/relatorios" className={styles.center}>
                     <FontAwesomeIcon
                       icon={faChartLine}
                       className={styles.icon}
                     />
                     <span className={styles.spanNav}>Relatorios</span>
                   </Link>
                 </Dropdown.Item>
                  }

                  <Dropdown.Item>
                    <Link to="/home/meu-perfil" className={styles.center}>
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className={styles.icon}
                      />
                      <span className={styles.spanNav}>Meu perfil</span>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => logout()}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className={styles.icon}
                    />
                    <span className={styles.spanNav}>Sair</span>
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
