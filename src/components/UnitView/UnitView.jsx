
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './UnitView.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function UnitView() {
  // new URL
  const BasicURL=' https://newtrial.c-78984ef.kyma.ondemand.com'
  // const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
  const token = localStorage.getItem('token');
  const [UnitView, setUnitView] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnitView, setSelectedUnitView] = useState(null);

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
    setSelectedUnitView(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (UnitView) => {
    setSelectedUnitView(UnitView);
    handleShow();
  };
  let [newUnitView, setNewUnitView] = useState({
    unitViewID: '',
    view: ''
  });

  function getFormValue(e) {
    let myUnitView = { ...newUnitView }
    myUnitView[e.target.name] = e.target.value
    setNewUnitView(myUnitView);// update UnitView data
    console.log(myUnitView)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/unitview`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        unitViewID: newUnitView.unitViewID,
        view: newUnitView.view
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your UnitView have been added successfully")
      getUnitView()
    }
  }
  // call update API
  const handleUpdate = async (updatedUnitView) => {
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/unitview/${updatedUnitView.unitView_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          unitView_code: updatedUnitView.unitView_code,
          unitViewID: updatedUnitView.unitViewID,
          view: updatedUnitView.view,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your UnitView has been updated successfully');
        getUnitView();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (UnitViewID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/unitview/${UnitViewID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your UnitView has been Deleted successfully');
        getUnitView();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getUnitView() {
    try {
      let { data } = await axios.get(`${BasicURL}/unitview`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("UnitView");
      setUnitView(data);
      console.log(UnitView);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchUnitViews(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/unitview/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setUnitView(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchUnitViews(searchTerm);
    } else {
      getUnitView();
    }
  }, [searchTerm]);

  const renderUnitViews = UnitView.length > 0 ? (
    UnitView.map((UnitView) => (
      <tr key={UnitView.unitView_code}>
        <td>{UnitView.unitViewID}</td>
        <td>{UnitView.view}</td>
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(UnitView.unitView_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(UnitView)} title="Edit">
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
              placeholder="Search for a UnitView "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>UnitView Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New UnitView
            </button>
          </div>
        </div>
        {/* {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''} */}
        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                  <th>UnitView ID</th>
                  <th>View Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderUnitViews}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedUnitView && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit UnitView</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <input
                      type="text"
                      required
                      maxLength={8}
                      name="unitViewID"
                      className="form-control"
                      value={selectedUnitView.unitViewID}
                      onChange={(e) =>
                        setSelectedUnitView({
                          ...selectedUnitView,
                          unitViewID: e.target.value,
                        })
                      }
                      placeholder="Enter UnitViewID"
                    />
                    <input
                      type="text"
                      required
                      name="view"
                      className="form-control"
                      value={selectedUnitView.view}
                      onChange={(e) =>
                        setSelectedUnitView({
                          ...selectedUnitView,
                          view: e.target.value,
                        })
                      }
                      placeholder="Enter View"
                    />

                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedUnitView)}>
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
                  <Modal.Title>Add UnitView</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >UnitView ID: </label>
                      <input type="text" required maxLength={8} name='unitViewID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter UnitViewID" />
                    </div>
                    <div className={`form-group  ${style.formGroup}`}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >View Description: </label>
                      <input type="text" required name='view' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter Unit View" />
                    </div>

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add UnitView</button>
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



