import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/logs", 
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
});

export const getSensorLogs = async () => {
  const response = await apiClient.get("/sensor?limit=10");
  return response.data.payload;
};

export const getMaintenanceLogs = async (sensor) => {
  const response = await apiClient.post("/maintenance?limit=10", sensor);
  return response.data.payload;
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
