const express = require("express");
const characterRoute = require("./character.routes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/characters",
    route: characterRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
