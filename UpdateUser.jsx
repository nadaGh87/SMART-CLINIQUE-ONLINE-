import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams(); // Get the user id from URL params
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  // Fetch the user details based on ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:1111/users/${id}`);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:1111/users/${id}`, {
        email,
        password,
        role,
      });
      alert(response.data.message || 'User updated successfully!');
      navigate('/user-list'); // Redirect to the list page after successful update
    } catch (error) {
      console.error('Error updating user:', error.response?.data?.message || error.message);
      alert('Error updating user.');
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="medecin">Medecin</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
