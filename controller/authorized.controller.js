// const user = require("../database/models/auth.model");

function profile (request,response,next){
    let user = request.user;
    return response.status(200).json({code:"success",message:"You are authorized to access this route",data:user});
}

module.exports = profile;