import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSensorContext } from "./SensorContext";
import { getSensors, deleteSensors } from "./apiClient/sensor";
import "./SensorTable.css";

function SensorTable() {
  const [sensors, setSensors] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSensors() {
      const data = await getSensors();
      setSensors(data.payload);
    }
    fetchSensors();
  }, [setSensors]);

  const handleAdd = () => {
    navigate("/AddSensor");
  };

  const handleDelete = async (id) => {
    try {
      deleteSensors(id);
      setSensors(sensors.filter((sensor) => sensor.id !== id));
    } catch (error) {
      console.error("Error deleting sensor:", error);
    }
  };

  return (
    <div>
      <h2 className="admin-title">Sensors</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>status</th>
            <th>location</th>
            <th>
              <button className="add-button" onClick={handleAdd}>
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sensors.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-sensors-message">
                There are no sensors here until you add one.
              </td>
            </tr>
          ) : (
            sensors.map((sensor) => (
              <tr key={sensor.id}>
                <td>{sensor.id}</td>
                <td>{sensor.name}</td>
                <td>{sensor.status}</td>
                <td>(lat: {sensor.location.coordinates[0]}, lon: {sensor.location.coordinates[1]})</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(sensor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SensorTable;
