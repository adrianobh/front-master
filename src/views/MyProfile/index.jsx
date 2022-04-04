import React from "react";
import { ToastContainer } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import ShowUser from "./ShowUser";
import Password from "./Password.jsx";
const MyProfile = () => {
  const variavel = 'Alouj';
  return (
    <>
      <Row>
        <Col xs={6}>
          <ShowUser title={"Minhas Informações"} variavel={variavel} />
        </Col>
        <Col xs={5}>
          <Password title={"Alterar senha"} />
        </Col>
      </Row>
      <ToastContainer />
    </>
  );
};
export default MyProfile;
