import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { findUserByRole } from "../../../services/UsersService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateInventoryProduct, findInventoryProduct } from "../../../services/InventoryService";
const ShowInventoryProduct = ({
  id,
  openModal,
  setOpenModal,
  setReload,
  product_id,
}) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [profile , setProfile] = useState([]);

  const handleProfile = (e) => setProfile(e.target.value);

  const notifySuccess = () => toast.success("Lote editado com sucesso");
  const notifyError = () =>
    toast.error("Ocorreu algum erro ao editar o lote para esse Lote");

  useEffect(() => {
    async function getUserByRole() {
      const response = await findUserByRole({ role: "Facilitador" });
      setUsers(response.data);
    }

    async function getInventoryProduct(){
      const response = await findInventoryProduct(id);
      setInventory(response.data)
    }
    getInventoryProduct();
    getUserByRole();
  }, []);
  async function onSubmit(data) {
    if(profile && profile.length > 0){
      Object.assign(data, {
        user_id: profile
      })
    }else {
      Object.assign(data, {
        user_id: inventory.user_id
      })
    }
    Object.assign(data, {
      status: true,
    });
    Object.assign(data, {
      product_id: product_id,
    });
    if(data && data.lote === ''){
      Object.assign(data, {
        lote: inventory.lote
      })
    }

    if(data && data.quantidade === ''){
      Object.assign(data, {
        quantidade: inventory.quantidade
      })
    }

    if(data && data.unidade === ''){
      Object.assign(data, {
        unidade: inventory.unidade
      })
    }

    if(data && data.valor === ''){
      Object.assign(data, {
        valor: inventory.valor
      })
    }

    if(data && data.data_entrada === ''){
      Object.assign(data, {
        data_entrada: inventory.data_entrada
      })
    }

    if(data && data.data_validade === ''){
      Object.assign(data, {
        data_validade: inventory.data_validade
      })
    }
    const response = await updateInventoryProduct(data, id);
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
          <FloatingLabel label="Facilitador" className="mb-3">
            <Form.Select
              aria-label="Facilitador"
              className={error ? "error" : ""}
              onChange={(e) => handleProfile(e)}
            >
              <option>Selecione uma opção</option>
              {users.map((item) => (
                <option 
                value={item.id}
                selected={inventory.user_id === item.id ? true : false} 
                >
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {error && <p className={"textError"}> Usuário e senha inválidos</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Lote" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Código do lote"
              id={"lote"}
              name={"lote"}
              {...register("lote")}
              className={error ? "error" : ""}
              defaultValue={inventory.lote}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Quantidade" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Quantidade em estoque"
              id={"quantidade"}
              name={"quantidade"}
              {...register("quantidade")}
              className={error ? "error" : ""}
              defaultValue={inventory.quantidade}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Unidade" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Unidade de venda (Kg, G , Mg)"
              id={"unidade"}
              name={"unidade"}
              {...register("unidade")}
              className={error ? "error" : ""}
              defaultValue={inventory.unidade}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Valor de venda" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Valor de venda"
              id={"valor"}
              name={"valor"}
              {...register("valor")}
              className={error ? "error" : ""}
              defaultValue={inventory.valor}
            />
            {error && (
              <p className={"textError"}> Valor de venda</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Data de entrada" className="mb-3">
            <Form.Control
              type="date"
              placeholder="Data de entrada"
              id={"data_entrada"}
              name={"data_entrada"}
              {...register("data_entrada")}
              className={error ? "error" : ""}
              defaultValue={inventory.data_entrada}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Data de validade" className="mb-3">
            <Form.Control
              type="date"
              placeholder="Data de validade"
              id={"data_validade"}
              name={"data_validade"}
              {...register("data_validade")}
              className={error ? "error" : ""}
              defaultValue={inventory.data_validade}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Status" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Status (Ativo , Inativo , Vencido , Liberado)"
              id={"status"}
              name={"status"}
              {...register("status")}
              className={error ? "error" : ""}
              value={"Liberado"}
              disabled
              defaultValue={inventory.status}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Button type="submit" variant="success">
          Salvar
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default ShowInventoryProduct;
