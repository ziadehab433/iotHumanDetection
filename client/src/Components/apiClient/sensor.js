import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/sensor", 
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
});

export const getSensors = async () => {
  const response = await apiClient.get("/");
  return response.data;
};

export const addSensors = async (sensor) => {
  const response = await apiClient.post("/", sensor);
  return response.data;
};

export const deleteSensors = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    if (response.status !== 204) {
      throw new Error("Failed to delete sensor");
    }
    return response.data;
  } catch (error) {
    console.error("Error in deleteSensor:", error);
    throw error;
  }
};
