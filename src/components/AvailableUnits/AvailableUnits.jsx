
import React, { useState, useEffect } from 'react'
import style from './AvailableUnits.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import Details from '../Details/Details';

export default function AvailableUnits() {

    const token = localStorage.getItem('token')

    let [unit, setUnit] = useState([]);

    async function getUnit() {
        // worked authenticated API
        //let { data } = await axios.get("https://newrecipe.c-910f80f.kyma.ondemand.com/units",{ headers: {"Authorization" : `Bearer ${token}`} });

        let { data } = await axios.get("https://bcbf775e-2518-44b8-a2eb-3ff6c0f1b2b1.mock.pstmn.io/unit");

        console.log(data);
        setUnit(data);
        console.log(unit);
        //console.log(token);

    }
    useEffect(() => {
        getUnit();
    }, []);

    // Use the useNavigate hook to programmatically navigate to the Details component
    const navigate = useNavigate();

    // let handleImageClick = (unit) => {
    //     navigate({
    //         pathname: `/unit/${unit.unitNumber}/details`,
    //         state: { unit }
    //     });
    // };

    // Define a function to handle the click event on the image
    const handleImageClick = (unitNumber) => {
        // Navigate to the Details component with the unitNumber as a URL parameter
        navigate(`/unit/${unitNumber}/details`);
    };

    return (
        <>


            <div className={`container`}>
                <div className={``}>
                    <h1 className={`${style.maincolor}`}>Units</h1>
                    <div className='table-responsive'>
                        <table className={`table table-striped table-hover table-head text-center`}>
                            <tbody>
                                <tr className={``}>
                                    <th>Number</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Floor</th>
                                    <th>View</th>
                                    <th>Blocking-Reason</th>
                                    <th>Blocking-Date</th>
                                    <th>Fixture</th>
                                    <th>Measurements</th>
                                    <th>Measurement-Unit</th>
                                    <th>measurementValue</th>
                                    <th>measurementsID</th>
                                    <th>measurementDescription</th>

                                    <th>Sales</th>

                                    <th>ConstructionDate</th>
                                    <th>Destination</th>
                                    <th>Orientation</th>
                                    <th>builtUpArea</th>
                                    <th>gardenArea</th>
                                    <th>NumberRooms</th>
                                    
                                    <th>PriceTab</th>
                                    <th>PricePlan</th>
                                    <th>Price</th>
                                    <th>additionalPayment</th>
                                    <th>conditionCode</th>
                                    <th>conditionDescription</th>
                                    
                                    <th>Amount</th>
                                    <th>Image</th>
                                </tr>
                            </tbody>
                            <tbody >
                                {unit.length > 0 ? (
                                    
                                        unit.map((item, id) => (

                                            <tr key={id}>
                                                <td>{item.unitNumber}</td>
                                                <td>{item.description}</td>
                                                <td>{item.status}</td>
                                                <td>{item.floor}</td>
                                                <td>{item.view}</td>
                                                <td>{item.blockingReason}</td>
                                                <td>{item.blockingDate}</td>
                                                <td>{item.fixture}</td>
                                                <td>{item.measurements}</td>
                                                <td>{item.unitOfMeasurement}</td>

                                                <td>{item.measurementValue}</td>
                                                <td>{item.measurementsID}</td>
                                                <td>{item.measurementsDescription}</td>

                                                <td>{item.sales}</td>

                                                <td>{item.constructionDate}</td>
                                                <td>{item.destination}</td>
                                                <td>{item.orientation}</td>
                                                <td>{item.builtUpArea}</td>
                                                <td>{item.gardenArea}</td>
                                                <td>{item.numberOfRooms}</td>
                                                <td>{item.pricingTab}</td>
                                                <td>{item.pricePlan}</td>
                                                <td>{item.price}</td>
                                                <td>{item.unitAdditionalPayment}</td>
                                                <td>{item.conditionCode}</td>
                                                <td>{item.conditionDescription}</td>
                                                <td>{item.Amount}</td>




                                                <td>
                                                    <button
                                                        className={style.imageButton}
                                                        onClick={() => handleImageClick(item.unitNumber)}
                                                    >
                                                        Check Unit Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                    : (
                                        <tr>
                                            <td colSpan="15">Loading...</td>
                                        </tr>
                                    )}
                            </tbody>

                          
                        </table>
                    </div>
                </div>
            </div>


            {/* <h2>Search By</h2>
            <div className="input-gp mb-3">
                <label htmlFor='value'>Unit View:</label>
                <input type='text' className='form-control my-2' name='value' placeholder='value...' />
            </div>


            <table class="table table-striped">
                <thead >  
                    <tr className={` ${style.headtable} `}>
                        <th scope="col">Unit</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">View</th>
                        <th scope="col">Floor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>1</td>
                        <td>10000 $</td>
                        <td>unit 1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                        <td>2</td>
                        <td>10000 $</td>
                        <td>unit 2</td>
                        <td>2</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                        <td>3</td>
                        <td>10000 $</td>
                        <td>unit 3</td>
                        <td>3</td>
                    </tr>
                 
                </tbody>
            </table> */}

        </>
    )
}