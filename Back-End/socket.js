let io;
const { Server } = require("socket.io");
const logger = require("./logger");
const { throwError } = require("./helpers/errorUtil");

exports.socket_connection = (http_server) => {
  io = new Server(http_server, {
    cors: {
      origin: ["http://172.16.0.241:5000", "http://localhost:5173"],
      methods: ["GET", "PATCH", "POST", "HEAD", "OPTIONS"],
    },
  });

  io.on("connection", (socket) => {
    logger.info(`Socket connected ${socket.id}`);
    socket.on("disconnect", () => {
      logger.info(`Socket ${socket.id} has disconnected.`);
    });

    // For user joined
    socket.on("ROOM", async (obj) => {
      logger.info(obj.id, 15);
      console.log(obj.id);
      socket.join(obj.id);
    });

    // When Data delivered
    socket.on("CONFIRMATION", (payload) => {
      logger.info(
        `Event Confirmation : ${payload?.event} ${payload.name} ${payload.id}`
      );
    });
  });
};

exports.eventEmitter = (event_name, payload, user_id) => {
  try {
    user_id = user_id?.toString();
    io.to(user_id).emit(event_name, payload);
  } catch (error) {
    logger.info("Error while emitting socket error", error);
  }
};
