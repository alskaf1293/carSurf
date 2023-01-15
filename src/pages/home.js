import React from 'react'
import Template from '../components/Template'

const Home = (props) => {
  const onClickDriver = () => {
    console.log('clicked driver')
  }

  const onClickPassenger = () => {
    console.log('clicked passenger')
  }

  return (
    <Template title='Home' >
      <div className='flex flex-col h-full w-full justify-center items-center gap-y-8' >
        <div onClick={onClickDriver} className='w-[300px] h-[200px] bg-blue-500 text-white flex justify-center items-center rounded' >
          Driver
        </div>
        <div onClick={onClickPassenger} className='w-[300px] h-[200px] bg-blue-500 text-white flex justify-center items-center rounded' >
          Passenger
        </div>
      </div>
    </Template>
  )
}
export default Home