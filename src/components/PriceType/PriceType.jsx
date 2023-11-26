
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './PriceType.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function PriceType() {
  // new URL
  const BasicURL = 'https://dev.c-1e53052.kyma.ondemand.com'
  const [PriceType, setPriceType] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceType, setSelectedPriceType] = useState(null);

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
    setSelectedPriceType(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (PriceType) => {
    console.log(PriceType);
    setSelectedPriceType(PriceType);
    console.log("selected");
    console.log(selectedPriceType);
    handleShow();
  };

  let [newPriceType, setNewPriceType] = useState({
    priceTypeID: '',
    priceTypeDescription: '',

  });


  function getFormValue(e) {
    let myPriceType = { ...newPriceType }
    myPriceType[e.target.name] = e.target.value
    setNewPriceType(myPriceType);// update PriceType data
    console.log(myPriceType)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/priceType`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        priceTypeID: newPriceType.priceTypeID,
        priceTypeDescription: newPriceType.priceTypeDescription,
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your PriceType have been added successfully")
      getPriceType()
    }
  }


  // call update API
  const handleUpdate = async (updatedPriceType) => {
    console.log(updatedPriceType);
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/priceType/${updatedPriceType.priceType_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          priceType_code: updatedPriceType.priceType_code,
          priceTypeID: updatedPriceType.priceTypeID,
          priceTypeDescription: updatedPriceType.priceTypeDescription,

        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your PriceType has been updated successfully');
        getPriceType();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (PriceTypeID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/priceType/${PriceTypeID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your PriceType has been Deleted successfully');
        getPriceType();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getPriceType() {
    try {
      let { data } = await axios.get(`${BasicURL}/priceType`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("PriceType");
      setPriceType(data);
      console.log(PriceType);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchPriceTypes(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/priceType/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setPriceType(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchPriceTypes(searchTerm);
    } else {
      getPriceType();
    }
  }, [searchTerm]);

  const renderPriceTypes = PriceType.length > 0 ? (
    PriceType.map((PriceType) => (
      <tr key={PriceType.priceType_code}>
        <td>{PriceType.priceTypeID}</td>
        <td>{PriceType.priceTypeDescription}</td>

        <td>
          <button className={style.iconButton} onClick={() => handleDelete(PriceType.priceType_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(PriceType)} title="Edit">
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
              placeholder="Search for a price "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={`col-sm ${style.maincolor}`}><h2>Price Details</h2></div>
          <div className="col-sm">  <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
            Add New Price
          </button></div>
        </div>
        {/* <div className="row align-items-center justify-content-center">
          
          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <input
              className={`${style.searchInput}`}
              type="search"
              placeholder="Search for a PriceType "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>PriceType Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New PriceType
            </button>
          </div>
        </div> */}

        {/* {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''} */}

        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>

                  <th>PriceType ID</th>
                  <th>PriceType Description</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderPriceTypes}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedPriceType && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit PriceType</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>

                    <div className={`form-group  `}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >PriceType ID: </label>
                      <input
                        type="text"
                        required
                        maxLength={8}
                        name="priceTypeID"
                        className="form-control m-3"
                        value={selectedPriceType.priceTypeID}
                        onChange={(e) =>
                          setSelectedPriceType({
                            ...selectedPriceType,
                            priceTypeID: e.target.value,
                          })
                        }
                        placeholder="Enter priceTypeID"
                      />
                    </div>

                    <div className={`form-group `}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >PriceType Description: </label>
                      <input
                        type="text"
                        required
                        name="priceTypeDescription"
                        className="form-control m-3"
                        value={selectedPriceType.priceTypeDescription}
                        onChange={(e) =>
                          setSelectedPriceType({
                            ...selectedPriceType,
                            priceTypeDescription: e.target.value,
                          })
                        }
                        placeholder="Enter priceTypeDescription"
                      />
                    </div>
                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedPriceType)}>
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
                  <Modal.Title>Add PriceType</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >PriceType ID: </label>
                      <input type="text" required maxLength={8} name='priceTypeID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="numberHelp" placeholder="Enter priceTypeID" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >PriceType Description: </label>
                      <input type="text" required name='priceTypeDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter priceTypeDescription" />
                    </div>


                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add PriceType</button>
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



