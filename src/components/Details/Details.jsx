
import style from './Details.module.css'
import { useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import image from '../../images/compound1.jpg'
export default function Details(/*{ unit }*/) {

    let [Images, setImages] = useState([]);

    // Use the useLocation and useParams hooks to get the unit details from props and URL parameter
    //const location = useLocation();


    let [unit, setUnit] = useState([]);
    const { unitNumber } = useParams();
    console.log(unitNumber);

    const token = localStorage.getItem('token')
    console.log("token" + token);

    async function getUnit() {
        console.log("asyn token" + token);
        //let { data } = await axios.get(`https://newrecipe.c-910f80f.kyma.ondemand.com/units/${unitNumber}`,{ headers: {"Authorization" : `Bearer eyJraWQiOiJEeHF4YURETzBBSWoyb0ExQzBkX1BFVnd4WU0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiNDQ1NjZjMC05MDI5LTQxZmQtOThhNS1iY2MxM2UxODA0NzAiLCJhcHBfdGlkIjoiMGFhMzA3OTYtYWM1MC00N2UxLWI0NjUtZTcyZTQ4YjAxZWZmIiwiaXNzIjoiaHR0cHM6Ly9hZXkweTM5bmEudHJpYWwtYWNjb3VudHMub25kZW1hbmQuY29tIiwiZ3JvdXBzIjoiUmVhZCIsImdpdmVuX25hbWUiOiJIYWdhciIsImF1ZCI6Ijc3Y2U3OWY3LWViMmQtNDIxYy1hYjAzLTc5NDgxMWJiZGJlMyIsInNjaW1faWQiOiJiNDQ1NjZjMC05MDI5LTQxZmQtOThhNS1iY2MxM2UxODA0NzAiLCJ1c2VyX3V1aWQiOiJiNDQ1NjZjMC05MDI5LTQxZmQtOThhNS1iY2MxM2UxODA0NzAiLCJ6b25lX3V1aWQiOiIwYWEzMDc5Ni1hYzUwLTQ3ZTEtYjQ2NS1lNzJlNDhiMDFlZmYiLCJleHAiOjE2OTgzMjc5MjYsImlhdCI6MTY5ODMyNDMyNiwiZmFtaWx5X25hbWUiOiJOYWJpbCIsImp0aSI6ImZhNGNlYWJiLWM4Y2YtNDcwMy1hMTU3LTU4NzlhMjdhMmZlYSIsImVtYWlsIjoiaGFnYXJuYWJpbDdAZ21haWwuY29tIn0.riX6lXgzW9_lJLdkjL7UtotSUoJiYLmDLziD48ONmGmpIk-4Z0yJlfzl3C_e7hnbRHEiiup-DFdc-Ism7CdMQeGg3Rgi1Jhyzhpd8F76jRheNpBBepIdJF8eQa7SBWBYE1bASw3IISUm0GxJrdSuSA7etZCm_cZdfkc9fOjbpJiDKygWr3i6EIG305Y1thbcxElIYGMGfD1qRSwXnG6JSsu6UhmOdtp51KEbZgSDJgSGTsAbEraf3uXTj7ntRN0dD4h7sS1La7-YX1JNxbAKRnHiSoNXjqtzqGVUuLVFLMBVCkqFMqICA3M3uaky-W_LdJt75qHNCQyNkUMhT0Yg4A`} } );
        //console.log(data.layoutImage);
        //let { data } = await axios.get(`https://newrecipe.c-910f80f.kyma.ondemand.com/units/${unitNumber}`,{ headers: {"Authorization" : `Bearer ${token} } })

        // let { data } = await axios.get(`https://newrecipe.c-910f80f.kyma.ondemand.com/units/${unitNumber}`,{ headers: {"Authorization" : `Bearer ${token}`} })
        // .then(res => {
        //     console.log(res);
        //  })

        // const options = {
        //     method: 'GET',
        //     url: `https://newrecipe.c-910f80f.kyma.ondemand.com/units/${unitNumber}`,
        //     headers: {
        //         'Accept': 'application/json',
        //         'Authorization': 'bearer ' + token
        //     }
        // }
        // const response = await axios(options)
        // console.log(response);

        // code snippet
        

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://cors-anywhere.herokuapp.com/https://newrecipe.c-910f80f.kyma.ondemand.com/units/1',
            headers: {
                'Authorization': 'Bearer '+ token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });





        //let { data } = await axios.get(`https://newrecipe.c-910f80f.kyma.ondemand.com/units/${unitNumber}`,{ headers: {"Authorization" : `Bearer ${token} }})
        // setUnit(data);
        console.log(token);
    }
    useEffect(() => {
        getUnit();
    }, []);


    // console.log(location);
    // Access the unit details from props
    //const { state: { unit } } = location;

    // console.log("unittttt"+unit); // Check if unit is null or has the expected value
    // console.log(unitNumber); // Check if unitNumber is extracted correctly from the URL

    return (
        <>
            <div className="container-fluid">

                <h3 className={`my-3 ${style.title} `}>Unit Details</h3>
                <div className="row justify-content-between">
                    <div className='col-md-4 d-flex align-items-center text-white'>
                        <div className={` w-100 ${style.details}`}>

                            <p className={` `}>Unit Number: {unit.unitNumber}</p>
                            <p className='secondcolor'>Description: {unit?.description}</p>
                            <p className='secondcolor'>Status: {unit?.status}</p>
                            <p className='secondcolor'>Floor NO: {unit?.floor}</p>
                            <p className='secondcolor'>Price Amount: {unit.priceAmount}</p>
                            <p className='secondcolor'>Price Currency: {unit.priceCurrency}</p>
                            <p className='secondcolor'>Size: {unit.size}</p>
                            <p className='secondcolor'>Unit of Measurement: {unit.unitOfMeasurement}</p>





                        </div>
                    </div>

                    {/* {Images.map((image, index) => */}

                    {/* <div className="col-md-3 my-2" key={index}>

                            <img className="w-100 mb-2" src={image.src} alt='image' />
                        </div> */}
                    {/* )} */}
                    <div className="col-md-8 ms-auto" >

                        <img className="w-100 mb-2 h-auto rounded-5 img-fluid" src={unit.layoutImage} alt='image' />
                    </div>


                </div>

            </div>
        </>
    )

}