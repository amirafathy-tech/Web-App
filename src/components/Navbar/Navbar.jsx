import React, { useState } from "react"
import { FaHome, FaSearch } from "react-icons/fa"
import { Link } from 'react-router-dom'
import style from "./Navbar.module.css"

export default function Navbar({ loginData, logOut }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
        {/* <div className="row"> */}
          <a className="navbar-brand" href="#">
            <h1 className={`${style.logo}`}>Compound Development</h1>
          </a>

          <div
            className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''
              }`}
          >
            {loginData ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-between text-sm-center">
                <li className="nav-item">
                  <Link
                    className={`nav-link active ${style.link}`}
                    to="home"
                    onClick={handleNavbarToggle}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="about"
                    onClick={handleNavbarToggle}
                  >
                    About
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="project"
                    onClick={handleNavbarToggle}
                  >
                    Project
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="buildingtype"
                    onClick={handleNavbarToggle}
                  >
                    BuildingType
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="building"
                    onClick={handleNavbarToggle}
                  >
                    Buildings
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="building"
                    onClick={handleNavbarToggle}
                  >
                    Building
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="unitview"
                    onClick={handleNavbarToggle}
                  >
                    View
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="unitusage"
                    onClick={handleNavbarToggle}
                  >
                  Usage
                  </Link>
                </li>
                <li className="nav-item">

                  <Link
                    className={`nav-link ${style.link}`}
                    to="unitstatus"
                    onClick={handleNavbarToggle}
                  >
                   Status
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="unitfloor"
                    onClick={handleNavbarToggle}
                  >
                    Floor
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="unit"
                    onClick={handleNavbarToggle}
                  >
                    Units
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <div className="subnav">
                    <button className={`nav-link subnavbtn ${style.link}`} onClick={handleNavbarToggle}>
                      Unit <i className="fa fa-caret-down" aria-hidden="true"></i>

                    </button>
                    {isNavbarOpen && (
                      <div className="subnav-content">
                         <Link
                          className={`nav-link ${style.link}`}
                          to="unit"
                          onClick={handleNavbarToggle}
                        >
                          Units
                        </Link>
                        <Link
                          className={`nav-link ${style.link}`}
                          to="unitview"
                          onClick={handleNavbarToggle}
                        >
                          Unit View
                        </Link>
                        <Link
                          className={`nav-link ${style.link}`}
                          to="unitusage"
                          onClick={handleNavbarToggle}
                        >
                          Unit Usage
                        </Link>

                      </div>
                    )}
                  </div>
                </li> */}

                {/* <li className="nav-item">
                  <div className={`${style.subnav}`}>
                    <button
                      className={`nav-link subnavbtn ${style.link}`}
                      onClick={handleNavbarToggle}
                    >
                      Unit <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </button>
                    {isNavbarOpen && (
                      <div className={`${style.subnavcontent}`}>
                        <Link
                          className={`nav-link ${style.link}`}
                          to="unit"
                        >
                          Units
                        </Link>
                        <Link
                          className={`nav-link ${style.link}`}
                          to="unitview"
                        >
                          Unit View
                        </Link>
                        <Link
                          className={`nav-link ${style.link}`}
                          to="unitusage"
                        >
                          Unit Usage
                        </Link>
                        <Link
                          className={`nav-link ${style.link}`}
                          to="unitstatus"
                        >
                          Unit Status
                        </Link>
                        <Link
                          className={`nav-link ${style.link}`}
                          to="unitfloor"
                        >
                          Unit Floor
                        </Link>
                      </div>
                    )}
                  </div>
                </li> */}
{/* 
                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="payment"
                    onClick={handleNavbarToggle}
                  >
                    Payment
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="location"
                    onClick={handleNavbarToggle}
                  >
                    Location
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${style.link}`}
                    to="company"
                    onClick={handleNavbarToggle}
                  >
                    CompanyCodes
                  </Link>
                </li>
              </ul>) : ("")}
            {/* <Link
              className="nav-link nav-btn bg-main-color text-white rounded-5 px-4 py-2 ms-md-3 text-sm-center"
              to="login"
              data-bs-target="#exampleModal"
              onClick={handleNavbarToggle}
            >
              Login
            </Link>
           */}

            <ul className='auth-links list-unstyled d-flex m-0 ms-auto align-items-center' >
              {loginData ? <h5 className='mx-3 my-0'>Hello {loginData.userName}</h5> : ""}

              {!loginData ? <>
                {/*  if user not logged in this appear login */}

                <li className="nav-item">
                  <Link className={`nav-link text-white `} to="login">Login</Link>
                </li>

              </> : <li className="nav-item">

                {/* else: user is logged in  this appear logout */}

                <Link className={`nav-link text-white`} onClick={logOut}>Logout</Link>
              </li>}
            </ul>
          </div>
          {/* </div> */}
        </div>
      </nav>
    </>
  )
}