import React, { useEffect, useState } from 'react'
import {auth,provider} from './Firebase';
import { signInWithPopup } from "firebase/auth";
import googleImage from '../assets/google.png'
import DashboardLayoutSlots from '../Components/Home';

const Signin = () => {
  const [value,setvalue] = useState('')
 const handleClick =() =>{
  signInWithPopup(auth,provider).then((data)=>{
    setvalue(data.user.email)
    localStorage.setItem("email",data.user.email)
    localStorage.setItem("data",data)
  })
 }

 useEffect(()=>{
  setvalue(localStorage.getItem('email'))
 })

  return (
    <div>
      {value?  <DashboardLayoutSlots/> :  
      <img src={googleImage} alt="" onClick={handleClick} />
}
      
    </div>
  )
}

export default Signin
