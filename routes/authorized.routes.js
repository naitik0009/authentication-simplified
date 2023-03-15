const express = require("express");
const authRoute = express.Router();
const authorization = require("../middlewares/authorization");
const {profile,updateUserProfile} = require("../controller/authorized.controller");
authRoute.route("/profile").get(authorization,profile);
authRoute.route("/profile/update").patch(authorization,updateUserProfile);
module.exports = authRoute;
