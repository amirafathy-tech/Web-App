
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './MethodOfCalc.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function MethodOfCalc() {
   // new URL
   const BasicURL = 'https://dev.c-1e53052.kyma.ondemand.com'
  const [MethodOfCalc, setMethodOfCalc] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethodOfCalc, setSelectedMethodOfCalc] = useState(null);

  const token = localStorage.getItem('token');

  // to handle modal for add
  const [addShow, setaddShow] = useState(false);
  const handleAddClose = () => {
    setAddMsg('')
    setaddShow(false);}
  const handleAddShow = () => setaddShow(true);

  // handle modal for edit
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setUpdateMsg('')
    setSelectedMethodOfCalc(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (MethodOfCalc) => {
    console.log(MethodOfCalc);
    setSelectedMethodOfCalc(MethodOfCalc);
    console.log("selected");
    console.log(selectedMethodOfCalc);
    handleShow();
  };

  let [newMethodOfCalc, setNewMethodOfCalc] = useState({
    methodOfCalcID: '',
    methodOfCalcDescription: '',

  });


  function getFormValue(e) {
    let myMethodOfCalc = { ...newMethodOfCalc }
    myMethodOfCalc[e.target.name] = e.target.value
    setNewMethodOfCalc(myMethodOfCalc);// update MethodOfCalc data
    console.log(myMethodOfCalc)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/moc`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        methodOfCalcID: newMethodOfCalc.methodOfCalcID,
        methodOfCalcDescription: newMethodOfCalc.methodOfCalcDescription,
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your MethodOfCalculation have been added successfully")
      getMethodOfCalc()
    }
  }


  // call update API
  const handleUpdate = async (updatedMethodOfCalc) => {
    console.log(updatedMethodOfCalc);
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/moc/${updatedMethodOfCalc.methodOfCalc_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          methodOfCalc_code:updatedMethodOfCalc.methodOfCalc_code,
          methodOfCalcID: updatedMethodOfCalc.methodOfCalcID,
          methodOfCalcDescription: updatedMethodOfCalc.methodOfCalcDescription,
         
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your MethodOfCalculation has been updated successfully');
        getMethodOfCalc();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (MethodOfCalcID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/moc/${MethodOfCalcID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your MethodOfCalculation has been Deleted successfully');
        getMethodOfCalc();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getMethodOfCalc() {
    try {
      let { data } = await axios.get(`${BasicURL}/moc`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("MethodOfCalc");
      setMethodOfCalc(data);
      console.log(MethodOfCalc);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchMethodOfCalcs(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/moc/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setMethodOfCalc(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchMethodOfCalcs(searchTerm);
    } else {
      getMethodOfCalc();
    }
  }, [searchTerm]);

  const renderMethodOfCalcs = MethodOfCalc.length > 0 ? (
    MethodOfCalc.map((MethodOfCalc) => (
      <tr key={MethodOfCalc.methodOfCalc_code}>
        <td>{MethodOfCalc.methodOfCalcID}</td>
        <td>{MethodOfCalc.methodOfCalcDescription}</td>
      
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(MethodOfCalc.methodOfCalc_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(MethodOfCalc)} title="Edit">
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
                            placeholder="Search for a method "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className={`col-sm ${style.maincolor}`}><h2>MethodOfCalculation Details</h2></div>
                    <div className="col-sm">  <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
                        Add New MethodOfCalculation
                    </button></div>
                </div>

        {/* <div className="row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <input
              className={`${style.searchInput}`}
              type="search"
              placeholder="Search for a MethodOfCalculation "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>MethodOfCalculation Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New MethodOfCalculation
            </button>
          </div>
        </div> */}



        {/* {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''} */}

        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                
                  <th>MethodOfCalculation ID</th>
                  <th>MethodOfCalculation Description</th>
                  
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderMethodOfCalcs}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedMethodOfCalc && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit MethodOfCalculation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                  
                  <div className={`form-group `}>

<label htmlFor="exampleInputNumber1" className={`${style.lable}`} >MethodOfCalculation Code: </label>
                    <input
                      type="text"
                      required
                      maxLength={8}
                      name="methodOfCalcID"
                      className="form-control m-3"
                      value={selectedMethodOfCalc.methodOfCalcID}
                      onChange={(e) =>
                        setSelectedMethodOfCalc({
                          ...selectedMethodOfCalc,
                          methodOfCalcID: e.target.value,
                        })
                      }
                      placeholder="Enter methodOfCalcID"
                    />
                    </div>

                    <div className={`form-group`}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >MethodOfCalculation Description: </label>
                    <input
                      type="text"
                      required
                      name="methodOfCalcDescription"
                      className="form-control m-3"
                      value={selectedMethodOfCalc.methodOfCalcDescription}
                      onChange={(e) =>
                        setSelectedMethodOfCalc({
                          ...selectedMethodOfCalc,
                          methodOfCalcDescription: e.target.value,
                        })
                      }
                      placeholder="Enter methodOfCalcDescription"
                    />
                    </div>
                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedMethodOfCalc)}>
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
                  <Modal.Title>Add MethodOfCalculation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >MethodOfCalculation Code: </label>
                      <input type="text" required maxLength={8} name='methodOfCalcID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="numberHelp" placeholder="Enter methodOfCalcID" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >MethodOfCalculation Description: </label>
                      <input type="text" required  name='methodOfCalcDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter methodOfCalcDescription" />
                    </div>
                   

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add MethodOfCalculation</button>
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



