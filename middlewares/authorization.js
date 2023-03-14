const jwt = require("jsonwebtoken");
const userModel = require("../database/models/auth.model");

const {ErrorResponse} = require("../utils/errorResponse.utils");

async function checkAuthorization(request, response, next) {
    let token;

    if (request.headers.authorization && request.headers.authorization.startsWith("bearer")) {
        token = request.headers.authorization.split(" ")[1];// fuck sjddfhjkssdhfshdkfjhsjdfh = sdjkdfhkjsdhfjkshf
    }
    if(!token){
        return next(new ErrorResponse("Not Authorized to access this route",401))
    }

    try {
        const verify = jwt.verify(token,process.env.SECRET_KEY);
        const user = await userModel.findById(verify.id);
        if(!user){
            return next(new ErrorResponse("can't find any user with this decoded id",404));
        }
        request.user = user;
        next();
    } catch (error) {
        return next(new ErrorResponse(error.message,401));
    }

}

module.exports = checkAuthorization;