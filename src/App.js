import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  );
}

export default App;
