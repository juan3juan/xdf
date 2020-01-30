import React, { useState, useEffect } from "react";
import { getRecordsByModule } from "../server/zoho/zohoApi";
import Sidebar from "./sidebar";
// redux
import { connect } from "react-redux";
import { loadLeads } from "../redux/actions/leadAction";
// pagination
import Pagination from "./common/Pagination";

const Leads = ({ leads, loadLeads, ...props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(100);

  useEffect(() => {
    if (leads.length === 0) {
      loadLeads().catch(error => {
        alert("Loading leads failed " + error);
      });
      console.log("reload!!!");
    }
    console.log("leads");
    console.log(leads);
    // getRecordsByModule("Leads").then(records => {
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
  const currentPosts = leads.slice(indexOfFirstPost, indexOfLastPost);
  console.log("currentPage: " + currentPage);

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
          {currentPosts.map((lead, i) => {
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
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={leads.length}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
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
