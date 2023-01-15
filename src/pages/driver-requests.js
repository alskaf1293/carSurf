import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Star from '../assets/Star'
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

const DRIVER_ID = "blgijOhtDWAyU8mrl7y5"
// const DRIVER_ID = 'as'

const DriverRequests = (props) => {
  const navigator = useNavigate()

  const [requests, setRequests] = useState([])

  const getPassengerRequests = async () => {
    const q = query(collection(db, 'passengers'), where("chosen_driver", "==", DRIVER_ID))
    try {
      await getDocs(q)
        .then((querySnapshot) => {
          const data = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
          console.log("recieved data", data)
          setRequests(data)
        })

    } catch (e) {
      console.error("Error:", e);
    }
  }

  useEffect(() => {
    getPassengerRequests()
  }, [])

  return (
    <Template title='Passenger Requests' >
      <div className='flex flex-col h-full w-full ' >
        {requests.map((request) => <Request key={request.id} name={request.name} rides={request.rides} stars={request.rating} userId={request.userId} />)}
      </div>
    </Template>
  )
}

const Request = (props) => {
  const navigator = useNavigate()
  const choosePassenger = () => {

    console.log("choosing passenger", props.userId)
    // have user id
    // set rideInProgress to true
    // set passenger rideInProgress to true

    const docRef = doc(db, "users", props.userId);
    setDoc(docRef, { rideInProgress: true }, { merge: true })

    navigator('/ride-in-progress')

  }
  return (
    <div className='my-4 w-full p-2 flex bg-blue-300' onClick={choosePassenger}>
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

export default DriverRequests