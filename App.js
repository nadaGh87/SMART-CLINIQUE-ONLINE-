import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Home from "./components/Home";
import ChangePassword from "./components/LoginSignup/ChangePassword";

import Login from './Login/login';
import Home from "./Login/Home";
import ChangePassword from './Login/ChangePassword';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/change-password" element={<ChangePassword />} />
            
            </Routes>
        </Router>
    );
}

export default App;





