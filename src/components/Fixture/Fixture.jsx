
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './Fixture.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function Fixture() {
  // new URL
  const BasicURL=' https://newtrial.c-78984ef.kyma.ondemand.com'
 // const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
  const [Fixture, setFixture] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFixture, setSelectedFixture] = useState(null);

  const token = localStorage.getItem('token');

  // to handle modal for add
  const [addShow, setaddShow] = useState(false);
  const handleAddClose = () => setaddShow(false);
  const handleAddShow = () => setaddShow(true);

  // handle modal for edit
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelectedFixture(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (Fixture) => {
    console.log(Fixture);
    setSelectedFixture(Fixture);
    console.log("selected");
    console.log(selectedFixture);
    handleShow();
  };

  let [newFixture, setNewFixture] = useState({
    fixtureID: '',
    fixtureDescription: '',

  });


  function getFormValue(e) {
    let myFixture = { ...newFixture }
    myFixture[e.target.name] = e.target.value
    setNewFixture(myFixture);// update Fixture data
    console.log(myFixture)
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
        fixtureID: newFixture.fixtureID,
        fixtureDescription: newFixture.fixtureDescription,
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your Company have been added successfully")
      getFixture()
    }
  }


  // call update API
  const handleUpdate = async (updatedFixture) => {
    console.log(updatedFixture);
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/companymd/${updatedFixture.fixture_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          fixture_code:updatedFixture.fixture_code,
          fixtureID: updatedFixture.fixtureID,
          fixtureDescription: updatedFixture.fixtureDescription,
         
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your Company has been updated successfully');
        getFixture();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (FixtureID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/companymd/${FixtureID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your Company has been Deleted successfully');
        getFixture();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getFixture() {
    try {
      let { data } = await axios.get(`${BasicURL}/companymd`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("Fixture");
      setFixture(data);
      console.log(Fixture);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchFixtures(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/companymd/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setFixture(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchFixtures(searchTerm);
    } else {
      getFixture();
    }
  }, [searchTerm]);

  const renderFixtures = Fixture.length > 0 ? (
    Fixture.map((Fixture) => (
      <tr key={Fixture.fixture_code}>
        <td>{Fixture.fixtureID}</td>
        <td>{Fixture.fixtureDescription}</td>
      
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(Fixture.fixture_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(Fixture)} title="Edit">
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
              placeholder="Search for a Fixture "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>Fixture Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New Fixture
            </button>
          </div>
        </div>



        {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''}

        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                
                  <th>Fixture ID</th>
                  <th>Fixture Description</th>
                  
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderFixtures}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedFixture && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Fixture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                  
                    <input
                      type="text"
                      required
                      maxLength={8}
                      name="fixtureID"
                      className="form-control m-3"
                      value={selectedFixture.fixtureID}
                      onChange={(e) =>
                        setSelectedFixture({
                          ...selectedFixture,
                          fixtureID: e.target.value,
                        })
                      }
                      placeholder="Enter fixtureID"
                    />
                    <input
                      type="text"
                      required
                      name="fixtureDescription"
                      className="form-control m-3"
                      value={selectedFixture.fixtureDescription}
                      onChange={(e) =>
                        setSelectedFixture({
                          ...selectedFixture,
                          fixtureDescription: e.target.value,
                        })
                      }
                      placeholder="Enter fixtureDescription"
                    />
                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedFixture)}>
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
                  <Modal.Title>Add Fixture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Fixture Code: </label>
                      <input type="text" required maxLength={8} name='fixtureID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="numberHelp" placeholder="Enter fixtureID" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Fixture Description: </label>
                      <input type="text" required  name='fixtureDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter fixtureDescription" />
                    </div>
                   

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add Fixture</button>
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



