
import React, { useState, useEffect } from 'react'
import style from './AvailableUnits.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
//import { Delete, Edit } from '@mui/icons-material';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
//import Details from '../Details/Details';

export default function AvailableUnits() {

    const token = localStorage.getItem('token')

    let [unit, setUnit] = useState([]);

    let [newUnit, setNewUnit] = useState({
        unitKey: 0,
        sapUnitID: 0,
        oldNumber: 0,
        description: '',
        unitType: '',
        usageTypeDescription: '',
        unitStatus: '',
        view: '',
        floor: 0,
        toFloor: 0,
        blockingReason: '',
        blockingDate: Date,
        fixture: '',
        salesPhase: '',
        constructionDate: Date,
        destination: '',
        orientation: '',
        builtUpArea: '',
        gardenArea: '',
        numberOfRooms: 0,
        measurementValue: 0,
        measurements: 0,
        measurementsID: 0,
        measurementsDescription: '',
        unitOfMeasurement: '',
        pricingTab: 0,
        pricePlan: '',
        price: 0,
        unitAdditionalPayment: 0,
        conditionCode: '',
        conditionDescription: '',
        amount: 0
    })


    async function getUnit() {
        // worked authenticated API
           // let { data } = await axios.get("https://newrecipe.c-910f80f.kyma.ondemand.com/units",{ headers: {"Authorization" : `Bearer ${token}`} });
        //worked mock API
           // let { data } = await axios.get("https://bcbf775e-2518-44b8-a2eb-3ff6c0f1b2b1.mock.pstmn.io/unit");

       // demo authentication 

       let { data } = await axios.get("https://demo.c-910f80f.kyma.ondemand.com/units",{ headers: {"Authorization" : `Bearer ${token}`} });

        console.log(data);
        setUnit(data);
        console.log(unit);
        //console.log(token);

    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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


    const handleDelete = () => {

        console.log("call api delete");
    };
    const handleEdit = () => {

        console.log("call api edit");
    };





    return (
        <>


            <div className={` container m-5`}>
                <div className={`row`}>
                  


                    {/* <div class="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search Unit" aria-label="Search" />

                            </form>
                        </div>
                    </div> */}


                    <div className={`col-sm-3 offset-sm-2 mt-5 mb-4 text-gred ${style.maincolor}`}><h2><b>Unit Details</b></h2></div>


                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <button className={`w-100 ${style.imageButton}`} variant="primary" onClick={handleShow}>
                            Add New Unit
                        </button>
                    </div>

                </div>
            {/* </div>  */}
            <div className={`row`}>
                    <div className='table-responsive m-auto'>
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

                                    {/* <th>ConstructionDate</th>
                                    <th>Destination</th>
                                    <th>Orientation</th>
                                    <th>builtUpArea</th>
                                    <th>gardenArea</th>
                                    <th>NumberRooms</th> */}

                                    {/* <th>PriceTab</th>
                                    <th>PricePlan</th>
                                    <th>Price</th>
                                    <th>additionalPayment</th>
                                    <th>conditionCode</th>
                                    <th>conditionDescription</th> */}

                                    <th>Amount</th>
                                    <th>Image</th>
                                    <th>Actions</th>
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

                                            <td>{item.salesPhase}</td> 

                                            {/* <td>{item.sales}</td> */}

                                            {/* <td>{item.constructionDate}</td>
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
                                            <td>{item.conditionDescription}</td> */}

                                            {/* <td>{item.Amount}</td> */}

                                            <td>{item.amount}</td>

                                            <td>
                                                <button
                                                    className={style.imageButton}
                                                    onClick={() => handleImageClick(item.unitNumber)}
                                                >
                                                    Check Unit Details
                                                </button>
                                            </td>



                                            <td>
                                               {/* <div className='w-50 h-50'> */}
                                                <button className={style.iconButton} onClick={handleDelete} title="Delete">
                                                    <RiDeleteBinLine style={{ color: 'red' }} />
                                                </button>
                                                {/* </div> */}
                                                {/* <div className='w-50 h-50'> */}
                                                <button className={style.iconButton} onClick={handleEdit}  title="Edit">
                                                    <RiEditLine style={{ color: '#10ab80' }} />
                                                </button>
                                                {/* </div> */}
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
                {/* </div> */}
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



            {/* <!--- Model Box ---> */}
            <div className="model_box" style={{ width: 100 }}>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Unit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='unitKey' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter UnitKey" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='sapUnitID' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter SAPUnitID" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='oldNumber' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter OldNumber" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='description' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit Description" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='unitType' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit Type" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='usageTypeDescription' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter UsageTypeDescription" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='unitStatus' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit Status" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='view' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  View" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='floor' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Floor" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='toFloor' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter ToFloor" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='blockingReason' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  BlockingReason" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="datetime-local" name='blockingDate' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  BlockingDate" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='fixture' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Fixture" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='salesPhase' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter SalesPhase" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="datetime-local" name='constructionDate' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  ConstructionDate" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='destination' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Destination" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='orientation' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Orientation" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='builtUpArea' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter BuiltUpArea" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='gardenArea' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter GardenArea" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='numberOfRooms' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter NumberOfRooms " />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='measurementValue' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter MeasurementValue" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='measurements' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Measurements" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='measurementsID' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter MeasurementsID" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='measurementsDescription' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter MeasurementsDescription" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='unitOfMeasurement' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter MeasurementUnit" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='pricingTab' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter PricingTab" />
                            </div>


                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='price' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Price" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='unitAdditionalPayment' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter UnitAdditionalPayment" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='conditionCode' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ConditionCode" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='conditionDescription' className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ConditionDescription" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='amount' className="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Amount" />
                            </div>





                            <button type="submit" className="btn btn-success mt-4">Add Unit</button>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>

        </>
    )
}