
import React, { useState, useEffect } from 'react'
import style from './AvailableUnits.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function AvailableUnits() {
    // new URL
    const BasicURL=' https://newtrial.c-78984ef.kyma.ondemand.com'
   // const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
    let [unit, setUnit] = useState([]);
    const token = localStorage.getItem('token')
    let [errorMsg, setErrorMsg] = useState('');
    const [addMsg, setAddMsg] = useState('');
    const [updateMsg, setUpdateMsg] = useState('');
    const [deleteMsg, setDeleteMsg] = useState('');
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    //   // for predefined lists ::
    const [companyCodes, setCompanyCodes] = useState([]);
    const [projectCodes, setProjectCodes] = useState([]);
    const [usageTypeCodes, setUsageTypeCodes] = useState([]);
    const [viewCodes, setViewCodes] = useState([]);
    const [statusCodes, setStatusCodes] = useState([]);
    const [floorCodes, setFloorCodes] = useState([]);
    // will be added when add its entities
    const [buildingCodes, setBuildingCodes] = useState([]);
    const [fixtureCodes, setFixtureCodes] = useState([]);
    const [orientationCodes, setOrientationCodes] = useState([]);

    async function getCompanyCodes() {
        try {
            let { data } = await axios.get(`${BasicURL}/companymd`, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(data);
            console.log("CompanyCodes");
            setCompanyCodes(data);
            console.log("compannny");
            console.log(companyCodes)
        } catch (error) {
            console.error(error);
        }
    }
    async function getProject() {
        try {
            let { data } = await axios.get(`${BasicURL}/projects`, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(data);
            console.log("project");
            setProjectCodes(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function getUnitUsage() {
        try {
            let { data } = await axios.get(`${BasicURL}/unitusage`, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(data);
            console.log("UnitUsage");
            setUsageTypeCodes(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function getUnitView() {
        try {
            let { data } = await axios.get(`${BasicURL}/unitview`, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(data);
            console.log("UnitView");
            setViewCodes(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function getUnitStatus() {
        try {
            let { data } = await axios.get(`${BasicURL}/unitstatus`, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(data);
            console.log("UnitStatus");
            setStatusCodes(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function getUnitFloor() {
        try {
            let { data } = await axios.get(`${BasicURL}/unitfloor`, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(data);
            console.log("UnitFloor");
            setFloorCodes(data);
        } catch (error) {
            console.error(error);
        }
    }

    // to handle modal for add
    const [addShow, setaddShow] = useState(false);
    const handleAddClose = () => {
        setAddMsg('');
        setaddShow(false);
    }
    const handleAddShow = () => {
        getCompanyCodes();
        getProject();
        getUnitUsage()
        getUnitView()
        getUnitStatus()
        getUnitFloor()
        setaddShow(true);
    }
    // handle modal for edit
    const [editshow, seteditShow] = useState(false);
    const handleEditClose = () => {
        setUpdateMsg('');
        setSelectedUnit(null);
        seteditShow(false);
    };
    const handleEditShow = () => {
        getCompanyCodes();
        getProject();
        getUnitUsage()
        getUnitView()
        getUnitStatus()
        getUnitFloor()
        seteditShow(true);
    }
    const handleEdit = (unit) => {
        setSelectedUnit(unit);
        handleEditShow();
    };
    // new added:: 
    const [addError, setAddError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [editFormValid, setEditFormValid] = useState(false);
    const [updateError, setUpdateError] = useState('');

    function validateForm(project) { // will be changed when i know final fields of Unit Entity
        // Check if all required fields are filled
        if (
            // will be changed
            project.projectID &&
            project.companyCodeID &&
            project.companyCodeDescription &&
            project.projectDescription &&
            project.validFrom &&
            project.regionalLocation
        ) {
            return true;
        }
        return false;
    }


    let [newUnit, setNewUnit] = useState({
        unitKey: '',
        projectCodeID: Number,
        companyCodeID: Number,
        buildingCodeID: Number,
        // sapUnitID: Number,// will remove it after i get new API Link
        oldNumber: Number,
        description: '',
        unitType: '',  // dropdown list
        usageTypeDescription: '', // dropdown list
        unitStatus: '', // dropdown list
        view: '', // dropdown list
        floor: Number, // dropdown list
        toFloor: Number,
        blockingReason: '',
        constructionDate: Date,
        blockingDate: Date,
        // will add in section dates deliveryDate:Date,
        fixture: '', // dropdown list
        salesPhase: '',
        destination: '', // will be removed
        orientation: '', // dropdown list
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
        // new:;
        // Check form validity
        const isValid = validateForm(myUnit);
        setFormValid(isValid);
    }
    // call add Unit API
    async function submitFormData(e) {
        e.preventDefault();
        // will add try, catch
        // Check form validity before adding
        if (!formValid) {
            return
        }
        const options = {
            method: 'POST',
            url: `${BasicURL}/units`,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                unitKey: newUnit.unitKey,
                // sapUnitID: Number(newUnit.sapUnitID),
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
        else {
            console.log("error");
            setErrorMsg(response);
        }
    }
    // call get Unit API
    async function getUnit() {
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
            // Check form validity before updating
            if (!editFormValid) {
                return
            }
            const options = {
                method: 'PUT',
                url: `${BasicURL}/units/${updatedUnit.unit_code}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },

                // will change to unit data
                data: {
                    unit_code: updatedUnit.unit_code,
                    unitKey: updatedUnit.unitKey,
                    // sapUnitID: Number(updatedUnit.sapUnitID),
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
    // add this useEffect 
    useEffect(() => {
        if (selectedUnit) {
            const isValid = validateForm(selectedUnit);
            setEditFormValid(isValid);
        }

    }, [selectedUnit]);
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
                {/* {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''} */}
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
                                                <button className={style.iconButton} onClick={() => handleDelete(item.unit_code)} title="Delete">
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

                    {errorMsg ? <div className="alert alert-danger p-2">{errorMsg}</div> : ''}
                    <Modal.Body>
                        <form onSubmit={submitFormData}>
                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Company:</h2>
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company:<span className={`${style.span}`}>*</span></label>
                                {/* dropdown list companyCode */}
                                <select

                                    name="companyCodeID"
                                    className="form-control"
                                    onChange={getFormValue}
                                >
                                    <option value="">Select Company Code and Description</option>
                                    {companyCodes.map((code) => (
                                        <option key={code.company_code} value={code.company_code}>
                                            {code.companyCodeID} - {code.companyCodeDescription}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Project:</h2>
                                {/* dropdown list project code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Project:</label>
                                <select
                                    name="projectCodeID"
                                    className="form-control"
                                    onChange={getFormValue}
                                >
                                    <option value="">Select Project </option>
                                    {projectCodes.map((code) => (
                                        <option key={code.project_code} value={code.project_code}>
                                            {code.projectID} - {code.projectDescription}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Building</h2>
                                {/* dropdown list building code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Building:</label>
                                <select
                                    name="buildingCodeID"
                                    className="form-control"
                                    onChange={getFormValue}
                                >
                                    <option value="">Select Building</option>
                                    {buildingCodes.map((code) => (
                                        <option key={code.building_code} value={code.building_code}>
                                            {code.buildingID} - {code.buildingDescription}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Unit Details:</h2>

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Unit Key: </label>
                                <input required maxLength={8} type="Text" name='unitKey' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" />


                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Old Number: </label>
                                <input type="number" name='oldNumber' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter OldNumber" />


                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Description: </label>
                                <input required type="text" name='description' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit Description" />

                                {/* dropdown list unit usage type code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Unit Usage Type:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    onChange={getFormValue}
                                >
                                    <option value="">Select Usage Type</option>
                                    {usageTypeCodes.map((code) => (
                                        <option key={code.unitUsage_code} value={code.unitUsage_code}>
                                            {code.unitUsageID} - {code.unitUsageID}
                                        </option>
                                    ))}
                                </select>
                                {/* dropdown list unit status code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Unit Status:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    onChange={getFormValue}
                                >
                                    <option value="">Select Unit Status</option>
                                    {statusCodes.map((code) => (
                                        <option key={code.unitStatus_code} value={code.unitStatus_code}>
                                            {code.unitStatusID} - {code.unitStatusID}
                                        </option>
                                    ))}
                                </select>

                                {/* dropdown list unit view code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Unit View:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    onChange={getFormValue}
                                >
                                    <option value="">Select Unit View</option>
                                    {viewCodes.map((code) => (
                                        <option key={code.unitView_code} value={code.unitView_code}>
                                            {code.unitViewID} - {code.view}
                                        </option>
                                    ))}
                                </select>

                                {/* dropdown list unit floor code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Unit Floor:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    onChange={getFormValue}
                                >
                                    <option value="">Select Unit Floor</option>
                                    {floorCodes.map((code) => (
                                        <option key={code.unitFloor_code} value={code.unitFloor_code}>
                                            {code.unitFloorID} -  {code.floor}
                                        </option>
                                    ))}
                                </select>

                                {/* will change to make it floor , toFloor ( From--- to) */}
                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >To Floor: </label>
                                <input type="number" name='toFloor' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter ToFloor" />

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Sales Phase: </label>
                                <input type="text" name='salesPhase' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter SalesPhase" />

                                {/* dropdown list unit fixture code/desc */}
                                {/* <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company Code:</label>
                                            <select
                                                name="companyCodeID"
                                                className="form-control"
                                                onChange={getFormValue}
                                            >
                                                <option value="">Select Company Code</option>
                                                {companyCodes.map((code) => (
                                                    <option key={code.id} value={code.id}>
                                                        {code.description}
                                                    </option>
                                                ))}
                                            </select> */}

                                {/* dropdown list unit orientation code/desc */}
                                {/* <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company Code:</label>
                                            <select
                                                name="companyCodeID"
                                                className="form-control"
                                                onChange={getFormValue}
                                            >
                                                <option value="">Select Company Code</option>
                                                {companyCodes.map((code) => (
                                                    <option key={code.id} value={code.id}>
                                                        {code.description}
                                                    </option>
                                                ))}
                                            </select> */}

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Blocking Reason: </label>
                                <input type="text" name='blockingReason' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  BlockingReason" />
                            </div>


                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Unit Dates:</h2>

                                <label htmlFor="exampleInputDate1" className={`${style.lable}`} >Construction Date : </label>
                                <input type="date" name='constructionDate' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  ConstructionDate" />


                                <label htmlFor="exampleInputDate1" className={`${style.lable}`} >Blocking Date : </label>
                                <input type="date" name='blockingDate' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  BlockingDate" />

                                {/* will be added in newUnit above */}
                                <label htmlFor="exampleInputDate1" className={`${style.lable}`} >Delivery Date : </label>
                                <input type="date" name='deliveryDate' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter  DeliveryDate" />


                            </div>

                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Unit Areas:</h2>

                            </div>

                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Unit Prices:</h2>

                            </div>

                            {/* Old Fields Of Unit Area and Price */}
                            <div className={`form-group  ${style.formGroup}`}>
                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Built UP Area: </label>
                                <input type="text" name='builtUpArea' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter BuiltUpArea" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Garden Area: </label>
                                <input type="text" name='gardenArea' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter GardenArea" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Number of Rooms: </label>
                                <input type="number" name='numberOfRooms' min="0" className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter NumberOfRooms " />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Measurement Value: </label>
                                <input type="number" name='measurementValue' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter MeasurementValue" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Measurements: </label>
                                <input type="number" name='measurements' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Measurements" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Measurements ID: </label>
                                <input type="number" name='measurementsID' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter MeasurementsID" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Measurements Description: </label>
                                <input type="number" name='measurementsDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter MeasurementsDescription" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Measurement Unit: </label>
                                <input type="text" name='unitOfMeasurement' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter MeasurementUnit" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Pricing Tab: </label>
                                <input type="number" name='pricingTab' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter PricingTab" />
                            </div>


                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Price: </label>
                                <input type="number" name='price' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Price" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Unit Additional Payment: </label>
                                <input type="number" name='unitAdditionalPayment' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter UnitAdditionalPayment" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Condition Code: </label>
                                <input type="text" name='conditionCode' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ConditionCode" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Condition Description: </label>
                                <input type="text" name='conditionDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ConditionDescription" />
                            </div>
                            <div className={`form-group  ${style.formGroup}`}>

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Amount: </label>
                                <input type="number" name='amount' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter Amount" />
                            </div>

                            <button type="submit" className={` w-100 ${style.imageButton}`} >Add Unit</button>
                            {/* disabled={!formValid} will be added after ensuring final fields */}
                        </form>

                        {addMsg ? <div className="alert alert-danger m-3 p-2">{addMsg}</div> : ''}
                    </Modal.Body>

                    {/* new */}
                    {/* {addError && <div className="alert alert-danger m-3 p-2">{addError}</div>} */}

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
                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Company:</h2>
                                {/* dropdown list company code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company Code:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    // will change 
                                    value={selectedUnit.unitKey}
                                    onChange={(e) =>
                                        setSelectedUnit({
                                            ...selectedUnit,
                                            unitKey: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Company Code and Description</option>
                                    {companyCodes.map((code) => (
                                        <option key={code.company_code} value={code.company_code}>
                                            {code.companyCodeID} - {code.companyCodeDescription}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Project:</h2>
                                {/* dropdown list project code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Project:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    // will change 
                                    value={selectedUnit.unitKey}
                                    onChange={(e) =>
                                        setSelectedUnit({
                                            ...selectedUnit,
                                            unitKey: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Project </option>
                                    {projectCodes.map((code) => (
                                        <option key={code.project_code} value={code.project_code}>
                                            {code.projectID} - {code.projectDescription}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Building:</h2>
                                {/* dropdown list building code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Building:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    value={selectedUnit.unitKey}
                                    onChange={(e) =>
                                        setSelectedUnit({
                                            ...selectedUnit,
                                            unitKey: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Building</option>
                                    {buildingCodes.map((code) => (
                                        <option key={code.building_code} value={code.building_code}>
                                            {code.buildingID} - {code.buildingDescription}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Unit Details:</h2>

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Unit Key: </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={8}
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

                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Old Number: </label>
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

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Description: </label>
                                <input
                                    type="text"
                                    required
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

                                {/* dropdown list unit usage type code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Unit Usage Type:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    value={selectedUnit.unitType}
                                    onChange={(e) =>
                                        setSelectedUnit({
                                            ...selectedUnit,
                                            unitType: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Usage Type</option>
                                    {usageTypeCodes.map((code) => (
                                        <option key={code.unitUsage_code} value={code.unitUsage_code}>
                                            {code.unitUsageID} - {code.unitUsageID}
                                        </option>
                                    ))}
                                </select>

                                {/* dropdown list unit status code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Unit Status:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    value={selectedUnit.unitStatus}
                                    onChange={(e) =>
                                        setSelectedUnit({
                                            ...selectedUnit,
                                            unitStatus: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Unit Status</option>
                                    {statusCodes.map((code) => (
                                        <option key={code.unitStatus_code} value={code.unitStatus_code}>
                                            {code.unitStatusID} - {code.unitStatusID}
                                        </option>
                                    ))}
                                </select>

                                {/* dropdown list unit view code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Unit View:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    value={selectedUnit.view}
                                    onChange={(e) =>
                                        setSelectedUnit({
                                            ...selectedUnit,
                                            view: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Unit View</option>
                                    {viewCodes.map((code) => (
                                        <option key={code.unitView_code} value={code.unitView_code}>
                                            {code.unitViewID} - {code.view}
                                        </option>
                                    ))}
                                </select>

                                {/* dropdown list unit floor code/desc */}
                                <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Unit Floor:</label>
                                <select
                                    name="companyCodeID"
                                    className="form-control"
                                    value={selectedUnit.floor}
                                    onChange={(e) =>
                                        setSelectedUnit({
                                            ...selectedUnit,
                                            floor: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Unit Floor</option>
                                    {floorCodes.map((code) => (
                                        <option key={code.unitFloor_code} value={code.unitFloor_code}>
                                            {code.unitFloorID} -  {code.floor}
                                        </option>
                                    ))}
                                </select>

                                {/* will change to make it floor , toFloor ( From--- to) */}
                                <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >To Floor: </label>
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

                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Sales Phase: </label>
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
                                {/* dropdown list unit fixture code/desc */}
                                {/* <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company Code:</label>
                                            <select
                                                name="companyCodeID"
                                                className="form-control"
                                                 value={selectedUnit.fixture}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        fixture: e.target.value,
                                    })
                                }
                                            >
                                                <option value="">Select Company Code</option>
                                                {companyCodes.map((code) => (
                                                    <option key={code.id} value={code.id}>
                                                        {code.description}
                                                    </option>
                                                ))}
                                            </select> */}

                                {/* dropdown list unit orientation code/desc */}
                                {/* <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company Code:</label>
                                            <select
                                                name="companyCodeID"
                                                className="form-control"
                                                value={selectedUnit.orientation}
                                onChange={(e) =>
                                    setSelectedUnit({
                                        ...selectedUnit,
                                        orientation: e.target.value,
                                    })
                                }
                                            >
                                                <option value="">Select Company Code</option>
                                                {companyCodes.map((code) => (
                                                    <option key={code.id} value={code.id}>
                                                        {code.description}
                                                    </option>
                                                ))}
                                            </select> */}
                                <label htmlFor="exampleInputText1" className={`${style.lable}`} >Blocking Reason: </label>
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
                            </div>

                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Unit Dates</h2>
                                <label htmlFor="exampleInputDate1" className={`${style.label}`} >Construction Date : </label>
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
                                <label htmlFor="exampleInputDate1" className={`${style.label}`} >Blocking Date : </label>
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
                                <label htmlFor="exampleInputDate1" className={`${style.label}`} >Delivery Date : </label>
                                <input
                                    type="date"
                                    name="deliveryDate"
                                    className="form-control m-3"
                                    value={selectedUnit.deliveryDate}
                                    onChange={(e) =>
                                        setSelectedUnit({
                                            ...selectedUnit,
                                            deliveryDate: e.target.value,
                                        })
                                    }
                                    placeholder="Enter deliveryDate"
                                />
                            </div>

                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Unit Areas:</h2>
                            </div>

                            <div className={`form-group ${style.formGroup}`}>
                                <h2>Unit Prices:</h2>
                            </div>

                            {/* Old Fields Of Unit Area and Price */}
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
                                min="0"
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
                        <Button className={` ${style.imageButton}`} onClick={handleEditClose}>
                            Close
                        </Button>
                        {/* 
                        <button type="submit" className={`btn mt-4 w-100 ${style.imageButton}`}>Add Unit</button> */}
                        <Button className={` ${style.imageButton}`}  onClick={() => handleUpdate(selectedUnit)}>
                        {/* disabled={!editFormValid}  will be added after ensuring final fields */}
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}