import React from "react";
import "./Logs.css";

function Logs() {
  return (
    <div className="logs-container">
      <h1>Logs</h1>
      <div className="table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>status</th>
              <th>timestamp</th>
              <th>location</th>
              <th className="buttons-header">
                <button className="select-btn">Select</button>
                <button className="download-btn">Download</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Logs;
