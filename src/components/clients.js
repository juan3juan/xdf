import React, { useState, useEffect } from "react";
import { getRecordsByModule } from "../server/zoho/zohoApi";

const Clients = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    getRecordsByModule("Contacts").then(records => {
      console.log("records");
      console.log(records[0]);
      setClients(records);
      console.log("clients");
      console.log(clients);
    });
  }, []);

  const handleClick = e => {
    e.preventDefault();
    console.log("clients1");
    console.log(clients[0].Owner);
  };
  return (
    <div className="container">
      <h2 style={{ textAlign: "center", padding: "10px" }}>Clients</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">LAST NAME</th>
            <th scope="col">SERVICES</th>
            <th scope="col">PHONE</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, i) => {
            return (
              <tr key={i}>
                <td>{client.Last_Name}</td>
                <td>{client.Services}</td>
                <td>{client.Phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
