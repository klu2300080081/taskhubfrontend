import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from './../config';

export default function ManagerProfile() {
  const { id } = useParams();
  const [manager, setManager] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch manager details
    axios.get(`http://localhost:2010/admin/getmanager/${id}`)
      .then(response => {
        setManager(response.data);
      })
      .catch(err => {
        console.error("Error fetching manager:", err);
        setError("Failed to fetch manager data.");
      });

    // Fetch projects for the manager
    axios.get(`http://localhost:2010/manager/mypojects/${id}`)
      .then(response => {
        setProjects(response.data);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects.");
      });
  }, [id]);

  if (error) {
    return (
      <div style={styles.centered}>
        {error}
      </div>
    );
  }

  if (!manager) {
    return (
      <div style={styles.centered}>
        Loading profile...
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: 440 }}>
      <h2>
        <span role="img" aria-label="manager" style={{ fontSize: '32px' }}>🧑‍💼</span>
        Manager Profile
      </h2>

      <div style={styles.profileBox}>
        {[
          ['ID', manager.id],
          ['Name', manager.name],
          ['Username', manager.username],
          ['Date of Birth', manager.dob],
          ['Gender', manager.gender],
          ['Department', manager.department],
          ['Email', manager.email],
          ['Contact', manager.contact],
        ].map(([label, value]) => (
          <p key={label} style={styles.profileItem}>
            <strong style={{ color: '#34495e' }}>{label}:</strong>{' '}
            <span style={{ color: '#555' }}>{value}</span>
          </p>
        ))}
      </div>

      <div style={{ ...styles.profileBox, marginTop: '40px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Projects Assigned: {projects.length}</h3>
        {projects.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Project ID</th>
                <th style={styles.th}>Project Title</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td style={styles.td}>{project.id}</td>
                  <td style={styles.td}>{project.title}</td>
                  <td style={styles.td}>{project.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#888' }}>No projects assigned.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
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
    color: 'black',
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
    color: '#666',
    paddingTop: '80px',
  }
};
