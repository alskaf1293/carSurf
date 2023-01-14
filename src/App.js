import './App.css';
import Main from './pages/main';
import PassengerRides from './pages/passenger-rides';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/passenger-rides' element={<PassengerRides />} />
    </Routes>
  );
}

export default App;
