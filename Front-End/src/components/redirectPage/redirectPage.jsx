import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();
  const adminUrl = location.pathname.includes("admin");
  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    if (user === null) {
      if (adminUrl) {
        navigate("/admin/signin");
      } else {
        navigate("/signin");
      }
    } else if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "user") {
      navigate("/dashboard");
    }
  }, []);

  return null;
};

export default RedirectPage;
