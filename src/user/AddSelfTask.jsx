import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddSelfTask() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("User not found in session storage.");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not available");
      return;
    }

    const taskData = {
      project: null,
      user: user,
      description: description,
      type: category,
      status: "-",
      review: "-",
      deadline: deadline,
      isSeftTask: true
    };

    axios.post('http://localhost:2010/user/addselftask', taskData)
      .then((res) => {
        alert("Task Assigned Successfully");
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error assigning task:", err);
        alert("Failed to assign task");
      });
  };

  return (
    <div>
      <div
        className="assign-task-container"
        style={{ textAlign: "center", textDecoration: "underline", color: "white", padding: "40px" }}
      >
        <h2 style={{ padding: "20px" }}>Assign Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Task Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            <option value="software">Software</option>
            <option value="marketing">Marketing</option>
            <option value="inter relation">Inter relation</option>
          </select>

          <div>
            <label>Description:</label>
            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div id="date">
            <label>Deadline:</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <button type="submit">Assign Task</button>
        </form>
      </div>
    </div>
  );
}
