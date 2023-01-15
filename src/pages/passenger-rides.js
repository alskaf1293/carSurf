import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Star from '../assets/Star'
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

const DESTINATION = "Los Angeles, CA"

const userId = "5ewiHEDJ7dhK4cpOYTLn"
const DRIVER_USER_ID = "blgijOhtDWAyU8mrl7y5"

const PassengerRides = (props) => {
  const [drivers, setDrivers] = useState([])
  const navigator = useNavigate()

  // const realTimeUpdates = async () => {
  //   // const docRef = doc(db, "passengers", userId);
  //   // const docSnap = await getDoc(docRef);
  //   // const driverUserId = docSnap.data().chosen_driver

  //   const unsub = onSnapshot(doc(db, "drivers", driverUserId), (doc) => {
  //     console.log("Current data: ", doc.data());

  //     if (doc.data().rideInProgress) {
  //       navigator('/ride-in-progress')
  //     }
  //   });

  //   return () => {
  //     unsub()
  //   }
  // }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
      console.log("Current data: ", doc.data());

      if (doc.data().rideInProgress) {
        navigator('/ride-in-progress')
      }
    });

    return () => {
      unsub()
    }

  }, [])

  const getDrivers = async () => {
    try {

      // Get Destination from the users

      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      console.log("snap data", docSnap.data())
      const destination = docSnap.data().destination
      console.log("destination", destination)

      const q = query(collection(db, 'drivers'), where("destination", "==", destination))
      await getDocs(q)
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
        {drivers.map((driver) => <Ride key={driver.userId} name={driver.name} rides={driver.rides} stars={driver.rating} userId={driver.userId} />)}
      </div>
    </Template>
  )
}

const Ride = (props) => {

  const chooseDriver = async () => {
    console.log("choosing driver", props.userId)
    // gets user id
    // gets user in passengers
    // updates chosen_driver in passengers to chosen driver

    const q = query(collection(db, 'passengers'), where("userId", "==", userId))
    const docs = await getDocs(q)
      .then((querySnapshot) => {
        const data = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log("recieved data", data)
        return data
      })

    console.log("docs", docs[0].id) // id of the document in passengers


    const docRef = doc(db, "passengers", docs[0].id);
    setDoc(docRef, { chosen_driver: props.userId }, { merge: true })
  }

  return (
    <div className='my-4 w-full p-2 flex bg-blue-300' onClick={chooseDriver} >
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