import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SideBar from './sidecomponents/SideBar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Home from './sidecomponents/Home'
// import Profile from './sidecomponents/Profile'
// import SelfTask from './sidecomponents/SelfTask'
import './sidecomponents/style.css'
import MainNavBar from './main/MainNavBar';
import { AuthProvider, useAuth } from "./contextapi/AuthContext";
import AdminNavBar from './admin/AdminNavBar';
import ManagerNavBar from './manager/ManagerNavBar';
import UserNavBar from './user/UserNavBar';

function AppContent() 
{
  const { isAdminLoggedIn, isUserLoggedIn, isManagerLoggedIn } = useAuth();

  return (
    <div>
      <BrowserRouter>
        {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isUserLoggedIn ? (
          <UserNavBar />
        ) : isManagerLoggedIn ? (
          <ManagerNavBar />
        ) : (
          <MainNavBar />
        )}
      </BrowserRouter>
    </div>
  );
}

function App() {


  return (
    // <div >
    //   {<div className="Logo"><h3> TASK HUB</h3> <span><AccountCircleIcon/> </span> </div>}
     
  
    //   <BrowserRouter >
    //   {/* <SideBar/> */}
    //   <MainNavBar/>
     
    //   </BrowserRouter>
    //   {/* <Home/>
    //   <Profile />
    //   <SelfTask/> */}
    //   </div>
    
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    
  )
}

export default App
