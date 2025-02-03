import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClinicMedical } from 'react-icons/fa';
import './Style.css';
import home from  './Assets/home.jpg'

const Home = () => {
    const navigate = useNavigate();

    const handlePasswordChange = () => {
        navigate('/change-password');
    };

    return (
        <div className="home-container">
            <button className="styled-button" onClick={handlePasswordChange}>
                <FaClinicMedical className="button-icon" /> Welcome to our Smart Clinic
            </button>
        </div>
    );
};

export default Home;