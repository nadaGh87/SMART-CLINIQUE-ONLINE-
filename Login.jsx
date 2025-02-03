import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './login.css';
import axios from 'axios';
import user_icon from '../Assets/user-icon.png'; 
import lock_icon from '../Assets/lock-icon.png'; 

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "admin",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,  
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const { email, password } = formData; 

        axios.post('http://localhost:1190/login', { email, password })
            .then(res => {
                if (res.data.role === 'admin') {
                    setMessage("Welcome, admin!");
                    setTimeout(() => navigate('/Home'), 1000); 
                } else {
                    setMessage(res.data.message || "Access denied.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("An error occurred during login.");
            });
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
            <div className="p-3 bg-white w-25">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <img src={user_icon} alt="User Icon" />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={handleInputChange}  
                            value={formData.email} 
                        />
                    </div>
                    <div className="mb-3">
                    <img src={lock_icon} alt="User Icon" />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="form-control"
                            onChange={handleInputChange}  
                            value={formData.password}  
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Login
                    </button>
                </form>

                {message && <p className="mt-3">{message}</p>}
            </div>
        </div>
    );
};

export default Login;    