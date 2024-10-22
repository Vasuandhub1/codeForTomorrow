const mysql=require("../config/dbConnections")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const mailer=require("../utils/nodemailer")
require("dotenv").config()

// conatroller for the signup
const signin=async(req,res)=>{
    //  now handel the err in the controller
    try{
        //  now take data from the user in reqbody
        const {firstname,lastname,email,password}=req.body
        //  now check if we get all the variables

        if(!firstname||!lastname||!email||!password){
            return res.status(402).json({
                sucess:false,
                message:"please fill all the credentials"
            })
        }else{
            //  now check if the email is already present in the data base 

            const isEmail=await mysql.query("select * from users where email = ?",[email])
            
            //  now check if the email is availabe 
            if(!isEmail[0]){
                return res.status(401).json({
                    sucess:false,
                    message:"user already registered"
                })
            }else{
                //  now we can create the new user\

                //  now hash the password before storing it to db
                const ids=await mysql.query("select max(id) from users");
                var id=ids[0][0]["max(id)"]
                id=id+1;
                


                await bcrypt.hash(password,10).then(async(val)=>{
                    const data=await mysql.query("insert into users(id,firstname,lastname,email,password) values(?,?,?,?,?)",[id,firstname,lastname,email,val])
                    if(!data){
                        return res.status(402).json({
                            sucess:false,
                            message:"err in creating the user"
                        })
                    }else{
                        //  now send the response
                        return res.status(200).json({
                            sucess:true,
                            message:"user created sucessfull",
                            data
                        })
                    }

                }).catch((err)=>{
                    return res.status(404).json({
                        sucess:false,
                        message:err.message
                    })
                })
                
            }

        }
    }catch(err){
        return res.status(404).json({
            sucess:false,
            message:`${err.message}`
        })
    }
}

//  now creating the login user api 

const login=async(req,res)=>{
    //  hanlde the err in the controller
    try{
        //  now take the data from the req.body

        const {email,password}=req.body

        //  now check if we get all the credentials
        if(!email||!password){
            return res.status(402).json({
                sucess:false,
                message:"please fill all the credentials"
            })
        }else{
            //  now we have to check if the user credentials is correct
            const isValid=await mysql.query("select * from users where email=?",[email])
            // console.log(isValid)
            //  now check the password of the user

            if(!isValid){
                return res.status(401).json({
                    sucess:false,
                    message:"please register the user first"
                })
            }else{
                const isCorrect=await bcrypt.compare(password,isValid[0][1].password)
                console.log(isCorrect)

                if(!isCorrect){
                    return res.status(401).json({
                        sucess:false,
                        message:"please check your credentials"
                    })
                }else{
                    //  now if the password is correct generate an jwt token and send the cookie to the user

                    const token=jwt.sign(isValid[0][1],process.env.KEY,{expiresIn:"2h"})

                    // now send the token to using the cookie
                    res.cookie("Auth_token",token,{maxAge:1000*60*60,HttpOnly:true})
                    return res.status(200).json({
                        sucess:true,
                        message:"welcome to the Home page"
                    })

                }
            }
            
        }

    }catch(err){
        return res.status(404).json({
            sucess:false,
            message:err.message
        })
    }
}
//  now working on the password recovery 

const sendOTP=async(req,res)=>{
    //  now hanlde the err
    try{
        //  now we have to send an email verification opt with the 5 min token 
        // to sent the otp before it expires
        //  now take the email 
        const {email}=req.body

        //  now check id emal is already registered

        const isValid=await mysql.query("select email from users")

        if(!isValid[0]){
            return res.status(401).json({
                sucess:false,
                message:"the email is not registeres"
            })
        }else{
            //  now the email is valid we need to generate the otp
            const otp=Math.floor(Math.random()*(1000-9999+1))+1000;
            //  now send the email to the user
            const isSend=mailer(otp,email);
            const payload={
                otp,email
            }
            const token=jwt.sign(payload,process.env.KEY,{expiresIn:"1h"})

            res.cookie("Reset_password_cookie",token,{maxAge:5*1000*60})

            return res.status(200).json({
                sucess:true,
                message:"otp send sucess fully"
            })
        }

    }catch(err){
        return res.status(404).json({
            sucess:false,
            message:err.message
        })
    }
}

//  reset password api

const resetPassword=(req,res)=>{
    //  now hanlde the err\
    try{

        //  now take the data from the req body
        const {otp,password}=req.body
        const {Reset_password_cookie}=req.cookies

        if(!otp||!password||!Reset_password_cookie){
            return res.status(404).json({
                sucess:false,
                message:"your reset token expires"
            })
        }else{
            const token=jwt.decode(Reset_password_cookie);
            console.log(token)
            if(token.otp===otp){
                //  now change the password
                //  now bcrypt the passsword
                bcrypt.hash(password,10).then(async(value)=>{
                    const update=await mysql.query("update users SET password=? where email=?",[value,token.email])
                    if(!update[0]){
                        return res.status(404).json({
                            sucess:false,
                            message:"password not set"
                        })
                    }else{
                        return res.status(200).json({
                            sucess:true,
                            message:"password changed sucess ful"
                        })
                    }
                }).catch((err)=>{
                    return res.status(404).json({
                        sucess:false,
                        message:err.message
                    })
                })
            }else{
                return res.status(404).json({
                    sucess:false,
                    message:"incorrect OTP"
                })
            }
        }

    }catch(err){
        return res.status(404).json({
            sucess:false,
            message:err.message
        })
    }
}

//  api for get all user name

const allUser=async(req,res)=>{
    try{
        //  now get all the user details
        const data=await mysql.query("select firstname from users")
        if(data[0]){
            return res.status(200).json({
                sucess:true,
                message:"the data is",
                data:data[0]
            })
        }else{
            return res.status(402).json({
                sucess:false,
                message:"no data"
            })
        }
    }catch(err){
        return res.status(404).json({
            sucess:false,
            message:err.message
        })
    }
}

//  now export the controller 

module.exports={signin,login,sendOTP,resetPassword,allUser}