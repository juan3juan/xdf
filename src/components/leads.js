import React, { useState, useEffect } from "react";
import { getRecordsByModule } from "../server/zoho/zohoApi";
import Sidebar from "./sidebar";

import { connect } from "react-redux";
import { loadLeads } from "../redux/actions/leadAction";

const Leads = ({ leads, loadLeads, ...props }) => {
  //const [clients, setClients] = useState([]);
  //const [leads, setLeads] = useState([]);
  useEffect(() => {
    if (leads.length === 0) {
      loadLeads().catch(error => {
        alert("Loading leads failed " + error);
      });
    }
    console.log("leads");
    console.log(leads);
    // getRecordsByModule("Leads").then(records => {
    //   setClients(records);
    // });
  }, []);

  return (
    <div className="container" id="outer">
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
          {leads.map((lead, i) => {
            return (
              <tr key={i}>
                <td>{lead.Last_Name}</td>
                <td>{lead.Service_Need}</td>
                <td>{lead.Phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>{`
        // #outer {
        //   width: calc(100% - 300px);
        // }
      `}</style>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    leads: state.leads
  };
};

const mapDispatchToProps = {
  loadLeads
};

export default connect(mapStateToProps, mapDispatchToProps)(Leads);
