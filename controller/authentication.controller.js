const userModel = require("../database/models/auth.model");
const {ErrorResponse} = require("../utils/errorResponse.utils");
async function register (request,response,next){
    
    try {
        let {username,email,password} = request.body;
        const result = await userModel.create({
            username,email,password
        });
        // response.status(200).json({code:"success",message:`User with username ${username} is registered successfully`});   
        sendToken(result,201,response); 
    } catch (error) {
       next(error);
    };
    }
   

async function login (request,response,next){
    try {
        let {email,password} = request.body;
        console.log(password);
        if(!email){
          return  next(new ErrorResponse("Please Provide a valid email",401))
        }
        if(!password){
          return  next(new ErrorResponse("Please Provide a valid password",401))
        }
        const result = await userModel.findOne({email}).select("+password")//we are asking the password too
        if(!result){
          return  next(new ErrorResponse("Please Provide a valid username can't find this user",404))
        }
        const matchPassword = await result.matchPassword(password);
        if(!matchPassword){
          return  next(new ErrorResponse("Please Provide a valid password",401))
            
        }
        // return response.status(201).json({code:"success",message:result});
        sendToken(result,200,response);
    } catch (error) {
        next(error);
        
    }

};

function sendToken (user,statusCode,response){
    const token = user.getSignedToken();
    return response.status(statusCode).json({code:"success",token});
}

async function forgetPassword (request,response){
    return response.send("forget Password");

};

async function resetPassword (request,response){
    return response.send("reset password");
};

module.exports = {register,login,forgetPassword,resetPassword};