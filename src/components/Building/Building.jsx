
import React, { useState, useEffect } from 'react';
import style from './Building.module.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function Building() {
    // new URL
    const BasicURL = 'https://newtrial.c-78984ef.kyma.ondemand.com'
    const token = localStorage.getItem('token')
    let [building, setBuilding] = useState([]);
    const [APIError, setAPIError] = useState('');
    const [addMsg, setAddMsg] = useState('');
    const [updateMsg, setUpdateMsg] = useState('');
    const [deleteMsg, setDeleteMsg] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBuilding, setSelectedBuilding] = useState(null);

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
        setSelectedBuilding(null);
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const handleEdit = (Building) => {
        setSelectedBuilding(Building);
        handleShow();
    };
    let [newBuilding, setNewBuilding] = useState({
        buildingID: '',
        buildingDescription: '',
        oldNumber: '',
        validFrom: Date,
        numberOfFloors: Number
    });

    function getFormValue(e) {
        let myBuilding = { ...newBuilding }
        myBuilding[e.target.name] = e.target.value
        setNewBuilding(myBuilding);// update Building data
        console.log(myBuilding)
    }
    // call add API 
    async function submitFormData(e) {
        e.preventDefault();
        try {
            const options = {
                method: 'POST',
                url: `${BasicURL}/buildings`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    buildingID: newBuilding.buildingID,
                    buildingDescription: newBuilding.buildingDescription,
                    oldNumber: newBuilding.oldNumber,
                    validFrom: newBuilding.validFrom,
                    numberOfFloors: Number(newBuilding.numberOfFloors)
                }
            };

            const response = await axios(options);
            console.log(response);
            if (response.status == 200) {
                console.log("200")
                setAddMsg("Your Building have been added successfully")
                getBuilding()
            }
        } catch (error) {
            console.error(error);
            setAPIError(error)
        }

    }

    // call update API
    const handleUpdate = async (updatedBuilding) => {
        try {
            const options = {
                method: 'PUT',
                url: `${BasicURL}/buildings/${updatedBuilding.building_code}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: {
                    building_code: updatedBuilding.building_code,
                    buildingID: updatedBuilding.buildingID,
                    buildingDescription: updatedBuilding.buildingDescription,
                    oldNumber: updatedBuilding.oldNumber,
                    validFrom: updatedBuilding.validFrom,
                    numberOfFloors: Number(updatedBuilding.numberOfFloors)
                },
            };
            const response = await axios(options);
            console.log(response);

            if (response.status === 200) {
                console.log('200');
                setUpdateMsg('Your Building has been updated successfully');
                getBuilding();
            }
        } catch (error) {
            console.error(error);
            setAPIError(error)
        }
    };

    // call delete API
    const handleDelete = async (BuildingID) => {
        try {
            const options = {
                method: 'DELETE',
                url: `${BasicURL}/buildings/${BuildingID}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const response = await axios(options);
            console.log(response);

            if (response.status === 200) {
                console.log('200');
                setDeleteMsg('Your Building has been Deleted successfully');
                getBuilding();
            }
        } catch (error) {
            console.error(error);
            setAPIError(error)
        }
    };

    // call get API
    async function getBuilding() {
        try {
            let { data } = await axios.get(`${BasicURL}/buildings`, { headers: { "Authorization": `Bearer ${token}` } });
            setBuilding(data);
        } catch (error) {
            console.error(error);
            setAPIError(error)
        }
    }

     // call search API
  async function searchBuildings(keyword) {
    try {
      const response = await axios.get(`${BasicURL}/buildings/search?keyword=${keyword}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(response)
      setBuilding(response.data);
    } catch (error) {
      console.error(error);
    }
  }

    // useEffect(() => {
    //     getBuilding();
    // }, []);
    useEffect(() => {
        if (searchTerm) {
          searchBuildings(searchTerm);
        } else {
          getBuilding();
        }
      }, [searchTerm]);


    const renderBuilding = building.length > 0 ? (
        building.map((Building) => (
            <tr key={Building.building_code}>
                <td>{Building.buildingID}</td>
                <td>{Building.buildingDescription}</td>
                <td>{Building.oldNumber}</td>
                <td>{Building.validFrom}</td>
                <td>{Building.numberOfFloors}</td>
                <td>
                    <button className={style.iconButton} onClick={() => handleDelete(Building.building_code)} title="Delete">
                        <RiDeleteBinLine style={{ color: 'red' }} />
                    </button>
                    <button className={style.iconButton} onClick={() => handleEdit(Building)} title="Edit">
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
            <div className={`container`}>

                <div className="row align-items-center justify-content-center">
                    {/* Search Bar */}
                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <input
                            className={`${style.searchInput}`}
                            type="search"
                            placeholder="Search for a Building "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}>
                        <h2>Building Details</h2>
                    </div>

                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <button className={`w-100 ${style.imageButton}`} onClick={handleAddShow}>
                            Add New Building
                        </button>
                    </div>
                </div>

                {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''}
                <div className={`row"`}>
                    <div className='table-responsive m-auto'>
                        <table className={`table  table-striped table-hover table-head text-center`}>
                            <thead>
                                <tr className={``}>
                                    <th>Building ID</th>
                                    <th>Building Description</th>
                                    {/* <th>Building Type</th> */}
                                    <th>Building OldNumber</th>
                                    <th>Valid From</th>
                                    <th>Number Of Floors</th>
                                    <th>Actions</th>
                                    {/* <th>Units</th> */}
                                </tr>
                            </thead>
                            <tbody>
                            {renderBuilding}
                                        {/* <td >
                                            <Link className={`${style.maincolor} text-decoration-none`} to={`/building/${item.buildingCode}/units`}>Available Units</Link>
                                        </td> */}
                            
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    );
}
