import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import config from '../config';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Viewprojects() {

  const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");

    const projectsData = async () => 
    {
        try 
        {
            const response = await axios.get(`${config.url}/admin/viewallprojects`);
            setProjects(response.data);
        } 
        catch (err) 
        {
            setError("Failed to fetch customers data ... " + err.message);
        }
    };

    useEffect(() => {
        projectsData();
    }, []);
    const navigate = useNavigate()
   const handleClick =() =>{
    navigate("/createproject")
   }

  return (
    <div className='container'>
      <center >
            <h3 style={{ textAlign: "center", color: "white", fontWeight: "bolder" }}>
                Projects
            </h3>

            
              <div  style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="add-button"  variant="outlined" onClick={handleClick}>Add Project</button>
              </div>
              {error ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    {error}
                </p>
            ) : projects.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    No Customer Data Found
                </p>
            ) : (

                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Manager</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Review</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.manager.name}</td>
                                <td>{p.description}</td>
                                <td>{p.type}</td>
                                <td>{p.status}</td>
                                <td>{p.review}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </center>
            

            
        </div>
  )
}
