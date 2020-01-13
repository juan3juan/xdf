import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import fakeAuth from "./fakeAuth";

const Public = () => <h3>Public</h3>;
const Protected = () => {
  function signout(e) {
    e.preventDefault();
    fakeAuth.signout();
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h3>Protected</h3>
      <button onClick={signout}>Sign out</button>
    </div>
  );
};

const Login = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true);
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    login();
    return <Redirect to="/" />;
  }
  return redirectToReferrer ? (
    <Redirect to="/" />
  ) : (
    <div>
      <p>You must log in to view the page</p>
      <button onClick={handleSubmit}>Log in</button>
    </div>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default function AuthExample() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="navbar-item">
              <Link to="/public" className="nav-link p-3">
                Public Page
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/protected" className="nav-link p-3">
                Protected Page
              </Link>
            </li>
          </ul>
        </nav>
        <br />
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}
