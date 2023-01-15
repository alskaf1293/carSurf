import React from 'react'
import Template from '../components/Template'
//import styles from '../css/driver-destination.module.css'

const DriverDestination = () => {
  return (
    <Template >
    <div>
      <h1 className='font-bold text-red-500 text-center pt-6'>
        Driver
      </h1>
      <fieldset>
        <div>
            <label id="name-label">Where to:
                <input id="name" type="text" required placeholder="Enter a destination"/>
            </label>
        </div>
        <div>
            <button className='font-bold'
                id="submit" type="submit">Submit
            </button>
        </div>
      </fieldset>
        
      
    </div>
    </Template>
  )
}

export default DriverDestination