
import { useAdminContext } from "./AdminContext"; // Import context
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmins } from "./apiClient/admin";
import { deleteAdmin } from "./apiClient/admin";

const AdminTable = () => {
  const [ admins, setAdmins ] = useState([]); // Access context for admins and setter
  const navigate = useNavigate();

  const handleAdd = () => {
    // Navigate to the add admin page
    navigate("/add-admin");
  };

  useEffect(() => {
    async function fetchAdmins() {
      const data = await getAdmins();
      setAdmins(data);
    }
    fetchAdmins();
  }, [setAdmins]);

  const handleDelete = async (id) => {
    try {
      // Call delete API if you're interacting with a backend
      deleteAdmin(id);

      // Directly update the state (assuming the backend deletion is successful)
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));

    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

    function AddAdmin() { 
        navigate("/AddAdmin")
    }


  return (
    <div>
      <h2 className="admin-title">Admins</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>Email</th>
            <th>password</th>
            <th>
              <button className="add-button" onClick={AddAdmin}>
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-sensors-message">
                There are no admins here until you add one.
              </td>
            </tr>
          ) : (
            admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.password}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(admin.id)} // Ensure the correct admin ID is passed
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
