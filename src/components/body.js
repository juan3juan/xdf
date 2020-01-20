import React, { useState } from "react";
import Sidebar from "./sidebar";
//import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./common/Pagination";

const Body = () => {
  const [activePage, setActivePage] = useState(0);

  return (
    <div>
      <Pagination />
      {/* <Pagination
        activePage={activePage}
        itemsCountPerPage={100}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        //onChange={handlePageChange}
      />
      <style jsx>{`
        Pagination {
          backgroundColor: "#b90000",
          borderRadius: "5px",

        "&:hover": {
            backgroundcolor: "#772e2e";
          }

          ,

        "&:active": {
            backgroundcolor: "#772e2e";
          }
        }
      `}</style> */}
    </div>
  );
};

export default Body;
