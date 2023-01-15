import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { fb } from "../firebase"


const DriverRequests = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {

  const auth = getAuth(fb);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      navigate('/home');
      

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });


  }

  const onSignUp = () => {
    navigate("/sign-up")
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const myStyle = {
    backgroundImage: "url('https://i.redd.it/qub0v52rls551.png')",
  }

  return (
    <div style={myStyle}
    className='flex justify-center items-center w-full h-screen dark:bg-slate-800' 
    >
      <div className='dark:bg-slate-800 rounded w-[300px] p-6' >
        <h1 className='mb-4 text-white text-2xl font-semibold' >Sign In</h1>
        <input onChange={onEmailChange} value={email} type="email" placeholder='email' name='email' className='w-full mb-4 border-2 rounded p-2  bg-slate-500' />
        <input onChange={onPasswordChange} value={password} type="password" placeholder='password' name='password' className='w-full mb-4 rounded p-2' />
        <button onClick={onLogin} className='rounded bg-gray-700 w-full p-4 text-white text-lg font-semibold cursor-pointer' >Login</button>
        <button onClick={onSignUp} className='text-white w-full pt-3 mb-0'>Sign Up</button>
      </div>
    </div>
  )
}


export default DriverRequests