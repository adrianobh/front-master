import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "../../Users";
import Products from "../../Products";
import Requests from "../../Requests";
import MyProfile from "../../MyProfile";
import Reports from "../../Reports";
const Body = () => {
  return (
    <>
      <Switch>
        <Route path="/home/usuarios" render={(props) => <Users {...props} />} />
        <Route
          path="/home/produtos"
          render={(props) => <Products {...props} />}
        />
        <Route
          path="/home/pedidos"
          render={(props) => <Requests {...props} />}
        />
        <Route
          path="/home/relatorios"
          render={(props) => <Reports {...props} />}
        />
        <Route
          path="/home/meu-perfil"
          render={(props) => <MyProfile {...props} />}
        />
      </Switch>
    </>
  );
};
export default Body;
