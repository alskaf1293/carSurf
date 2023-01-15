import React, { useState } from 'react'
import Template from '../components/Template'
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";


const NAME = "Enok Ethelred"
const RIDES = 4
const RATING = 5
const USERID = 'blgijOhtDWAyU8mrl7y5'


const DriverDestination = () => {

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
  const [range, setRange] = useState('')

  const onSubmit = async () => {
    console.log("Going to ", destination)

    const docRef = await addDoc(collection(db, "drivers"), {
      name: auth.currentUser.displayName,
      rides: auth.currentUser.rides,
      rating: auth.currentUser.rating,
      userId: auth.currentUser.uid,
      chosen_driver: "none",
      destination: destination,
      range: range,
    });

    navigate("/driver-requests")
  }

  const onDestinationChange = (e) => {
    setDestination(e.target.value)
  }

  const onRangeChange = (e) => {
    setRange(e.target.value)
  }
  const backgroundStyle={
    //https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80
    backgroundImage: "url('https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80')"
  }

  return (
    <Template title="CarSurf">
      <div style={backgroundStyle} className='flex flex-col h-full w-full justify-center items-center gap-y-8'>

        <fieldset className='bg-slate-800 rounded-xl py-7 '>
          <div>
            <label className='w-[90%] ml-[5%] mb-0 font-semibold mt-[5%] text-white'>Within
              <input onChange={onRangeChange} value={range} list="hosting-plan" type="tel" placeholder="mile" className='text-black w-[90%] ml-[5%] rounded mt-2 p-4' />
              <datalist id="hosting-plan">
                <option value="1">mile</option>
                <option value="5">miles</option>
                <option value="10">miles</option>
              </datalist>
            </label>
          </div>
          <div className="py-7">
            <label className='w-[90%] ml-[5%] mb-0 font-semibold mt-[5%] text-white' id="name-label">Where to
              <input onChange={onDestinationChange} value={destination} className='text-black w-[90%] ml-[5%] rounded mt-2 p-4' id="name" type="text" required placeholder="Enter a destination" />
            </label>
          </div>
          <div>
            <button onClick={onSubmit} className='w-[90%] rounded text-white p-4 ml-[5%] my-4 font-semibold'
              id="submit" type="submit">Submit
            </button>
          </div>
        </fieldset>


      </div>
    </Template>
  )
}

export default DriverDestination

