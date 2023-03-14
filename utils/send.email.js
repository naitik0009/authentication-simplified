const nodeMailer = require("nodemailer");

async function sendMail (options){
    const transporter = nodeMailer.createTransport({
        host:process.env.MAIL_HOST,
        port:process.env.MAIL_PORT,
        auth:{
            user:process.env.MAIL_USERNAME,
            pass:process.env.MAIL_PASSWORD,
        }
    });
    const mailOptions = {
        from:process.env.EMAIL_FROM,
        to:options.to,
        subject:options.subject,
        html:options.text,
    } ;

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log(info);
        }
    });

    
}
module.exports=sendMail;