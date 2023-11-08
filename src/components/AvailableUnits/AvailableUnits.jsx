
import React, { useState, useEffect } from 'react'
import style from './AvailableUnits.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function AvailableUnits() {
    const BasicURL='https://demo.c-78984ef.kyma.ondemand.com'
    let [unit, setUnit] = useState([]);
    const token = localStorage.getItem('token')
    const [addMsg, setAddMsg] = useState('');
    const [updateMsg, setUpdateMsg] = useState('');
    const [deleteMsg, setDeleteMsg] = useState('');
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // to handle modal for add
    const [addShow, setaddShow] = useState(false);
    const handleAddClose = () => setaddShow(false);
    const handleAddShow = () => setaddShow(true);

    // handle modal for edit
    const [editshow, seteditShow] = useState(false);
    const handleEditClose = () => {
        setSelectedUnit(null);
        seteditShow(false);
    };
    const handleEditShow = () => seteditShow(true);
    const handleEdit = (unit) => {
        setSelectedUnit(unit);
        handleEditShow();
    };

    let [newUnit, setNewUnit] = useState({
        unitKey: Number,
        sapUnitID: Number,
        oldNumber: Number,
        description: '',
        unitType: '',
        usageTypeDescription: '',
        unitStatus: '',
        view: '',
        floor: Number,
        toFloor: Number,
        blockingReason: '',
        blockingDate: Date,
        fixture: '',
        salesPhase: '',
        constructionDate: Date,
        destination: '',
        orientation: '',
        builtUpArea: '',
        gardenArea: '',
        numberOfRooms: Number,
        measurementValue: Number,
        measurements: Number,
        measurementsID: Number,
        measurementsDescription: '',
        unitOfMeasurement: '',
        pricingTab: Number,
        pricePlan: '',
        price: Number,
        unitAdditionalPayment: Number,
        conditionCode: '',
        conditionDescription: '',
        amount: Number,
    })

    function getFormValue(e) {
        let myUnit = { ...newUnit }
        myUnit[e.target.name] = e.target.value
        setNewUnit(myUnit);// update unit data
        console.log(myUnit)
    }
    // call add Unit API
    async function submitFormData(e) {
        e.preventDefault();
        const options = {
            method: 'POST',
            url: `${BasicURL}/units`,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                unitKey: Number(newUnit.unitKey),
                sapUnitID: Number(newUnit.sapUnitID),
                oldNumber: Number(newUnit.oldNumber),
                description: newUnit.description,
                unitType: newUnit.unitType,
                usageTypeDescription: newUnit.usageTypeDescription,
                unitStatus: newUnit.unitStatus,
                view: newUnit.view,
                floor: Number(newUnit.floor),
                toFloor: Number(newUnit.toFloor),
                blockingReason: newUnit.blockingReason,
                blockingDate: newUnit.blockingDate,
                fixture: newUnit.fixture,
                salesPhase: newUnit.salesPhase,
                constructionDate: newUnit.constructionDate,
                destination: newUnit.destination,
                orientation: newUnit.orientation,
                builtUpArea: newUnit.builtUpArea,
                gardenArea: newUnit.gardenArea,
                numberOfRooms: Number(newUnit.numberOfRooms),
                measurementValue: Number(newUnit.measurementValue),
                measurements: Number(newUnit.measurements),
                measurementsID: Number(newUnit.measurementsID),
                measurementsDescription: Number(newUnit.measurementsDescription), // number
                unitOfMeasurement: newUnit.unitOfMeasurement,
                pricingTab: Number(newUnit.pricingTab),
                pricePlan: newUnit.pricePlan,
                price: Number(newUnit.price),
                unitAdditionalPayment: Number(newUnit.unitAdditionalPayment),
                conditionCode: newUnit.conditionCode,
                conditionDescription: newUnit.conditionDescription,
                amount: Number(newUnit.amount),
            }
        };

        const response = await axios(options);
        console.log(response);
        if (response.status == 200) {
            console.log("200")
            setAddMsg("Your Unit has been added successfully")
            getUnit()
        }
    }

    // call get Unit API
    async function getUnit() {
        // worked authenticated API
        // let { data } = await axios.get("https://newrecipe.c-910f80f.kyma.ondemand.com/units",{ headers: {"Authorization" : `Bearer ${token}`} });
        //worked mock API
        // let { data } = await axios.get("https://bcbf775e-2518-44b8-a2eb-3ff6c0f1b2b1.mock.pstmn.io/unit");

        // demo authentication with new fields

        let { data } = await axios.get(`${BasicURL}/units`, { headers: { "Authorization": `Bearer ${token}` } });
        console.log(data);
        setUnit(data);
        console.log(unit);
    }


    // call update API
    const handleUpdate = async (updatedUnit) => {
        try {
            const options = {
                method: 'PUT',
                url: `${BasicURL}/units/${updatedUnit.unitKey}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },

                // will change to unit data
                data: {
                    unitKey: Number(updatedUnit.unitKey),
                    sapUnitID: Number(updatedUnit.sapUnitID),
                    oldNumber: Number(updatedUnit.oldNumber),
                    description: updatedUnit.description,
                    unitType: updatedUnit.unitType,
                    usageTypeDescription: updatedUnit.usageTypeDescription,
                    unitStatus: updatedUnit.unitStatus,
                    view: updatedUnit.view,
                    floor: Number(updatedUnit.floor),
                    toFloor: Number(updatedUnit.toFloor),
                    blockingReason: updatedUnit.blockingReason,
                    blockingDate: updatedUnit.blockingDate,
                    fixture: updatedUnit.fixture,
                    salesPhase: updatedUnit.salesPhase,
                    constructionDate: updatedUnit.constructionDate,
                    destination: updatedUnit.destination,
                    orientation: updatedUnit.orientation,
                    builtUpArea: updatedUnit.builtUpArea,
                    gardenArea: updatedUnit.gardenArea,
                    numberOfRooms: Number(updatedUnit.numberOfRooms),
                    measurementValue: Number(updatedUnit.measurementValue),
                    measurements: Number(updatedUnit.measurements),
                    measurementsID: Number(updatedUnit.measurementsID),
                    measurementsDescription: Number(updatedUnit.measurementsDescription), // number
                    unitOfMeasurement: updatedUnit.unitOfMeasurement,
                    pricingTab: Number(updatedUnit.pricingTab),
                    pricePlan: updatedUnit.pricePlan,
                    price: Number(updatedUnit.price),
                    unitAdditionalPayment: Number(updatedUnit.unitAdditionalPayment),
                    conditionCode: updatedUnit.conditionCode,
                    conditionDescription: updatedUnit.conditionDescription,
                    amount: Number(updatedUnit.amount),
                }
            };

            const response = await axios(options);
            console.log(response);

            if (response.status === 200) {
                console.log('200');
                setUpdateMsg('Your Unit has been updated successfully');
                getUnit();
            }
        } catch (error) {
            console.error(error);
        }
    };


    // call delete API
    const handleDelete = async (unitKey) => {
        try {
            const options = {
                method: 'DELETE',
                url: `${BasicURL}/units/${unitKey}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const response = await axios(options);
            console.log(response);

            if (response.status === 200) {
                console.log('200');
                setDeleteMsg('Your Unit has been Deleted successfully');
                getUnit();
            }
        } catch (error) {
            console.error(error);
        }
    };


    // call search API
    async function searchUnits(keyword) {
        try {
            const response = await axios.get(`${BasicURL}/units/search?keyword=${keyword}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log(response)
            setUnit(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (searchTerm) {
            searchUnits(searchTerm);
        } else {
            getUnit();
        }
    }, [searchTerm]);

    // useEffect(() => {
    //     getUnit();
    // }, []);

    const navigate = useNavigate();
    // Define a function to handle the click event on the image
    const handleImageClick = (unitNumber) => {
        // Navigate to the Details component with the unitNumber as a URL parameter
        navigate(`/unit/${unitNumber}/details`);
    };

    return (
        <>
            <div className={` container m-5`}>
                <div className={`row`}>

                    {/* Search Bar */}
                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <input
                            className={`${style.searchInput}`}
                            type="search"
                            placeholder="Search for a unit "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>


                    <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}><h2><b>Unit Details</b></h2></div>


                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <button className={`w-100 ${style.imageButton}`} variant="primary" onClick={handleAddShow}>
                            Add New Unit
                        </button>
                    </div>

                </div>



                {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''}
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
                                    {/* <th>Image</th> */}
                                    <th>Actions</th>
                                </tr>
                            </tbody>
                            <tbody >
                                {unit.length > 0 ? (

                                    unit.map((item, id) => (

                                        <tr key={id}>
                                            <td>{item.unitKey}</td>
                                            <td>{item.description}</td>
                                            <td>{item.unitStatus}</td>
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

                                            {/* <td>
                                                <button
                                                    className={style.imageButton}
                                                    onClick={() => handleImageClick(item.unitNumber)}
                                                >
                                                    Check Unit Details
                                                </button>
                                            </td> */}



                                            <td>
                                                <button className={style.iconButton} onClick={() => handleDelete(item.unitKey)} title="Delete">
                                                    <RiDeleteBinLine style={{ color: 'red' }} />
                                                </button>
                                                <button className={style.iconButton} onClick={() => handleEdit(item)} title="Edit">
                                                    <RiEditLine style={{ color: '#10ab80' }} />
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                )
                                    // : (
                                    //     <tr>
                                    //         <td colSpan="15">Loading...</td>
                                    //     </tr>
                                    // )}

                                    : (<tr>
                                        <td colSpan="12">No results match the search term.</td>
                                    </tr>
                                    )}

                            </tbody>


                        </table>
                    </div>
                </div>

            </div>



            {/* <!--- add Model Box ---> */}
            <div className="model_box" style={{ width: 100 }}>
                <Modal
                    show={addShow}
                    onHide={handleAddClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Unit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={submitFormData}>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='unitKey' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter UnitKey" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='sapUnitID' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter SAPUnitID" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='oldNumber' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter OldNumber" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='description' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit Description" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='unitType' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit Type" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='usageTypeDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter UsageTypeDescription" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='unitStatus' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit Status" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='view' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  View" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='floor' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Floor" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='toFloor' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter ToFloor" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='blockingReason' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  BlockingReason" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputDate1" className={`${style.datelable}`} >Blocking Date : </label>
                                <input type="date" name='blockingDate' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  BlockingDate" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='fixture' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Fixture" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='salesPhase' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter SalesPhase" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputDate1" className={`${style.datelable}`} >Construction Date : </label>
                                <input type="date" name='constructionDate' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  ConstructionDate" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='destination' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Destination" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='orientation' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Orientation" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='builtUpArea' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter BuiltUpArea" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='gardenArea' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter GardenArea" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='numberOfRooms' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter NumberOfRooms " />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='measurementValue' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter MeasurementValue" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='measurements' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Measurements" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='measurementsID' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter MeasurementsID" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='measurementsDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter MeasurementsDescription" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='unitOfMeasurement' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter MeasurementUnit" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='pricingTab' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter PricingTab" />
                            </div>


                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='price' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Price" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='unitAdditionalPayment' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter UnitAdditionalPayment" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='conditionCode' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ConditionCode" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="text" name='conditionDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ConditionDescription" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>
                                <input type="number" name='amount' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Amount" />
                            </div>



                            <button type="submit" className="btn btn-success mt-4">Add Unit</button>
                        </form>

                        {addMsg ? <div className="alert alert-danger m-3 p-2">{addMsg}</div> : ''}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>



            {/* Render the edit modal */}
            {selectedUnit && (
                <Modal show={editshow} onHide={handleEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Unit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <input
                                type="number"
                                name="unitKey"
                                className="form-control m-3"
                                value={selectedUnit.unitKey}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        unitKey: e.target.value,
                                    })
                                }
                                placeholder="Enter UnitKey"
                            />
                            <input
                                type="number"
                                name="sapUnitID"
                                className="form-control m-3"
                                value={selectedUnit.sapUnitID}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        sapUnitID: e.target.value,
                                    })
                                }
                                placeholder="Enter SapUnitID"
                            />
                            <input
                                type="number"
                                name="oldNumber"
                                className="form-control m-3"
                                value={selectedUnit.oldNumber}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        oldNumber: e.target.value,
                                    })
                                }
                                placeholder="Enter oldNumber"
                            />
                            <input
                                type="text"
                                name="description"
                                className="form-control m-3"
                                value={selectedUnit.description}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Enter description"
                            />
                            <input
                                type="text"
                                name="unitType"
                                className="form-control m-3"
                                value={selectedUnit.unitType}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        unitType: e.target.value,
                                    })
                                }
                                placeholder="Enter unitType"
                            />
                            <input
                                type="text"
                                name="usageTypeDescription"
                                className="form-control m-3"
                                value={selectedUnit.usageTypeDescription}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        usageTypeDescription: e.target.value,
                                    })
                                }
                                placeholder="Enter usageTypeDescription"
                            />
                            <input
                                type="text"
                                name="unitStatus"
                                className="form-control m-3"
                                value={selectedUnit.unitStatus}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        unitStatus: e.target.value,
                                    })
                                }
                                placeholder="Enter unitStatus"
                            />
                            <input
                                type="text"
                                name="view"
                                className="form-control m-3"
                                value={selectedUnit.view}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        view: e.target.value,
                                    })
                                }
                                placeholder="Enter view"
                            />
                            <input
                                type="number"
                                name="floor"
                                className="form-control m-3"
                                value={selectedUnit.floor}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        floor: e.target.value,
                                    })
                                }
                                placeholder="Enter floor"
                            />
                            <input
                                type="number"
                                name="toFloor"
                                className="form-control m-3"
                                value={selectedUnit.toFloor}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        toFloor: e.target.value,
                                    })
                                }
                                placeholder="Enter toFloor"
                            />
                            <input
                                type="text"
                                name="blockingReason"
                                className="form-control m-3"
                                value={selectedUnit.blockingReason}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        blockingReason: e.target.value,
                                    })
                                }
                                placeholder="Enter blockingReason"
                            />

                            <label htmlFor="exampleInputDate1" className={`${style.datelable}`} >Blocking Date : </label>
                            <input
                                type="date"
                                name="blockingDate"
                                className="form-control m-3"
                                value={selectedUnit.blockingDate}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        blockingDate: e.target.value,
                                    })
                                }
                                placeholder="Enter blockingDate"
                            />
                            <input
                                type="text"
                                name="fixture"
                                className="form-control m-3"
                                value={selectedUnit.fixture}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        fixture: e.target.value,
                                    })
                                }
                                placeholder="Enter fixture"
                            />
                            <input
                                type="text"
                                name="salesPhase"
                                className="form-control m-3"
                                value={selectedUnit.salesPhase}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        salesPhase: e.target.value,
                                    })
                                }
                                placeholder="Enter salesPhase"
                            />


                            <label htmlFor="exampleInputDate1" className={`${style.datelable}`} >Construction Date : </label>
                            <input
                                type="date"
                                name="constructionDate"
                                className="form-control m-3"
                                value={selectedUnit.constructionDate}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        constructionDate: e.target.value,
                                    })
                                }
                                placeholder="Enter constructionDate"
                            />
                            <input
                                type="text"
                                name="destination"
                                className="form-control m-3"
                                value={selectedUnit.destination}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        destination: e.target.value,
                                    })
                                }
                                placeholder="Enter destination"
                            />
                            <input
                                type="text"
                                name="orientation"
                                className="form-control m-3"
                                value={selectedUnit.orientation}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        orientation: e.target.value,
                                    })
                                }
                                placeholder="Enter orientation"
                            />
                            <input
                                type="text"
                                name="builtUpArea"
                                className="form-control m-3"
                                value={selectedUnit.builtUpArea}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        builtUpArea: e.target.value,
                                    })
                                }
                                placeholder="Enter builtUpArea"
                            />
                            <input
                                type="text"
                                name="gardenArea"
                                className="form-control m-3"
                                value={selectedUnit.gardenArea}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        gardenArea: e.target.value,
                                    })
                                }
                                placeholder="Enter gardenArea"
                            />
                            <input
                                type="number"
                                name="numberOfRooms"
                                className="form-control m-3"
                                value={selectedUnit.numberOfRooms}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        numberOfRooms: e.target.value,
                                    })
                                }
                                placeholder="Enter numberOfRooms"
                            />
                            <input
                                type="number"
                                name="measurementValue"
                                className="form-control m-3"
                                value={selectedUnit.measurementValue}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        measurementValue: e.target.value,
                                    })
                                }
                                placeholder="Enter measurementValue"
                            />
                            <input
                                type="number"
                                name="measurements"
                                className="form-control m-3"
                                value={selectedUnit.measurements}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        measurements: e.target.value,
                                    })
                                }
                                placeholder="Enter measurements"
                            />
                            <input
                                type="number"
                                name="measurementsID"
                                className="form-control m-3"
                                value={selectedUnit.measurementsID}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        measurementsID: e.target.value,
                                    })
                                }
                                placeholder="Enter measurementsID"
                            />
                            <input
                                type="number"
                                name="measurementsDescription"
                                className="form-control m-3"
                                value={selectedUnit.measurementsDescription}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        measurementsDescription: e.target.value,
                                    })
                                }
                                placeholder="Enter measurementsDescription"
                            />
                            <input
                                type="text"
                                name="unitOfMeasurement"
                                className="form-control m-3"
                                value={selectedUnit.unitOfMeasurement}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        unitOfMeasurement: e.target.value,
                                    })
                                }
                                placeholder="Enter unitOfMeasurement"
                            />
                            <input
                                type="number"
                                name="pricingTab"
                                className="form-control m-3"
                                value={selectedUnit.pricingTab}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        pricingTab: e.target.value,
                                    })
                                }
                                placeholder="Enter pricingTab"
                            />
                            <input
                                type="text"
                                name="pricePlan"
                                className="form-control m-3"
                                value={selectedUnit.pricePlan}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        pricePlan: e.target.value,
                                    })
                                }
                                placeholder="Enter pricePlan"
                            />
                            <input
                                type="number"
                                name="price"
                                className="form-control m-3"
                                value={selectedUnit.price}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        price: e.target.value,
                                    })
                                }
                                placeholder="Enter price"
                            />
                            <input
                                type="number"
                                name="unitAdditionalPayment"
                                className="form-control m-3"
                                value={selectedUnit.unitAdditionalPayment}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        unitAdditionalPayment: e.target.value,
                                    })
                                }
                                placeholder="Enter unitAdditionalPayment"
                            />
                            <input
                                type="text"
                                name="conditionCode"
                                className="form-control m-3"
                                value={selectedUnit.conditionCode}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        conditionCode: e.target.value,
                                    })
                                }
                                placeholder="Enter conditionCode"
                            />
                            <input
                                type="text"
                                name="conditionDescription"
                                className="form-control m-3"
                                value={selectedUnit.conditionDescription}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        conditionDescription: e.target.value,
                                    })
                                }
                                placeholder="Enter conditionDescription"
                            />

                            <input
                                type="number"
                                name="amount"
                                className="form-control m-3"
                                value={selectedUnit.amount}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        amount: e.target.value,
                                    })
                                }
                                placeholder="Enter Amount"
                            />

                        </form>

                        {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleUpdate(selectedUnit)}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

        </>
    )
}