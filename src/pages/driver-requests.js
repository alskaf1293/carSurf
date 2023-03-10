import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Star from '../assets/Star'
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const DRIVER_ID = "blgijOhtDWAyU8mrl7y5"
// const DRIVER_ID = 'as'

const DriverRequests = (props) => {

  const navigate = useNavigate()

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user){
      console.log("Logged in as " + user.email);
    }
    else{
      console.log("Logged out");
      navigate('/login');
    }
  });



  const [requests, setRequests] = useState([])

  const getPassengerRequests = async () => {
    const q = query(collection(db, 'passengers'), where("chosen_driver", "==", auth.currentUser.uid))
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
  const backgroundStyle={
    //https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80
    backgroundImage: "url('https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80')"
  }
  return (
    <Template title='Your Requests' >
      <div style={backgroundStyle} className='flex flex-col h-full w-full ' >
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
    <div className='my-4 w-full p-2 flex bg-slate-300' onClick={choosePassenger}>
      <div className='mr-4 w-[60px] h-[60px] bg-gray-400 rounded-full' >
      </div>
      <div className='text-xl' >
        <h3 className="text-slate-800">{props.name}</h3>
        <h4 className='text-lg text-gray-800' >{props.rides} rides</h4>
      </div>
      <div className='ml-auto mr-4 flex items-center mb-2' >
        <h4 className='text-slate-800' >{props.stars}</h4>
        <Star />
      </div>
    </div>
  )
}

export default DriverRequests