import React, { useEffect, useState } from "react";
import { ListGroup, Table } from "react-bootstrap";
import { findRequest } from '../../services/RequestService';
import { ToastContainer } from "react-toastify";
import moment from 'moment'
import "react-toastify/dist/ReactToastify.css";

const ShowRequests = ({ id }) => {
  const [request, setRequest] = useState('');

  useEffect(() => {
    async function getRequest() {
      const response = await findRequest(id);
      setRequest(response.data);
    }
    getRequest();
  }, [id]);

  return (
    <>
      <ListGroup as="ul">
        {request && (
          <>
            <ListGroup.Item as="li" active className="d-flex justify-content-between align-items-start">
              <span> Cliente: {request.user.name} </span>
              <span> Valor Total: {request.total_price} </span>
              <span> Data: {moment(request.data_sale).format('DD/MM/YYYY')} </span>
            </ListGroup.Item>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Valor</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {request.request_product.map((item, key) => (
                  <>
                    <tr>
                      <td>{item.product.description}</td>
                      <td>R${item.price}</td>
                      <td>{item.amout}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>

          </>
        )}
      </ListGroup>
      <ToastContainer />
    </>
  );
};

export default ShowRequests;
