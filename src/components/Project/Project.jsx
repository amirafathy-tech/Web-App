import React, { useState, useEffect } from 'react';
import style from './Project.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Project() {

    let [Project, setProject] = useState([]);

    async function getProject() {
        let { data } = await axios.get("https://bcbf775e-2518-44b8-a2eb-3ff6c0f1b2b1.mock.pstmn.io/project");
        console.log(data);
        console.log("project");
        
        setProject(data);
        console.log(Project);
    }

    useEffect(() => {
        getProject();
    }, []);

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
                                <th>CompanyCode</th>
                                <th>CompanyDescription</th>
                                <th>Description</th>
                                <th>ValidFrom</th>
                                <th>Regional Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Project.map((item, id) => (
                                <tr key={id}>
                                    <td>{item.ID}</td>
                                    <td>{item.companyCode}</td>
                                    <td>{item.companyDescription}</td>
                                    <td>{item.Description}</td>
                                    <td>{item.ValidFrom}</td>
                                    <td>{item.RegionalLocation}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        
        </>
    )

}