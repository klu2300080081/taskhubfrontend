import React, { useEffect, useState } from 'react';
import './manager.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ManagerHome() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      const manager = JSON.parse(storedManager);
      fetchProjects(manager.id);
    }
  }, []);

  const fetchProjects = async (managerId) => {
    try {
      const response = await axios.get(`http://localhost:2010/manager/mypojects/${managerId}`);
      setProjects(response.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalProjects = projects.length;
  const progress = totalProjects === 0 ? 0 : (completedProjects / totalProjects) * 100;

  const handleProjectClick = (projectId) => {
    navigate(`/projectdetails/${projectId}`);
  };

  return (
    <div className="manager-home" style={{width:"100%", height:"100%"}}>
      <div className="dashboard">
        <h3 className="dashboard-title"><u>Dashboard</u></h3>

        <div className="progress-container">
          <h2 className="progress-title">In Progress Projects:</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <label>
            <h3 className="completed-label">Completed Projects: {completedProjects} / {totalProjects}</h3>
          </label>
        </div>

        <h3 className="task-heading">PROJECTS TO MANAGE</h3>
        <div className="task-grid">
          {projects.map((project, index) => (
            <div
              className="task-card"
              key={project.id || index}
              onClick={() => handleProjectClick(project.id)}
              style={{ cursor: 'pointer' }}
            >
              <h2>Project - {index + 1}</h2>
              <p><strong>Type:</strong> {project.type}</p>
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Status:</strong> {project.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
