import React, { useState, useEffect } from "react";
import SidebarS from "../Components/SidebarS";
import Sidebar from "../Components/Sidebar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import axios from "axios";


const getSensorIcon = (status) => {
  let iconUrl;
  switch (status) {
    case "active":
      iconUrl = "./public/active.png"; 
      break; 
    case "detect":
      iconUrl = "/images/detect.png"; 
      break;
    case "maintaince":
      iconUrl = "/images/final.png"; 
      break;
    case "notActive":
      iconUrl = "/images/notActive.png";
      break;
    default:
      iconUrl = "https://cdn-icons-png.flaticon.com/512/684/684908.png"; 
  }

  return L.icon({
    iconUrl: iconUrl,
    iconSize: [50, 50], 
    iconAnchor: [50, 50], 
    popupAnchor: [0, -50],
  });
};

const Maps = () => {
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/sensor", { 
          headers: { 
             "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      });
      if (response.data.success) {
        setSensors(response.data.payload);
      } else {
        setError("Failed to fetch data.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading map...</p>;
  if (error) return <p>Error: {error}</p>;

function Navbar(){
    const sup = localStorage.getItem("super");
     if(sup == "true"){
        return(<SidebarS/>);
     } 
     else{
        return(<Sidebar/>);
     }
}

    const ws = new WebSocket(`ws://localhost:8080?token=${localStorage.getItem("token")}`)
    ws.addEventListener('open', (event) => { 
        console.log("connection opened")
    })

    ws.addEventListener('close', (event) => { 
        console.log("connection closed")
    })

    ws.addEventListener('message', async (event) => { 
        console.log("sensor: ", sensors[0])
        try {
          const data = await event.data.text();
          const receivedSensor = JSON.parse(data);

          setSensors((prevSensors) =>
            prevSensors.map((sensor) =>
              sensor.id === receivedSensor.sensor_id
                ? {
                    ...sensor,
                    status: receivedSensor.detected ? "human detected" : "active",
                  }
                : sensor
            )
          );
        } catch (err) {
          console.error("Error processing WebSocket message:", err);
        }
    })

  return (

    <div style={{ display: "flex", flexDirection: "row" }}> 
        {/* الشريط الجانبي */}
        <div style={{ flex: "0 0 11%", paddingRight: "10px" }}> 
            <Navbar />
        </div>
    <div id="map-container">
      <div style={{ display: "flex", width: "100%" }}>
        <MapContainer
          center={[30.0444, 31.2357]} 
          zoom={15} 
          style={{
            flex: 1,
            height: "800px",
            width: "1000px",
            borderRadius: "10px",
            marginRight: "90px",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
       
          {sensors.map((sensor) => (
            <Marker
              key={sensor.id}
              position={[sensor.location.coordinates[0], sensor.location.coordinates[1]]}
              icon={getSensorIcon(sensor.status)}
              eventHandlers={{
                click: () => setSelectedSensor(sensor), 
              }}
            >
              <Popup>{`Sensor ${sensor.id}`}</Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="sensor-details">
          {selectedSensor ? (
            <>
              <h3>Sensor Details</h3>
              <p><strong>ID:</strong> {selectedSensor.id}</p>
              <p><strong>Status:</strong> {selectedSensor.status}</p>
              <p><strong>Last Maintenance:</strong> {selectedSensor.lastMaintenance}</p>
              <p><strong>Location:</strong> (lat: {selectedSensor.location.coordinates[0]}, lon: {selectedSensor.location.coordinates[1]})</p>
            </>
          ) : (
            <p style={{ fontSize: "20px" }}>Please click on a sensor to view details.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Maps;
