
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from './Components/Login.js';
import DashBoard from './pages/dashBoard.js';
import Logs from './Components/Logs.js';
import Map from './pages/Map.js';
import WelcomePage from './Components/welcomePage.js'
import HelpSupportPage from './Components/help.js';
import Admins from './pages/Admins.js';
import AddAdmin from './Components/AddAdmin.js';
import AddSensor from './Components/AddMap';
function App() {

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/Loginn" element={<Login />} />
      <Route path="/help" element={<HelpSupportPage  />} />
        <Route path='login' element={<Login/>}/>
        <Route path='/Logs' element={<Logs/>}/>
        <Route path='/Map' element={<Map/>}/>
        <Route path="/DashBoard" element={<DashBoard/>}/>
        <Route path='/Admins' element={<Admins/>}/>
        <Route path='/AddAdmin' element={<AddAdmin/>}/>
        <Route path='/AddSensor' element={<AddSensor/>}/>
      
      </Routes>

    </div>
  );
}



export default App;
