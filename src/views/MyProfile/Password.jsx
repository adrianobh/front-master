import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FloatingLabel, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { findUser } from "../../services/LoguinService";
import { updatePassword } from "../../services/UsersService";

const Password = ({ title }) => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  const notifySuccess = () =>
    toast.success("Sua senha foi atualizada com sucesso");
  const notifyError = (message) => toast.error(message);
  async function onSubmit(dados) {
    const { current_password, new_password, confirm_password } = dados;
    const { email } = user;
    const existUser = await findUser({ password: current_password, email });
    if (existUser && existUser.data) {
      if (new_password === confirm_password) {
        const response = await updatePassword(
          { password: new_password },
          user.id
        );
        if (response) {
          notifySuccess();
        } else {
          notifyError("Não foi possivel atualizar sua senha");
        }
      } else {
        notifyError("Sua nova senha e a confirmação não são iguais");
      }
    } else {
      notifyError("Senha incorreta");
    }
  }
  return (
    <>
      <h3>{title}</h3>
      <Card style={{ width: "100%" }}>
        <span style={{ padding: '16px', fontSize: '12px', }}>Se seu usuário foi realizado com o login google, a sua senha padrão é <span style={{ color: '#198754' }}>email#orapronobis</span></span>
        <Card.Body>
          <Form role="form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <FloatingLabel label="Senha atual" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Digite sua senha atual"
                  id={"current_password"}
                  name={"current_password"}
                  {...register("current_password")}
                />

              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Nova senha" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Digite sua nova senha"
                  id={"new_password"}
                  name={"new_password"}
                  {...register("new_password")}
                />
  
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Confirme a nova senha" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Confirme sua senha"
                  id={"confirm_password"}
                  name={"confirm_password"}
                  {...register("confirm_password")}
                />

              </FloatingLabel>
            </Form.Group>

            <Button type="submit" variant="success">
             Alterar senha
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </>
  );
};
export default Password;
