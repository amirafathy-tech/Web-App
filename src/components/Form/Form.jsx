
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './Form.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
export default function Project() {
    const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
    const token = localStorage.getItem('token');
    const [project, setProject] = useState([]);
    const [addMsg, setAddMsg] = useState('');
    const [updateMsg, setUpdateMsg] = useState('');
    const [deleteMsg, setDeleteMsg] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    //   // for predefined lists ::
    const [companyCodes, setCompanyCodes] = useState([]);
    const [regionalLocations, setRegionalLocations] = useState([]);

    let [newProject, setNewProject] = useState({
        // project fields
        projectID: '', // alphanumeric
        projectDescription: '',
        validFrom: Date,

        companyCodeID: Number,
        companyCodeDescription: '',
        regionalLocation: '',

        // new fields to be dropdown list
        // companyCode technical
        // regionalLocationCode technical
        // profitCenterCode technical   
    });
    // new added::
    const [addError, setAddError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [editFormValid, setEditFormValid] = useState(false);
    const [updateError, setUpdateError] = useState('');
    // handle modal for edit
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setUpdateMsg('');
        setSelectedProject(null);
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const handleEdit = (project) => {
        setSelectedProject(project);
        handleShow();
    };
    // to handle modal for add
    const [addShow, setaddShow] = useState(false);
    const handleAddClose = () => {
        setAddMsg('');
        setaddShow(false);
    }
    const handleAddShow = () => setaddShow(true);

    function validateForm(project) {
        // Check if all required fields are filled
        if (
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
    function getFormValue(e) {
        let myProject = { ...newProject }
        myProject[e.target.name] = e.target.value
        setNewProject(myProject);// update project data
        console.log(myProject)
        // new:;
        // Check form validity
        const isValid = validateForm(myProject);
        setFormValid(isValid);
    }
    // call add API 
    async function submitFormData(e) {
        e.preventDefault();
        try {
            // Check form validity before updating
            if (!formValid) {
                return
            }
            const options = {
                method: 'POST',
                url: `${BasicURL}/projects`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    projectID: newProject.projectID,
                    companyCodeID: Number(newProject.companyCodeID),
                    companyCodeDescription: newProject.companyCodeDescription,
                    projectDescription: newProject.projectDescription,
                    validFrom: newProject.validFrom,
                    regionalLocation: newProject.regionalLocation
                }
            };

            const response = await axios(options);
            console.log(response);
            if (response.status == 200) {
                console.log("200")
                setAddMsg("Your Project have been added successfully")
                getProject()
            }
            // will change after i know response from hagar
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setAddError(error.response.data.message);
            } else {
                setAddError('An error occurred while adding the project.');
            }
        }

    }

    useEffect(() => {
        if (selectedProject) {
            const isValid = validateForm(selectedProject);
            setEditFormValid(isValid);
        }

    }, [selectedProject]);

    // new call update API
    async function handleUpdate(project) {
        console.log(editFormValid)
        try {
            // Check form validity before updating
            if (!editFormValid) {
                return
            }
            const options = {
                method: 'PUT',
                url: `${BasicURL}/projects/${project.project_code}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    project_code: project.project_code,
                    projectID: project.projectID,
                    companyCodeID: Number(project.companyCodeID),
                    companyCodeDescription: project.companyCodeDescription,
                    projectDescription: project.projectDescription,
                    validFrom: project.validFrom,
                    regionalLocation: project.regionalLocation,
                },
            };
            const response = await axios(options);
            console.log(response);
            if (response.status === 200) {
                console.log('200');
                setUpdateMsg('Project updated successfully');
                getProject();
                handleClose();
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setUpdateError(error.response.data.message);
            } else {
                setUpdateError('An error occurred while updating the project.');
            }
        }
    }
    // call delete API
    const handleDelete = async (projectID) => {
        try {
            const options = {
                method: 'DELETE',
                url: `${BasicURL}/projects/${projectID}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const response = await axios(options);
            console.log(response);

            if (response.status === 200) {
                console.log('200');
                setDeleteMsg('Your Project has been Deleted successfully');
                getProject();
            }
        } catch (error) {
            console.error(error);
        }
    };
    // call get API
    async function getProject() {
        try {
            let { data } = await axios.get(`${BasicURL}/projects`, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(data);
            console.log("project");
            setProject(data);
            console.log(Project);
        } catch (error) {
            console.error(error);
        }
    }
    // call search API
    async function searchProjects(keyword) {
        try {
            const response = await axios.get(`${BasicURL}/projects/search?keyword=${keyword}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log(response)
            setProject(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    // here i call get API to retrieve companyCodes
    // here i call get API to retrieve locationCodes
    // here i call get API to retrieve profitCodes

    useEffect(() => {
        if (searchTerm) {
            searchProjects(searchTerm);
        } else {
            getProject();
        }
    }, [searchTerm]);

    const renderProjects = project.length > 0 ? (
        project.map((project) => (
            <tr key={project.project_code}>
                <td>{project.projectID}</td>
                <td>{project.companyCodeID}</td>
                <td>{project.companyCodeDescription}</td>
                <td>{project.projectDescription}</td>
                <td>{project.validFrom}</td>
                <td>{project.regionalLocation}</td>
                <td>
                    <button className={style.iconButton} onClick={() => handleDelete(project.project_code)} title="Delete">
                        <RiDeleteBinLine style={{ color: 'red' }} />
                    </button>
                    <button className={style.iconButton} onClick={() => handleEdit(project)} title="Edit">
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
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    {/* Search Bar */}
                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <input
                            className={`${style.searchInput}`}
                            type="search"
                            placeholder="Search for a project "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
                        <h2>Project Details</h2>
                    </div>
                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
                            Add New Project
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive m-auto">
                        <table className="table table-striped table-hover table-head text-center">
                            <thead>
                                <tr>
                                    <th>Project ID</th>
                                    <th>Company Code ID</th>
                                    <th>Company Code Description</th>
                                    <th>Project Description</th>
                                    <th>Valid From</th>
                                    <th>Regional Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderProjects}
                            </tbody>
                        </table>
                        {/* Render the edit modal */}
                        {selectedProject && (
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Project</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form >
                                        <div className={`form-group ${style.formGroup}`}>
                                            <h2>Company:</h2>

                                            <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company Code<span className={`${style.span}`}>*</span></label>
                                            <input
                                                type="number"
                                                name="companyCodeID"
                                                className="form-control"
                                                value={selectedProject.companyCodeID}
                                                onChange={(e) =>
                                                    setSelectedProject({
                                                        ...selectedProject,
                                                        companyCodeID: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter CompanyCodeID"
                                            />

                                            <label htmlFor="exampleInputText1" className={`${style.label}`}>Company Description:</label>
                                            <input
                                                type="text"
                                                name="companyCodeDescription"
                                                className="form-control"
                                                value={selectedProject.companyCodeDescription}
                                                onChange={(e) =>
                                                    setSelectedProject({
                                                        ...selectedProject,
                                                        companyCodeDescription: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter CompanyCodeDescription"
                                            />
                                        </div>


                                        <div className={`form-group ${style.formGroup}`}>
                                            <h2>Location</h2>

                                            <label htmlFor="exampleInputText1" className={`${style.label}`}>Regional Location:</label>
                                            <input
                                                type="text"
                                                name="regionalLocation"
                                                className="form-control"
                                                value={selectedProject.regionalLocation}
                                                onChange={(e) =>
                                                    setSelectedProject({
                                                        ...selectedProject,
                                                        regionalLocation: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter RegionalLocation"
                                            />
                                        </div>

                                        <div className={`form-group ${style.formGroup}`}>
                                            <h2>Project Details:</h2>
                                            <label htmlFor="exampleInputText1" className={`${style.label}`}>Project ID:</label>
                                            <input
                                                type="text"
                                                name="projectID"
                                                className="form-control"
                                                value={selectedProject.projectID}
                                                onChange={(e) =>
                                                    setSelectedProject({
                                                        ...selectedProject,
                                                        projectID: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter ProjectID"
                                            />
                                            <label htmlFor="exampleInputText1" className={`${style.label}`}>Project Description:</label>
                                            <input
                                                type="text"
                                                name="projectDescription"
                                                className="form-control "
                                                value={selectedProject.projectDescription}
                                                onChange={(e) =>
                                                    setSelectedProject({
                                                        ...selectedProject,
                                                        projectDescription: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter ProjectDescription"
                                            />
                                            <label htmlFor="exampleInputDate1" className={`${style.label}`}>Valid From Date:</label>
                                            <input
                                                type="date"
                                                name="validFrom"
                                                className="form-control"
                                                value={selectedProject.validFrom}
                                                onChange={(e) =>
                                                    setSelectedProject({
                                                        ...selectedProject,
                                                        validFrom: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter ValidFrom Date"
                                            />

                                        </div>

                                        {/* <button type="submit" className={`w-100 ${style.imageButton}`} disabled={!editFormValid}>
                                            Update Project
                                        </button> */}
                                    </form>
                                    {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" disabled={!editFormValid} onClick={() => handleUpdate(selectedProject)} >
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
                                    <Modal.Title>Add Project</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={submitFormData}>
                                        <div className={`form-group ${style.formGroup}`}>
                                            <h2>Company:</h2>
                                            <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company Code<span className={`${style.span}`}>*</span></label>
                                            <input type="number" name='companyCodeID' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter CompanyCodeID" />

                                            <label htmlFor="exampleInputText1" className={`${style.label}`}>Company Description:</label>
                                            <input type="text" name='companyCodeDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter CompanyCodeDescription" />
                                            {/* dropdown list companyCode */}
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
                                        </div>

                                        <div className={`form-group ${style.formGroup}`}>
                                            <h2>Location</h2>

                                            <label htmlFor="exampleInputText1" className={`${style.label}`}>Regional Location:</label>
                                            <input type="text" name='regionalLocation' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter RegionalLocation" />
                                            {/* dropdown list locationCode */}
                                            <label htmlFor="exampleInputText1" className={`${style.label}`}>Regional Location:</label>
                                            <select
                                                name="regionalLocation"
                                                className="form-control"
                                                onChange={getFormValue}
                                            >
                                                <option value="">Select Regional Location</option>
                                                {regionalLocations.map((location) => (
                                                    <option key={location.id} value={location.code}>
                                                        {location.description}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className={`form-group ${style.formGroup}`}>
                                            <h2>Project Details</h2>
                                            <label htmlFor="exampleInputText1" className={`${style.label}`}>Project ID:</label>
                                            <input type="text" required maxLength={8} name='projectID' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter ProjectID" />
                                            <label htmlFor="exampleInputText1" className={`${style.label}`}>Project Description:</label>
                                            <input type="text" required name='projectDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ProjectDescription" />
                                            <label htmlFor="exampleInputDate1" className={`${style.label}`}>Valid From Date:</label>
                                            <input type="date" required name='validFrom' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ValidFromDate" />
                                        </div>


                                        <button type="submit" className={`w-100 ${style.imageButton}`} disabled={!formValid}>
                                            Add Project
                                        </button>
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
                    </div>
                </div>
            </div>
        </>
    );
}



