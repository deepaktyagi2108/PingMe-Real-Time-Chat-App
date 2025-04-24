import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import { Loader } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore.js';
import {Toaster} from "react-hot-toast"
import ChatPage from './pages/ChatPage.jsx';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();
  console.log({onlineUsers})


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({authUser});

  if (isCheckingAuth&&!authUser)  return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  

  return (
   
    <div>
       <Navbar/>

      <Routes>
      
        <Route path="/"element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
        <Route path="/signup"element={!authUser ? <SignUpPage /> : <Navigate to="/" />}/>
        <Route path="/login"element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
      
        <Route path="/profile"element={authUser ? <ProfilePage /> : <Navigate to="/login" />}/>
        <Route path='/messages/:userId' element={authUser ? <ChatPage /> : <Navigate to="/login" />}/>

        
      
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
