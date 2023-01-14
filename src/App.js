import './App.css';
import Main from './pages/main';
import PassengerRides from './pages/passenger-rides';
import { Route, Routes } from 'react-router-dom';
import DriverRequests from './pages/driver-requests';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/passenger-rides' element={<PassengerRides />} />
      <Route path='driver-requests' element={<DriverRequests />} />
    </Routes>
  );
}

export default App;
