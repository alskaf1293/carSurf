import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Person from '../assets/Person'
import Destination from '../assets/Destination'

const PassengerRides = (props) => {

  return (
    <Template title='Ride In Progress' >
      <div className='flex flex-col h-full w-full items-center' >
        <div className='mt-[50px] mb-[50px] w-[160px] h-[160px] rounded-full bg-gray-400' >
        </div>
        <div className='w-[300px]' >
          <div className='flex items-center pl-2' >
            <Person />
            <h2 className='ml-4 mb-1' >Devant Thames</h2>
          </div>
          <div className='flex items-center mt-4' >
            <Destination />
            <h2 className='ml-4 mb-1' >Los Angeles, CA</h2>
          </div>
          <button className='w-full mt-4 bg-blue-500 border-2 p-4 border-blue-500 text-white rounded' >End Ride</button>
        </div>

      </div>
    </Template>
  )
}

export default PassengerRides