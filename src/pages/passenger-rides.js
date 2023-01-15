import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Star from '../assets/Star'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';


const PassengerRides = (props) => {
  const [drivers, setDrivers] = useState([])

  const getDrivers = async () => {
    try {
      await getDocs(collection(db, "drivers"))
        .then((querySnapshot) => {
          const data = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
          console.log("recieved data", data)
          setDrivers(data)
        })

    } catch (e) {
      console.error("Error:", e);
    }
  }

  useEffect(() => {
    getDrivers()
  }, [])

  return (
    <Template title='Drivers Near Me' >
      <div className='flex flex-col h-full w-full ' >
        {drivers.map((driver) => <Ride name={driver.name} rides={driver.rides} stars={driver.rating} />)}
      </div>
    </Template>
  )
}

const Ride = (props) => {
  return (
    <div className='my-4 w-full p-2 flex bg-blue-300' >
      <div className='mr-4 w-[60px] h-[60px] bg-gray-400 rounded-full' >
      </div>
      <div className='text-xl' >
        <h3>{props.name}</h3>
        <h4 className='text-lg text-gray-800' >{props.rides} rides</h4>
      </div>
      <div className='ml-auto mr-4 flex items-center mb-2' >
        <h4 className='' >{props.stars}</h4>
        <Star />
      </div>
    </div>
  )
}

export default PassengerRides