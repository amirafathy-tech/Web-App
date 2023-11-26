
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './UnitUsage.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function UnitUsage() {
  // new URL
  const BasicURL = 'https://dev.c-1e53052.kyma.ondemand.com'
  const token = localStorage.getItem('token');
  const [UnitUsage, setUnitUsage] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnitUsage, setSelectedUnitUsage] = useState(null);

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
    setSelectedUnitUsage(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (UnitUsage) => {
    setSelectedUnitUsage(UnitUsage);
    handleShow();
  };

  let [newUnitUsage, setNewUnitUsage] = useState({
    unitUsageID: '',
    usageTypeDescription: ''
  });
  function getFormValue(e) {
    let myUnitUsage = { ...newUnitUsage }
    myUnitUsage[e.target.name] = e.target.value
    setNewUnitUsage(myUnitUsage);// update UnitUsage data
    console.log(myUnitUsage)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/unitusage`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        unitUsageID: newUnitUsage.unitUsageID,
        usageTypeDescription: newUnitUsage.usageTypeDescription
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your UnitUsage have been added successfully")
      getUnitUsage()
    }
  }


  // call update API
  const handleUpdate = async (updatedUnitUsage) => {
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/unitusage/${updatedUnitUsage.unitUsage_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          unitUsage_code: updatedUnitUsage.unitUsage_code,
          unitUsageID: updatedUnitUsage.unitUsageID,
          usageTypeDescription: updatedUnitUsage.usageTypeDescription,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your UnitUsage has been updated successfully');
        getUnitUsage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (UnitUsageID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/unitusage/${UnitUsageID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your UnitUsage has been Deleted successfully');
        getUnitUsage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getUnitUsage() {
    try {
      let { data } = await axios.get(`${BasicURL}/unitusage`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("UnitUsage");
      setUnitUsage(data);
      console.log(UnitUsage);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchUnitUsages(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/unitusage/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setUnitUsage(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchUnitUsages(searchTerm);
    } else {
      getUnitUsage();
    }
  }, [searchTerm]);

  const renderUnitUsages = UnitUsage.length > 0 ? (
    UnitUsage.map((UnitUsage) => (
      <tr key={UnitUsage.unitUsage_code}>
        <td>{UnitUsage.unitUsageID}</td>
        <td>{UnitUsage.usageTypeDescription}</td>
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(UnitUsage.unitUsage_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(UnitUsage)} title="Edit">
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
              placeholder="Search for a usage "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={`col-sm ${style.maincolor}`}><h2>Usage Details</h2></div>
          <div className="col-sm">  <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
            Add New Usage
          </button></div>
        </div>
        {/* <div className="row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <input
              className={`${style.searchInput}`}
              type="search"
              placeholder="Search for a UnitUsage "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>UnitUsage Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New UnitUsage
            </button>
          </div>
        </div> */}
        {/* {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''} */}
        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                  <th>UnitUsage ID</th>
                  <th>Usage Type Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderUnitUsages}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedUnitUsage && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit UnitUsage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>

                    <div className={`form-group `}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >UnitUsage Code: </label>
                      <input
                        type="text"
                        required
                        maxLength={8}
                        name="unitUsageID"
                        className="form-control"
                        value={selectedUnitUsage.unitUsageID}
                        onChange={(e) =>
                          setSelectedUnitUsage({
                            ...selectedUnitUsage,
                            unitUsageID: e.target.value,
                          })
                        }
                        placeholder="Enter UnitUsageID"
                      />
                    </div>

                    <div className={`form-group  `}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Usage Type Description: </label>
                      <input
                        type="text"
                        required
                        name="usageTypeDescription"
                        className="form-control"
                        value={selectedUnitUsage.usageTypeDescription}
                        onChange={(e) =>
                          setSelectedUnitUsage({
                            ...selectedUnitUsage,
                            usageTypeDescription: e.target.value,
                          })
                        }
                        placeholder="Enter UsageTypeDescription"
                      />
                    </div>

                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedUnitUsage)}>
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
                  <Modal.Title>Add UnitUsage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >UnitUsage Code: </label>
                      <input type="text" required maxLength={8} name='unitUsageID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter UnitUsageID" />
                    </div>
                    <div className={`form-group  ${style.formGroup}`}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Usage Type Description: </label>
                      <input type="text" required name='usageTypeDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter UsageTypeDescription" />
                    </div>

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add UnitUsage</button>
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



