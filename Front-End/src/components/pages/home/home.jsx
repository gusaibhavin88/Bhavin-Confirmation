import React, { useCallback, useState } from "react";
import Dashboard from "../../dashboard/dashboard";
import ProfilePage from "../../profilePage/profilePage";
import UserData from "../../userData/userData";
import Navbar from "../../layout/navbar/navbar";
import Sidebar from "../../layout/sidebar/sidebar";
import "./home.css"; // Import corresponding CSS file for Home styles

const pageComponents = {
  dashboard: Dashboard,
  profilePage: ProfilePage,
  userData: UserData,
};

const Home = ({ children }) => {
  const [activePage, setActivePage] = useState("dashboard");

  const handlePageChange = useCallback((tabName) => {
    setActivePage(tabName);
  }, []);

  const ActiveComponent = pageComponents[activePage];

  return (
    <div className="wrapper">
      <Sidebar handlePageChange={handlePageChange} />
      <div id="content">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        <div style={{ marginTop: "60px" }}>
          <div className="content-container">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
