import React, { useState } from "react";
import './LoginSignup.css';
import { useNavigate } from "react-router-dom";
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "patient",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const url = action === "Login" ? "/auth/login" : "/auth/register"; 
        try {
            const response = await fetch(`http://localhost:7214${url}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            let data;
            try {
                data = await response.json();
            } catch {
                throw new Error("Invalid JSON response");
            }
    
            if (response.ok) {
                alert(`${action} successful! Welcome, ${data.role}.`);
                navigate("/Home");
            } else {
                alert(data.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    };
            
    
    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Sign Up" && (
                    <>
                        <div className="input">
                            <img src={user_icon} alt="User Icon" />
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <img src={user_icon} alt="User Icon" />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}
                <div className="input">
                    <img src={email_icon} alt="Email Icon" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {action === "Sign Up" && (
                    <div className="input">
                        <label>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="patient">Patient</option>
                            <option value="medecin">Medecin</option>
                        </select>
                    </div>
                )}
            </div>
            <div className="submit-container">
                <div
                    className="submit"
                    onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}
                >
                    Switch to {action === "Login" ? "Sign Up" : "Login"}
                </div>
                <div className="submit" onClick={handleSubmit}>
                    {action}
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
