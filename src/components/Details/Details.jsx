
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
    async function getUnit() {
        let { data } = await axios.get(`https://recipe.c-910f80f.kyma.ondemand.com/units/${unitNumber}`);
        console.log(data.layoutImage);
        setUnit(data);
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