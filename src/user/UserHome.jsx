import React, { useEffect, useState } from 'react';
import './user.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';


export default function UserHome() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      fetchTasks(user.id);
    }
  }, []);

  const fetchTasks = async (uid) => {
    try {
      const response = await axios.get(`http://localhost:2010/user/usertasks/${uid}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const handleTaskClick = (taskId) => {
    navigate(`/viewtasks`);
  };

  return (
    <div className="user-home">
      <div className="dashboard">
        <h3 className="dashboard-title"><u>Dashboard</u></h3>

        <div className="progress-container">
          <h2 className="progress-title">In Progress Tasks:</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <label>
            <h3 className="completed-label">Completed Tasks: {completedTasks} / {totalTasks}</h3>
          </label>
        </div>

        <h3 className="task-heading">TASK TO-DO</h3>
        <div className="task-grid">
          {tasks.map((task, index) => (
            <div
              className="task-card"
              key={task.id || index}
              onClick={() => handleTaskClick(task.id)}
              style={{ cursor: 'pointer' }}
            >
              <h2>Task - {index + 1}</h2>
              <p><strong>Description:</strong> {task.description || "N/A"}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Task:</strong> {task.task}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
