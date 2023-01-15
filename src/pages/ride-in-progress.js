import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Person from '../assets/Person'
import Destination from '../assets/Destination'

const PassengerRides = (props) => {

  const backgroundStyle={
    //https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80
    backgroundImage: "url('https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80')"
  }

  return (
    <Template title='Ride In Progress' >
      <div style={backgroundStyle} className='flex flex-col h-full w-full items-center' >
        <div className='mt-[50px] mb-[50px] w-[160px] h-[160px] rounded-full bg-gray-400' >
        </div>
        <div className='w-[300px]' >
          <div className='flex items-center pl-2' >
            <Person />
            <h2 className='ml-4 mb-1' >Enok Ethelred</h2>
          </div>
          <div className='flex items-center mt-4' >
            <Destination />
            <h2 className='ml-4 mb-1' >Los Angeles, CA</h2>
          </div>
          <button className='w-full mt-4 bg-slate-700 rounded p-4 text-white rounded' >End Ride</button>
        </div>

      </div>
    </Template>
  )
}

export default PassengerRides