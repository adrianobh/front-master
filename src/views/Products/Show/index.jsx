import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { productPut, findOneProduct } from "../../../services/ProductsService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const ShowInfo = ({ setOpenModal, setReload, id }) => {
  const { user } = useSelector((state) => state.auth);
  const [disabled , setDisabled] = useState(true);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => { 
    if(user.role.permission === 'Admin'){
      setDisabled(false);
    }else{
      setDisabled(true)
    }
  },[user])
  const notifySuccess = () => toast.success("Produto editado com sucesso");
  const notifyError = () =>
    toast.error("Ocorreu algum erro ao editar um produto");

  useEffect(() => {
    async function getOneUser() {
      const response = await findOneProduct(id);
      setData(response.data);
    }
    getOneUser();
  }, [id]);

  async function onSubmit(dados) {
    if (dados && dados.description === "") {
      Object.assign(dados, {
        description: data.description,
      });
    }
    const response = await productPut(dados, id);
    if (response) {
      notifySuccess();
      setTimeout(() => {
        setReload(true);
        setOpenModal(false);
        setReload(false);
      }, 3000);
    } else {
      notifyError();
    }
  }
  return (
    <>
      <Form role="form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <FloatingLabel label="Nome do produto" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome do produto"
              id={"description"}
              name={"description"}
              {...register("description")}
              className={error ? "error" : ""}
              defaultValue={data.description}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Detalhes" className="mb-3">
            <Form.Control
              autoSave="textarea"
              placeholder="Detalhes do produto"
              id={"detail"}
              name={"detail"}
              {...register("detail")}
              className={error ? "error" : ""}
              style={{ height: "100px" }}
              defaultValue={
                data && data.product_detail && data.product_detail.detail
              }
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        {data && data.product_detail && (
          <>
            <Row
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p style={{ textAlign: "center" }}>Pré visualização da imagem</p>
              <img
                src={data.product_detail.img}
                style={{ maxWidth: "300px" }}
                alt="Imagem do produto"
              />
            </Row>
          </>
        )}

        <Button type="submit" variant="success" disabled={disabled}>
          Salvar
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default ShowInfo;
