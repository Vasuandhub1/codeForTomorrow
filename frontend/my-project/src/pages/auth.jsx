import React, { useState } from 'react'
import Register from '../components/register'
import Login from '../components/login'
function Auth() {
    const [auth,setAuth]=useState(false)

    const handleauth=()=>{
        if(auth===true){
            setAuth(false)
        }else{
            setAuth(true)
        }
    }
  return (<>
          <h1 className=' text-3xl text-white'>CodeForTomorrow</h1>
    <div className='flex justify-center items-center p-10 '>
       
      {auth?<Register handleauth={handleauth}/>:<Login handleauth={handleauth}/>}
    </div>
    </>
  )
}

export default Auth
