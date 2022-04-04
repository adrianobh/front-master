import React, { useEffect, useState, useMemo } from "react";
import TableStriped from "../../Components/Table";
import { findAllRequest, destroyRequest } from "../../services/RequestService";
import Header from "../../Components/Header";
import ShowRequests from "./ShowRequests";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ListRequests = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [reload, setReload] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [id, setId] = useState(null);

  const notifySuccess = () => toast.success("Pedido deletado com sucesso");

  const notifyError = () =>
    toast.error("Ocorreu algum erro ao deletar Pedido");

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "user",
        include: "name"
      },
      {
        Header: "Valor",
        accessor: "total_price",
      },
    ],
    []
  );

  useEffect(() => {
    async function getRequests() {
      const response = await findAllRequest({
        pageSize: 10,
        currentPage: currentPage,
        globalFilter: globalFilter,
        user_id: user.id,
      });
      setData(response.data.response);
      setTotalRows(response.data.totalRows);
      setPageCount(Math.ceil(response.data.totalRows / 10));
    }
    getRequests();
  }, [currentPage, reload, globalFilter, user.id]);

  async function deleteRequest(id) {
    const response = await destroyRequest(id);
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
        title={"Pedidos"}
        redirect={"/home/pedidos/criar/pedido"}
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
          title={"Pedidos"}
          titleDelete={"pedido"}
          setId={setId}
          id={id}
          setOpenModal={setOpenModalEdit}
          openModal={openModalEdit}
          setOpenModalDelete={setOpenModalDelete}
          openModalDelete={openModalDelete}
          form={
            <ShowRequests
              setId={setId}
              id={id}
              setReload={setReload}
              setOpenModal={setOpenModalEdit}
            />
          }
          functionDelete={deleteRequest}
          setReload={setReload}
          iconEdit={faEye}
          textEdit={'Ver'}
        />
      )}
      <ToastContainer />
    </>
  );
};
export default ListRequests;
