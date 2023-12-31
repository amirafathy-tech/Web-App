
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './Project.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function Project() {
  //const BasicURL='https://demo.c-78984ef.kyma.ondemand.com'

  const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
  const [project, setProject] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  //   // for predefined lists ::
  const [companyCodes, setCompanyCodes] = useState([]);
  const [regionalLocations, setRegionalLocations] = useState([]);

  const token = localStorage.getItem('token');

  // to handle modal for add
  const [addShow, setaddShow] = useState(false);
  const handleAddClose = () => setaddShow(false);
  const handleAddShow = () => setaddShow(true);

  // handle modal for edit
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelectedProject(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (project) => {
    setSelectedProject(project);
    handleShow();
  };

  let [newProject, setNewProject] = useState({
    projectID: '',
    companyCodeID: Number,
    companyCodeDescription: '',
    projectDescription: '',
    validFrom: Date,
    regionalLocation: ''

  });


  function getFormValue(e) {
    let myProject = { ...newProject }
    myProject[e.target.name] = e.target.value
    setNewProject(myProject);// update project data
    console.log(myProject)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

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
  }


  // call update API
  const handleUpdate = async (updatedProject) => {
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/projects/${updatedProject.project_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          project_code:updatedProject.project_code,
          projectID: updatedProject.projectID,
          companyCodeID: Number(updatedProject.companyCodeID),
          companyCodeDescription: updatedProject.companyCodeDescription,
          projectDescription: updatedProject.projectDescription,
          validFrom: updatedProject.validFrom,
          regionalLocation: updatedProject.regionalLocation,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your Project has been updated successfully');
        getProject();
      }
    } catch (error) {
      console.error(error);
    }
  };

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


  // test call get API with predefined lists :
  //   async function getProject() {
  //   try {
  //     const { data } = await axios.get(`${BasicURL}/projects`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     console.log(data);
  //     console.log("project");
  //     setProject(data);
  //     console.log(Project);

  //     // Extract the company codes and regional locations from the API response
  //     const fetchedCompanyCodes = data.map((project) => ({
  //       id: project.companyCodeID,
  //       description: project.companyCodeDescription,
  //     }));

  //     const fetchedRegionalLocations = data.map((project) => ({
  //       id: project.regionalLocation,
  //       description: project.regionalLocationDescription,
  //     }));

  //     // Set the company codes and regional locations in the state
  //     setCompanyCodes(fetchedCompanyCodes);
  //     setRegionalLocations(fetchedRegionalLocations);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


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



        {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''}

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
                  <form>
                    <input
                      type="text"
                      name="projectID"
                      className="form-control m-3"
                      value={selectedProject.projectID}
                      onChange={(e) =>
                        setSelectedProject({
                          ...selectedProject,
                          projectID: e.target.value,
                        })
                      }
                      placeholder="Enter ProjectID"
                    />
                    <input
                      type="number"
                      name="companyCodeID"
                      className="form-control m-3"
                      value={selectedProject.companyCodeID}
                      onChange={(e) =>
                        setSelectedProject({
                          ...selectedProject,
                          companyCodeID: e.target.value,
                        })
                      }
                      placeholder="Enter CompanyCodeID"
                    />
                    <input
                      type="text"
                      name="companyCodeDescription"
                      className="form-control m-3"
                      value={selectedProject.companyCodeDescription}
                      onChange={(e) =>
                        setSelectedProject({
                          ...selectedProject,
                          companyCodeDescription: e.target.value,
                        })
                      }
                      placeholder="Enter CompanyCodeDescription"
                    />
                    <input
                      type="text"
                      name="projectDescription"
                      className="form-control m-3"
                      value={selectedProject.projectDescription}
                      onChange={(e) =>
                        setSelectedProject({
                          ...selectedProject,
                          projectDescription: e.target.value,
                        })
                      }
                      placeholder="Enter ProjectDescription"
                    />
                    <label htmlFor="exampleInputDate1" className={`${style.datelable}`} >ValidFrom Date : </label>
                    <input
                      type="date"
                      name="validFrom"
                      className="form-control m-3"
                      value={selectedProject.validFrom}
                      onChange={(e) =>
                        setSelectedProject({
                          ...selectedProject,
                          validFrom: e.target.value,
                        })
                      }
                      placeholder="Enter ValidFrom Date"
                    />
                    <input
                      type="text"
                      name="regionalLocation"
                      className="form-control m-3"
                      value={selectedProject.regionalLocation}
                      onChange={(e) =>
                        setSelectedProject({
                          ...selectedProject,
                          regionalLocation: e.target.value,
                        })
                      }
                      placeholder="Enter RegionalLocation"
                    />

                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedProject)}>
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
                {/* <Modal.Body>
                  <form onSubmit={submitFormData}>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Project ID: </label>
                      <input type="text" required  name='projectID' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter ProjectID" />
                    </div>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Company Code: </label>
                      <input type="number" name='companyCodeID' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter CompanyCodeID" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Company Description: </label>
                      <input type="text" name='companyCodeDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter CompanyCodeDescription" />
                    </div>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Project Description: </label>
                      <input type="text" required name='projectDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ProjectDescription" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputDate1" className={`${style.lable}`} >ValidFrom Date : </label>
                      <input type="date" required name='validFrom' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ValidFromDate" />
                    </div>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Regional Location: </label>
                      <input type="text" name='regionalLocation' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter RegionalLocation" />
                    </div>


                    <div className={`form-group ${style.formGroup}`}>
                      <label htmlFor="exampleInputNumber1" className={`${style.label}`}>
                        Company Code:
                      </label>
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
                      </select>
                    </div>

                    <div className={`form-group ${style.formGroup}`}>
                      <label htmlFor="exampleInputText1" className={`${style.label}`}>
                        Regional Location:
                      </label>
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

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add Project</button>
                  </form>

                  {addMsg ? <div className="alert alert-danger m-3 p-2">{addMsg}</div> : ''}
                </Modal.Body> */}

                <Modal.Body>
                  <form onSubmit={submitFormData}>
                    <div className={`form-group ${style.formGroup}`}>
                      <h4>Companies</h4>
                      <label htmlFor="exampleInputText1" className={`${style.label}`}>Project ID:</label>
                      <input type="text" required maxLength={8} name='projectID' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter ProjectID" />

                      <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company Code:</label>
                      <input type="number" name='companyCodeID' className="form-control" onChange={getFormValue} id="exampleInputNumber1" aria-describedby="numberHelp" placeholder="Enter CompanyCodeID" />

                      <label htmlFor="exampleInputText1" className={`${style.label}`}>Company Description:</label>
                      <input type="text" name='companyCodeDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter CompanyCodeDescription" />
                    </div>

                    <div className={`form-group ${style.formGroup}`}>
                      <h4>Project Description</h4>
                      <label htmlFor="exampleInputText1" className={`${style.label}`}>Project Description:</label>
                      <input type="text" required name='projectDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ProjectDescription" />
                    </div>

                    <div className={`form-group ${style.formGroup}`}>
                      <h4>Location</h4>
                      <label htmlFor="exampleInputDate1" className={`${style.label}`}>Valid From Date:</label>
                      <input type="date" required name='validFrom' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter ValidFromDate" />

                      <label htmlFor="exampleInputText1" className={`${style.label}`}>Regional Location:</label>
                      <input type="text" name='regionalLocation' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter RegionalLocation" />

                      <label htmlFor="exampleInputNumber1" className={`${style.label}`}>Company Code:</label>
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
                      </select>

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

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add Project</button>
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



