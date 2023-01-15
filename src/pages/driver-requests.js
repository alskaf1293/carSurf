import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Star from '../assets/Star'

const DriverRequests = (props) => {

  const [requests, setRequests] = useState([])

  useEffect(() => {
    const requests = [
      {
        name: "Holland Pleskac",
        rides: 100,
        stars: 5
      },
      {
        name: "Winston Chung",
        rides: 14,
        stars: 4.2
      }
    ]
    setRequests(requests)
  }, [])

  return (
    <Template title='Passenger Requests' >
      <div className='flex flex-col h-full w-full ' >
        {requests.map((request) => <Request name={request.name} rides={request.rides} stars={request.stars} />)}
      </div>
    </Template>
  )
}

const Request = (props) => {
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

export default DriverRequests