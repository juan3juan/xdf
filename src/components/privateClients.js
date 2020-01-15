import React from "react";
import { Route, Redirect } from "react-router-dom";
import Clients from "./clients";
import fakeAuth from "../fakeAuth";

const PrivateClients = ({ component: Component, ...rest }) => {
  console.log(localStorage.getItem("isAuthenticate"));
  return (
    <Route
      {...rest}
      render={props =>
        // fakeAuth.isAuthenticated
        localStorage.getItem("isAuthenticate") === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateClients;
