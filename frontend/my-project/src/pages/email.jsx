import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function Email() {
    const navigate= useNavigate()
    const [email,setEmail]=useState("")

    const handlechange=(event)=>{
        setEmail(event.target.value)
    }

    const handleSendOtp=async()=>{
        const res=await axios.post("http://localhost:3000/api/Sendotp",email,{withCredentials:true})
        console.log(res)
        if(res){
            navigate("/Otp")
        }
    }
  return (
    <div className='flex justify-center p-20'>
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Recover the password</h5>
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your registerd email</label>
            <input type="email" onChange={handlechange} value={email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        
        <div className="flex items-start">
            <div className="flex items-start">
                

            </div>
            
        </div>
        <button type="button" onClick={handleSendOtp} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get OTP on mail</button>
       
    </div>
</div>
</div>
  )
}

export default Email
