import React, { useState } from "react";
import AddSensor from "./AddSensor";
import Maps from "./Maps";
import SidebarS from "./SidebarS";
import Sidebar from "./Sidebar";
import { addSensors } from "./apiClient/sensor";

const App = () => {
  function Navbar(){
      const rol = "SuperAdmin";
       if(rol === "SuperAdmin"){
          return(<SidebarS/>);
       } 
       else{
          return(<Sidebar/>);
       }
  }
  const [sensors, setSensors] = useState([]); // تخزين الحساسات المضافة
  const [selectedLocation, setSelectedLocation] = useState(""); // الموقع المختار

  const addSensor = (sensor) => {
      sensor.admin_id = localStorage.getItem("admin_id")
      sensor.status = "active"
      sensor.name = sensor.Name
      const resData = addSensors(sensor)
  };

  const handleMapClick = (location) => {
      const loc = `${location[0]},${location[1]}`
    setSelectedLocation(loc); // تحديث الموقع عند النقر
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f7" }}>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Sensor Management</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "20px" }}>
          <Navbar/>
        </div>
        <div style={{ flex: 2, minWidth: "500px" }}>
          <Maps sensors={sensors} onMapClick={handleMapClick} />
        </div>
        <div style={{ flex: 3, minWidth: "400px" }}>
          <AddSensor onAddSensor={addSensor} selectedLocation={selectedLocation} />
        </div>
      </div>
    </div>
  );
};

export default App;
