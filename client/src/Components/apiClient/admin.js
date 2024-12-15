// src/services/api.js
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/admin", // Replace with your actual API URL
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  });
  

// Fetch all admins
export const getAdmins = async () => {
  const response = await apiClient.get("/");
  return response.data.payload;
};

// Add a new admin
export const addAdmin = async (admin) => {
  const response = await apiClient.post("/", admin);
  return response.data.payload;
};

// Delete an admin by ID
// api.js
export const deleteAdmin = async (id) => {
    try {
      const response = await apiClient.delete(`/${id}`)
  
      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }
      console.log(`Admin with ID ${id} deleted successfully`); // Debugging log
    } catch (error) {
      console.error("Error in deleteAdmin:", error);
      throw error; // Rethrow the error to be handled by the component
    }
  };
  
