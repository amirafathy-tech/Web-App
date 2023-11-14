

import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import style from './RegisterForm.module.css';
import { Link, useNavigate } from 'react-router-dom'
//import { encode } from 'base-64';

export default function Register() {
    let [user, setUser] = useState({
        value: '',
        familyName: '',
        givenName: '',
        userName: '',
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
            value: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
            familyName: Joi.string().required(),
            givenName: Joi.string().required(),
            userName: Joi.string().required(),

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

            // curl command
               let data = {
                //'grant_type': 'password',
                'value': user.value,
                'familyName': user.familyName,
                'givenName': user.givenName,
                'userName': user.userName


            };
            // const auth = "Basic " + encode(clientid + ':' + clientSecret);
            let config = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: 'https://demooo.c-78984ef.kyma.ondemand.com/iasUsers',
                headers: {
                   // 'Authorization': auth,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios(config);
            console.log(response);
            console.log("response");

            //if (response.statusText == "OK") {
            if (response) {
                 console.log("okkkk here");
                //localStorage.setItem('token', response.data.access_token); /// Step 1
                console.log(response.data)
                // localStorage.setItem('token', response.data.id_token); /// Step 1
                //setUserData();//// here call setUserData function 
                goToHome();
            }
            else {
                setErrorMsg(response.data);
            }
            setLoading(false);
        }

    }


    function getFormValue(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value
        setUser(myUser);// update user data
        console.log(myUser)
    }
return (
        <>
            <div className={`${style.size} `}>
                <div className='d-flex justify-content-center align-items-center my-5  '>
                    <div className={`w-50  p-5  bg-light overflow-auto ${style.form}`}>
                        <h1 className='my-4 text-center text-dark'>Register </h1>
                        {errorMsg ? <div className="alert alert-danger p-2">{errorMsg}</div> : ''}
                        {errorList.map((error, index) => <div className="alert alert-danger p-2">{error.message}</div>)}
                        <form onSubmit={submitFormData}>
                            <div className="input-gp my-3">
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                <input onChange={getFormValue} type='email' className="form-control my-2" name='value' placeholder='email' />
                            </div>
                            <div className="input-gp my-3">
                                <label className="form-label" htmlFor="form3Example4">Family Name</label>

                                <input onChange={getFormValue} type='text' className='form-control my-2' name='familyName' placeholder='Family Name' />
                            </div>
                            <div className="input-gp my-3">
                                <label className="form-label" htmlFor="form3Example4">Given Name</label>

                                <input onChange={getFormValue} type='text' className='form-control my-2' name='givenName' placeholder='Given Name' />
                            </div>
                            <div className="input-gp my-3">
                                <label className="form-label" htmlFor="form3Example4">User Name</label>

                                <input onChange={getFormValue} type='text' className='form-control my-2' name='userName' placeholder='User Name' />
                            </div>
                            <div className='d-flex justify-content-center my-3'>
                                <button className={`${style.loginButton} w-100`} type='submit'>
                                    {loading ? 
                                     <p>Loading...</p>
                                    : 'Register'}
                                </button>
                            </div>

                            <div className='clearfix'></div>
                        </form>

                    </div>

                </div>
                <div className='clearfix'></div>

            </div>
        </>

    )
}
