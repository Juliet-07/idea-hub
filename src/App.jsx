import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Employee from "./pages/employee/landingPage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Moderator from "./pages/moderator/landingPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/moderator" element={<Moderator />} />
      </Routes>
    </>
  );
}

export default App;
