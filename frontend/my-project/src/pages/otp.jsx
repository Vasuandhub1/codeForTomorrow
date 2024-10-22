import React ,{useState} from 'react'
import axios from 'axios'

function Otp() {
    const [data,Setdata]=useState({otp:0,password:"",cnfpassword:""})


    const handlechange=(event)=>{
        if(event.target.name==="otp"){
            Setdata({...data,otp:event.target.value})
        }
        if(event.target.name==="password"){
            Setdata({...data,password:event.target.value})
        }
        if(event.target.name==="cnfpassword"){
            Setdata({...data,cnfpassword:event.target.value})
        }
    }

    const handleChangePassword=async()=>{
        if(data.password===data.cnfpassword){
            alert("please check the password")
        }else{
            const res=await axios.post("http://localhost:3000/api/resetPassword",data,{withCredentials:true})
            console.log(res)
        }
    }
   
  return (
    <div className='flex justify-center p-20'>
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Recover the password</h5>
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP send on Email</label>
            <input type="email" onChange={handlechange} value={data.otp} name="otp" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
            <input type="email" onChange={handlechange} value={data.password} name="password" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input type="email" onChange={handlechange} value={data.cnfpassword} name="cnfpassword" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        
        <div className="flex items-start">
            <div className="flex items-start">
                

            </div>
            
        </div>
        <button type="button" onClick={handleChangePassword} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset password</button>
       
    </div>
</div>
</div>
  )
}

export default Otp
