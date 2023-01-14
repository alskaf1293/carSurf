import React from 'react'
import Signout from '../assets/Signout'
import Logo from '../assets/Logo'

const Template = (props) => {
  return (
    <div className='w-full h-screen' >
      <div className='p-6 bg-blue-500 flex items-center shadow' >
        <div className='flex items-center mr-auto' >
          <div className='flex justify-center items-center w-[40px] h-[40px]' >
            <Logo />
          </div>
          <h1 className='ml-4 text-2xl font-semibold text-white' >Driver</h1>
        </div>
        <div className='flex items-center justify-center w-[40px] h-[40px]' >
          <Signout />
        </div>
      </div>
      <h1 className="h-full text-3xl font-bold underline">
        {props.children}
      </h1>
    </div>

  )
}

export default Template