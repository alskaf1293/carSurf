import React, { useState } from 'react'
import Template from '../components/Template'
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import {db} from '../firebase'

const NAME = "Alan Mathison"
const RIDES = 4
const RATING = 5.0
const USERID = 'user id from auth'

const PassengerDestination = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState('')

  const onSubmit = async () => {
    console.log("Going to ", destination)

    const docRef = await addDoc(collection(db, "passengers"), {
      name: NAME,
      rides: RIDES,
      rating: RATING,
      userId: USERID,
      chosen_driver: "none"
    });

    navigate("/passenger-rides")
  }

  const onDestinationChange = (e) => {
    setDestination(e.target.value)
  }


  return (
    <Template title="Passenger">
      <div className='h-full flex justify-center items-center '>

        <fieldset className='bg-blue-200 rounded-xl py-7'>
          <div>
            <label className='w-[90%] ml-[5%] mb-0 font-semibold' id="name-label">Where to:
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

export default PassengerDestination