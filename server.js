require("dotenv").config()
const port = process.env.PORT || 8000;
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

const authRoute = require("./routes/auth.routes");
const authorizedRoute = require("./routes/authorized.routes");
const connect = require("./database/connect");
app.use(express.json());
//let's connect to the database:
connect();
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
var cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use("/api/v1",authRoute,errorHandler); valid approach
app.use("/api/v1",authRoute);
app.use("/api/v1",authorizedRoute)
app.use(errorHandler);
const establish = app.listen(port,()=>console.log(`Connected to server successfully port is ${port}`));

process.on("unhandledRejection"||"unCaughtException",(error,promise)=>{
    console.warn(`error occured resulted to be = ${error}`);
    establish.close(()=>process.exit(1));
})