
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './Currency.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function Currency() {
  // new URL
  const BasicURL = 'https://dev.c-1e53052.kyma.ondemand.com'
  const [Currency, setCurrency] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(null);

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
    setUpdateMsg('');
    setSelectedCurrency(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (Currency) => {
    console.log(Currency);
    setSelectedCurrency(Currency);
    console.log("selected");
    console.log(selectedCurrency);
    handleShow();
  };

  let [newCurrency, setNewCurrency] = useState({
    currencyID: '',
    currencyDescription: '',

  });


  function getFormValue(e) {
    let myCurrency = { ...newCurrency }
    myCurrency[e.target.name] = e.target.value
    setNewCurrency(myCurrency);// update Currency data
    console.log(myCurrency)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/currency`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        currencyID: newCurrency.currencyID,
        currencyDescription: newCurrency.currencyDescription,
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your Currency have been added successfully")
      getCurrency()
    }
  }


  // call update API
  const handleUpdate = async (updatedCurrency) => {
    console.log(updatedCurrency);
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/currency/${updatedCurrency.currency_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          currency_code: updatedCurrency.currency_code,
          currencyID: updatedCurrency.currencyID,
          currencyDescription: updatedCurrency.currencyDescription,

        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your Currency has been updated successfully');
        getCurrency();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (CurrencyID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/currency/${CurrencyID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your Currency has been Deleted successfully');
        getCurrency();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getCurrency() {
    try {
      let { data } = await axios.get(`${BasicURL}/currency`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("Currency");
      setCurrency(data);
      console.log(Currency);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchCurrencys(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/currency/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setCurrency(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchCurrencys(searchTerm);
    } else {
      getCurrency();
    }
  }, [searchTerm]);

  const renderCurrencys = Currency.length > 0 ? (
    Currency.map((Currency) => (
      <tr key={Currency.currency_code}>
        <td>{Currency.currencyID}</td>
        <td>{Currency.currencyDescription}</td>

        <td>
          <button className={style.iconButton} onClick={() => handleDelete(Currency.currency_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(Currency)} title="Edit">
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
              placeholder="Search for a currency"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={`col-sm ${style.maincolor}`}><h2>Currency Details</h2></div>
          <div className="col-sm">  <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
            Add New Currency
          </button></div>
        </div>

        {/* <div className="row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <input
              className={`${style.searchInput}`}
              type="search"
              placeholder="Search for a Cuurency "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>Cuurency Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New Cuurency
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

                  <th>Currency ID</th>
                  <th>Currency Description</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderCurrencys}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedCurrency && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Cuurency</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>

                    <div className={`form-group `}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Currency Code: </label>
                      <input
                        type="text"
                        required
                        maxLength={8}
                        name="currencyID"
                        className="form-control m-3"
                        value={selectedCurrency.currencyID}
                        onChange={(e) =>
                          setSelectedCurrency({
                            ...selectedCurrency,
                            currencyID: e.target.value,
                          })
                        }
                        placeholder="Enter currencyID"
                      />
                    </div>

                    <div className={`form-group `}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Currency Description: </label>
                      <input
                        type="text"
                        required
                        name="currencyDescription"
                        className="form-control m-3"
                        value={selectedCurrency.currencyDescription}
                        onChange={(e) =>
                          setSelectedCurrency({
                            ...selectedCurrency,
                            currencyDescription: e.target.value,
                          })
                        }
                        placeholder="Enter currencyDescription"
                      />
                    </div>
                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedCurrency)}>
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
                  <Modal.Title>Add Cuurency</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Currency Code: </label>
                      <input type="text" required maxLength={8} name='currencyID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="numberHelp" placeholder="Enter currencyID" />
                    </div>

                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Currency Description: </label>
                      <input type="text" required name='currencyDescription' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter currencyDescription" />
                    </div>


                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add Cuurency</button>
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



