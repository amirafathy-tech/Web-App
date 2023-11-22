
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './ProfitCenter.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function ProfitCenter() {
  // new URL
  const BasicURL=' https://newtrial.c-78984ef.kyma.ondemand.com'
 // const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
  const [ProfitCenter, setProfitCenter] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfitCenter, setSelectedProfitCenter] = useState(null);

  const token = localStorage.getItem('token');

  // to handle modal for add
  const [addShow, setaddShow] = useState(false);
  const handleAddClose = () => setaddShow(false);
  const handleAddShow = () => setaddShow(true);

  // handle modal for edit
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelectedProfitCenter(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (ProfitCenter) => {
    console.log(ProfitCenter);
    setSelectedProfitCenter(ProfitCenter);
    console.log("selected");
    console.log(selectedProfitCenter);
    handleShow();
  };

  let [newProfitCenter, setNewProfitCenter] = useState({
    profitID: '',
    profitDescription: '',

  });


  function getFormValue(e) {
    let myProfitCenter = { ...newProfitCenter }
    myProfitCenter[e.target.name] = e.target.value
    setNewProfitCenter(myProfitCenter);// update ProfitCenter data
    console.log(myProfitCenter)
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
        profitID: newProfitCenter.profitID,
        profitDescription: newProfitCenter.profitDescription,
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your Company have been added successfully")
      getProfitCenter()
    }
  }


  // call update API
  const handleUpdate = async (updatedProfitCenter) => {
    console.log(updatedProfitCenter);
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/companymd/${updatedProfitCenter.profit_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          profit_code:updatedProfitCenter.profit_code,
          profitID: updatedProfitCenter.profitID,
          profitDescription: updatedProfitCenter.profitDescription,
         
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your Company has been updated successfully');
        getProfitCenter();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (ProfitCenterID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/companymd/${ProfitCenterID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your Company has been Deleted successfully');
        getProfitCenter();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getProfitCenter() {
    try {
      let { data } = await axios.get(`${BasicURL}/companymd`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("ProfitCenter");
      setProfitCenter(data);
      console.log(ProfitCenter);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchProfitCenters(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/companymd/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setProfitCenter(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchProfitCenters(searchTerm);
    } else {
      getProfitCenter();
    }
  }, [searchTerm]);

  const renderProfitCenters = ProfitCenter.length > 0 ? (
    ProfitCenter.map((ProfitCenter) => (
      <tr key={ProfitCenter.profit_code}>
        <td>{ProfitCenter.profitID}</td>
        <td>{ProfitCenter.profitDescription}</td>
      
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(ProfitCenter.profit_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(ProfitCenter)} title="Edit">
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
              placeholder="Search for a Profit "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>Profit Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New Profit
            </button>
          </div>
        </div>



        {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''}

        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                
                  <th>Profit ID</th>
                  <th>Profit Description</th>
                  
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderProfitCenters}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedProfitCenter && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                  
                    <input
                      type="text"
                      required
                      maxLength={8}
                      name="profitID"
                      className="form-control m-3"
                      value={selectedProfitCenter.profitID}
                      onChange={(e) =>
                        setSelectedProfitCenter({
                          ...selectedProfitCenter,
                          profitID: e.target.value,
                        })
                      }
                      placeholder="Enter profitID"
                    />
                    <input
                      type="text"
                      required
                      name="profitDescription"
                      className="form-control m-3"
                      value={selectedProfitCenter.profitDescription}
                      onChange={(e) =>
                        setSelectedProfitCenter({
                          ...selectedProfitCenter,
                          profitDescription: e.target.value,
                        })
                      }
                      placeholder="Enter profitDescription"
                    />
                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedProfitCenter)}>
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
                  <Modal.Title>Add Profit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Profit Code: </label>
                      <input type="text" required maxLength={8} name='profitID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="numberHelp" placeholder="Enter profitID" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Profit Description: </label>
                      <input type="text" required  name='profitDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter profitDescription" />
                    </div>
                   

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add Profit</button>
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



