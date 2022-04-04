import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { roleOptions } from "../../services/RoleService";
import { userPost } from "../../services/UsersService";
import { cityOptions } from "../../services/CityService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUsers = ({ openModal, setOpenModal, setReload = false, login = false }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [roles, setRoles] = useState([]);
  const [city, setCity] = useState([]);
  const [profile, setProfile] = useState('');
  const [citySelected, setCitySelected] = useState('');

  const notifySuccess = () => toast.success("Usuário cadastrado com sucesso");
  const notifyError = () =>
    toast.error("Ocorreu algum erro ao cadastrar usuário");

  const notifyExistUser = (message) => toast.error(message);

  const handleProfile = (e) => setProfile(e.target.value);
  const handleCity = (e) => setCitySelected(e.target.value);

  useEffect(() => {
    async function getRole() {
      const response = await roleOptions();
      setRoles(response.data);
    }
    async function getCity() {
      const response = await cityOptions();
      setCity(response.data);
    }
    getRole();
    getCity();
  }, []);

  async function onSubmit(data) {
    if(login) {
      const perfil_usuario = roles.find((e) => e.permission === 'Usuario');
      Object.assign(data, {
        role_id: perfil_usuario.id
      })
    }
    if(profile) {
      Object.assign(data,{
        role_id: profile,
      })
    }
    if(citySelected) {
      Object.assign(data,{
        city_id: citySelected,
      })
    }
    const response = await userPost(data);
    if (response && response.data) {
      notifySuccess();
      setTimeout(() => {
        setReload(true);
        setOpenModal(false);
        setReload(false);
      }, 3000);
    } else if (response && response.error) {
      notifyExistUser(response.message);
    } else {
      notifyError();
    }
  }
  return (
    <>
      <Form role="form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <FloatingLabel
            label="Nome do usuário"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nome do usuário"
              id={"name"}
              name={"name"}
              {...register("name")}
              className={error ? "error" : ""}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Nome do usuário"
              id={"email"}
              name={"email"}
              {...register("email")}
              className={error ? "error" : ""}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Senha"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Nome do usuário"
              id={"password"}
              name={"password"}
              {...register("password")}
              className={error ? "error" : ""}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>
        {!login && 
        <Form.Group className="mb-3">
          <FloatingLabel
            label="Perfil"
            className="mb-3"
          >
            <Form.Select
              aria-label="Default select example"
              className={error ? "error" : ""}
              onChange={(e) => handleProfile(e)}
            >
              <option>Selecione uma opção</option>
              {roles.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.permission}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {error && <p className={"textError"}> Usuário e senha inválidos</p>}
        </Form.Group>
        }
        <Form.Group className="mb-3">
          <FloatingLabel
            label="Cidade"
            className="mb-3"
          >
            <Form.Select
              aria-label="Default select example"
              className={error ? "error" : ""}
              onChange={(e) => handleCity(e)}
            >
              <option>Selecione uma opção</option>
              {city.map((item) => (
                <option value={item.id}>
                  {item.city} - {item.state}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {error && <p className={"textError"}> Usuário e senha inválidos</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Bairro"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Bairro"
              id={"district"}
              name={"district"}
              {...register("district")}
              className={error ? "error" : ""}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Rua" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Rua"
              id={"street"}
              name={"street"}
              {...register("street")}
              className={error ? "error" : ""}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Numero / Complemento"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Numero / Complemento"
              id={"complement"}
              name={"complement"}
              {...register("complement")}
              className={error ? "error" : ""}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="CEP" className="mb-3">
            <Form.Control
              type="text"
              placeholder="CEP"
              id={"zip_code"}
              name={"zip_code"}
              {...register("zip_code")}
              className={error ? "error" : ""}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
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

export default CreateUsers;
