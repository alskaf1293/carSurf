import './App.css';
import Main from './pages/main';
import PassengerRides from './pages/passenger-rides';
import { Route, Routes } from 'react-router-dom';
import DriverRequests from './pages/driver-requests';
import Login from './pages/login';
import Home from './pages/home';
import DriverDestination from './pages/driver-destination';
import PassengerDestination from './pages/passenger-destination';
import SignUp from './pages/sign-up';
import RideInProgress from './pages/ride-in-progress';
import Maps from './pages/maps.js'
import RedirectWrapper from './components/redirect';


function App() {
  return (
    <Routes>

        <Route path='/' element={<Main />} />
        <Route path='/passenger-rides' element={<PassengerRides />} />
        <Route path='driver-requests' element={<DriverRequests />} />
        <Route path='home' element={<Home />} />
        <Route path='driver-destination' element={<DriverDestination />} />
        <Route path='passenger-destination' element={<PassengerDestination />} />
        <Route path='ride-in-progress' element={<RideInProgress/>} />
        <Route path='maps' element={<Maps/>}/>
      <Route path='login' element={<Login />} />
      <Route path='sign-up' element={<SignUp />} />
    </Routes>
  );
}

export default App;
