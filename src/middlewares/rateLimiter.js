const rateLimit = require("express-rate-limit");
const ApiError = require("../utils/ApiError");

const rareLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
  handler: (request, response, next, options) => {
    if (options.statusCode === 429) {
      next(
        new ApiError(
          options.statusCode,
          "Too many requests, Please try again after 1 minute"
        )
      );
    }
  },
});

module.exports = {
  rareLimiter,
};
