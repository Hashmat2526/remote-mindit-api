const mongoose = require("mongoose");
const app = require("./app");
const config = require("./src/config/config");
const logger = require("./src/config/logger");
const { seedCharacters } = require("./src/utils/seedData");

let server;

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info("Connected to MongoDB");
    seedCharacters()
      .then(() => logger.info("data seeded successfully"))
      .catch(console.log());
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(" errrrrrrrr");
    console.log(err);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    logger.info("Server closed directly");

    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//graceful termination
process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
