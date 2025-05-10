import React from 'react'
import AdminLogin from './AdminLogin';
import CreateProject from './CreateProject';
import Viewprojects from './Viewprojects';
import AdminHome from './AdminHome';
import { Link, Route, Routes } from 'react-router-dom';
import ViewManagers from './ViewManagers';
import ViewUsers from './ViewUsers';
import { useAuth } from '../contextapi/AuthContext';
import './style.css';
import AddManager from './AddManager';
import UserProfile from './UserProfile';
import ManagerProfile from './ManagerProfile';

export default function AdminNavBar() {
 const { setIsAdminLoggedIn } = useAuth(); 
 
   const handleLogout = () => 
  {
   setIsAdminLoggedIn(false);
   sessionStorage.clear()
   };
 
 
   return (
     <div>
         <div className="Logo"><h3>TASK HUB</h3> <h2>Welcome Admin</h2></div>
         <div className="app-container">
       <div className="vertical-navbar">
         <nav>
         <ul>
         <li><Link to="/adminhome">Home</Link></li>
         <li><Link to="projects">Projects</Link></li>
         <li><Link to="createproject">Add Project</Link></li>
         <li><Link to="managers"><pre>Managers             </pre></Link></li>
         <li><Link to="users">Users</Link></li>
         <li><Link to="/adminlogin" onClick={handleLogout}>Logout</Link></li>
         </ul>
         
         </nav>
    
     
    
     
     </div>
     <Routes>
             <Route path='/adminhome' element={<AdminHome/>}/>
             <Route path='projects' element={<Viewprojects/>}/>
             <Route path="createproject" element={<CreateProject/>} />
             <Route path="managers" element={<ViewManagers/>} />
             <Route path="users" element={<ViewUsers/>} />
             <Route path="/adminlogin" element={<AdminLogin/>} exact />
              <Route path="/addmanager" element={<AddManager />} />
              <Route path="/userprofile/:id" element={<UserProfile/>}/>
              <Route path="/managerprofile/:id" element ={<ManagerProfile/>} />
         </Routes>
     </div>
     </div>
   )
}
