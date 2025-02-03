import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ListeUser.css";

const ListeUser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:1190/users", {
          headers: {
            email: "naadaa59@gmail.com",
            password: "nadaahmed"
          }
        });
        console.log("Fetched users:", response.data);
        setUsers(response.data.users); // Ensure response.data.users is an array
      } catch (error) {
        console.error("Erreur de récupération des utilisateurs:", error.response || error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-user/${id}`);
  };

  const handleDelete = async (id) => {
    console.log("Deleting user with ID:", id);  // Log the user ID
    try {
      const response = await axios.delete(`http://localhost:1190/users/${id}`);
      alert(response.data.message || "User deleted successfully.");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data?.message || error.message);
      alert("Error deleting user.");
    }
  };
  
  return (
    <div className="liste-user-container">
      <h2>Liste des Utilisateurs</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Mise à jour</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">Aucun utilisateur trouvé</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-update" onClick={() => handleUpdate(user.id)}>
                    Update
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(user.id)}>
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


export default ListeUser;
