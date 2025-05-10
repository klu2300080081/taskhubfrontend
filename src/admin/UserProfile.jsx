import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import config from './../config';
import { color, display, width } from '@mui/system';

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user details
    axios.get(`http://localhost:2010/admin/getuser/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user data.");
      });

    // Fetch tasks for the user
    axios.get(`${config.url}/user/usertasks/${id}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks.");
      });
  }, [id]);

  if (error) {
    return (
      <div style={styles.centered}>
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.centered}>
        Loading profile...
      </div>
    );
  }

  return (
    <div style={{paddingLeft:440}}>
      <h2 >
        <span role="img" aria-label="user" style={{ fontSize: '32px' }}>👤</span>
        User Profile
      </h2>

      <div style={styles.profileBox}>
        {[
          ['ID', user.id],
          ['Name', user.name],
          ['Username', user.username],
          ['Date of Birth', user.dob],
          ['Gender', user.gender],
          ['Company', user.company],
          ['Email', user.email],
          ['Contact', user.contact],
        ].map(([label, value]) => (
          <p key={label} style={styles.profileItem}>
            <strong style={{ color: '#34495e' }}>{label}:</strong>{' '}
            <span style={{ color: '#555' }}>{value}</span>
          </p>
        ))}
      </div>

      <div style={{ ...styles.profileBox, marginTop: '40px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Tasks Assigned: {tasks.length}</h3>
        {tasks.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Task ID</th>
                <th style={styles.th}>Task Name</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td style={styles.td}>{task.id}</td>
                  <td style={styles.td}>{task.description}</td>
                  <td style={styles.td}>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#888' }}>No tasks assigned.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    backgroundColor: '#4C4E4F',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    color: '#222',
    position: 'absolute',
    top: '60%',
    left: '50%',
    minWidth: "60%",
    transform: 'translate(-50%, -50%)',
  },
  title: {
    fontSize: '32px',
    color: '#fff',
    marginBottom: '30px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profileBox: {
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    padding: '30px',
    width: '90%',
    maxWidth: '600px',
    border: '1px solid #e1e4e8',
  },
  profileItem: {
    marginBottom: '12px',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: 'black',
  },
  th: {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '2px solid #ccc',
    backgroundColor: '#f9f9f9',
    color:"black",
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    fontSize: '20px',
    color: '#666'
  }
};
