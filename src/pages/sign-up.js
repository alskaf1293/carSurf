import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { fb } from "../firebase"

const SignUp = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onCreate = () => {

    const auth = getAuth(fb);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(userCredential.user, {
          displayName: name, rides: 0, rating: 0
        }).then(() => {
          console.log("full profile completed")
          navigate('/login');
        }).catch((error) => {
          console.log(error);
        });
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

    console.log("Logging in with", email, password)
  }

  const onNameChange = (e) => {
    setName(e.target.value)
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

  const myStyle = {
    backgroundImage: "url('https://i.redd.it/qub0v52rls551.png')",
  }

  const passwordChangeStyle = {
    textAlign: 'center'
  }

  return (
    <div style={myStyle}
    className='flex justify-center items-center w-full h-screen dark:bg-slate-800'
    >
      <div className='dark:bg-slate-800 rounded w-[300px] p-6' >
        <h1 className='mb-4 text-white text-2xl font-semibold' >Sign Up</h1>
        <input onChange={onNameChange} value={name} type="name" placeholder='name' name='name' className='w-full mb-4 border-2 rounded p-2'/>
        <input onChange={onEmailChange} value={email} type="email" placeholder='email' name='email' className='w-full mb-4 border-2 rounded p-2 ' />
        <input onChange={onPasswordChange} value={password} type="password" name='password' placeholder='password' className='w-full mb-4 border-2 rounded p-2' />
        <input onChange={onConfirmPasswordChange} value={confirmPassword} type="password" placeholder='confirm password' className='w-full mb-4 border-2 rounded p-2' />
        <button onClick={onCreate} className='text-sky-200 w-full pt-3 mb-0' >Create Account</button>
      </div>
    </div>
  )
}


export default SignUp