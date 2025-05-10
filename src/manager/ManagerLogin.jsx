import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function ManagerLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captchaInput: ''
  });
  const [captcha, setCaptcha] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setIsManagerLoggedIn } = useAuth();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.captchaInput !== captcha) {
      setError("Captcha does not match. Please try again.");
      generateCaptcha();
      return;
    }

    try {
      const response = await axios.post(`${config.url}/manager/checkmanagerlogin`, {
        username: formData.username,
        password: formData.password
      });

      if (response.status === 200) {
        setIsManagerLoggedIn(true);
        sessionStorage.setItem('manager', JSON.stringify(response.data));
        navigate("/managerhome");
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline", color: "white",padding:"20px" }}>Manager Login</h3>
      {message ? (
        <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p>
      ) : (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Captcha:</label>
          <div style={{
            backgroundColor: "#f0f0f0",
            display: "inline-block",
            padding: "8px 16px",
            fontWeight: "bold",
            fontSize: "20px",
            letterSpacing: "3px",
            userSelect: "none",
            fontFamily: "monospace",
            marginBottom: "8px"
          }}>
            {captcha}
          </div>
          <button
            type="button"
            onClick={generateCaptcha}
            style={{
              marginLeft: '10px',
              padding: '6px 12px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#007BFF'}
          >
            Refresh
          </button>
          <input
            type="text"
            id="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            required
            placeholder="Enter CAPTCHA above"
            style={{ display: "block", marginTop: "10px" }}
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}
