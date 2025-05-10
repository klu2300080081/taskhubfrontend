import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'; // Adjust path if necessary
import { useNavigate } from 'react-router-dom';
import './home.css'
import { toast } from 'react-toastify';
import { X } from '@mui/icons-material';
export default function ViewUsers() {
  const [users, setUsers] = useState([]);
   const [error, setError] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    email: '',
    contact: '',
  });
  const navigate =useNavigate()
  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewallusers`);
      setUsers(response.data);
      setFilteredUsers(response.data);
      
    } catch (err) {
      console.error('Error fetching users:', err);
       setError("Failed to fetch customers data ... " + err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (cid) => 
    {
        try 
        {
            const response = await axios.delete(`${config.url}/admin/removeuser/${cid}`);
            toast.success(response.data); 
            alert("User is deleted"); // show success toast
            fetchUsers()           // refresh customer list
        } 
        catch (err) 
        {
            console.log(err);
            setError("Unexpected Error Occurred... " + err.message);
            toast.error("Deletion failed: " + err.message); // show error toast
        }
    };
  // Handle filter changes
  const handleFilterChange = (e, field) => {
    const value = e.target.value;
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);

    const filtered = users.filter(user => {
      return (
        (updatedFilters.id === '' || user.id.toString().includes(updatedFilters.id)) &&
        (updatedFilters.name === '' || user.name.toLowerCase().includes(updatedFilters.name.toLowerCase())) &&
        (updatedFilters.email === '' || user.email.toLowerCase().includes(updatedFilters.email.toLowerCase())) &&
        (updatedFilters.contact === '' || user.contact.includes(updatedFilters.contact))
      );
    });

    setFilteredUsers(filtered);
  };

  return (
    <div className="manager-system">
      <h1 style={{color:"white"}}>All Users</h1>
      <div style={{paddingLeft:"840px"}}> 
        <button className="add-button"  onClick={() =>{navigate('/addmanager')}}>Add</button>
        </div>
      <div className="table-container">
        <table className="manager-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>CONTACT</th>
              <th>ACTION</th>
            </tr>
            <tr className="filter-row">
              <th>
                <input
                  type="text"
                  placeholder="Search ID..."
                  value={filters.id}
                  onChange={(e) => handleFilterChange(e, 'id')}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search Name..."
                  value={filters.name}
                  onChange={(e) => handleFilterChange(e, 'name')}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search Email..."
                  value={filters.email}
                  onChange={(e) => handleFilterChange(e, 'email')}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search Contact..."
                  value={filters.contact}
                  onChange={(e) => handleFilterChange(e, 'contact')}
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td className="action-column">
                  <button className="action-button contact-button" onClick={() => navigate(`/userprofile/${user.id}`)}>
                    view
                  </button>
                  <button className="action-button delete-button" onClick={() => deleteUser(user.id)}>
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
