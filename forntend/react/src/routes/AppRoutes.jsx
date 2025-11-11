import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import PartnerRegister from "../pages/PartnerRegister";
import PartnerLogin from "../pages/PartnerLogin";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food partner/CreateFood"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/foodpartner/register" element={<PartnerRegister />} />
                <Route path="/foodpartner/login" element={<PartnerLogin />} />
                <Route path="/" element={<Home />} />
                <Route path="create-food" element={<CreateFood />} />

                
            </Routes>
        </Router>
    );
};

export default AppRoutes;