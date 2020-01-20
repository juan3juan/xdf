import React from "react";

const Table = props => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {props.headers.map((header, i) => {
            return <th scope="col">{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.records.map((record, i) => {
          return (
            <tr key={i}>
              <td> {record.Last_Name}</td>
              <td> {record.Services}</td>
              <td> {record.Phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
