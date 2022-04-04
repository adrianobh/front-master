import React from "react";

import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({
  openModal,
  setOpenModal,
  title,
  functionDelete,
  id,
  rotina,
}) => {
  return (
    <>
      <Modal
        size="lg"
        show={openModal}
        onHide={() => setOpenModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>
            Você tem certeza que deseja deletar um{" "}
            <span style={{ textDecoration: "underline" }}>{rotina}</span> ?
          </h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => functionDelete(id)}>
            Sim
          </Button>
          <Button variant="danger" onClick={() => setOpenModal(false)}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
