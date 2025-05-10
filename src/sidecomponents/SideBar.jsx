import React from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import Home from './Home';
import Profile from './Profile';
import SelfTask from './SelfTask';
import './style.css'
export default function SideBar() {
  return (
   
    <div className="app-container">
      <div className="vertical-navbar">
        <nav>
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="profile">Profile</Link></li>
        <li><Link to="selftask">SelfTask</Link></li>
        </ul>
        
        </nav>
   
    
   
    
    </div>
    <Routes>
            <Route path='/' Component={Home}/>
            <Route path='profile' Component={Profile}/>
            <Route path="selftask" Component={SelfTask}/>
        </Routes>
    </div>
   
  )
}
