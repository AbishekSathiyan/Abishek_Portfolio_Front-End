import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isVerified = localStorage.getItem("adminVerified") === "true";
  return isVerified ? children : <Navigate to="/adminlogin" replace />;
}

export default ProtectedRoute;
