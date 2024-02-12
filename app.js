const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const httpStatus = require("http-status");
const routes = require("./src/api/routes/v1/");
const morgan = require("./src/config/morgan");
const config = require("./src/config/config");
const { rareLimiter } = require("./src/middlewares/rateLimiter");
const { errorConverter, errorHandler } = require("./src/middlewares/error");
const ApiError = require("./src/utils/ApiError");
const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

app.use(morgan.errorHandler);
app.use(morgan.successHandler);

// enable cors
app.use(cors("*"));
app.options("*", cors());

// limit repeated failed requests to any endpoints
if (config.env === "production") {
  app.use("/v1", rareLimiter);
}

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
