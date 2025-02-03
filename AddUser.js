

import React, { useState } from "react";
import axios from "axios";
import "./adduser.css"; // Fichier CSS externe pour le style

const AddUser = ({ onUserAdded }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel à l'API pour ajouter un utilisateur
      const response = await axios.post("http://localhost:1111/api/users", {
        email,
        password,
        role,
      });

      // Rappel pour mettre à jour la liste dans ListeUser
      if (onUserAdded) {
        onUserAdded(response.data);
      }

      // Réinitialisation du formulaire
      setEmail("");
      setPassword("");
      setRole("");
      alert("Utilisateur ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      alert("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
    }
  };

  return (
    <div className="add-user-container">
      <h2>Ajouter un Utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rôle :</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-submit">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddUser;

