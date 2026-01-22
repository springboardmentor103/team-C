import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  ClipboardList,
  Bell,
  Send,
  PlusCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard/feed", label: "Feed", icon: <Home size={20} /> },
    { path: "/dashboard/my-tasks", label: "My Tasks", icon: <ClipboardList size={20} /> },
    { path: "#", label: "Requests", icon: <Bell size={20} /> },
    { path: "#", label: "My Requests", icon: <Send size={20} /> },
    { path: "/dashboard/add-task", label: "Add Task", icon: <PlusCircle size={20} /> },
    { path: "/dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay active"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <SidebarContent
          menuItems={menuItems}
          location={location}
          isCollapsed={!isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onItemClick={() => setIsMobileMenuOpen(false)}
          handleLogout={handleLogout}
        />
      </aside>

      {/* Main area */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <h1 className="header-title">Hire-a-Helper</h1>

            <div className="header-actions">
              <button className="notification-btn">
                <Bell size={20} />
              </button>

              <div className="header-user">
                <div className="user-avatar">JD</div>
                <span className="user-name">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Routed content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({
  menuItems,
  location,
  isCollapsed,
  onToggle,
  onItemClick,
  handleLogout,
}) => {
  return (
    <>
      {/* Logo */}
      <div className="sidebar-logo">
        {!isCollapsed && (
          <h1 className="sidebar-logo-text">Hire-a-Helper</h1>
        )}
        <button className="sidebar-toggle-btn" onClick={onToggle}>
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={onItemClick}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} className="nav-icon" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );
};

export default Dashboard;
