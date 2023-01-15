import React, { useState } from 'react'
import Template from '../components/Template'
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
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
    console.log(auth.currentUser.uid);
    const userDoc = collection(db, "user");
    const userSnap = await getDoc(doc(userDoc, auth.currentUser.uid));
  
    const docRef = await addDoc(collection(db, "drivers"), {
      name: auth.currentUser.displayName,
      rides: 5,
      rating: 4.3,
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
  
  const textCenterAlign={
    textAlign: 'center'
  }
  return (
    <Template title="Drive">
      <div style={backgroundStyle} className='flex flex-col h-full w-full justify-center items-center gap-y-8'>

        <fieldset className='bg-slate-800 rounded-xl py-7 content-center'>
          <div className="py-5 space-y-3 content-center">
            <text style={textCenterAlign} className='w-[90%] ml-[5%] mb-0 font-semibold mt-[5%] text-slate-300 text-center content-center'>Within</text>
              <input onChange={onRangeChange} value={range} list="hosting-plan" type="number" placeholder="mile" className='text-lg text-black w-[90%] ml-[5%] rounded mt-2 p-2' />           
          </div>
          <div className="py-7 space-y-3 content-center">
            <text style={textCenterAlign} className='w-[90%] ml-[5%] mb-0 font-semibold mt-[5%] text-slate-300 text-center content-center' id="name-label">Where to</text>
              <input onChange={onDestinationChange} value={destination} className='text-lg text-black w-[90%] ml-[5%] rounded mt-2 p-2 py-2' id="name" type="text" required placeholder="Enter a destination" />
          </div>
          <div>
            <button onClick={onSubmit} className='w-[90%] rounded text-sky-300 p-4 ml-[5%] my-4 font-semibold'
              id="submit" type="submit">Submit
            </button>
          </div>
        </fieldset>


      </div>
    </Template>
  )
}

export default DriverDestination

