
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './City.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function City() {
  // new URL
  const BasicURL='https://newtrial.c-78984ef.kyma.ondemand.com'
  //const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
  const [City, setCity] = useState([]);
  const [addMsg, setAddMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);


  const token = localStorage.getItem('token');

  // to handle modal for add
  const [addShow, setaddShow] = useState(false);
  const handleAddClose = () => setaddShow(false);
  const handleAddShow = () => setaddShow(true);

  // handle modal for edit
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelectedCity(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (City) => {
    setSelectedCity(City);
    handleShow();
  };

  let [newCity, setNewCity] = useState({
    citiesID: '',
    regionalLocation: ''

  });


  function getFormValue(e) {
    let myCity = { ...newCity }
    myCity[e.target.name] = e.target.value
    setNewCity(myCity);// update City data
    console.log(myCity)
  }
  // call add API 
  async function submitFormData(e) {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `${BasicURL}/cities`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        citiesID: newCity.citiesID,
        regionalLocation: newCity.regionalLocation
      }
    };

    const response = await axios(options);
    console.log(response);
    if (response.status == 200) {
      console.log("200")
      setAddMsg("Your City have been added successfully")
      getCity()
    }
  }


  // call update API
  const handleUpdate = async (updatedCity) => {
    try {
      const options = {
        method: 'PUT',
        url: `${BasicURL}/cities/${updatedCity.cities_code}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          cities_code:updatedCity.cities_code,
          citiesID: updatedCity.citiesID,
          regionalLocation: updatedCity.regionalLocation,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setUpdateMsg('Your City has been updated successfully');
        getCity();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call delete API
  const handleDelete = async (CityID) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${BasicURL}/cities/${CityID}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios(options);
      console.log(response);

      if (response.status === 200) {
        console.log('200');
        setDeleteMsg('Your City has been Deleted successfully');
        getCity();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call get API
  async function getCity() {
    try {
      let { data } = await axios.get(`${BasicURL}/cities`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(data);
      console.log("City");
      setCity(data);
      console.log(City);
    } catch (error) {
      console.error(error);
    }
  }

  // call search API
  async function searchCitys(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/cities/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setCity(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      searchCitys(searchTerm);
    } else {
      getCity();
    }
  }, [searchTerm]);

  const renderCitys = City.length > 0 ? (
    City.map((City) => (
      <tr key={City.cities_code}>
        <td>{City.citiesID}</td>
        <td>{City.regionalLocation}</td>
        <td>
          <button className={style.iconButton} onClick={() => handleDelete(City.cities_code)} title="Delete">
            <RiDeleteBinLine style={{ color: 'red' }} />
          </button>
          <button className={style.iconButton} onClick={() => handleEdit(City)} title="Edit">
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
              placeholder="Search for a City "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
            <h2>City Details</h2>
          </div>

          <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
            <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
              Add New City
            </button>
          </div>
        </div>



        {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''}

        <div className="row">
          <div className="table-responsive m-auto">
            <table className="table table-striped table-hover table-head text-center">
              <thead>
                <tr>
                  <th>City ID</th>
                  <th>Regional Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderCitys}
              </tbody>
            </table>

            {/* Render the edit modal */}
            {selectedCity && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <input
                      type="text"
                      required
                      maxLength={8}
                      name="citiesID"
                      className="form-control m-3"
                      value={selectedCity.citiesID}
                      onChange={(e) =>
                        setSelectedCity({
                          ...selectedCity,
                          CityID: e.target.value,
                        })
                      }
                      placeholder="Enter CityID"
                    />
                    <input
                      type="text"
                      required
                      name="regionalLocation"
                      className="form-control m-3"
                      value={selectedCity.regionalLocation}
                      onChange={(e) =>
                        setSelectedCity({
                          ...selectedCity,
                          regionalLocation: e.target.value,
                        })
                      }
                      placeholder="Enter RegionalLocation"
                    />

                  </form>

                  {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdate(selectedCity)}>
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
                  <Modal.Title>Add City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitFormData}>
                    <div className={`form-group  ${style.formGroup}`}>

                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >City ID: </label>
                      <input type="text" required maxLength={8} name='citiesID' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="numberHelp" placeholder="Enter CityID" />
                    </div>
                    <div className={`form-group  ${style.formGroup}`}>
                      <label htmlFor="exampleInputText1" className={`${style.lable}`} >Regional Location: </label>
                      <input type="text" required name='regionalLocation' className="form-control" onChange={getFormValue} id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter RegionalLocation" />
                    </div>


                 

                    <button type="submit" className={`w-100 ${style.imageButton}`}>Add City</button>
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



