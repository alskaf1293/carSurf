import React from 'react'
import Signout from '../assets/Signout'
import Logo from '../assets/Logo'

const Template = (props) => {

  const onClickLogo = () => {
    console.log("click home")
  }

  const onClickSignout = () => {
    console.log('click signout')
  }

  return (
    <div className='w-full h-screen' >
      <div className='p-6 bg-blue-500 flex items-center shadow' >
        <div className='flex items-center mr-auto' >
          <div onClick={onClickLogo} className='flex justify-center items-center w-[40px] h-[40px]' >
            <Logo />
          </div>
          <h1 className='ml-4 text-2xl font-semibold text-white' >{props.title}</h1>
        </div>
        <div onClick={onClickSignout} className='flex items-center justify-center w-[40px] h-[40px]' >
          <Signout />
        </div>
      </div>
      <h1 className="h-full text-3xl font-bold">
        {props.children}
      </h1>
    </div>

  )
}

export default Template