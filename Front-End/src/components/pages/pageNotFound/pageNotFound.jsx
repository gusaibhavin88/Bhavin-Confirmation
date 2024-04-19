import React from "react";

const PageNotFound = () => {
  return (
    <div
      className="pageNotFound"
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f8f9fa", // Light gray background color
      }}
    >
      <div style={{ maxWidth: "400px" }}>
        {" "}
        {/* Adjust the max width as needed */}
        <h1 style={{ marginBottom: "20px" }}>Page Not Found</h1>{" "}
        {/* Add margin bottom */}
        <p style={{ fontSize: "18px", color: "#555" }}>
          The requested page does not exist.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
