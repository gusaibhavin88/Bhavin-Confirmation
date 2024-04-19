import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/Auth/AuthSlice";

const Dashboard = () => {
  const location = useLocation();
  const adminUrl = location.pathname.includes("admin");
  const user = useSelector((state) => state?.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dummyData = [
    { id: 1, name: "Product A", value: 150 },
    { id: 2, name: "Product B", value: 200 },
    { id: 3, name: "Product C", value: 300 },
    { id: 4, name: "Product D", value: 250 },
    { id: 5, name: "Product E", value: 180 },
  ];

  useEffect(() => {
    if (user === null) {
      navigate("/signin");
    } else if (user?.role === "admin" && !adminUrl) {
      dispatch(logOut());
      navigate("/signin?logout=true");
    } else if (user?.role === "user" && adminUrl) {
      dispatch(logOut());
      navigate("/admin/signin?logout=true");
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {dummyData.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#f4f4f4",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}>
              {item.name}
            </p>
            <p style={{ margin: "0", fontSize: "16px" }}>{item.value}</p>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: "30px", marginBottom: "20px" }}>
        Monthly Earning Report
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ marginTop: "30px", marginBottom: "20px" }}>
        Yearly Earning Report
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
