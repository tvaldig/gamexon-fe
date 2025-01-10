// src/components/DashboardLayout.js
import React from "react";
import Sidebar from "../Sidebar/sidebar";
import "./dashboardlayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
