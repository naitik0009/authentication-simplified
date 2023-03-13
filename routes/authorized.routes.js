const express = require("express");
const authRoute = express.Router();
const profile = require("../controller/authorized.controller");
authRoute.route("/profile").get(profile);

module.exports = authRoute;
