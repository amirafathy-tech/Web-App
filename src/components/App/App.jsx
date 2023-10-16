
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
import Details from '../Details/Details';
import Home from '../Homepage/Homepage'
import style from './App.module.css';
import React from 'react';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import AvailableUnits from '../AvailableUnits/AvailableUnits';
import About from '../About/About';
import Building from '../Building/Building';

import video from '../../images/bg-video.mp4'
import backgroundImg from '../../images/imageback.jpeg'
import background from '../../images/background.jpg'

function App() {
  let [listener, setListener] = useState(false)
  return (

    <div className={style.App}>

      <Navbar />
      <Routes>

        <Route path='/' element={<Home setListener={setListener} listener={listener} />}></Route>
        <Route path='search' element={<Search />}></Route>

        <Route path='home' element={<Home setListener={setListener} listener={listener} />}></Route>
        <Route path='about' element={<About />}></Route>
        <Route path='building' element={<Building />}></Route>
        <Route  path="/building/:buildingCode/units" element={<AvailableUnits/>} />
        <Route  path="/unit/:unitNumber/details" element={<Details/>} />


        <Route path='details' element={<Details />}></Route>
        <Route path='available_units' element={<AvailableUnits />}></Route>
      </Routes>
      
       
    {/* <video src={video} autoplay muted loop></video>  */}
    {/* <img src={background}></img> */}
    </div>
  );
}

export default App;
