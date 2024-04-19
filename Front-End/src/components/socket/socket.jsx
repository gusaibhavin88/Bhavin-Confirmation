import React, { useEffect } from "react";
import io from "socket.io-client";
import { addCount, addNotifications } from "../../Redux/Admin/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { notification } from "../../Api/adminRequest";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;
const socket = io(BACKEND_URL);
const SocketComponent = () => {
  // const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const isAdmin = location.pathname.includes("admin");

  useEffect(() => {
    if (isAdmin) {
      socket.on("connect", () => {
        socket.on("disconnect", () => {
          console.log("disconnected to Socket.IO");
        });
        socket.emit("ROOM", { id: "66168016f3752781645e11f3" });
        socket.on("NOTIFICATION", (notificationPayload) => {
          console.log(notificationPayload);
          dispatch(
            addCount({
              data: {
                data: {
                  un_read_count: notificationPayload.un_read_count,
                  notification: notificationPayload.notification,
                },
              },
            })
          );
        });
      });
      return () => {
        socket.disconnect();
      };
    }
  }, []);
  return null;
};

export default SocketComponent;
