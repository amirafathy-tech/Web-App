
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './UnitStatus.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function UnitStatus() {
  // new URL
  const BasicURL = 'https://dev.c-1e53052.kyma.ondemand.com'
  const token = localStorage.getItem('token');
  const [UnitStatus, setUnitStatus] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnitStatus, setSelectedUnitStatus] = useState(null);

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
    setSelectedUnitStatus(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (UnitStatus) => {
    setSelectedUnitStatus(UnitStatus);
    handleShow();
  };

  let [newUnitStatus, setNewUnitStatus] = useState({
    unitStatusID: '',
    unitStatus: ''

  });
  function getFormValue(e) {
    let myUnitStatus = { ...newUnitStatus }
    myUnitStatus[e.target.name] = e.target.value
    setNewUnitStatus(myUnitStatus);// update UnitStatus data
    console.log(myUnitStatus)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();
    const options = {
      method: 'POST',
      url: `${BasicURL}/unitstatus`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        unitStatusID: newUnitStatus.unitStatusID,
        unitStatus: newUnitStatus.unitStatus
      }
    };
    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your UnitStatus have been added successfully")
      getUnitStatus()
    }
  }


  // call update API
  const handleUpdate = async (updatedUnitStatus) => {
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/unitstatus/${updatedUnitStatus.unitStatus_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          unitStatus_code: updatedUnitStatus.unitStatus_code,
          unitStatusID: updatedUnitStatus.unitStatusID,
          unitStatus: updatedUnitStatus.unitStatus,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your UnitStatus has been updated successfully');
        getUnitStatus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (UnitStatusID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/unitstatus/${UnitStatusID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your UnitStatus has been Deleted successfully');
        getUnitStatus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getUnitStatus() {
    try {
      let { data } = await axios.get(`${BasicURL}/unitstatus`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("UnitStatus");
      setUnitStatus(data);
      console.log(UnitStatus);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchUnitStatuss(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/unitstatus/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setUnitStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchUnitStatuss(searchTerm);
    } else {
      getUnitStatus();
    }
  }, [searchTerm]);

  const renderUnitStatuss = UnitStatus.length > 0 ? (
    UnitStatus.map((UnitStatus) => (
      <tr key={UnitStatus.unitStatus_code}>
        <td>{UnitStatus.unitStatusID}</td>
        <td>{UnitStatus.unitStatus}</td>
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(UnitStatus.unitStatus_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(UnitStatus)} title="Edit">
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

        <div className="row text-white m-3">
          <div className="col-sm">
            <input
              className={`${style.searchInput}`}
              type="search"
              placeholder="Search for a status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={`col-sm ${style.maincolor}`}><h2>Status Details</h2></div>
          <div className="col-sm">  <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
            Add New Status
          </button></div>
        </div>
        {/* <div className="row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <input
              className={`${style.searchInput}`}
              type="search"
              placeholder="Search for a UnitStatus "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>Unit Status Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New UnitStatus
            </button>
          </div>
        </div> */}
        {/* 
        {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''} */}

        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                  <th>UnitStatus ID</th>
                  <th>Unit Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderUnitStatuss}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedUnitStatus && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit UnitStatus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>

                    <div className={`form-group  `}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >UnitStatus Code: </label>
                      <input
                        type="text"
                        required
                        maxLength={8}
                        name="unitStatusID"
                        className="form-control"
                        value={selectedUnitStatus.unitStatusID}
                        onChange={(e) =>
                          setSelectedUnitStatus({
                            ...selectedUnitStatus,
                            unitStatusID: e.target.value,
                          })
                        }
                        placeholder="Enter UnitStatusID"
                      />
                    </div>

                    <div className={`form-group  `}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Unit Status: </label>
                      <input
                        type="text"
                        required
                        name="unitStatus"
                        className="form-control"
                        value={selectedUnitStatus.unitStatus}
                        onChange={(e) =>
                          setSelectedUnitStatus({
                            ...selectedUnitStatus,
                            unitStatus: e.target.value,
                          })
                        }
                        placeholder="Enter Unit Status"
                      />
                    </div>

                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedUnitStatus)}>
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
                  <Modal.Title>Add UnitStatus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >UnitStatus Code: </label>
                      <input type="text" required maxLength={8} name='unitStatusID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter UnitStatusID" />
                    </div>
                    <div className={`form-group  ${style.formGroup}`}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Unit Status: </label>
                      <input type="text" required name='unitStatus' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit Status" />
                    </div>

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add UnitStatus</button>
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



