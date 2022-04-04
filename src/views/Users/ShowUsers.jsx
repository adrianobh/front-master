import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { roleOptions } from "../../services/RoleService";
import { userPut, findOneUser } from "../../services/UsersService";
import { cityOptions } from "../../services/CityService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowUsers = ({ setOpenModal, setReload, id }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [roles, setRoles] = useState([]);
  const [city, setCity] = useState([]);
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [citySelected, setCitySelected] = useState(null);

  const notifySuccess = () => toast.success("Usuário editado com sucesso");
  const notifyError = () => toast.error("Ocorreu algum erro ao editar usuário");

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

  useEffect(() => {
    async function getOneUser() {
      const response = await findOneUser(id);
      setData(response.data);
    }
    getOneUser();
  }, [id]);

  async function onSubmit(dados) {
    if (dados && dados.name === "") {
      Object.assign(dados, {
        name: data.name,
      });
    }
    if (dados && dados.email === "") {
      Object.assign(dados, {
        email: data.email,
      });
    }
    if (profile) {
      Object.assign(dados, {
        role_id: profile,
      });
    }else {
      Object.assign(dados, {
        role_id: data.role && data.role.id,
      });
    }
    if (citySelected) {
      Object.assign(dados, {
        city_id: citySelected,
      });
    }else{
      Object.assign(dados, {
        city_id: data.address && data.address.city.id,
      });
    }
    if (dados && dados.complement === "") {
      Object.assign(dados, {
        complement: data.address ? data.address.complement : null,
      });
    }
    if (dados && dados.district === "") {
      Object.assign(dados, {
        district: data.address ? data.address.district : null,
      });
    }
    if (dados && dados.street === "") {
      Object.assign(dados, {
        street: data.address ?data.address.street : null,
      });
    }
    if (dados && dados.zip_code === "") {
      Object.assign(dados, {
        zip_code: data.address ? data.address.zip_code : null,
      });
    }
    Object.assign(dados, {
      address_id: data.address ? data.address.id : null,
    });
    const response = await userPut(dados, id);
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
              defaultValue={data.name}
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
              defaultValue={data.email}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

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
              {roles.map((item) => (
                <option value={item.id}
                  selected={data.role && data.role.id === item.id ? true : false}
                  >
                  {item.permission}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {error && <p className={"textError"}> Usuário e senha inválidos</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Cidade"
            className="mb-3"
            onChange={(e) => handleCity(e)}

          >
            <Form.Select
              aria-label="Default select example"
              className={error ? "error" : ""}
            >
              <option>Selecione uma opção</option>
              {city.map((item) => (
                <option value={item.id}
                selected={data.address && data.address.city.id === item.id ? true : false}
                >
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
              defaultValue={data.address ? data.address.district : null}
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
              defaultValue={data.address ? data.address.street : null}
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
              defaultValue={data.address ? data.address.complement : null}
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
              defaultValue={data.address ? data.address.zip_code : ""}
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

export default ShowUsers;
