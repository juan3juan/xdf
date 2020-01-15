import React, { useState, useEffect } from "react";
import { getRecordsByModule } from "../server/zoho/zohoApi";
import Sidebar from "./sidebar";

const Leads = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    getRecordsByModule("Leads").then(records => {
      console.log("records");
      console.log(records[0]);
      setClients(records);
      console.log("clients");
      console.log(clients);
    });
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", padding: "10px" }}>Leads</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">LAST NAME</th>
            <th scope="col">SERVICES NEED</th>
            <th scope="col">PHONE</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, i) => {
            return (
              <tr key={i}>
                <td>{client.Last_Name}</td>
                <td>{client.Service_Need}</td>
                <td>{client.Phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leads;
