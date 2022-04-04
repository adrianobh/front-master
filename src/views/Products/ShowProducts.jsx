import React from "react";
import ShowInfo from "./Show/index";
import InventoryProduct from "./InventoryProduct";
import { Tabs, Tab } from "react-bootstrap";

const ShowProducts = ({ setOpenModal, setReload, id, setId = {} }) => {
  return (
    <>
      <Tabs
        defaultActiveKey="info"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="info" title="Informações">
          <ShowInfo setOpenModal={setOpenModal} setReload={setReload} id={id} />
        </Tab>
        <Tab eventKey="inventory" title="Estoque">
          <InventoryProduct setOpenModal={setOpenModal} productId={id} setProductId={setId} />
        </Tab>
      </Tabs>
    </>
  );
};

export default ShowProducts;
