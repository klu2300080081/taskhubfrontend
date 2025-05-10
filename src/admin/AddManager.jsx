import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';

export default function AddManager() {
  const [newManager, setNewManager] = useState({
    name: "",
    username: "",
    password: "",
    dob: "",
    gender: "",
    company: "",
    email: "",
    contact: "",
    address: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManager({ ...newManager, [name]: value });
  };

  const addManager = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.url}/admin/addmanager`, newManager);
      alert("Manager added successfully!");
      navigate('/managers'); // 👈 navigate back after successful addition
    } catch (err) {
      setError("Failed to add manager: " + err.message);
      alert("Failed to add manager. Please try again.");
    }
  };

  return (
    <div className="create-project-container">
        <h2>Add manager</h2>
      <form onSubmit={addManager}>
        <div className="form-row" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {[
            { label: "Manager Name", name: "name", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Password", name: "password", type: "password" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Company", name: "company", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Contact Number", name: "contact", type: "text" },
          ].map(field => (
            <div className="form-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}:</label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={newManager[field.name]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={newManager.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: "1 1 100%" }}>
            <label htmlFor="Address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={newManager.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group" style={{ flex: "1 1 100%" }}>
            <button type="submit" className="submit-button">Add Manager</button>
          </div>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
