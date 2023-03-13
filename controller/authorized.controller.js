function profile (request,response,next){
    return response.status(200).json({code:"success",message:"You are authorized to access this route"});
}

module.exports = profile;