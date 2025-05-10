import React from 'react';

export default function About() {
  return (
    <div style={{
      padding: '60px 20px',
     
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '800px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '36px',
          color: '#2c3e50',
          marginBottom: '20px',
        }}>
          🗂️ Task Management System
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#555',
        }}>
          A <strong>Task Management System</strong> is a software application designed to help individuals and teams 
          plan, track, and manage tasks efficiently. It streamlines workflows by organizing tasks into lists, assigning 
          responsibilities, setting deadlines, tracking progress, and providing notifications or analytics.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#555',
          marginTop: '20px'
        }}>
          Whether you're managing personal to-dos or leading a project team, a task management system ensures 
          <strong> nothing falls through the cracks</strong>. It boosts productivity, promotes accountability, and supports 
          effective collaboration.
        </p>
      </div>
    </div>
  );
}
