import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';
export default function UserRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    gender: '',
    age: '',
    password: '',
    confirmPassword: '',
    email: '',
    contact: '',
    address: '',
    dob: ''
  });
  const navigate = useNavigate()
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const {setIsUserLoggedIn} = useAuth();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setMessage('');
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData; // exclude confirmPassword
      const response = await axios.post('http://localhost:2010/admin/adduser', submitData);
      if (response.status === 200) {
        setMessage("User registered successfully!");
        setError('');
        setFormData({
          name: '',
          username: '',
          gender: '',
          age: '',
          password: '',
          confirmPassword: '',
          email: '',
          contact: '',
          address: '',
          dob: ''
        });
        setIsUserLoggedIn(true);
          sessionStorage.setItem('user', JSON.stringify(response.data));
          navigate("/userhome");
      }
      
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "100%", margin: "auto", padding: "20px", color:"white" }}>
      <h3 style={{ textAlign: "center", textDecoration: "underline", marginBottom: "40px" }}>
        User Registration
      </h3>

      {
        message ?
          <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>{message}</p> :
          <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</p>
      }

      <form onSubmit={handleSubmit} style={{ width: "70%", margin: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px"
          }}
        >
          <div>
            <label>Full Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }} />
          </div>

          <div>
            <label>Username</label>
            <input type="text" id="username" value={formData.username} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }} />
          </div>

          <div>
            <label>Gender</label>
            <select id="gender" value={formData.gender} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label>Age</label>
            <input type="number" step="0.1" id="age" value={formData.age} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }} />
          </div>

          <div>
            <label>Date of Birth</label>
            <input type="text" id="dob" placeholder="dd-mm-yyyy" value={formData.dob} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }} />
          </div>

          <div>
            <label>Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }} />
          </div>

          <div>
            <label>Contact</label>
            <input type="text" id="contact" value={formData.contact} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }} />
          </div>

          <div>
            <label>Address</label>
            <input type="text" id="address" value={formData.address} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }} />
          </div>

          <div>
            <label>Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }} />
          </div>

          <div>
            <label>Confirm Password</label>
            <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
              required style={{ width: "100%", padding: "10px" }} />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button type="submit" style={{ padding: "12px 40px", fontSize: "16px" }}>Register</button>
        </div>
      </form>
    </div>
  );
}
