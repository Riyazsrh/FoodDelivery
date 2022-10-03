
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import TableData from './pages/Products';
import MenuuList from './pages/Products';
import ProtctedRoute from './pages/Protected';
import Verifcation from './pages/Verifcation';



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/verification/:username' element={<Verifcation/>} />
        <Route path='/menu' element={< ProtctedRoute Component={TableData} />} />
      </Routes>
    </div>
  );
}

export default App;
