import React ,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login({handleauth}) {
    const navigate=useNavigate()
const [data,Setdata]=useState({email:"",password:""})

//  now handel the state using the function 
const handlechange=(event)=>{
    if(event.target.name==="email"){
        Setdata({...data,email:event.target.value})
    }
    if(event.target.name==="password"){
        Setdata({...data,password:event.target.value})
    }
    
}
console.log(data)

const handlelogin=async()=>{
    const res=await axios.post("http://localhost:3000/api/login",data,{withCredentials:true})
    console.log(res.data)
    if(res?.data?.sucess){
        navigate('/home')
    }
}

  return (
    

<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" onChange={handlechange} value={data.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" onChange={handlechange} value={data.password} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div className="flex items-start">
            <div className="flex items-start">
                

            </div>
            <a href="#" onClick={()=>navigate("/forgotPassword")} className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
        </div>
        <button type="button" onClick={handlelogin} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" onClick={handleauth} className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div>
    </div>
</div>

  )
}

export default Login
