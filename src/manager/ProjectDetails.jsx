import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [reviewDialogVisible, setReviewDialogVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedReview, setSelectedReview] = useState('');

  useEffect(() => {
    fetchProject();
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:2010/manager/getproject/${id}`);
      setProject(response.data);
    } catch (err) {
      setError('Failed to fetch project details: ' + err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:2010/admin/viewallusers');
      const assignedUserIds = tasks.map(t => t.user.id);
      const availableUsers = response.data.filter(u => !assignedUserIds.includes(u.id));
      setUsers(availableUsers);
    } catch (err) {
      setError('Failed to fetch users: ' + err.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:2010/manager/gettasks/${id}`);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks: ' + err.message);
    }
  };

  const updateProjectStatus = async () => {
    if (tasks.length === 0) return;
    const completedCount = tasks.filter(task => task.review === 'completed').length;
    const total = tasks.length;
    const percentage = Math.round((completedCount / total) * 100);
    const newStatus = percentage === 100 ? 'completed' : `Incomplete`;
    try {
      await axios.get(`http://localhost:2010/manager/updateproject/${newStatus}/${project.id}`);
       console.log(newStatus,project.id)
      fetchProject();
    } catch (err) {
        console.log(newStatus,project.id)
      setError('Failed to update project status: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedUser = users.find((u) => u.id === parseInt(selectedUserId));
      const manager = JSON.parse(sessionStorage.getItem('manager'));

      const taskData = {
        project: project,
        user: selectedUser,
        description: description,
        type: category,
        status: '-',
        review: '-',
        deadline: deadline,
        isSeftTask: 'false'
      };

      await axios.post('http://localhost:2010/manager/assigntask', taskData);
      setMessage('Task assigned successfully!');
      fetchTasks();
      fetchUsers();
    } catch (err) {
      setError('Failed to assign task: ' + err.message);
    }
  };

  const openReviewDialog = (taskId) => {
    setSelectedTaskId(taskId);
    setReviewDialogVisible(true);
  };

  const submitReview = async () => {
    if (!selectedReview || !selectedTaskId) return;
    try {
      await axios.get(`http://localhost:2010/manager/reviewtask/${selectedReview}/${selectedTaskId}`);
      setMessage('Review updated successfully!');
      setReviewDialogVisible(false);
      setSelectedReview('');
      setSelectedTaskId(null);
      await fetchTasks();
      updateProjectStatus();
    } catch (err) {
      setError('Failed to update review: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>Project Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'lightgreen' }}>{message}</p>}

      {!project ? (
        <p>Loading project details...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Manager Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Status</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{project.id}</td>
              <td>{project.manager?.name}</td>
              <td>{project.description}</td>
              <td>{project.type}</td>
              <td>{project.status}</td>
              <td>{project.review}</td>
            </tr>
          </tbody>
        </table>
      )}

      <h3 style={{ marginTop: '30px' }}>Assign Task</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div>
          <label>User:</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Task Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            <option value="software">Software</option>
            <option value="marketing">Marketing</option>
            <option value="inter relation">Inter relation</option>
          </select>
        </div>

        <div>
          <label>Description:</label>
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          ></textarea>
        </div>

        <div>
          <label>Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>
          Assign Task
        </button>
      </form>

      <h3 style={{ marginTop: '40px' }}>Tasks in Project</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Description</th>
            <th>Status</th>
            <th>Review</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.user?.name}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.review}</td>
              <td>{task.deadline}</td>
              <td>
                <button className="action-button contact-button" onClick={() => openReviewDialog(task.id)}>Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reviewDialogVisible && (
        <div style={{ marginTop: '20px', background: '#444', padding: '20px', borderRadius: '10px' }}>
          <h4>Review Task</h4>
          <select
            value={selectedReview}
            onChange={(e) => setSelectedReview(e.target.value)}
          >
            <option value="">Select review status</option>
            <option value="inprogress">In Progress</option>
            <option value="partially completed">Partially Completed</option>
            <option value="completed">Completed</option>
          </select>
          <br /><br />
          <button onClick={submitReview} className='action-button contact-button'>Submit Review</button>
        </div>
      )}
    </div>
  );
}
