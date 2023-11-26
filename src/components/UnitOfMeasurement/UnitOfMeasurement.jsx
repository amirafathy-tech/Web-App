
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './UnitOfMeasurement.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function UnitOfMeasurement() {
  // new URL
  const BasicURL = 'https://dev.c-1e53052.kyma.ondemand.com'
  const [UnitOfMeasurement, setUnitOfMeasurement] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnitOfMeasurement, setSelectedUnitOfMeasurement] = useState(null);

  const token = localStorage.getItem('token');

  // to handle modal for add
  const [addShow, setaddShow] = useState(false);
  const handleAddClose = () => {
    setAddMsg('')
    setaddShow(false);
  }
  const handleAddShow = () => setaddShow(true);

  // handle modal for edit
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setUpdateMsg('')
    setSelectedUnitOfMeasurement(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (UnitOfMeasurement) => {
    console.log(UnitOfMeasurement);
    setSelectedUnitOfMeasurement(UnitOfMeasurement);
    console.log("selected");
    console.log(selectedUnitOfMeasurement);
    handleShow();
  };

  let [newUnitOfMeasurement, setNewUnitOfMeasurement] = useState({
    unitOfMeasurementID: '',
    unitOfMeasurementDesc: '',

  });


  function getFormValue(e) {
    let myUnitOfMeasurement = { ...newUnitOfMeasurement }
    myUnitOfMeasurement[e.target.name] = e.target.value
    setNewUnitOfMeasurement(myUnitOfMeasurement);// update UnitOfMeasurement data
    console.log(myUnitOfMeasurement)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/uom`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        unitOfMeasurementID: newUnitOfMeasurement.unitOfMeasurementID,
        unitOfMeasurementDesc: newUnitOfMeasurement.unitOfMeasurementDesc,
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your UnitOfMeasurement have been added successfully")
      getUnitOfMeasurement()
    }
  }


  // call update API
  const handleUpdate = async (updatedUnitOfMeasurement) => {
    console.log(updatedUnitOfMeasurement);
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/uom/${updatedUnitOfMeasurement.unitOfMeasurement_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          unitOfMeasurement_code: updatedUnitOfMeasurement.unitOfMeasurement_code,
          unitOfMeasurementID: updatedUnitOfMeasurement.unitOfMeasurementID,
          unitOfMeasurementDesc: updatedUnitOfMeasurement.unitOfMeasurementDesc,

        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your UnitOfMeasurement has been updated successfully');
        getUnitOfMeasurement();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (UnitOfMeasurementID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/uom/${UnitOfMeasurementID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your UnitOfMeasurement has been Deleted successfully');
        getUnitOfMeasurement();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getUnitOfMeasurement() {
    try {
      let { data } = await axios.get(`${BasicURL}/uom`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("UnitOfMeasurement");
      setUnitOfMeasurement(data);
      console.log(UnitOfMeasurement);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchUnitOfMeasurements(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/uom/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setUnitOfMeasurement(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchUnitOfMeasurements(searchTerm);
    } else {
      getUnitOfMeasurement();
    }
  }, [searchTerm]);

  const renderUnitOfMeasurements = UnitOfMeasurement.length > 0 ? (
    UnitOfMeasurement.map((UnitOfMeasurement) => (
      <tr key={UnitOfMeasurement.unitOfMeasurement_code}>
        <td>{UnitOfMeasurement.unitOfMeasurementID}</td>
        <td>{UnitOfMeasurement.unitOfMeasurementDesc}</td>

        <td>
          <button className={style.iconButton} onClick={() => handleDelete(UnitOfMeasurement.unitOfMeasurement_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(UnitOfMeasurement)} title="Edit">
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
              placeholder="Search for a measurementUnit "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={`col-sm ${style.maincolor}`}><h2>UnitOfMeasurement Details</h2></div>
          <div className="col-sm">  <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
            Add New UnitOfMeasurement
          </button></div>
        </div>
        {/* <div className="row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <input
              className={`${style.searchInput}`}
              type="search"
              placeholder="Search for a Measurement "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>UnitOfMeasurements Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New Measurement
            </button>
          </div>
        </div> */}



        {/* {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''} */}

        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>

                  <th>Measurement ID</th>
                  <th>Measurement Description</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderUnitOfMeasurements}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedUnitOfMeasurement && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Measurement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>

                    <div className={`form-group `}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Measurement Code: </label>
                      <input
                        type="text"
                        required
                        maxLength={8}
                        name="unitOfMeasurementID"
                        className="form-control m-3"
                        value={selectedUnitOfMeasurement.unitOfMeasurementID}
                        onChange={(e) =>
                          setSelectedUnitOfMeasurement({
                            ...selectedUnitOfMeasurement,
                            unitOfMeasurementID: e.target.value,
                          })
                        }
                        placeholder="Enter unitOfMeasurementID"
                      />
                    </div>

                    <div className={`form-group `}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Measurement Description: </label>
                      <input
                        type="text"
                        required
                        name="unitOfMeasurementDesc"
                        className="form-control m-3"
                        value={selectedUnitOfMeasurement.unitOfMeasurementDesc}
                        onChange={(e) =>
                          setSelectedUnitOfMeasurement({
                            ...selectedUnitOfMeasurement,
                            unitOfMeasurementDesc: e.target.value,
                          })
                        }
                        placeholder="Enter unitOfMeasurementDesc"
                      />
                    </div>
                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedUnitOfMeasurement)}>
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
                  <Modal.Title>Add Measurement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Measurement Code: </label>
                      <input type="text" required maxLength={8} name='unitOfMeasurementID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="numberHelp" placeholder="Enter unitOfMeasurementID" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Measurement Description: </label>
                      <input type="text" required name='unitOfMeasurementDesc' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter unitOfMeasurementDesc" />
                    </div>


                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add Measurement</button>
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



