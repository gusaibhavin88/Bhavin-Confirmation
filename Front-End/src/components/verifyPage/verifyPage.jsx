import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyUserAction } from "../../Redux/Auth/AuthAction";
import { useDispatch } from "react-redux";

const VerifyPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const email = urlParams.get("email");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onComplete = (response) => {
    toast.success(response.data.message);
    navigate("/signin");
  };

  const onError = (response) => {
    toast.error(response.data.message);
    navigate("/signin");
  };

  useEffect(() => {
    if (token && email) {
      const data = { verification_token: token, email: email };
      setTimeout(() => {
        dispatch(
          verifyUserAction({
            functions: {
              onComplete: onComplete,
              formData: data,
              onError,
            },
          })
        );
      }, 1500);
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0d6efd",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>Verification</h1>
      <div style={{ fontSize: "24px" }}>Loading...</div>
    </div>
  );
};

export default VerifyPage;
