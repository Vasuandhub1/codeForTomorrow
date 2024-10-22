const nodemailer=require("nodemailer")
require("dotenv").config()

const mailer=(otp,to)=>{

var transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"vasusingh9691@gmail.com",
        pass:process.env.PASSKEY
    }
});

var mailOpetions={
    from:"vasusingh9691@gmail.com",
    to:{to},
    subject:`the otp for your password recovery`,
    text:`otp is ${otp}`
}

transporter.sendMail(mailOpetions,(err,info)=>{
    if(err){
        console.log(err)
    }else{
        console.log(info)
    }
})
}

module.exports=mailer