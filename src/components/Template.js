import React from 'react'
import Signout from '../assets/Signout'
import Logo from '../assets/Logo'
import { useNavigate } from 'react-router-dom'

import { getAuth, signOut } from "firebase/auth";


const Template = (props) => {
  const navigate = useNavigate();

  const onClickLogo = () => {
    console.log("click home")
    navigate("/home")
  }

  const onClickSignout = () => {

    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("successfully logged out!");
      navigate("/login");
    }).catch((error) => {
      console.log(error);
    });

  }

  return (
    <div className='w-full h-screen' >
      <div className='h-[10vh] p-6 bg-slate-800 flex items-center shadow' >
        <div className='flex items-center mr-auto' >
          <div onClick={onClickLogo} className='flex justify-center items-center w-[40px] h-[40px] cursor-pointer' >
            <Logo />
          </div>
          <h1 className='ml-4 text-2xl font-semibold text-white' >{props.title}</h1>
        </div>
        <div onClick={onClickSignout} className='flex items-center justify-center w-[40px] h-[40px] cursor-pointer' >
          <Signout />
        </div>
      </div>
      <h1 className="h-[90vh]  text-3xl font-bold">
        {props.children}
      </h1>
    </div>

  )
}

export default Template