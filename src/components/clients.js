import React, { useState, useEffect } from "react";
import { getRecordsByModule } from "../server/zoho/zohoApi";
import Sidebar from "./sidebar";
import Nav from "./common/Nav";
//import Pagination from "react-js-pagination";
import Pagination from "./common/Pagination";

import { connect } from "react-redux";
import { loadClients } from "../redux/actions/clientActions";

const Clients = ({ clients, loadClients, ...props }) => {
  //const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(100);

  useEffect(() => {
    if (clients.length === 0) {
      loadClients().catch(error => {
        alert("Loading clients failed " + error);
      });
      console.log("reload!!!");
    }
    // getRecordsByModule("Contacts").then(records => {
    //   setClients(records);
    // });
  }, []);

  const handlePageChange = pageNumber => {
    console.log("active page is: " + pageNumber);
    setCurrentPage(pageNumber);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = clients.slice(indexOfFirstPost, indexOfLastPost);
  console.log("currentPage: " + currentPage);
  return (
    <div className="container" id="outer">
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
          {currentPosts.map((client, i) => {
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
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={clients.length}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
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
    clients: state.clients
  };
};

const mapDispatchToProps = {
  loadClients
};

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
