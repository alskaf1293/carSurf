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

  return (
    <Template title="Driver">
      <div className='h-full flex justify-center items-center '>

        <fieldset className='bg-blue-200 rounded-xl py-7'>
          <div>
            <label className='w-[90%] ml-[5%] mb-0 font-semibold mt-[5%]'>Within:
              <input onChange={onRangeChange} value={range} list="hosting-plan" type="tel" placeholder="mile" className='rounded mb-10' />
              <datalist id="hosting-plan">
                <option value="1">mile</option>
                <option value="5">miles</option>
                <option value="10">miles</option>
              </datalist>
            </label>
          </div>
          <div>
            <label className='w-[90%] ml-[5%] mb-0 font-semibold mt-[5%]' id="name-label">Where to:
              <input onChange={onDestinationChange} value={destination} className='w-[90%] ml-[5%] rounded mt-2 p-4' id="name" type="text" required placeholder="Enter a destination" />
            </label>
          </div>
          <div>
            <button onClick={onSubmit} className='w-[90%] border-2 rounded border-blue-500 bg-blue-500 text-white p-4 ml-[5%] my-4 font-semibold'
              id="submit" type="submit">Submit
            </button>
          </div>
        </fieldset>


      </div>
    </Template>
  )
}

export default DriverDestination

