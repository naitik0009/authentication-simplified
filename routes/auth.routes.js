const express = require("express");
const routes = express.Router();
const {register,login,forgetPassword,resetPassword} = require("../controller/authentication.controller");

routes.route("/register").post(register);
routes.route("/login").post(login);
routes.route("/forgot-password").post(forgetPassword);
routes.route("/reset-password/:reset_token").put(resetPassword);

module.exports = routes;