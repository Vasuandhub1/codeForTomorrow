const express= require("express")
const app=express()
const mysql=require("./config/dbConnections")
require("dotenv").config()
const router=require("./router/routes")
const cors=require("cors")
  
//  now add the middlewares
app.use(cors({credentials:true,origin:true}))

app.use(express.json())

app.use("/api",router)

app.get("/",(req,res)=>{
    res.send("hello from the server")
})

//  now conditionally listen

mysql.query("select 1").then(()=>{
    console.log("connected to data base sucess fully")
    app.listen(process.env.PORT,()=>{
        console.log("the server is running on the port no 3000")
    })

}).catch((err)=>{
    console.log(err)
    console.log("err in the data base connection")
})

// app.listen(process.env.PORT,()=>{
//     console.log("the server is running on the port no 3000")
// })