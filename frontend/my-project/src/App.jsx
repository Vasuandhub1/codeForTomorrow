// import { useState } from 'react'
import Auth from './pages/auth'
import Home from './pages/home'
import Email from './pages/email'
import Otp from './pages/otp'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-500 min-h-screen max-h-max text-center'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth></Auth>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/forgotPassword' element={<Email></Email>}></Route>
        <Route path='/Otp' element={<Otp></Otp>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
