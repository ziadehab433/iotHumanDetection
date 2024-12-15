import React from 'react';
import './SidebarS.css'; 
import { Link } from 'react-router-dom';

export default function SidebarS() {

    function logOut() { 
        localStorage.clear();
    }
  return (
    <div className="sidebar">
      <div className="icon-container">
        <Link to={"/DashBoard"}>
          <img src="./home.png" alt="DashBoard" className="icon" />
        </Link>
      </div>
      <div className="icon-container">
        <Link to={"/Map"}>
         <img src="Google.png" alt="Map" className="icon" />
        </Link>
      </div>
      <div className="icon-container" onClick={logOut}>
        <Link to={"/"}>
          <img src="./logout.png" alt="Logout" className="icon" />
        </Link>
      </div>
    </div>
  );
}
