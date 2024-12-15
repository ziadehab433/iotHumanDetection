import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";

const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

const ClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng; // إحداثيات النقطة
      onMapClick([lat, lng]); // إرسال الإحداثيات
    },
  });
  return null;
};

const Maps = ({ sensors, onMapClick }) => {
  return (
    <div id="map-container">
      <h3 style={{ margin: "20px 40px" }}>Sensor Locations</h3>
      <MapContainer
        center={[30.0444, 31.2357]}
        zoom={15}
        style={{
          width: "100%",
          height: "400px",
          margin: "20px 40px",
          borderRadius: "10px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickHandler onMapClick={onMapClick} />
        {sensors.map((sensor, index) => (
          <Marker
            key={index}
            position={sensor.location || [30.0444, 31.2357]} // الموقع الافتراضي إذا لم يتم تحديده
            icon={customIcon}
          >
            <Popup>
              <b>{sensor.Name}</b> <br />
              Status: {sensor.status} <br />
              Maintenance: {sensor.NOM} {sensor.period}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
