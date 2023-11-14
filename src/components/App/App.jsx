
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
import Details from '../Details/Details';
import Home from '../Homepage/Homepage'
import style from './App.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import AvailableUnits from '../AvailableUnits/AvailableUnits';
import About from '../About/About';
import Building from '../Building/Building';
import jwtDecode from 'jwt-decode';

// import video from '../../images/bg-video.mp4'
// import backgroundImg from '../../images/imageback.jpeg'
// import background from '../../images/background.jpg'
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// import Project from '../Project/Project';
import Payment from '../Payment/Payment';

// import Test from '../Project/Test';
// import Tabs from '../Project/Tabs';
// import Enable from '../Project/Enable';
// import TestTab from '../Project/TestTab';
// import TestEnable from '../Project/TestEnable';
import Form from '../Form/Form';

import City from '../City/City';
import CompanyCodes from '../CompanyCodes/CompanyCodes';
import UnitView from '../UnitView/UnitView';
import UnitUsage from '../UnitUsage/UnitUsage';
function App() {
  let [listener, setListener] = useState(false)
  let [loginData, setLoginData] = useState(null);/// Step 2

  function setUserData() {  /// Step 3
    let token = localStorage.getItem('token');
    let decodedToken = jwtDecode(token);//hold object that returned from token after decoding
    setLoginData(decodedToken);
    console.log("loginData:::");
    console.log(loginData);
  }
  let navigateLogin = useNavigate();

  function logOut() {
    localStorage.removeItem('token');
    setLoginData(null);
    navigateLogin('/login')
  }
  useEffect(() => {
    if (localStorage.getItem('token')) { // if user logged in
      setUserData();
    }
  }, [])
  return (

    <div className={style.App}>
      {/* <Navbar /> */}
      <Navbar loginData={loginData} logOut={logOut} />

      <Routes>
        <Route path='/' element={<LoginForm />}></Route>
        <Route path='register' element={<RegisterForm />}></Route>
        <Route path='login' element={<LoginForm setUserData={setUserData} />}></Route>
        <Route path='about' element={<About />}></Route>

        {/* Protected Routes  */}

        <Route element={<ProtectedRoute loginData={loginData} />}>
          <Route path='project' element={<Form />}></Route>
          <Route path='payment' element={<Payment />}></Route>
          <Route path='home' element={<Home setListener={setListener} listener={listener} />}></Route>
          <Route path="unit" element={<AvailableUnits />} />
          <Route path="unitview" element={< UnitView/>} />
          <Route path="unitusage" element={< UnitUsage/>} />
          <Route path="/building/:buildingCode/units" element={<AvailableUnits />} />
          <Route path="/unit/:unitNumber/details" element={<Details />} />

          <Route path='location' element={<City/>}></Route>
          <Route path='company' element={<CompanyCodes/>}></Route>

        </Route>


        <Route path='details' element={<Details />}></Route>
        <Route path='available_units' element={<AvailableUnits />}></Route>
        <Route path='search' element={<Search />}></Route>
      </Routes>


      {/* <video src={video} autoplay muted loop></video>  */}
      {/* <img src={background}></img> */}
    </div>
  );
}

export default App;
