import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onCreate = () => {

    const options = {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/api/createAccount', options).then(res => console.log(res));

    console.log("Logging in with", email, password)
    //navigate("/login")
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }


  return (
    <div className='flex justify-center items-center w-full h-screen bg-blue-500' >
      <div className='bg-white rounded w-[300px] p-6' >
        <h1 className='mb-4 text-black text-2xl font-semibold' >Sign Up</h1>
        <input onChange={onEmailChange} value={email} type="email" placeholder='email' name="email" className='w-full mb-4 border-2 rounded p-4 active:border-blue-500' />
        <input onChange={onPasswordChange} value={password} type="password" name="password" placeholder='password' className='w-full mb-4 border-2 rounded p-4' />
        <input onChange={onConfirmPasswordChange} value={confirmPassword} type="password" placeholder='confirm password' className='w-full mb-4 border-2 rounded p-4' />
        <button onClick={onCreate} className='border-2 rounded bg-blue-500 w-full p-4 text-white text-lg font-semibold cursor-pointer' >Create Account</button>
      </div>
    </div>
  )
}


export default SignUp