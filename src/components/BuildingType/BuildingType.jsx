
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './BuildingType.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function BuildingType() {
  // new URL
  const BasicURL = ' https://newtrial.c-78984ef.kyma.ondemand.com'
  // const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
  const token = localStorage.getItem('token');
  const [BuildingType, setBuildingType] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuildingType, setSelectedBuildingType] = useState(null);

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
    setSelectedBuildingType(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (BuildingType) => {
    setSelectedBuildingType(BuildingType);
    handleShow();
  };
  let [newBuildingType, setNewBuildingType] = useState({
    buildingTypeID: '',
    buildTypeDesc: ''
  });

  function getFormValue(e) {
    let myBuildingType = { ...newBuildingType }
    myBuildingType[e.target.name] = e.target.value
    setNewBuildingType(myBuildingType);// update BuildingType data
    console.log(myBuildingType)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/buildingtype`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        buildingTypeID: newBuildingType.buildingTypeID,
        buildTypeDesc: newBuildingType.buildTypeDesc
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your BuildingType have been added successfully")
      getBuildingType()
    }
  }
  // call update API
  const handleUpdate = async (updatedBuildingType) => {
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/buildingtype/${updatedBuildingType.buildingType_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          buildingType_code: updatedBuildingType.buildingType_code,
          buildingTypeID: updatedBuildingType.buildingTypeID,
          buildTypeDesc: updatedBuildingType.buildTypeDesc,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your BuildingType has been updated successfully');
        getBuildingType();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (BuildingTypeID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/buildingtype/${BuildingTypeID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your BuildingType has been Deleted successfully');
        getBuildingType();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getBuildingType() {
    try {
      let { data } = await axios.get(`${BasicURL}/buildingtype`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("BuildingType");
      setBuildingType(data);
      console.log(BuildingType);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchBuildingTypes(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/buildingtype/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setBuildingType(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchBuildingTypes(searchTerm);
    } else {
      getBuildingType();
    }
  }, [searchTerm]);

  const renderBuildingTypes = BuildingType.length > 0 ? (
    BuildingType.map((BuildingType) => (
      <tr key={BuildingType.buildingType_code}>
        <td>{BuildingType.buildingTypeID}</td>
        <td>{BuildingType.buildTypeDesc}</td>
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(BuildingType.buildingType_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(BuildingType)} title="Edit">
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
              placeholder="Search for a BuildingType "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>BuildingType Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New BuildingType
            </button>
          </div>
        </div>
        {/* {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''} */}
        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                  <th>BuildingType ID</th>
                  <th>BuildingType Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderBuildingTypes}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedBuildingType && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit BuildingType</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>

                    <label htmlFor="exampleInputText1" className={`${style.lable}`} >BuildingType ID: </label>
                    <input
                      type="text"
                      required
                      maxLength={8}
                      name="buildingTypeID"
                      className="form-control"
                      value={selectedBuildingType.buildingTypeID}
                      onChange={(e) =>
                        setSelectedBuildingType({
                          ...selectedBuildingType,
                          buildingTypeID: e.target.value,
                        })
                      }
                      placeholder="Enter BuildingTypeID"
                    />

                    <label htmlFor="exampleInputText1" className={`${style.lable}`} >BuildingType Description: </label>
                    <input
                      type="text"
                      required
                      name="buildTypeDesc"
                      className="form-control"
                      value={selectedBuildingType.buildTypeDesc}
                      onChange={(e) =>
                        setSelectedBuildingType({
                          ...selectedBuildingType,
                          buildTypeDesc: e.target.value,
                        })
                      }
                      placeholder="Enter BuildingTypeDesc"
                    />

                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedBuildingType)}>
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
                  <Modal.Title>Add BuildingType</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >BuildingType ID: </label>
                      <input type="text" required maxLength={8} name='buildingTypeID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter BuildingTypeID" />
                    </div>
                    <div className={`form-group  ${style.formGroup}`}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >BuildingType Description: </label>
                      <input type="text" required name='buildTypeDesc' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter BuildingTypeDesc" />
                    </div>

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add BuildingType</button>
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



