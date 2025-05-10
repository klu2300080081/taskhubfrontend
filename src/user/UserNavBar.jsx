import React from 'react'
import { useAuth } from '../contextapi/AuthContext';
import './style.css';
import AddSelfTask from './AddSelfTask';
import UserRegistration from './UserRegistration';
import ViewTasks from './ViewTasks';
import UserLogin from './UserLogin';
import { Link, Route, Routes } from 'react-router-dom';
import UserHome from './UserHome';

export default function UserNavBar() {
   const { setIsUserLoggedIn } = useAuth(); 
  
    const handleLogout = () => 
   {
    setIsUserLoggedIn(false);
    sessionStorage.clear()
    };
  
  
    return (
      <div>
          <div className="Logo"><h3> TASK HUB</h3> <h2>Welcome User</h2></div>
          <div className="app-container">
        <div className="vertical-navbar">
          <nav>
          <ul>
          <li><Link to="/userhome">Home</Link></li>
          <li><Link to="viewtasks">Tasks</Link></li>
          <li><Link to="/addselftask">Add Self Task</Link></li>
          <li><Link to="/userlogin" onClick={handleLogout}>Logout</Link></li>
          </ul>
          
          </nav>
     
      
     
      
      </div>
      <Routes>
              <Route path='/userhome' element={<UserHome/>}/>
              <Route path='/addselftask' element={<AddSelfTask/>}/>
              <Route path="/userregistration" element={<UserRegistration/>} />
              <Route path="/viewtasks" element={<ViewTasks/>} exact />
              <Route path="/userlogin" element={<UserLogin/>} />
          </Routes>
      </div>
      </div>
    )
}
