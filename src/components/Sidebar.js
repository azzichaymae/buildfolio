import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import {
  Home,
  LayoutDashboard,
  User,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Laptop,
} from "lucide-react";

const SidebarItem = ({ icon, text, to, isActive, isCollapsed, setActiveView }) => {
  const handleClick = () => {
    if (setActiveView && (text.toLowerCase() === "dashboard" || text.toLowerCase() === "profile" || text.toLowerCase() === "skills")) {
      setActiveView(text.toLowerCase());
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-md"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{text}</span>}
    </Link>
  );
};

const Sidebar = ({ setActiveView, activeView, onCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    navigate("/login");
  };

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapse) onCollapse(newCollapsedState);
  };

  const sidebarItems = [
    { icon: <Home size={20} />, text: "Home", to: "/", isActive: location.pathname === "/" },
    { icon: <LayoutDashboard size={20} />, text: "Dashboard", to: "/dashboard", isActive: activeView === "dashboard" },
    { icon: <User size={20} />, text: "Profile", to: "/profile", isActive: activeView === "profile" },
    { icon: <Laptop size={20} />, text: "Skills", to: "/skills", isActive: activeView === "skills" },
  ];

  return (
    <div className="relative">
      <div
        className={`fixed left-0 bg-white border-r border-gray-200 shadow-lg z-40 transition-all duration-300 flex flex-col ${
          isCollapsed ? "w-16" : "w-64"
        }`}
        style={{
          top: "56px", // Match navbar height (h-14 = 56px)
          height: "calc(100vh - 56px)", // Span remaining viewport height
        }}
      >
        {/* Navigation Items */}
        <div className="p-2 flex flex-col gap-1 flex-grow overflow-y-auto">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              to={item.to}
              isActive={item.isActive}
              isCollapsed={isCollapsed}
              setActiveView={setActiveView}
            />
          ))}
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <div className="bg-gray-200 p-1.5 rounded-full">
                <LogOut size={20} />
              </div>
              <span className="text-sm font-medium">Logout</span>
            </button>
          )}
          {isCollapsed && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-10 h-10 mx-auto bg-gray-200 rounded-full hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Toggle Button at the Right Edge */}
      <button
        onClick={toggleSidebar}
        className="btn btn-light fixed z-40 text-gray-500 hover:text-purple-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        style={{
          top: "calc(58px + 10px)", // Start below navbar with some padding
          left: isCollapsed ? "70px" : "260px", // Align with sidebar edge (w-16 = 64px, w-64 = 256px)
          transform: "translateX(-50%)", // Center the button horizontally over the edge
        }}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;