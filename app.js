require("dotenv").config({ path: "./src/config/.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./src/routes/router");
const errorHandler = require("./src/middlewares/errorHandler");
const expressStatusMonitor = require("express-status-monitor");
const logger = require('morgan');

// database connection
require("./src/database/db")();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(expressStatusMonitor());

// config
healthChecks: [{
  protocol: 'http',
  host: 'localhost',
  path: '/admin/health/ex1',
  port: '3000'
}, {
  protocol: 'http',
  host: 'localhost',
  path: '/admin/health/ex2',
  port: '3000'
}]

// routes root API
app.use("/api", router);

//handle all error
app.use(errorHandler);

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.listen(port, () =>
  console.log(`Server is running on http://${host}:${port}`)
);
