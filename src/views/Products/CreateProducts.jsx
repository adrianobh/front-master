import React, { useState } from "react";
import { FloatingLabel, Form, Button, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { productPost } from "../../services/ProductsService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProducts = ({ openModal, setOpenModal, setReload }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [urlImg, setUrlImg] = useState(null);
  const notifySuccess = () => toast.success("Produto cadastrado com sucesso");
  const notifyError = () =>
    toast.error("Ocorreu algum erro ao cadastrar produto");

  async function onSubmit(data) {
    const response = await productPost(data);
    if (response && response.data) {
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
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
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
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="URL da imagem" className="mb-3">
            <Form.Control
              type="text"
              placeholder="URL da Imagem"
              id={"img"}
              name={"img"}
              {...register("img")}
              className={error ? "error" : ""}
              onChange={(e) => setUrlImg(e.target.value)}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        {urlImg && (
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
                src={urlImg}
                style={{ maxWidth: "300px" }}
                alt="Imagem do produto"
              />
            </Row>
          </>
        )}

        <Button type="submit" variant="success">
          Salvar
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default CreateProducts;
