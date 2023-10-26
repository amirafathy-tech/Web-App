import React, { useState, useEffect } from 'react';
import style from './Project.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Project() {

    let [Project, setProject] = useState([]);

    // async function getProject() {
    //     let { data } = await axios.get("https://recipe.c-910f80f.kyma.ondemand.com/Projects");
    //     setProject(data);
    // }

    // useEffect(() => {
    //     getProject();
    // }, []);

    return (
        <>

<div className={`container`}>
            <div className={``}>
                <h1 className={`${style.maincolor}`}>Projects</h1>

                <div className='table-responsive'>

                    <table className={`table  table-striped table-hover table-head text-center`}>
                        <thead>
                            <tr className={``}>
                                <th>ID</th>
                                <th>Description</th>
                                <th>ValidFrom</th>
                                <th>Regional Location</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {Project.map((item, id) => (
                                <tr key={id}>
                                    <td>{item.buildingCode}</td>
                                    <td>{item.description}</td>
                                    <td>{item.type}</td>
                                    <td>{item.zone}</td>
                                    <td>{item.cCode}</td>
                                    <td >
                                        <Link className={ `${style.maincolor} text-decoration-none`} to={`/building/${item.buildingCode}/units`}>Available Units</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody> */}
                    </table>
                </div>
            </div>
        </div>
    
        
        </>
    )

}