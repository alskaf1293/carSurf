import React, { useState } from 'react'

const DriverRequests = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {
    console.log("Logging in with", email, password)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-blue-500' >
      <div className='bg-white rounded w-[300px] p-6' >
        <h1 className='mb-4 text-black text-2xl font-semibold' >Sign In</h1>
        <input onChange={onEmailChange} value={email} type="email" placeholder='email' className='w-full mb-4 border-2 rounded p-4 active:border-blue-500' />
        <input onChange={onPasswordChange} value={password} type="password" placeholder='password' className='w-full mb-4 border-2 rounded p-4' />
        <button onClick={onLogin} className='border-2 rounded bg-blue-500 w-full p-4 text-white text-lg font-semibold' >Login</button>
      </div>
    </div>
  )
}


export default DriverRequests