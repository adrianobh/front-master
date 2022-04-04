import React, { useEffect, useState, useMemo } from "react";
import TableStriped from "../../Components/Table";
import {
  findAllProducts,
  destroyProduct,
} from "../../services/ProductsService";
import Header from "../../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import CreateProducts from "./CreateProducts";
import ShowProducts from "./ShowProducts";

const ListProducts = () => {
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

  const notifySuccess = () => toast.success("Produto deletado com sucesso");
  const notifyError = () =>
    toast.error("Ocorreu algum erro ao deletar um produto");

  const columns = useMemo(
    () => [
      {
        Header: "Produto",
        accessor: "description",
      },
    ],
    []
  );

  useEffect(() => {
    async function getUsers() {
      const response = await findAllProducts({
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
    const response = await destroyProduct(id);
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
        title={"Produtos"}
        form={
          <CreateProducts
            openModal={openModal}
            setOpenModal={setOpenModal}
            setReload={setReload}
          />
        }
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <TableStriped
        data={data}
        columns={columns}
        pageCount={pageCount}
        totalRows={totalRows}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        title={"Produtos"}
        titleDelete={"produto"}
        setId={setId}
        id={id}
        setOpenModal={setOpenModalEdit}
        openModal={openModalEdit}
        setOpenModalDelete={setOpenModalDelete}
        openModalDelete={openModalDelete}
        onlyAdmin={true}
        form={
          <ShowProducts
            setId={setId}
            id={id}
            setReload={setReload}
            setOpenModal={setOpenModalEdit}
            openModal={openModal}
          />
        }
        functionDelete={deleteUsers}
        setReload={setReload}
      />
      <ToastContainer />
    </>
  );
};
export default ListProducts;
