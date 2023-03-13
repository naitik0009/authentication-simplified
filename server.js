require("dotenv").config()
const port = process.env.PORT || 8000;
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const authRoute = require("./routes/auth.routes");
const connect = require("./database/connect");
app.use(express.json());
//let's connect to the database:
connect();

// app.use("/api/v1",authRoute,errorHandler); valid approach
app.use("/api/v1",authRoute,errorHandler);
app.use(errorHandler);
const establish = app.listen(port,()=>console.log(`Connected to server successfully port is ${port}`));

process.on("unhandledRejection"||"unCaughtException",(error,promise)=>{
    console.warn(`error occured resulted to be = ${error}`);
    establish.close(()=>process.exit(1));
})