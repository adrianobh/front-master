import React from "react";

import { Modal } from "react-bootstrap";

const LargeModal = ({ openModal, setOpenModal, title, formulario }) => {
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
        <Modal.Body>{formulario}</Modal.Body>
      </Modal>
    </>
  );
};

export default LargeModal;
