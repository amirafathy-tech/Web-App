
import React, { useState, useEffect } from 'react';
import style from './Building.module.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function Building() {
    // new URL
    const BasicURL = 'https://dev.c-1e53052.kyma.ondemand.com'
    const token = localStorage.getItem('token')
    let [building, setBuilding] = useState([]);
    const [APIError, setAPIError] = useState('');
    const [addMsg, setAddMsg] = useState('');
    const [updateMsg, setUpdateMsg] = useState('');
    const [deleteMsg, setDeleteMsg] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBuilding, setSelectedBuilding] = useState(null);

    //   // for predefined lists ::
    const [Projects, setProjects] = useState([]);
    // call getProjects API
    async function getProject() {
        try {
            let { data } = await axios.get(`${BasicURL}/projects`, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(data);
            console.log("project");
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProject();
    }, []);

    // to handle modal for add
    const [addShow, setaddShow] = useState(false);
    const handleAddShow = () => setaddShow(true);
    const handleAddClose = () => {
        setAddMsg('');
        setaddShow(false);
    }
    // handle modal for edit
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setUpdateMsg('');
        setSelectedBuilding(null);
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const handleEdit = (Building) => {
        setSelectedBuilding(Building);
        handleShow();
    };
    let [newBuilding, setNewBuilding] = useState({
        project_code: 0,
        buildingID: '',
        buildingDescription: '',
        oldNumber: '',
        validFrom: Date,
        numberOfFloors: 0,
        // will add fields for company_code, buildingType_code


    });

    function getFormValue(e) {
        let myBuilding = { ...newBuilding }
        myBuilding[e.target.name] = e.target.value
        setNewBuilding(myBuilding);// update Building data
        console.log(myBuilding)
    }
    // call add API 
    async function submitFormData(e) {
        e.preventDefault();
        try {
            const options = {
                method: 'POST',
                url: `${BasicURL}/buildings`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    project_code: Number(newBuilding.project_code),
                    buildingID: newBuilding.buildingID,
                    buildingDescription: newBuilding.buildingDescription,
                    oldNumber: newBuilding.oldNumber,
                    validFrom: newBuilding.validFrom,
                    numberOfFloors: Number(newBuilding.numberOfFloors)
                }
            };

            const response = await axios(options);
            console.log(response);
            if (response.status == 201) {
                console.log("201")
                setAddMsg("Your Building have been added successfully")
                getBuilding()
            }
        } catch (error) {
            console.error(error);
            setAPIError(error)
        }

    }

    // call update API
    const handleUpdate = async (updatedBuilding) => {
        try {
            const options = {
                method: 'PUT',
                url: `${BasicURL}/buildings/${updatedBuilding.building_code}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: {
                    building_code: updatedBuilding.building_code,
                    project_code: Number(updatedBuilding.project_code),
                    buildingID: updatedBuilding.buildingID,
                    buildingDescription: updatedBuilding.buildingDescription,
                    oldNumber: updatedBuilding.oldNumber,
                    validFrom: updatedBuilding.validFrom,
                    numberOfFloors: Number(updatedBuilding.numberOfFloors)
                },

            };
            console.log("data entered");
            console.log(options.data);
            const response = await axios(options);
            console.log(response);

            if (response.status === 200) {
                console.log('200');
                setUpdateMsg('Your Building has been updated successfully');
                getBuilding();
            }
        } catch (error) {
            console.error(error);
            setAPIError(error)
        }
    };

    // call delete API
    const handleDelete = async (BuildingID) => {
        try {
            const options = {
                method: 'DELETE',
                url: `${BasicURL}/buildings/${BuildingID}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const response = await axios(options);
            console.log(response);

            if (response.status === 200) {
                console.log('200');
                setDeleteMsg('Your Building has been Deleted successfully');
                getBuilding();
            }
        } catch (error) {
            console.error(error);
            setAPIError(error)
        }
    };

    // call get API
    async function getBuilding() {
        try {
            let { data } = await axios.get(`${BasicURL}/buildings`, { headers: { "Authorization": `Bearer ${token}` } });
            setBuilding(data);
        } catch (error) {
            console.error(error);
            setAPIError(error)
        }
    }

    // call search API
    async function searchBuildings(keyword) {
        try {
            const response = await axios.get(`${BasicURL}/buildings/search?keyword=${keyword}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log(response)
            setBuilding(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // useEffect(() => {
    //     getBuilding();
    // }, []);
    useEffect(() => {
        if (searchTerm) {
            searchBuildings(searchTerm);
        } else {
            getBuilding();
        }
    }, [searchTerm]);


    const renderBuilding = building.length > 0 ? (
        building.map((Building) => (
            <tr key={Building.building_code}>
                <td>{Building.project_code}</td>
                <td>{Building.buildingID}</td>
                <td>{Building.buildingDescription}</td>
                <td>{Building.oldNumber}</td>
                <td>{Building.validFrom}</td>
                <td>{Building.numberOfFloors}</td>
                <td>
                    <button className={style.iconButton} onClick={() => handleDelete(Building.building_code)} title="Delete">
                        <RiDeleteBinLine style={{ color: 'red' }} />
                    </button>
                    <button className={style.iconButton} onClick={() => handleEdit(Building)} title="Edit">
                        <RiEditLine style={{ color: '#10ab80' }} />
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="7">No results match the search term.</td>
        </tr>
    );

    return (
        <>
            <div className={`container`}>
            <div className="row text-white m-3">
          <div className="col-sm">
            <input
              className={`${style.searchInput}`}
              type="search"
              placeholder="Search for a Building "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={`col-sm ${style.maincolor}`}><h2>Building Details</h2></div>
          <div className="col-sm">  <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
            Add New Building
          </button></div>
        </div>

                {/* <div className="row align-items-center justify-content-center">
                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <input
                            className={`${style.searchInput}`}
                            type="search"
                            placeholder="Search for a Building "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
                        <h2>Building Details</h2>
                    </div>

                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
                            Add New Building
                        </button>
                    </div>
                </div> */}

                {/* {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''} */}
                <div className={`row"`}>
                    <div className='table-responsive m-auto'>
                        <table className={`table  table-striped table-hover table-head text-center`}>
                            <thead>
                                <tr className={``}>
                                    <th>Project Code</th>
                                    <th>Building ID</th>
                                    <th>Building Description</th>
                                    {/* <th>Building Type</th> */}
                                    <th>Building OldNumber</th>
                                    <th>Valid From</th>
                                    <th>Number Of Floors</th>
                                    <th>Actions</th>
                                    {/* <th>Units</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {renderBuilding}
                                {/* <td >
                                            <Link className={`${style.maincolor} text-decoration-none`} to={`/building/${item.buildingCode}/units`}>Available Units</Link>
                                        </td> */}

                            </tbody>
                        </table>

                        {/* Render the edit modal */}
                        {selectedBuilding && (
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Building</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>
                                    <div className={`form-group ${style.formGroup}`}>
                                            <h2>Project:</h2>
                                        <label htmlFor="exampleInputText1" className={`${style.lable}`} >Project : </label>
                                        <select
                                            name="project_code"
                                            type="number"
                                            className="form-control"
                                            value={selectedBuilding.project_code}
                                            onChange={(e) =>
                                                setSelectedBuilding({
                                                    ...selectedBuilding,
                                                    project_code: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">Select Project</option>
                                            {Projects.map((record) => (
                                                <option key={record.project_code} value={record.project_code}>
                                                    {record.projectID} - {record.projectDescription}
                                                </option>
                                            ))}
                                        </select>
                                        </div>

                                        <div className={`form-group ${style.formGroup}`}>
                                            <h2>Building Details:</h2>
                                        <label htmlFor="exampleInputText1" className={`${style.lable}`} >Building ID: </label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={8}
                                            name="buildingID"
                                            className="form-control"
                                            value={selectedBuilding.buildingID}
                                            onChange={(e) =>
                                                setSelectedBuilding({
                                                    ...selectedBuilding,
                                                    buildingID: e.target.value,
                                                })
                                            }
                                            placeholder="Enter BuildingID"
                                        />

                                        <label htmlFor="exampleInputText1" className={`${style.lable}`} >Building Description: </label>
                                        <input
                                            type="text"
                                            required
                                            name="buildingDescription"
                                            className="form-control"
                                            value={selectedBuilding.buildingDescription}
                                            onChange={(e) =>
                                                setSelectedBuilding({
                                                    ...selectedBuilding,
                                                    buildingDescription: e.target.value,
                                                })
                                            }
                                            placeholder="Enter BuildingDescription"
                                        />
                                        <label htmlFor="exampleInputText1" className={`${style.lable}`} >Old Number: </label>
                                        <input
                                            type="text"
                                            name="oldNumber"
                                            className="form-control"
                                            value={selectedBuilding.oldNumber}
                                            onChange={(e) =>
                                                setSelectedBuilding({
                                                    ...selectedBuilding,
                                                    oldNumber: e.target.value,
                                                })
                                            }
                                            placeholder="Enter OldNumber"
                                        />

                                        <label htmlFor="exampleInputDate1" className={`${style.lable}`}>Valid From Date:</label>
                                        <input
                                            type="date"
                                            name="validFrom"
                                            className="form-control"
                                            value={selectedBuilding.validFrom}
                                            onChange={(e) =>
                                                setSelectedBuilding({
                                                    ...selectedBuilding,
                                                    validFrom: e.target.value,
                                                })
                                            }
                                            placeholder="Enter ValidFrom Date"
                                        />

                                        <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Number Of Floors: </label>
                                        <input
                                            type="Number"
                                            min="0"
                                            name="numberOfFloors"
                                            className="form-control"
                                            value={selectedBuilding.numberOfFloors}
                                            onChange={(e) =>
                                                setSelectedBuilding({
                                                    ...selectedBuilding,
                                                    numberOfFloors: e.target.value,
                                                })
                                            }
                                            placeholder="Enter NumberOfFloors"
                                        />
                                        </div>

                                    </form>

                                    {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => handleUpdate(selectedBuilding)}>
                                        Update
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        )}

                        {/* <!--- Render the add Model---> */}
                        <div className="model_box" style={{ width: 100 }}>
                            <Modal
                                show={addShow}
                                onHide={handleAddClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Building</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={submitFormData}>

                                        <div className={`form-group ${style.formGroup}`}>
                                            <h2>Project:</h2>
                                            <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Project:</label>
                                            <select
                                                name="project_code"
                                                type='number'
                                                className="form-control"
                                                onChange={getFormValue}
                                            >
                                                <option value="">Select Project</option>
                                                {Projects.map((record) => (
                                                    <option key={record.project_code} value={record.project_code}>
                                                        {record.projectID} - {record.projectDescription}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                      
                                        <div className={`form-group ${style.formGroup}`}>
                                            <h2>Building Details:</h2>
                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Building ID: </label>
                                            <input type="text" required maxLength={8} name='buildingID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter BuildingTypeID" />
                                       
                                      
                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Building Description: </label>
                                            <input type="text" required name='buildingDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter BuildingDesc" />
                                     
                                            <label htmlFor="exampleInpuText1" className={`${style.lable}`} >Old Number: </label>
                                            <input type="text" name='oldNumber' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter OldNumber" />
                                       

                                            <label htmlFor="exampleInputDate1" className={`${style.lable}`}>Valid From Date:</label>
                                            <input type="date" name='validFrom' className="form-control" onChange={getFormValue} id="exampleInputDate1" aria-describedby="textHelp" placeholder="Enter ValidFromDate" />
                                   
                                            <label htmlFor="exampleInpuNumber1" className={`${style.lable}`} >Number Of Floors: </label>
                                            <input type="number" min="0" name='numberOfFloors' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter NumberOfFloors" />
                                        </div>
                                        <button type="submit" className={`w-100 ${style.imageButton}`}>Add Building</button>
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

                    </div>
                </div>
            </div>
        </>
    );
}
