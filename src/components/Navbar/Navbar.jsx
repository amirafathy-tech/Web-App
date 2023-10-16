import React from "react"
import { FaHome, FaSearch } from "react-icons/fa"
import { Link } from 'react-router-dom'
import style from "./Navbar.module.css"
export default function Navbar() {

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container ">
                    <a className="navbar-brand " href="#">
                        <h1 className={`${style.logo}`}>Compound Development</h1>
                        {/* <i class="fa-sharp fa-light fa-building fa-flip" style="color: #00adb5;"></i> */}
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

                    </div>
                    {/* <a className="navbar-brand" href="#">Navbar</a> */}
                    {/* <div>
                        <FaHome classNameName={`nav-icon ${style.homeIcon} `} />

                        <Link classNameName={`  ${style.link}  `} to="home">Home</Link>
                    </div>
                    <div>
                        <FaSearch classNameName={`nav-icon ${style.searchIcon}`} />
                        <Link classNameName={`${style.link}  `} to="search">Search</Link>
                    </div> */}
                </div>
            </nav>



        </>
    )

}