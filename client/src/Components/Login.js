import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../util/util";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const LoginControl = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      });

      if (res.data.success) {
        let suc = res.data.success
        if(suc) {
          const token = res.data.payload.token; 
          setMessage("Login successful!");
          setMessageColor("green");
          console.log("Response Token:", token);
          localStorage.setItem("token", token);
          const jwtPayload = parseJwt(token);
          localStorage.setItem("admin_id", jwtPayload.admin_id);
          localStorage.setItem("super", jwtPayload.super);
          navigate("/DashBoard");

        } else {
          setMessage("Login failed. Please check your credentials.");
          setMessageColor("red");
        }
      } else {
        console.log("No data recieved.", res.data.payload)
      }

    } catch (error) {
      
      setMessage("An error occurred. Please try again later.");
      setMessageColor("red");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={LoginControl} className="form">
        <h1 style={{ textAlign: "center" }}>Login Page</h1>

        {/* Email Field */}
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
            placeholder="Please admin enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
            placeholder="Please admin enter your password"
          />
        </div>

        {/* Sign In Button */}
        <button type="submit" className="button">
          Sign In
        </button>

        {/* Message */}
        {message && (
          <p
            className="message"
            style={{
              color: messageColor,
              textAlign: "center",
              padding: "10px 0px",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
