import React from 'react'
import Template from '../components/Template'
import { useNavigate } from 'react-router-dom'
import RedirectWrapper from '../components/redirect';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const Home = (props) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user){
      console.log(user);
      const uid = user.id; 
      console.log("Logged in as " + uid);
    }
    else{
      console.log("Logged out");
      navigate('/login');
    }
  });

  const navigate = useNavigate();

  const onClickDriver = () => {
    console.log('clicked driver')
    navigate('/driver-destination')
  }

  const onClickPassenger = () => {
    console.log('clicked passenger')
    navigate('/passenger-destination')
  }

  return (
      <Template title='Home' >
        <div className='flex flex-col h-full w-full justify-center items-center gap-y-8' >
          <div onClick={onClickDriver} className='w-[300px] h-[200px] bg-blue-500 text-white flex justify-center items-center rounded cursor-pointer'>
            Driver
          </div>
          <div onClick={onClickPassenger} className='w-[300px] h-[200px] bg-blue-500 text-white flex justify-center items-center rounded cursor-pointer' >
            Passenger
          </div>
        </div>
      </Template>
  )
}
export default Home