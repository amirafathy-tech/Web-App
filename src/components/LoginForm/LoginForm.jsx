

import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import style from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom'
import { encode } from 'base-64';

export default function Login({ setUserData }) {

    // Authenticated variables
    // const clientID = "77ce79f7-eb2d-421c-ab03-794811bbdbe3"
    // //"9f50a6eb-f310-4cc7-be6b-cbfffb49b623"
    // const clientSecret = "_H7MX2YRj6UE.seBIxX8zEnDGMYTG-DYShZ"
    //"]b[dtj5pNc5@R5GndwGMvn0fLkkb?jG"

    // // demo authenticated variables
    // const clientID="fc74a36a-d194-4401-ab00-c0c83d2c806f"
    // const clientSecret="2p_H[tazCkYQIt3:=oFZIK4?AkYb4O"
    // const url = "https://aey0y39na.trial-accounts.ondemand.com"





    // demoo with search authenticated variables
    // const clientID="5188fd8d-dfeb-488d-aa4e-feeecd76e39e"
    // const clientSecret="z7gYrr9X/BGfr67aa4K1ujXZP9r_lAp"
    const clientID = "3992cd17-fd1f-4236-9caf-e34cb5328341"
    const clientSecret = "D9lW_73FBJC9O-G=F/:0U]cK_IPoc86V7"
    const url = "https://aey0y39na.trial-accounts.ondemand.com"


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
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://cors-anywhere.herokuapp.com/https://aosfletgu.trial-accounts.ondemand.com/oauth2/token',
                //'https://cors-anywhere.herokuapp.com/https://aey0y39na.trial-accounts.ondemand.com/oauth2/token',
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            const response = await axios(config);
            console.log(response);
            console.log("response");



            //if (response.statusText == "OK") {
            if (response) {
                //console.log("okkkk");
                //localStorage.setItem('token', response.data.access_token); /// Step 1
                console.log(response.data.id_token);
                localStorage.setItem('token', response.data.id_token); /// Step 1

                setUserData();//// here call setUserData function 
                goToHome();
            }
            else {
                setErrorMsg(response.data);
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

            {/* <div className={`${style.size} `}>


                <div className='d-flex justify-content-center align-items-center my-5  '>
                    <div className={`w-50  p-5  bg-light overflow-auto ${style.form}`}>
                        <h1 className='my-4 text-center text-dark'>Login </h1>
                        {errorMsg ? <div className="alert alert-danger p-2">{errorMsg}</div> : ''}
                        {errorList.map((error, index) => <div className="alert alert-danger p-2">{error.message}</div>)}
                        <form onSubmit={submitFormData}>
                            <div className="input-gp my-3">
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                <input onChange={getFormValue} type='email' className="form-control my-2" name='email' placeholder='email' />
                            </div>
                            <div className="input-gp my-3">
                                <label className="form-label" htmlFor="form3Example4">Password</label>

                                <input onChange={getFormValue} type='password' className='form-control my-2' name='password' placeholder='password' />
                            </div>
                            <div className='d-flex justify-content-center my-3'>
                                <button className={style.loginButton} type='submit'>
                                    {loading ? <i className='fa fa-spinner fa-spin'></i> : 'Login'}
                                </button>
                            </div>

                            <div className='clearfix'></div>
                        </form>

                    </div>

                </div>
                <div className='clearfix'></div>

            </div> */}

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
