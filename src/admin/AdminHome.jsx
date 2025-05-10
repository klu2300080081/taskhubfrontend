import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Card, CardContent } from "@/components/ui/card"; // Tailwind-based card component (optional)
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function AdminHome() {
  const [counts, setCounts] = useState({ users: 0, managers: 0, projects: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [usersRes, managersRes, projectsRes] = await Promise.all([
          axios.get('http://localhost:2010/admin/userscount'),
          axios.get('http://localhost:2010/admin/managerscount'),
          axios.get('http://localhost:2010/admin/projectscount'),
        ]);
        setCounts({
          users: usersRes.data,
          managers: managersRes.data,
          projects: projectsRes.data,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch counts");
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];
  const data = [
    { name: 'Users', value: counts.users },
    { name: 'Managers', value: counts.managers },
    { name: 'Projects', value: counts.projects },
  ];

  if (loading) {
    return <div style={styles.centered}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.centered}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Users</h3>
          <p style={styles.cardValue}>{counts.users}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Managers</h3>
          <p style={styles.cardValue}>{counts.managers}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Projects</h3>
          <p style={styles.cardValue}>{counts.projects}</p>
        </div>
      </div>

      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Overview</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width:"100%",
    padding: '40px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    color:"white",
    minHeight: '100vh',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '30px',
    ccolor:"white",
    fontWeight: '600',
    textAlign: 'center',
  },
  cards: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '40px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    minWidth: '180px',
  },
  cardTitle: {
    fontSize: '18px',
    color: '#636e72',
    marginBottom: '10px',
  },
  cardValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2d3436',
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  chartTitle: {
    fontSize: '22px',
    color:"white",
    marginBottom: '20px',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    fontSize: '20px',
    color: '#555',
  }
};
