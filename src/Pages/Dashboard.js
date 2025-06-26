import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";
import "../styles/Dashboard.css";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation for debugging
import Profile from "../components/Profile";
import Skills from "../components/Skills";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // For debugging current path
  const token = localStorage.getItem("token");

  const [activeView, setActiveView] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    // Set activeView based on current path for debugging
    const path = location.pathname;
    if (path === "/profile") setActiveView("profile");
    else if (path === "/skills") setActiveView("skills");
    else setActiveView("dashboard");
  }, [token, navigate, location.pathname]);

  const handleSidebarCollapse = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardContent />;
      case "profile":
        return <Profile />;
      case "skills":
        return <Skills />;
      default:
        return <DashboardContent />;
    }
  };

  if (!token) {
    return null;
  }

  console.log("Current path:", location.pathname, "Active View:", activeView); // Debugging

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
       
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar - Always rendered */}
        <Sidebar
          setActiveView={setActiveView}
          activeView={activeView}
          onCollapse={handleSidebarCollapse}
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 transition-all duration-300 pt-14`}
          style={{
            marginLeft: isCollapsed ? "64px" : "256px", // Match sidebar w-16 (64px) and w-64 (256px)
          }}
        >
          
          <div className="bg-white rounded-lg shadow-md p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;