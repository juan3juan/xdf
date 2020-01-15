import React from "react";
import { Route, Redirect } from "react-router-dom";
import Leads from "./leads";
import fakeAuth from "../fakeAuth";

const PrivateLeads = ({ component: Component, ...rest }) => {
  console.log(fakeAuth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        // fakeAuth.isAuthenticated
        sessionStorage.getItem("isAuthenticate") === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateLeads;
