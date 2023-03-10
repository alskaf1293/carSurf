import React from 'react'
import Template from '../components/Template'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Home = (props) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user){
      console.log(user);
      const uid = user.displayName; 
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

  const backgroundStyle={
    //https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80
    backgroundImage: "url('https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80')"
  }

  return (
      <Template title='Carsurf' >
        <div style={backgroundStyle} className='flex flex-col h-full w-full justify-center items-center gap-y-8' >
        <text className="font-sans text-slate-800">Drive someone</text>
          <div onClick={onClickDriver} className='w-[300px] h-[100px] font-sans bg-slate-800 text-slate-300 flex justify-center items-center rounded cursor-pointer'>
            <text className="font-sans text-3xl">Drive</text>
          </div>

          <text className="font-sans text-slate-800">Get a ride</text>
          <div onClick={onClickPassenger} className='w-[300px] h-[100px] font-sans bg-slate-800 text-slate-300 flex justify-center items-center rounded cursor-pointer' >
            <text className="font-sans text-3xl">Ride</text>
          </div>
        </div>
      </Template>
  )
}
export default Home