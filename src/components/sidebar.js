import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Clients from "./clients";
// import Leads from "./leads";
import { slide as Menu } from "react-burger-menu";

const Sidebar = () => {
  return (
    <div>
      <Menu>
        <a className="menu-item" href="/clients">
          Clients
        </a>
        <a className="menu-item" href="/leads">
          Leads
        </a>
      </Menu>
      <style jsx>{`
        /* Individual item */
        .bm-item {
          display: inline-block;

          /* Our sidebar item styling */
          text-decoration: none;
          margin-top: 10px;
          margin-bottom: 10px;
          color: #d1d1d1;
          transition: color 0.2s;
          font-size: 1.5em;
        }

        /* Change color on hover */
        .bm-item:hover {
          color: #00448b;
          //background: #5f79a3;
        }

        /* The rest copied directly from react-burger-menu docs */

        /* Position and sizing of burger button */
        .bm-burger-button {
          position: fixed;
          width: 36px;
          height: 30px;
          left: 36px;
          top: 70px;
        }

        /* Color/shape of burger icon bars */
        .bm-burger-bars {
          //background: #373a47;
          //background: #00448b;
          background: #5f79a3;
        }

        /* Position and sizing of clickable cross button */
        .bm-cross-button {
          height: 24px;
          width: 24px;
        }

        /* Color/shape of close button cross */
        .bm-cross {
          background: #bdc3c7;
        }

        /* General sidebar styles */
        .bm-menu {
          background: #b0c4de; //5f79a3;
          padding: 2.5em 1.5em 0;
          font-size: 1.15em;
        }

        /* Morph shape necessary with bubble or elastic */
        .bm-morph-shape {
          fill: #373a47;
        }

        /* Wrapper for item list */
        .bm-item-list {
          color: #b8b7ad;
        }

        /* Styling of overlay */
        .bm-overlay {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>

    // <div className="">
    //   <div className="row">
    //     <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 sidebar">
    //       <ul className="navbar-nav" id="sidebar">
    //         <li className="nav-item active">
    //           <a href="/clients" data-toggle="tab" name="vtab1" onClick>
    //             Tab 1
    //           </a>
    //         </li>
    //         <li className="nav-item">
    //           <a href="/leads" data-toggle="tab">
    //             Tab 2
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9" id="content">
    //       <Clients />
    //     </div>
    //   </div>

    //   <style jsx>{`
    //     #sidebar {
    //       //   margin: 0;
    //       //   padding: 0;
    //       width: 300px;
    //       background-color: #f1f1f1;
    //       position: fixed;
    //       height: 100%;
    //       //   overflow: auto;
    //     }

    //     #sidebar a {
    //       display: block;
    //       color: black;
    //       padding: 16px;
    //       text-decoration: none;
    //     }
    //     #content {
    //       width: calc(100%-300px);
    //       background-color: blue;
    //     }
    //   `}</style>
    //</div>
  );
};

export default Sidebar;
