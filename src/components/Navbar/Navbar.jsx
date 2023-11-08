import React ,{useState} from "react"
import { FaHome, FaSearch } from "react-icons/fa"
import { Link } from 'react-router-dom'
import style from "./Navbar.module.css"

export default function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const handleNavbarToggle = () => {
      setIsNavbarOpen(!isNavbarOpen);
    };
  

    return (
        <>

            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container ">
                    <a className="navbar-brand " href="#">
                        <h1 className={`${style.logo}`}>Compound Development</h1>
                    </a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-between text-sm-center">
                            <li className="nav-item">

                                <Link className={` nav-link active  ${style.link}  `} to="home">Home</Link>
                            </li>
                            <li className="nav-item">

                                <Link className={` nav-link  ${style.link}  `} to="about">About</Link>
                            </li>
                            <li className="nav-item">

                                <Link className={` nav-link  ${style.link}  `} to="building">Building</Link>
                            </li>
                            <li className="nav-item">

                                <Link className={` nav-link  ${style.link}  `} to="newdevelopment">New Development</Link>
                            </li>

                        </ul>
                        <Link className="nav-link nav-btn bg-main-color text-white rounded-5 px-4 py-2 ms-md-3 text-sm-center" to="#"
                            data-bs-target="#exampleModal"> Register</Link>

                        <Link className="nav-link nav-btn bg-main-color text-white rounded-5 px-4 py-2 ms-md-3 text-sm-center" to="login"
                            data-bs-target="#exampleModal"> Login</Link>

                    </div>
                   
                </div>
            </nav> */}




  
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          <a className="navbar-brand" href="#">
            <h1 className={`${style.logo}`}>Compound Development</h1>
          </a>

          <div
            className={`collapse navbar-collapse ${
              isNavbarOpen ? 'show' : ''
            }`}
          >
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
                  to="building"
                  onClick={handleNavbarToggle}
                >
                  Building
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${style.link}`}
                  to="unit"
                  onClick={handleNavbarToggle}
                >
                  Unit
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link
                  className={`nav-link ${style.link}`}
                  to="newdevelopment"
                  onClick={handleNavbarToggle}
                >
                  New Development
                </Link>
              </li> */}
               <li className="nav-item">
                <Link
                  className={`nav-link ${style.link}`}
                  to="payment"
                  onClick={handleNavbarToggle}
                >
                  Payment
                </Link>
              </li>
            </ul>
            {/* <Link
              className="nav-link nav-btn bg-main-color text-white rounded-5 px-4 py-2 ms-md-3 text-sm-center"
              to="register"
              data-bs-target="#exampleModal"
              onClick={handleNavbarToggle}
            >
              Register
            </Link> */}

            <Link
              className="nav-link nav-btn bg-main-color text-white rounded-5 px-4 py-2 ms-md-3 text-sm-center"
              to="login"
              data-bs-target="#exampleModal"
              onClick={handleNavbarToggle}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
 



        </>
    )

}