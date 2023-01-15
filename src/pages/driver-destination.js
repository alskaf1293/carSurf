import React from 'react'
import Template from '../components/Template'
//import styles from '../css/driver-destination.module.css'

const DriverDestination = () => {
  return (
    <Template title = "Driver">
    <div className = 'h-full flex justify-center items-center '>

    <fieldset className='bg-blue-200 rounded-xl py-7'>
        <div>
            <label className='w-[90%] ml-[5%] mb-0' id="name-label">Where to:
                <input className='w-[90%] ml-[5%] rounded mt-2' id="name" type="text" required placeholder="Enter a destination"/>
            </label>
        </div>
        <div>
            <button className='w-[90%] border-2 rounded border-blue-500 bg-blue-500 text-white p-4 ml-[5%] my-4'
                id="submit" type="submit">Submit
            </button>
        </div>
      </fieldset>
        
      
    </div>
    </Template>
  )
}

export default DriverDestination