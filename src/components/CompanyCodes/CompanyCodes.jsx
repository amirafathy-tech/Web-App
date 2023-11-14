
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './CompanyCodes.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function CompanyCodes() {
  // new URL
  const BasicURL=' https://trial.c-78984ef.kyma.ondemand.com'

 // const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
  const [CompanyCodes, setCompanyCodes] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanyCodes, setSelectedCompanyCodes] = useState(null);

  const token = localStorage.getItem('token');

  // to handle modal for add
  const [addShow, setaddShow] = useState(false);
  const handleAddClose = () => setaddShow(false);
  const handleAddShow = () => setaddShow(true);

  // handle modal for edit
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelectedCompanyCodes(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (CompanyCodes) => {
    console.log(CompanyCodes);
    setSelectedCompanyCodes(CompanyCodes);
    console.log("selected");
    console.log(selectedCompanyCodes);
    handleShow();
  };

  let [newCompanyCodes, setNewCompanyCodes] = useState({
    companyCodeID: '',
    companyCodeDescription: '',

  });


  function getFormValue(e) {
    let myCompanyCodes = { ...newCompanyCodes }
    myCompanyCodes[e.target.name] = e.target.value
    setNewCompanyCodes(myCompanyCodes);// update CompanyCodes data
    console.log(myCompanyCodes)
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
        companyCodeID: newCompanyCodes.companyCodeID,
        companyCodeDescription: newCompanyCodes.companyCodeDescription,
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your Company have been added successfully")
      getCompanyCodes()
    }
  }


  // call update API
  const handleUpdate = async (updatedCompanyCodes) => {
    console.log(updatedCompanyCodes);
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/companymd/${updatedCompanyCodes.company_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          company_code:updatedCompanyCodes.company_code,
          companyCodeID: updatedCompanyCodes.companyCodeID,
          companyCodeDescription: updatedCompanyCodes.companyCodeDescription,
         
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your Company has been updated successfully');
        getCompanyCodes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (CompanyCodesID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/companymd/${CompanyCodesID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your Company has been Deleted successfully');
        getCompanyCodes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getCompanyCodes() {
    try {
      let { data } = await axios.get(`${BasicURL}/companymd`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("CompanyCodes");
      setCompanyCodes(data);
      console.log(CompanyCodes);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchCompanyCodess(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/companymd/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setCompanyCodes(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchCompanyCodess(searchTerm);
    } else {
      getCompanyCodes();
    }
  }, [searchTerm]);

  const renderCompanyCodess = CompanyCodes.length > 0 ? (
    CompanyCodes.map((CompanyCodes) => (
      <tr key={CompanyCodes.company_code}>
        <td>{CompanyCodes.companyCodeID}</td>
        <td>{CompanyCodes.companyCodeDescription}</td>
      
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(CompanyCodes.company_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(CompanyCodes)} title="Edit">
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
              placeholder="Search for a CompanyCode "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>CompanyCode Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New CompanyCode
            </button>
          </div>
        </div>



        {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''}

        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                
                  <th>Company Code ID</th>
                  <th>Company Code Description</th>
                  
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderCompanyCodess}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedCompanyCodes && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit CompanyCode</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                  
                    <input
                      type="text"
                      required
                      maxLength={8}
                      name="companyCodeID"
                      className="form-control m-3"
                      value={selectedCompanyCodes.companyCodeID}
                      onChange={(e) =>
                        setSelectedCompanyCodes({
                          ...selectedCompanyCodes,
                          companyCodeID: e.target.value,
                        })
                      }
                      placeholder="Enter CompanyCodeID"
                    />
                    <input
                      type="text"
                      required
                      name="companyCodeDescription"
                      className="form-control m-3"
                      value={selectedCompanyCodes.companyCodeDescription}
                      onChange={(e) =>
                        setSelectedCompanyCodes({
                          ...selectedCompanyCodes,
                          companyCodeDescription: e.target.value,
                        })
                      }
                      placeholder="Enter CompanyCodeDescription"
                    />
                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedCompanyCodes)}>
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
                  <Modal.Title>Add CompanyCode</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Company Code: </label>
                      <input type="text" required maxLength={8} name='companyCodeID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="numberHelp" placeholder="Enter CompanyCodeID" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Company Description: </label>
                      <input type="text" required  name='companyCodeDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter CompanyCodeDescription" />
                    </div>
                   

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add CompanyCode</button>
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



