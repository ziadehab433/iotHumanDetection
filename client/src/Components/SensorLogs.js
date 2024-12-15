import React, { useState, useEffect } from "react";
import "./SensorLogs.css";
import { getSensorLogs } from "./apiClient/logs";

function SensorLogs() {
  const [sensorLogs, setSensorLogs] = useState([])
  
  useEffect(() => {
    async function fetchSensors() {
      const data = await getSensorLogs();
      setSensorLogs(data);
    }
    fetchSensors();
  }, [setSensorLogs]);

  return (
    <div className="logs-container1">
      <h1>Sensor Logs</h1>
      <div className="table-container11">
        <table className="logs-table">
          <thead>
            <tr>
              <th>id</th>
              <th>detected</th>
              <th>created at</th>
              <th>updated at</th>
              <th className="buttons-header">
                <button className="download-btn">Download</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sensorLogs.map((sensor, index) => (
              <tr key={index}>
                <td>{sensor.sensor_id}</td>
                <td>{sensor.detected == true ? "true" : "false"}</td>
                <td>{sensor.createdAt}</td>
                <td>{sensor.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SensorLogs;
