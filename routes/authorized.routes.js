const express = require("express");
const authRoute = express.Router();
const authorization = require("../middlewares/authorization");
const profile = require("../controller/authorized.controller");
authRoute.route("/profile").get(authorization,profile);

module.exports = authRoute;
