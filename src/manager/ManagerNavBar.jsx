import React from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import SideBar from '../sidecomponents/SideBar'
import './style.css';
import ManagerHome from './ManagerHome'
import ManagerProjects from './ManagerProjects';
import CreateProject from '../admin/CreateProject'

import { useAuth } from '../contextapi/AuthContext';
import ManagerLogin from './ManagerLogin';
import ProjectDetails from './ProjectDetails';

export default function ManagerNavBar() {

  const { setIsManagerLoggedIn } = useAuth(); 

  const handleLogout = () => 
 {
  setIsManagerLoggedIn(false);
  sessionStorage.clear()
  };


  return (
    <div>
        <div className="Logo"><h3> TASK HUB</h3> <h2>Welcome Manager</h2></div>
        <div className="app-container">
      <div className="vertical-navbar">
        <nav>
        <ul>
        <li><Link to="/managerhome">Home</Link></li>
        <li><Link to="managerprojects">Projects</Link></li>
        
        <li><Link to="/managerlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
        
        </nav>
   
    
   
    
    </div>
    <Routes>
            <Route path='/managerhome' element={<ManagerHome/>}/>
            <Route path='/managerprojects' element={<ManagerProjects/>}/>
            <Route path="createproject" element={<CreateProject/>} />
            <Route path="/managerlogin" element={<ManagerLogin/>} exact />
            <Route path = "/projectdetails/:id" element={<ProjectDetails/>} />
        </Routes>
    </div>
    </div>
  )
}
