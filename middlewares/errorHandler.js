const {ErrorResponse} = require("../utils/errorResponse.utils");

function errorHandler (error,request,response,next){

    let err = {...error};

    err.message = error.message;

    // console.log(error);

    if(error.code === 11000){
        const message = `Duplicate Field Value Entered`;
        err = new ErrorResponse(message,400);
    };

    if(error.name === "ValidationError"){
        let message = Object.values(error.errors).map((result)=>result.message);
        err = new ErrorResponse(message,400);
    }

    response.status(err.statusCode || 500).json({code:"ErrorResponse",message:err.message || "Server Error"});

}

module.exports = errorHandler;