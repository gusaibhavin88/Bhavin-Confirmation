const express = require("express");
require("./config/connection");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const errorHandler = require("./helpers/error");
const cors = require("cors");
const rootRoutes = require("./routes/index");
const logger = require("./logger");
const { socket_connection } = require("./socket");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "*",
  cors({
    origin: true,
    credentials: true, // Allow cookies to be sent and received
  })
);
const morgan = require("morgan");
const path = require("path");
const Skill = require("./models/skillsSchema");
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1", rootRoutes);

// handling error from all of the route
app.use(errorHandler);

// Set up Socket.IO server
const http_server = require("http").createServer(app);
socket_connection(http_server);

http_server.listen(port, async () => {
  logger.info(`Server started at port:${port}`);
});
