import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { productOptions } from "../../services/ProductsService";
import { findUserByRole } from "../../services/UsersService";
import { createRequest } from "../../services/RequestService";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import moment from 'moment'
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";

const CreateRequests = ({ openModal, setOpenModal, setReload }) => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const { register, control, handleSubmit } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "product_id"
  });
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [valueFacilitador, setValueFacilitador] = useState();
  const [facilitador, setFacilitador] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const notifySuccess = () => toast.success("Pedido cadastrado com sucesso");
  const notifyError = () =>
    toast.error("Ocorreu algum erro ao cadastrar Pedido");

  const notifyExistUser = (message) => toast.error(message);
  const check = (valor) => {
    if(valor > 0) {
      setDisabled(false);
    }
  }
  useEffect(() => {
    async function getFacilitador() {
      const response = await findUserByRole({ role: 'Facilitador' });
      setFacilitador(response.data)
    }
    getFacilitador();
  }, []);

  useEffect(() => {
    async function getProducts() {
      const response = await productOptions({ user_id: valueFacilitador });
      setProducts(response.data);
    }
    getProducts();
  }, [valueFacilitador])

  async function onSubmit(data) {
    const response = await createRequest({ product: data.product_id, user_id: user.id, facilitador: valueFacilitador});
    if (response && response.request) {
      notifySuccess();
      history.push('/home/pedidos');
    } else if (response && response.error) {
      notifyExistUser(response.message);
    } else {
      notifyError();
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
        <Col>
              <Form.Group className="mb-3">
                <FloatingLabel
                  label="Selecione o facilitador"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Default select example"
                    className={error ? "error" : ""}
                    onChange={(e) => setValueFacilitador(e.target.value)}
                  >
                    <option value={''}>Selecione um facilitador</option>
                    {facilitador.map((item) => (
                      <option value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                {error && <p className={"textError"}> Usuário e senha inválidos</p>}
              </Form.Group>
            </Col>
          <Form role="form" onSubmit={handleSubmit(onSubmit)}>
            {valueFacilitador && (
              <>
                <Row>
                  {products.map((item, key) => (
                    <Col xs="4" className={styles.colMobile}>
                      <Card>
                        <Card.Img variant="top" src={item.product_detail.img} />
                        <Card.Body>
                          <Card.Title>Produto: {item.description}</Card.Title>
                          <Card.Text>
                            <ListGroup>
                              <ListGroup.Item>Descrisção do produto: {item.product_detail.detail}</ListGroup.Item>
                              <ListGroup.Item>Valor: R${item.lotes[0].valor} </ListGroup.Item>
                              <ListGroup.Item>Quantidade disponivel: {item.lotes[0].quantidade} o KG</ListGroup.Item>
                              <ListGroup.Item>Data de validade: {moment(item.lotes[0].data_validade).format('DD/MM/YYYY')}</ListGroup.Item>
                            </ListGroup>
                            <Form.Control
                              key={item.id}
                              style={{ display: 'none' }}
                              type="text"
                              placeholder="produto"
                              id={`produto-${key}`}
                              name={item.id}
                              {...register(`product_id.${key}.id`)}
                              className={error ? "error" : ""}
                              value={item.id}
                            />
                            <Form.Control
                              style={{ marginTop: '32px' }}                            
                              key={item.id}
                              type="number"
                              placeholder="Quantidade desejada"
                              id={`quantidade-${key}`}
                              name={`quantidade-${key}`}
                              {...register(`product_id.${key}.quantidade`)}
                              className={error ? "error" : ""}
                              min={0}
                              max={item.lotes[0].quantidade}
                              onChange={(e) => check(e.target.value)}
                            />
                            <Form.Control
                              style={{ display: 'none'}}                            
                              key={item.id}
                              type="number"
                              placeholder="valor"
                              id={`valor-${key}`}
                              name={`valor-${key}`}
                              {...register(`product_id.${key}.valor`)}
                              className={error ? "error" : ""}
                              value={item.lotes[0].valor}
                            />
                             <Form.Control
                              style={{ display: 'none'}}                            
                              key={item.id}
                              type="text"
                              placeholder="lote"
                              id={`lote-${key}`}
                              name={`lote-${key}`}
                              {...register(`product_id.${key}.lote`)}
                              className={error ? "error" : ""}
                              value={item.lotes[0].lote}
                            />
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

              </>
            )}

            <Button type="submit" className={styles.float} variant="primary" size="lg" disabled={disabled}>
                Encerrar pedido
            </Button>{' '}
          </Form>
        </Row>
      </Container>

      <ToastContainer />
    </>
  );
};

export default CreateRequests;
