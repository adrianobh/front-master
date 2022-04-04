import React, { useEffect, useState, useMemo } from "react";
import TableStriped from "../../Components/Table";
import { findAllUsers, destroyUser } from "../../services/UsersService";
import Header from "../../Components/Header";
import CreateUsers from "./CreateUsers";
import ShowUsers from "./ShowUsers";
import { ToastContainer, toast } from "react-toastify";

const ListUsers = () => {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [reload, setReload] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [id, setId] = useState(null);

  const notifySuccess = () => toast.success("Usuário deletado com sucesso");

  const notifyError = () =>
    toast.error("Ocorreu algum erro ao deletar usuário");

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "name",
      },
      {
        Header: "Perfil",
        accessor: "role",
        include: "permission",
      },
    ],
    []
  );

  useEffect(() => {
    async function getUsers() {
      const response = await findAllUsers({
        pageSize: 10,
        currentPage: currentPage,
        globalFilter: globalFilter,
      });
      setData(response.data.response);
      setTotalRows(response.data.totalRows);
      setPageCount(Math.ceil(response.data.totalRows / 10));
    }
    getUsers();
  }, [currentPage, reload, globalFilter]);

  async function deleteUsers(id) {
    const response = await destroyUser(id);
    if (response) {
      notifySuccess();
      setTimeout(() => {
        setReload(true);
        setOpenModalDelete(false);
        setReload(false);
      }, 3000);
    } else {
      notifyError();
    }
  }
  return (
    <>
      <Header
        title={"Usuários"}
        form={
          <CreateUsers
            openModal={openModal}
            setOpenModal={setOpenModal}
            setReload={setReload}
          />
        }
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      {data && (
        <TableStriped
          data={data}
          columns={columns}
          pageCount={pageCount}
          totalRows={totalRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          title={"Usuários"}
          titleDelete={"usuario"}
          setId={setId}
          id={id}
          setOpenModal={setOpenModalEdit}
          openModal={openModalEdit}
          setOpenModalDelete={setOpenModalDelete}
          openModalDelete={openModalDelete}
          form={
            <ShowUsers
              setId={setId}
              id={id}
              setReload={setReload}
              setOpenModal={setOpenModalEdit}
            />
          }
          functionDelete={deleteUsers}
          setReload={setReload}
        />
      )}
      <ToastContainer />
    </>
  );
};
export default ListUsers;
