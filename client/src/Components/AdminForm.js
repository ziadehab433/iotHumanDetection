import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "./AdminContext"; // Import the context to access admins state
import "./AdminForm.css";
import { addAdmin } from "./apiClient/admin";

const AdminForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate form input
  const validate = () => {
    const newErrors = {};
    if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Auto-increment ID based on the current length of the admins array
      const newAdmin = {
        ...formData,
      };

        
      const admin = addAdmin(newAdmin)
      // Add the new admin to the list
        navigate("/Admins")
    }
  };

  return (
    <div className="form-container2">
      <h1 className="form-heading2">Add Admin</h1>
      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-group2">
          <label className="form-label2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input2"
          />
          {errors.name && <small className="error-text2">{errors.name}</small>}
        </div>
        <div className="form-group2">
          <label className="form-label2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <small className="error-text2">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label className="form-label2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input2"
          />
          {errors.password && <small className="error-text2">{errors.password}</small>}
        </div>
        <button type="submit" className="form-button2">
          Add
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
