import React, { useState } from 'react'
import Template from '../components/Template'
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

import {getAuth, onAuthStateChanged} from "firebase/auth";

// TODO
// Get this information from the users collection
// need user id from the authentication in this file!
const NAME = "Devant Thames"
const RIDES = 3.2
const RATING = 83
const USERID = '5ewiHEDJ7dhK4cpOYTLn'

const PassengerDestination = () => {

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

  const navigate = useNavigate();

  const [destination, setDestination] = useState('')

  const onSubmit = () => {
    console.log("Going to ", destination)
    /*
    const userDoc = collection(db, "user");
    const userSnap = getDoc(doc(userDoc, auth.currentUser.uid));

    console.log(userSnap.data());
    */
    const docRef = addDoc(collection(db, "passengers"), {
      name: auth.currentUser.displayName,
      rides: 4,
      rating: 5,
      userId: auth.currentUser.uid,
      chosen_driver: "none",
      destination: destination,
      rideInProgress: false,
    }).then(()=>{
      navigate("/passenger-rides");
    });

  }

  const onDestinationChange = (e) => {
    setDestination(e.target.value)
  }

  const backgroundStyle={
    //https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80
    backgroundImage: "url('https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80')"
  }
  return (
    <Template title="Ride">
      <div style={backgroundStyle} className='h-full flex justify-center items-center '>

        <fieldset className='bg-slate-800 rounded-xl py-7'>
          <div className="py-5 space-y-7 content-center">
            <label className='w-[90%] ml-[5%] mb-0 font-semibold mt-[5%] text-slate-300 text-center content-center' id="name-label">Where to</label>
              <input onChange={onDestinationChange} value={destination} className='text-lg text-black w-[90%] ml-[5%] rounded mt-2 p-2' id="name" type="text" required placeholder="Enter a destination" />
          </div>
          <div className="content-center">
            <button onClick={onSubmit} className='w-[90%] rounded text-sky-300 p-4 ml-[5%] my-4 font-semibold'
              id="submit" type="submit">Submit
            </button>
          </div>
        </fieldset>


      </div>
    </Template>
  )
}

export default PassengerDestination