import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'; // adjust the import based on your project structure
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './home.css';

export default function ViewManagers() {
  const [managers, setManagers] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    managerId: '',
    managerName: '',
    managerContact: '',
    managerEmail: '',
  });

  const navigate = useNavigate();

  const fetchManagers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewallmanagers`);
      const formattedManagers = response.data.map((item) => ({
        managerId: item.id,
        managerName: item.name,
        managerContact: item.contact,
        managerEmail: item.email,
      }));
      setManagers(formattedManagers);
      setFilteredManagers(formattedManagers);
    } catch (error) {
      console.error('Failed to fetch managers:', error);
      setError("Failed to fetch managers data ... " + error.message);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const deleteManager = async (cid) => {
    try {
      const response = await axios.delete(`${config.url}/admin/removemanager/${cid}`);
      toast.success(response.data);
      alert("Manager is deleted");
      fetchManagers();
    } catch (err) {
      console.log(err);
      setError("Unexpected Error Occurred... " + err.message);
      toast.error("Deletion failed: " + err.message);
    }
  };

  const handleFilterChange = (e, field) => {
    const value = e.target.value;
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);

    const filtered = managers.filter((manager) => {
      return (
        (updatedFilters.managerId === '' || manager.managerId.toString().includes(updatedFilters.managerId)) &&
        (updatedFilters.managerName === '' || manager.managerName.toLowerCase().includes(updatedFilters.managerName.toLowerCase())) &&
        (updatedFilters.managerContact === '' || manager.managerContact.includes(updatedFilters.managerContact)) &&
        (updatedFilters.managerEmail === '' || manager.managerEmail.toLowerCase().includes(updatedFilters.managerEmail.toLowerCase()))
      );
    });

    setFilteredManagers(filtered);
  };

  return (
    <div className="manager-system">
      <h1>Available Managers</h1>
      <div style={{ paddingLeft: "880px" }}>
        <button className="add-button" onClick={() => navigate('/addmanager')}>Add</button>
      </div>
      <div className="table-container">
        <table className="manager-table">
          <thead>
            <tr>
              <th>MANAGER_ID</th>
              <th>MANAGER_NAME</th>
              <th>MANAGER_EMAIL</th>
              <th>MANAGER_CONTACT</th>
              <th>ACTION</th>
            </tr>
            <tr className="filter-row">
              <th>
                <input
                  type="text"
                  placeholder="Search ID..."
                  value={filters.managerId}
                  onChange={(e) => handleFilterChange(e, 'managerId')}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search Name..."
                  value={filters.managerName}
                  onChange={(e) => handleFilterChange(e, 'managerName')}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search Email..."
                  value={filters.managerEmail}
                  onChange={(e) => handleFilterChange(e, 'managerEmail')}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search Contact..."
                  value={filters.managerContact}
                  onChange={(e) => handleFilterChange(e, 'managerContact')}
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredManagers.map((manager) => (
              <tr key={manager.managerId}>
                <td>{manager.managerId}</td>
                <td>{manager.managerName}</td>
                <td>{manager.managerEmail}</td>
                <td>{manager.managerContact}</td>
                <td className="action-column">
                  <button
                    className="action-button contact-button"
                    onClick={() => navigate(`/managerprofile/${manager.managerId}`)}
                  >
                    View
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => deleteManager(manager.managerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
