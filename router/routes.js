const express=require("express")
const router=express.Router()
const { signin,login,sendOTP,resetPassword,allUser}=require("../controllers/authentication")

//  now design the routes for the controller

router.post("/signin",signin)
router.post("/login",login)
router.post("/Sendotp",sendOTP)
router.post("/resetPassword",resetPassword)
router.get("/alluser",allUser)

//  now export the reouter

module.exports=router