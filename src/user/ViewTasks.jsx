import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [statusText, setStatusText] = useState('');
  const [userId,setUserId] = useState(1)
  

useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      fetchTasks(userId);
      
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

  const handleUpdateClick = (taskId) => {
    setSelectedTaskId(taskId);
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setStatusText('');
    setFile(null);
  };

  const handleSubmit = async () => {
    try {
      if (!statusText) {
        alert('Please enter a status message');
        return;
      }

      const url = `http://localhost:2010/user/updateselftask/${statusText}/${selectedTaskId}`;
      await axios.get(url);
      fetchTasks(userId);
      alert('Status updated successfully!');
      handleDialogClose();
      
    } catch (err) {
      // alert('Error updating status');
      console.error(err);
    }
  };

  return (
    <div style={{paddingLeft:"200px"}}>
      <h1  style ={{color: "white", display:"flex", justifyContent:"center"}}>My Tasks</h1>
      <div className="table-container">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>TASK ID</th>
              <th>DESCRIPTION</th>
              <th>STATUS</th>
              <th>DEADLINE</th>
              <th>REVIEW</th>
              <th>IS SELF TASK</th>
              <th>UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.deadline}</td>
                <td>{task.review}</td>
                <td>{task.isSelfTask ? 'Yes' : 'No'}</td>

                <td>
                  {task.review.toLowerCase() !== 'complete' ? (
                    <button onClick={() => handleUpdateClick(task.id)} className='action-button contact-button'>Update</button>
                  ) : (
                    <i>Completed</i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Update Task Progress</h3>
            <input
              type="file"
              
              style={{ display: 'block', margin: '10px 0' }}
            />
            <input
              type="text"
              placeholder="Enter status..."
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              style={{ display: 'block', margin: '10px 0', width: '100%' }}
            />
            <button onClick={handleSubmit} style={{ marginRight: '10px' }}  className='action-button contact-button'>Submit</button>
            <button onClick={handleDialogClose} className='action-button contact-button'>Cancel</button>
          </div>
        </div>
      )}

      {/* Dialog Styles */}
      <style>
        {`
          .dialog-overlay {
            position: fixed;
            width:100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .dialog-box {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            width: 300px;
          }
        `}
      </style>
    </div>
  );
}
