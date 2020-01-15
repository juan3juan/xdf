import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthExample from "./AuthExample";
import Login from "./login";
import Nav from "./components/common/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Clients from "./components/clients";
import Leads from "./components/leads";
import Sidebar from "./components/sidebar";
import PrivateClients from "./components/privateClients";
import PrivateLeads from "./components/privateLeads";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Sidebar />
        {/* <Login /> */}
      </div>
      <div className="container">
        <Switch>
          <PrivateClients path="/clients" component={Clients} />
          <PrivateLeads path="/leads" component={Leads} />
          <Route path="/login" component={Login} />
          <Route path="/auth" component={AuthExample} />
          <Route path="/" exact component={Login} />
          {/* <Route path="*" component={() => "404 NOT FOUND"} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
