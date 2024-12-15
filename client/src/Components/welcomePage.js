import React from "react";
import "./welcomePage.css";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>
          <span className="pp">H</span>ello there!
        </h1>
        <h2>We welcome admins to the <span className="pp" > human detection </span> system</h2>
        <br/>
       

        <Link to="/Loginn" className="welcome-button">
          Click here to log in
        </Link>
        <br/>
        <br/>
        <br/>

        <Link to="/help" className="help_page_button">
          Help&&Support page
        </Link>


      </div>
    </div>   






  );
}

export default WelcomePage;
