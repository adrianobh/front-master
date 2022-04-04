import React from "react";
import { Route, Switch } from "react-router-dom";
import ListProducts from "./ListProducts";

const Products = () => {
  return (
    <>
      <Switch>
        <Route
          path="/home/produtos"
          exact={true}
          render={(props) => <ListProducts {...props} />}
        />
      </Switch>
    </>
  );
};
export default Products;
