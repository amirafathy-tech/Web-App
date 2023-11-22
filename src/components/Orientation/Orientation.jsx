
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './Orientation.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function Orientation() {
  // new URL
  const BasicURL=' https://newtrial.c-78984ef.kyma.ondemand.com'
 // const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
  const [Orientation, setOrientation] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState(null);

  const token = localStorage.getItem('token');

  // to handle modal for add
  const [addShow, setaddShow] = useState(false);
  const handleAddClose = () => setaddShow(false);
  const handleAddShow = () => setaddShow(true);

  // handle modal for edit
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelectedOrientation(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (Orientation) => {
    console.log(Orientation);
    setSelectedOrientation(Orientation);
    console.log("selected");
    console.log(selectedOrientation);
    handleShow();
  };

  let [newOrientation, setNewOrientation] = useState({
    orientationID: '',
    orientationDescription: '',

  });


  function getFormValue(e) {
    let myOrientation = { ...newOrientation }
    myOrientation[e.target.name] = e.target.value
    setNewOrientation(myOrientation);// update Orientation data
    console.log(myOrientation)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/companymd`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        orientationID: newOrientation.orientationID,
        orientationDescription: newOrientation.orientationDescription,
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your Company have been added successfully")
      getOrientation()
    }
  }


  // call update API
  const handleUpdate = async (updatedOrientation) => {
    console.log(updatedOrientation);
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/companymd/${updatedOrientation.orientation_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          orientation_code:updatedOrientation.orientation_code,
          orientationID: updatedOrientation.orientationID,
          orientationDescription: updatedOrientation.orientationDescription,
         
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your Company has been updated successfully');
        getOrientation();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (OrientationID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/companymd/${OrientationID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your Company has been Deleted successfully');
        getOrientation();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getOrientation() {
    try {
      let { data } = await axios.get(`${BasicURL}/companymd`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("Orientation");
      setOrientation(data);
      console.log(Orientation);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchOrientations(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/companymd/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setOrientation(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchOrientations(searchTerm);
    } else {
      getOrientation();
    }
  }, [searchTerm]);

  const renderOrientations = Orientation.length > 0 ? (
    Orientation.map((Orientation) => (
      <tr key={Orientation.orientation_code}>
        <td>{Orientation.orientationID}</td>
        <td>{Orientation.orientationDescription}</td>
      
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(Orientation.orientation_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(Orientation)} title="Edit">
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
              placeholder="Search for an Orientation"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>Orientation Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New Orientation
            </button>
          </div>
        </div>



        {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''}

        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                
                  <th>Orientation ID</th>
                  <th>Orientation Description</th>
                  
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderOrientations}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedOrientation && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Orientation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                  
                    <input
                      type="text"
                      required
                      maxLength={8}
                      name="orientationID"
                      className="form-control m-3"
                      value={selectedOrientation.orientationID}
                      onChange={(e) =>
                        setSelectedOrientation({
                          ...selectedOrientation,
                          orientationID: e.target.value,
                        })
                      }
                      placeholder="Enter orientationID"
                    />
                    <input
                      type="text"
                      required
                      name="orientationDescription"
                      className="form-control m-3"
                      value={selectedOrientation.orientationDescription}
                      onChange={(e) =>
                        setSelectedOrientation({
                          ...selectedOrientation,
                          orientationDescription: e.target.value,
                        })
                      }
                      placeholder="Enter orientationDescription"
                    />
                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedOrientation)}>
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
                  <Modal.Title>Add Orientation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Orientation Code: </label>
                      <input type="text" required maxLength={8} name='orientationID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="numberHelp" placeholder="Enter orientationID" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Orientation Description: </label>
                      <input type="text" required  name='orientationDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter orientationDescription" />
                    </div>
                   

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add Orientation</button>
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



