import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthExample from "./AuthExample";
import Login from "./login";
import Nav from "./components/common/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Clients from "./components/clients";
import Leads from "./components/leads";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Sidebar />
      </div>
      <div className="container">
        <Route path="/clients" component={Clients} />
        <Route path="/leads" component={Leads} />
      </div>
    </Router>
  );
}

export default App;
