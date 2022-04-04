import React from "react";

import { Row, Col, Button } from "react-bootstrap";
import styles from "./style.module.css";
import LargeModal from "../../Components/Modal/LargeModal";

const Header = ({ title, form, openModal, setOpenModal, disabled = false, redirect = false, modalOnly = false }) => {
  return (
    <>
      {!modalOnly &&
        <>
          <Row className={styles.fistRow}>
            <Col xs="9">
              <h3>{title}</h3>
            </Col>
            <Col xs="3" className={styles.colButton}>
              {!redirect ? (
                <Button
                  variant="success"
                  onClick={() => setOpenModal(true)}
                  disabled={disabled}
                >
                  Novo {title}
                </Button>
              ) : (
                <>
                  <a href={redirect}>
                    <Button
                      variant="success"
                      onClick={() => setOpenModal(true)}
                      disabled={disabled}
                    >
                      Novo {title}
                    </Button>
                  </a>
                </>
              )}
            </Col>
          </Row>
        </>
      }

      <LargeModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={title}
        formulario={form}
      />
    </>
  );
};
export default Header;
