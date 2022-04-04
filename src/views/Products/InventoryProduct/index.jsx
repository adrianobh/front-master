import React, { useEffect, useState, useMemo } from "react";
import { inventoryByProductId, destroyInventoryProduct } from "../../../services/InventoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableStriped from "../../../Components/Table";
import Header from "../../../Components/Header";
import CreateInventoryProduct from "./CreateInventoryProduct";
import ShowInventoryProduct from './ShowInventoryProduct';
import { useSelector } from "react-redux";

const InventoryProduct = ({ productId }) => {
  const { user } = useSelector((state) => state.auth);
  const [id, setId] = useState('');
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [reload, setReload] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const notifySuccessDelete = () => toast.success("Estoque deletado com sucesso");
  const notifyErrorDelete = () => toast.error("Estoque deletado com sucesso");

  const columns = useMemo(
    () => [
      {
        Header: "Lote",
        accessor: "lote",
      },
      {
        Header: "Quantidade",
        accessor: "quantidade",
      },
      {
        Header: "Unidade",
        accessor: "unidade",
      },
      {
        Header: "Preço",
        accessor: "valor",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  useEffect(() => {
    async function getInventory() {
      const response = await inventoryByProductId({
        pageSize: 10,
        currentPage: currentPage,
        globalFilter: globalFilter,
        product_id: productId,
        user_id: user.id,
        profile: user.role.permission
      });
      setData(response.data.response);
      setTotalRows(response.data.totalRows);
      setPageCount(Math.ceil(response.data.totalRows / 10));
    }
    getInventory();
  }, [currentPage, reload, globalFilter]);

  async function deleteInventory(id) {
    const response = await destroyInventoryProduct(id);
    if (response) {
      notifySuccessDelete();
      setTimeout(() => {
        setReload(true);
        setOpenModalDelete(false);
        setReload(false);
      }, 3000);
    } else {
      notifyErrorDelete();
    }
  }

  return (
    <>
      <Header
        title={"Lote"}
        form={
          <CreateInventoryProduct
            openModal={openModalCreate}
            setOpenModal={setOpenModalCreate}
            setReload={setReload}
            product_id={productId}
          />
        }
        openModal={openModalCreate}
        setOpenModal={setOpenModalCreate}
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
        title={"Estoque"}
        titleDelete={"Estoque do produto"}
        setId={setId}
        id={id}
        setOpenModal={setOpenModalEdit}
        openModal={openModalEdit}
        setOpenModalDelete={setOpenModalDelete}
        openModalDelete={openModalDelete}
        form={
          <ShowInventoryProduct
            setId={setId}
            id={id}
            setReload={setReload}
            setOpenModal={setOpenModalEdit}
          />
        }
        functionDelete={deleteInventory}
        setReload={setReload}
      />
      <ToastContainer />
    </>
  );
};

export default InventoryProduct;
