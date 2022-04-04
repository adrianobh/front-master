import React from "react";
import { Route, Switch } from "react-router-dom";
import ListRequests from "./ListRequests";
import CreateRequests from "./CreateRequests";
const Requests = () => {
  return (
    <>
      <Switch>
        <Route
          path="/home/pedidos"
          exact={true}
          render={(props) => <ListRequests {...props} />}
        />
        <Route
          path="/home/pedidos/criar/pedido"
          render={(props) => <CreateRequests {...props} />}
        />
      </Switch>
    </>
  );
};
export default Requests;
