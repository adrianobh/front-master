import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "./Header/Header";
import Body from "./Body/Body";
const Index = () => {
  return (
    <>
      <Row>
        <Header />
      </Row>
      <Row>
        <Col xs={12} style={{ padding: "8px" }}>
          <Body />
        </Col>
      </Row>
    </>
  );
};
export default Index;
