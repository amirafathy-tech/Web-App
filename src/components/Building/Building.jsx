
import React, { useState, useEffect } from 'react';
import style from './Building.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Building() {
    let [building, setBuilding] = useState([]);


    const token=localStorage.getItem('token')
    
    const authAPI="https://newrecipe.c-910f80f.kyma.ondemand.com/buildings"
    async function getBuilding() {
        // let { data } = await axios.get("https://recipe.c-910f80f.kyma.ondemand.com/buildings");
        let { data } = await axios.get("https://newrecipe.c-910f80f.kyma.ondemand.com/buildings",{ headers: {"Authorization" : `Bearer ${token}`} });
        console.log("AuthAPIResponse:  "+authAPI+"-->"+data); 
        setBuilding(data);
        console.log(token);
    }

    useEffect(() => {
        getBuilding();
    }, []);

    return (
        <div className={`container`}>
            <div className={``}>
                <h1 className={`${style.maincolor}`}>Buildings</h1>

                <div className='table-responsive'>

                    <table className={`table  table-striped table-hover table-head text-center`}>
                        <thead>
                            <tr className={``}>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Zone</th>
                                <th>cCode</th>
                                <th>Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            {building.map((item, id) => (
                                <tr key={id}>
                                    <td>{item.buildingCode}</td>
                                    <td>{item.description}</td>
                                    <td>{item.type}</td>
                                    <td>{item.zone}</td>
                                    <td>{item.cCode}</td>
                                    <td >
                                        <Link className={`${style.maincolor} text-decoration-none`} to={`/building/${item.buildingCode}/units`}>Available Units</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}