import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/butterfly.png";
import "../../pages/home/home.css"; // Importing CSS file
import SocketComponent from "../../socket/socket";
import { useSelector } from "react-redux";

const Sidebar = ({ handlePageChange }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const isAdmin = location.pathname.includes("admin");

  if (isAdmin) {
    SocketComponent();
  }

  useEffect(() => {
    const profile = location.pathname.includes("profile");
    const users = location.pathname.includes("user");
    const dashboard = location.pathname.includes("dashboard");
    const changePassword = location.pathname.includes("change-password");

    if (profile) {
      setActiveTab("profile");
      handlePageChange("profile");
    } else if (users) {
      handlePageChange("users");
      setActiveTab("users");
    } else if (dashboard) {
      handlePageChange("dashboard");
      setActiveTab("dashboard");
    } else if (changePassword) {
      handlePageChange("changePassword");
      setActiveTab("changePassword");
    }
  }, [location.pathname]);

  return (
    <div>
      <nav id="sidebar" style={{ height: "100%", position: "fixed" }}>
        <div className="sidebar-header">
          <img src={logo} width={150} height={150} alt="Logo" />{" "}
        </div>

        <ul className="list-unstyled components" style={{ marginLeft: "10px" }}>
          <li className={activeTab === "dashboard" ? "active" : ""}>
            <NavLink
              className="text-color"
              to={isAdmin ? "/admin/dashboard" : "/dashboard"}
            >
              Dashboard
            </NavLink>
          </li>
          {isAdmin && (
            <li className={activeTab === "users" ? "active" : ""}>
              <NavLink className="text-color" to="/admin/users">
                Users
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
