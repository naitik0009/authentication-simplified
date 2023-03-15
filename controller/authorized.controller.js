const {ErrorResponse} = require("../utils/errorResponse.utils");
const userModel = require("../database/models/auth.model");

function profile (request,response,next){
    let user = request.user;
    return response.status(200).json({code:"success",message:"You are authorized to access this route",data:user});
};

async function verifyUser(request,response,next){
    
}

async function updateUserProfile(request,response,next){
    
    const user=request.user;
    
    const body = request.body;
    
    if(!user){
        return next(new ErrorResponse("no user can be found you're not authorized"));
    }

   try {
    const update = await userModel.updateOne({_id:user._id},body);
    if(!update){
        return next(new ErrorResponse("Can't update the user data please try again"));
    }
    return response.status(200).json({code:"success",message:"successfully updated your profile"});
   } catch (error) {
    return next(error);
   }

    
};

module.exports = {profile,updateUserProfile};