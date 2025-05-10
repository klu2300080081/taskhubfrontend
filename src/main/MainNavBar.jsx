import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import UserRegistration from '../user/UserRegistration';
import UserLogin from './../user/UserLogin';
import AdminLogin from './../admin/AdminLogin';
import ManagerLogin from './../manager/ManagerLogin';
import NotFound from './NotFound';
import './style.css';


export default function MainNavBar() 
{
  return (
    <div>
      <nav className="navbar">
      <div className="Logo"><h3> TASK HUB</h3>  </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/userregistration">Register</Link></li>
          <li className="dropdown">
            <span>Login ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/userlogin">User</Link></li>
              <li><Link to="/managerlogin">Manager</Link></li>
              <li><Link to="/adminlogin">Admin</Link></li>
            </ul>
          </li>
          
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/userregistration" element={<UserRegistration />} exact />
        <Route path="/userlogin" element={<UserLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/managerlogin" element={<ManagerLogin />} exact />
        
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}