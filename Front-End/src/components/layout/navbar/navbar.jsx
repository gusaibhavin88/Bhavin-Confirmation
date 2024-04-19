import React, { useCallback, useEffect, useRef, useState } from "react";
import defaultImage from "../../../assets/profileImg.webp";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../notification/notification";
import { logOut } from "../../../Redux/Auth/AuthSlice";
const apiUrl = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const user = useSelector((state) => state?.auth?.user);
  // const notificationRef = useRef("notification");
  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string.slice(1);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");

  const logOutUser = () => {
    dispatch(logOut());
    if (isAdmin) {
      navigate("/admin/signin");
    } else {
      navigate("/signin");
    }
  };

  const onError = () => {};

  return (
    <div class="content-container" style={{ position: "relative" }}>
      <nav
        style={{
          backgroundColor: "rgba(255, 255, 255, .5)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "calc(100% - 250px)", // Subtract 250px from total width
          zIndex: 999,
          marginLeft: "235px",
          height: "70px",
          // marginright: "100px",
          backdropFilter: "blur(7px)",
        }}
      >
        <div className="container-fluid d-flex justify-content-end">
          <div>
            <Notification />
          </div>

          <li class="nav-item dropdown" style={{ listStyleType: "none" }}>
            <img
              src={
                user?.profile_image
                  ? `${apiUrl}/${user?.profile_image}`
                  : defaultImage
              }
              alt="example placeholder"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                marginTop: "20px",
                marginBottom: "10px",
              }}
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />

            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  alt="example placeholder"
                  src={
                    user?.profile_image
                      ? `${apiUrl}/${user?.profile_image}`
                      : defaultImage
                  }
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                />
                <div>
                  <li>
                    <span
                      className="dropdown-item"
                      style={{ fontWeight: "bold" }}
                    >
                      {user
                        ? `${capitalizeFirstLetter(
                            user.first_name
                          )} ${capitalizeFirstLetter(user.last_name)}`
                        : ""}
                    </span>
                  </li>
                </div>
              </div>
              <div class="mt-2">
                <li>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={isAdmin ? "/admin/profile" : "/profile"}
                  >
                    <span class="dropdown-item">View Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={isAdmin ? "/admin/change-password" : "/change-password"}
                  >
                    <span class="dropdown-item">Change Password</span>
                  </NavLink>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <span onClick={() => logOutUser()}>
                    <a class="dropdown-item link" href="#">
                      Logout
                    </a>
                  </span>
                </li>
              </div>
            </ul>
          </li>

          {/* <img
            id="selected_image"
            src={profile ? profile : defaultImage}
            alt="example placeholder"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          /> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
