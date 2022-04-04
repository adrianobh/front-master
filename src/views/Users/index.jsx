import React from "react";
import { Route, Switch } from "react-router-dom";
import ListUsers from "./ListUsers";
const Users = () => {
  return (
    <>
      <Switch>
        <Route
          path="/home/usuarios"
          exact={true}
          render={(props) => <ListUsers {...props} />}
        />
      </Switch>
    </>
  );
};
export default Users;
