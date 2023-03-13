// class User{
//     constructor(username,email,password){
//         this.username=username;
//         this.email=email;
//         this.password=password;
//     }

//     async save(){
//         let sql = 'write the sql code for insert';
//         connect.query(sql);
//     }

//     static check(){}
    
//Use this model for mysql database
// }
const encrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Provide a username"],
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:[true,"email already used"],
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"Please Provide a valid email address."]
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
        minlength:6,
        select:false,//when ever we query the user we dont want the password to come up like a bitch
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    };
    const salt = await encrypt.genSalt(10);
    this.password = await encrypt.hash(this.password,salt);
    next();
})

userSchema.methods.matchPassword = async function(password){
    return await encrypt.compare(password,this.password);
}

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;