

import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import style from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom'
import { encode } from 'base-64';

export default function Login({ setUserData }) {

    // const clientID = "1eb8c477-8309-4d77-b174-bb67b3e8b5d1"
    // const clientSecret = "nZFdZBQsZy5cp_lzmfDIojf4S7PTafZiQ"
    // new ones

    const clientID = "15ef32d9-2046-426d-ac8d-be541f2db7e7"
    const clientSecret = "rKbRqvHSPPFjCgHF?2v=ne=GAF1:CzH"

    // const url = "https://aey0y39na.trial-accounts.ondemand.com"


    let [user, setUser] = useState({
        email: '',
        password: '',
    })

    let [errorMsg, setErrorMsg] = useState('');//to appeare in UI and talk with render function (Data From Backend)
    let [errorList, setErrorList] = useState([]);//(Data From Validation)
    let [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    function goToHome() { // to redirect to Home Page
        let path = '/home';
        navigate(path);
    }

    function validateForm() {
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),

        })
        return schema.validate(user, { abortEarly: false });
    }


    async function submitFormData(e) {
        e.preventDefault();
        setLoading(true);
        let validateResult = validateForm();
        //console.log(validateResult);
        if (validateResult.error) {
            setErrorList(validateResult.error.details);
            setLoading(false);
        }
        else {

            //     const clientid = clientID
            //    const auth = "Basic " + Buffer.from(clientid + ':' + clientSecret).toString("base64");
            //     const options = {
            //         method: 'POST',
            //         //mode: "cors", 
            //         url: `https://cors-anywhere.herokuapp.com/${url}/oauth2/token?grant_type=client_credentials&client_id=${clientid}`,
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded',
            //             // 'Accept': 'application/json, text/plain',
            //             // 'Content-Type': 'application/json;charset=utf8',
            //             'Authorization': auth,
            //             // 'Access-Control-Allow-Origin':window.location.origin,'
            //             // 'Access-Control-Allow-Credentials':true
            //         },
            //         data: {
            //             'email': user.email,
            //             'password': user.password
            //         }
            //     }
            //     const response = await axios(options);
            //     console.log("hereee");
            //     //console.log(response);
            //     console.log(response.data.access_token);

            // curl command

            const qs = require('qs');
            let data = qs.stringify({
                'grant_type': 'password',
                'username': user.email,
                //'hagarnabil7@gmail.com',
                'password': user.password
                //'H@g@rN117!'
            });

            const clientid = clientID
            //const auth = "Basic " + Buffer.from(clientid + ':' + clientSecret).toString("base64");
            const auth = "Basic " + encode(clientid + ':' + clientSecret);;
            //         let config = {
            //             method: 'post',
            //             maxBodyLength: Infinity,
            //             url: 'https://cors-anywhere.herokuapp.com/https://aosfletgu.trial-accounts.ondemand.com/oauth2/token',
            //             //'https://cors-anywhere.herokuapp.com/https://aey0y39na.trial-accounts.ondemand.com/oauth2/token',
            //             headers: {
            //                 'Authorization': auth,
            //                 'Content-Type': 'application/x-www-form-urlencoded'
            //             },
            //             data: data
            //         };

            //         const response = await axios(config);
            //         console.log(response);
            //         console.log("response");



            //         if (response.statusText == "OK") {
            //         //if (response) {
            //             //console.log("okkkk");
            //             //localStorage.setItem('token', response.data.access_token); /// Step 1
            //             console.log(response.data.id_token);
            //             localStorage.setItem('token', response.data.id_token); /// Step 1
            //             setUserData();//// here call setUserData function 
            //             goToHome();
            //         }
            //         else if(response.status === 400 ){
            //             console.log("40000000");
            //             setErrorMsg("Invalid Email or Password")
            //             //setErrorMsg(response.data);
            //         }
            //         else{
            //             setErrorMsg(response)
            //         }
            //         setLoading(false);
            //     }

            // }


            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://cors-anywhere.herokuapp.com/https://aosfletgu.trial-accounts.ondemand.com/oauth2/token',
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            try {
                const response = await axios(config);
                console.log(response);
                if (response.status === 200) {
                    console.log(response.data.id_token);
                    localStorage.setItem('token', response.data.id_token);
                    setUserData();
                    goToHome();
                } else if (response.error_description === "User authentication failed.") {
                    console.log("40000000");
                    setErrorMsg("Invalid Email or Password");
                } else {
                    console.log(response);
                    setErrorMsg(response);
                }
            } catch (error) {
                console.error(error);
                setErrorMsg("An error occurred (Invalid Email or Password)");
            }

            setLoading(false);

        }

    }


    // function goToForgetPassWord() {
    //     let path = '/forgetPassword';
    //     navigate(path);
    // }

    function getFormValue(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value
        setUser(myUser);// update user data
        console.log(myUser)
    }
    function cons() {
        console.log("rec");
    }

    return (
        <>

            <div className={`${style.size} `}>
                <div className="d-flex justify-content-center align-items-center my-5">
                    <div className={`w-50 p-5 bg-light overflow-auto ${style.form}`}>
                        <h1 className="my-4 text-center text-dark">Login </h1>
                        {errorMsg ? <div className="alert alert-danger p-2">{errorMsg}</div> : ""}
                        {errorList.map((error, index) => (
                            <div className="alert alert-danger p-2" key={index}>
                                {error.message}
                            </div>
                        ))}
                        <form onSubmit={submitFormData}>
                            <div className="input-gp my-3">
                                <label className="form-label" htmlFor="form3Example3">
                                    Email address
                                </label>
                                <input
                                    onChange={getFormValue}
                                    type="email"
                                    className="form-control my-2"
                                    name="email"
                                    placeholder="email"
                                />
                            </div>
                            <div className="input-gp my-3">
                                <label className="form-label" htmlFor="form3Example4">
                                    Password
                                </label>

                                <input
                                    onChange={getFormValue}
                                    type="password"
                                    className="form-control my-2"
                                    name="password"
                                    placeholder="password"
                                />
                            </div>
                            <div className="d-flex justify-content-center my-3">
                                <button
                                    className={`${style.loginButton} w-100`}
                                    type="submit"
                                >
                                    {loading ? (
                                        // <i className="fa fa-spinner fa-spin"></i>
                                        <p>Loading...</p>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </div>
                            <div className="d-flex justify-content-center my-3">
                                <p>
                                    New Account?

                                </p>
                                <Link to="/register" className={style.link}>Sign UP</Link>
                            </div>
                            <div className="clearfix"></div>
                        </form>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>

        </>

    )
}
