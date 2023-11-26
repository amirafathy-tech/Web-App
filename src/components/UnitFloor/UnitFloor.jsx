
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './UnitFloor.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function UnitFloor() {
   // new URL
   const BasicURL = 'https://dev.c-1e53052.kyma.ondemand.com'
  const token = localStorage.getItem('token');
  const [UnitFloor, setUnitFloor] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnitFloor, setSelectedUnitFloor] = useState(null);

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
    setSelectedUnitFloor(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (UnitFloor) => {
    setSelectedUnitFloor(UnitFloor);
    handleShow();
  };

  let [newUnitFloor, setNewUnitFloor] = useState({
    unitFloorID: '',
    floor: ''

  });


  function getFormValue(e) {
    let myUnitFloor = { ...newUnitFloor }
    myUnitFloor[e.target.name] = e.target.value
    setNewUnitFloor(myUnitFloor);// update UnitFloor data
    console.log(myUnitFloor)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/unitfloor`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        unitFloorID: newUnitFloor.unitFloorID,
        floor: newUnitFloor.floor
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your UnitFloor have been added successfully")
      getUnitFloor()
    }
  }


  // call update API
  const handleUpdate = async (updatedUnitFloor) => {
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/unitfloor/${updatedUnitFloor.unitFloor_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          unitFloor_code:updatedUnitFloor.unitFloor_code,
          unitFloorID: updatedUnitFloor.unitFloorID,
          floor: updatedUnitFloor.floor,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your UnitFloor has been updated successfully');
        getUnitFloor();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (UnitFloorID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/unitfloor/${UnitFloorID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your UnitFloor has been Deleted successfully');
        getUnitFloor();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getUnitFloor() {
    try {
      let { data } = await axios.get(`${BasicURL}/unitfloor`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("UnitFloor");
      setUnitFloor(data);
      console.log(UnitFloor);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchUnitFloors(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/unitfloor/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setUnitFloor(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchUnitFloors(searchTerm);
    } else {
      getUnitFloor();
    }
  }, [searchTerm]);

  const renderUnitFloors = UnitFloor.length > 0 ? (
    UnitFloor.map((UnitFloor) => (
      <tr key={UnitFloor.unitFloor_code}>
        <td>{UnitFloor.unitFloorID}</td>
        <td>{UnitFloor.floor}</td>
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(UnitFloor.unitFloor_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(UnitFloor)} title="Edit">
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
              placeholder="Search for a floor "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={`col-sm ${style.maincolor}`}><h2>Floor Details</h2></div>
          <div className="col-sm">  <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
            Add New Floor
          </button></div>
        </div>
        {/* <div className="row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <input
              className={`${style.searchInput}`}
              type="search"
              placeholder="Search for a UnitFloor "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>UnitFloor Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New UnitFloor
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
                  <th>UnitFloor ID</th>
                  <th>Unit Floor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderUnitFloors}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedUnitFloor && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit UnitFloor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>

                  <div className={`form-group `}>

<label htmlFor="exampleInputText1" className={`${style.lable}`} >UnitFloor Code: </label>
                    <input
                      type="text"
                      required
                      maxLength={8}
                      name="unitFloorID"
                      className="form-control"
                      value={selectedUnitFloor.unitFloorID}
                      onChange={(e) =>
                        setSelectedUnitFloor({
                          ...selectedUnitFloor,
                          unitFloorID: e.target.value,
                        })
                      }
                      placeholder="Enter UnitFloorID"
                    />
                    </div>

                    <div className={`form-group `}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Unit Floor: </label>
                    <input
                      type="text"
                      required
                      name="floor"
                      className="form-control"
                      value={selectedUnitFloor.floor}
                      onChange={(e) =>
                        setSelectedUnitFloor({
                          ...selectedUnitFloor,
                          floor: e.target.value,
                        })
                      }
                      placeholder="Enter Unit Floor"
                    />
                    </div>

                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedUnitFloor)}>
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
                  <Modal.Title>Add UnitFloor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >UnitFloor Code: </label>
                      <input type="text" required maxLength={8} name='unitFloorID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter UnitFloorID" />
                    </div>
                    <div className={`form-group  ${style.formGroup}`}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Unit Floor: </label>
                      <input type="text" required name='floor' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit Floor" />
                    </div>

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add UnitFloor</button>
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



