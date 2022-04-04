import React, { useState } from "react";
import { Button, Form, Container, Card, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import logo from "../../assets/img/logo.png";
import { findUser, loginGoogle } from "../../services/LoguinService";
import { createBrowserHistory } from "history";
import GoogleLogin from "react-google-login";
import { loginAction, logoutAction } from "../../store/ducks/auth";
import { useDispatch } from "react-redux";
import CreateUsers from '../Users/CreateUsers';
import Header from "../../Components/Header";

const history = createBrowserHistory({ forceRefresh: true });

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  async function onSubmit(data) {
    const response = await findUser(data);
    if (response && response.data) {
      dispatch(logoutAction());
      dispatch(loginAction(response.data));
      history.push("/home");
    } else {
      setError(true);
    }
  }

  async function responseGoogle(data) {
    const response = await loginGoogle(data);
    if (response && response.user) {
      dispatch(loginAction(response.user[0]));

      history.push("/home");
    }
  }

  return (
    <>
      <Container className={styles.alignCenter} style={{ height: "100vh" }}>
        <Card style={{ width: "30rem" }} className={styles.card}>
          <Card.Header className={styles.alignCenter}>
            <Card.Img
              variant="top"
              src={logo}
              style={{ width: "71px", marginRight: "16px" }}
            />
            <Card.Text> Orapronobis Sistema </Card.Text>
          </Card.Header>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Entrar</Card.Title>
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  id={"email"}
                  name={"email"}
                  {...register("email")}
                  className={error ? styles.error : ""}
                />
                {error && (
                  <p className={styles.textError}> Usuário e senha inválidos</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  id={"password"}
                  name={"password"}
                  {...register("password")}
                  className={error ? styles.error : ""}
                />
                {error && (
                  <p className={styles.textError}> Usuário e senha inválidos</p>
                )}
              </Form.Group>

              <div className={styles.cardFooter}>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Faça login com o Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
                <Button
                  type="submit"
                  className={`${styles.button} ${styles.positionButton}`}
                >
                  Entrar
                </Button>
              </div>
            </Form>
          </Card.Body>
          <Row>
            <span style={{ marginLeft: '16px' }}>Ainda não sou cadastrado, quero me <a onClick={() => setOpenModal(true)}className={styles.cadastro}>cadastrar</a></span>
          </Row>
        </Card>

        <Header
        title={"Quero me cadastrar"}
        form={
          <CreateUsers
            openModal={openModal}
            setOpenModal={setOpenModal}
            login={true}
          />
        }
        modalOnly={true}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      </Container>
    </>
  );
};

export default Login;
