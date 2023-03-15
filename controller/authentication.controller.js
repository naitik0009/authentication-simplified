const userModel = require("../database/models/auth.model");
const {ErrorResponse} = require("../utils/errorResponse.utils");
const sendMail = require("../utils/send.email");
const crypto = require("crypto");

async function register (request,response,next){
    
    try {
        let {username,email,password} = request.body;
        //let's check all the required field
        if(!username || !email || !password){
            return next(new ErrorResponse("Please Provide all fields",401));
        }
        //check if the username already exist or not:::::
        const checkUsername = await userModel.findOne({username}).exec();
        const checkEmail = await userModel.findOne({email}).exec();
        if(checkUsername || checkEmail){
            return next(new ErrorResponse("User already exists",400));
        }
        const result = await userModel.create({
            username,email,password
        });
        if(!result){
            return next(new ErrorResponse("Can't create the user please try again",400));
        }
        const message = `<h3>Welcome ${username} to AIOEAM.</h3>
        <p>We wish you a bright future and a good realtion with our organization</p>
        `;
        await sendMail({
            to:email,
            subject:"Account created successfully",
            text:message,
        }).then(()=>{
            response.status(200).json({code:"success",message:`User with username ${username} is registered successfully`});   
        })
       
        // sendToken(result,201,response); 
    } catch (error) {
       next(error.message);
    };
    }
   

async function login (request,response,next){
    try {
        let {email,password} = request.body;
        
        if(!email){
          return  next(new ErrorResponse("Please Provide a valid email",401))
        }
        if(!password){
          return  next(new ErrorResponse("Please Provide a valid password",401))
        }
        const result = await userModel.findOne({email}).select("+password")//we are asking the password too
        if(!result){
          return  next(new ErrorResponse("Please Provide a valid username can't find this user",401))
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

async function forgetPassword (request,response,next){
    const {email} = request.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return next(new ErrorResponse("can't find any user with this email",404));
        }
        const token = user.getResetPasswordToken();
        const resetUrl = `http://localhost:3000/resetPassword/${token}`;
        const message = `<h3>Hello you've requested us to reset your password</h3>
                            <p>Please go to this link to reset your password</p>
                            <a href = "${resetUrl}" clicktracking="off"> Click Here</a>
        `;
try {
    await user.save();
    await sendMail({
        to:user.email,
        subject:"Password reset link",
        text:message,
    }).then(()=>{
        return response.status(200).json({code:"success",message:"email sent successfully"})
    })
} catch (error) {
    user.resetPassword=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    return next(new ErrorResponse(`email could not be send ${error.message}`,500))
}

    } catch (error) {
           next(error);
    }

};

async function resetPassword (request,response,next){
    let {password} = request.body;
    if(!password){
        return next(new ErrorResponse("Please provide a valid password",404));
    }
    const recreateToken = crypto.createHash("sha256").update(request.params.reset_token).digest("hex");
    try {
        const result = await userModel.findOne({
            resetPasswordToken:recreateToken,
            resetPasswordExpire:{$gt:Date.now()}//just to ensure token is not expire
        });
        if(!result){
            return next(new ErrorResponse("Token expired or invalid please try again",400))
        }
        result.password=password;
        result.resetPasswordExpire=undefined;
        result.resetPasswordToken=undefined;
        await result.save().then(()=>{
            return response.status(200).json({code:"success",message:"Congratulation your password has been reset."});
        });
    } catch (error) {
        
    }
};

module.exports = {register,login,forgetPassword,resetPassword};