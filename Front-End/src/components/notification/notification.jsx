import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  notificationReadAction,
  notificationsAction,
} from "../../Redux/Admin/AdminAction";
import {
  faBell,
  faCheckCircle,
  faCircle,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  clearNotifications,
  isRead,
  isReadAll,
} from "../../Redux/Admin/AdminSlice";

const Notification = ({ closeNotification }) => {
  const [skip, setSkip] = useState(0);
  const [activeTab, setActiveTab] = useState(false);
  const [check, setCheck] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isAdmin = location.pathname.includes("admin");
  const notificationComp = useRef("noti");
  const notificationIcon = useRef("notiicon");
  const count = useSelector(
    (state) => state?.admin?.notificationList.unreadCount
  );

  const notifications = useSelector(
    (state) => state?.admin?.notificationList.allNotifications
  );
  const loading = useSelector(
    (state) => state?.admin?.notificationList.loading
  );

  const onError = () => {};

  // Function to handle click outside of the notification area
  const handleClickOutside = (event) => {
    if (
      !notificationIcon?.current.contains(event.target) &&
      !notificationComp?.current.contains(event.target)
    ) {
      setActiveTab(false);
    }
    if (
      notificationIcon?.current.contains(event.target) &&
      !notificationComp?.current.contains(event.target)
    ) {
      setActiveTab(true);
    }
    if (!notificationComp?.current.contains(event.target) === null) {
      setActiveTab(false);
    }
  };

  useEffect(() => {
    // dispatch(clearNotifications());
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isAdmin) {
      if (check) {
        dispatch(
          notificationReadAction({
            functions: {
              onError,
              formData: { notification_id: "all" },
            },
          })
        );
        setTimeout(() => {
          setCheck(false);
          setActiveTab(false);
          dispatch(isReadAll());
        }, 1000);
      }
    }
  }, [check]);

  useEffect(() => {
    if (isAdmin) {
      if (activeTab) {
        dispatch(
          notificationsAction({
            functions: {
              onError,
              formData: { skip: skip, limit: 5 },
            },
          })
        );
      }
    }
  }, [skip]);

  useEffect(() => {
    if (isAdmin && activeTab) {
      dispatch(
        notificationsAction({
          functions: {
            onError,
            formData: "count",
          },
        })
      );
    }

    return () => {
      dispatch(clearNotifications());
    };
  }, [activeTab]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(
        notificationsAction({
          functions: {
            onError,
            formData: "count",
          },
        })
      );
    }
  }, []);

  return (
    <>
      {activeTab && (
        <div
          ref={notificationComp}
          style={{
            width: "370px",
            maxHeight: "400px",
            top: "55px",
            right: "95px",
            backgroundColor: "#dedcff",
            position: "fixed",
            zIndex: 10,
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            padding: "20px",
            paddingTop: "40px",
          }}
        >
          <div
            class="form-check"
            style={{
              position: "absolute",
              top: "10px",
              left: "18px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: "10px",
            }}
          >
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              checked={check}
              style={{ width: "20px", height: "20px" }}
              onChange={(e) => setCheck(e.target.checked)}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Read All
            </label>
          </div>

          <div style={{ overflowY: "auto" }}>
            {notifications && notifications[0] ? (
              notifications?.map((notification, index) => {
                // Convert notification createdAt to a Date object
                const createdAt = new Date(notification.createdAt);
                // Get the current time
                const currentTime = new Date();

                // Calculate the time difference in milliseconds
                const timeDifference = currentTime - createdAt;

                // Convert milliseconds to seconds, minutes, hours, and days
                const seconds = Math.floor(timeDifference / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                // Define a function to format the time difference
                const formatTimeDifference = () => {
                  if (days > 0) {
                    return `${days} day${days > 1 ? "s" : ""} ago`;
                  } else if (hours > 0) {
                    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
                  } else if (minutes > 0) {
                    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
                  } else {
                    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
                  }
                };

                return (
                  <div
                    key={index}
                    style={{
                      marginBottom: "10px",
                      backgroundColor: notification.is_read ? "" : "",
                    }}
                    onClick={() => {
                      dispatch(
                        notificationReadAction({
                          functions: {
                            onError,
                            formData: { notification_id: notification._id },
                          },
                        })
                      );

                      dispatch(isRead(notification._id));
                    }}
                  >
                    <div
                      class="d-flex justify-content-between"
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        {notification.message}
                      </div>
                      <FontAwesomeIcon
                        icon={notification.is_read ? faCheckCircle : faCircle}
                        style={{
                          alignSelf: "center",
                          marginRight: "3rem",
                          cursor: "pointer",
                          fontSize: "1.5rem",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>
                      {formatTimeDifference()}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>{!loading ? "Notifications not Available" : ""}</p>
            )}
          </div>
          <button
            className="btn btn-primary btn-md"
            type="button"
            style={{ alignSelf: "center", marginTop: "10px", width: "100px" }}
            onClick={() => setSkip(skip + 5)}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </>
            ) : (
              "See more"
            )}
          </button>
        </div>
      )}
      <div>
        {isAdmin && (
          <div ref={notificationIcon}>
            <FontAwesomeIcon
              icon={faBell}
              onClick={() => setActiveTab(!activeTab)}
              style={{
                alignSelf: "center",
                marginRight: "3rem",
                marginTop: "2rem",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "25px",
                right: "94px",
                zIndex: 50,
                backgroundColor: "#0d6efd",
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                justifyContent: "center",
                display: "flex",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => setActiveTab(!activeTab)}
            >
              <p
                style={{
                  color: "white",
                  marginBottom: "50px",
                  cursor: "pointer",
                }}
              >
                {count ?? 0}{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
