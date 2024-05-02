import React, { useState, useEffect } from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Changed Router to BrowserRouter
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home_Page';
import Navbar from './components/NavBar';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/Reset_Password';
import ChangePassword from './components/ChangePassword';
import VerifyEmail from './components/VerifyEmail';
import Page404 from './components/Page404';
import Auth from './authentication/Auth';

function App() {
  

  return (
    <BrowserRouter> 
      <Auth>
        {(user) => (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/forget_password" element={<ForgetPassword />} />
            <Route path="/change_password" element={<ChangePassword />} /> 
            <Route path="/reset_password/:token" element={<ResetPassword />} />
            <Route path="/verifytoken/:token" element={<VerifyEmail />} />
            <Route path="/404" element={<Page404 />} />
          </Routes>
        )}
      </Auth>
    </BrowserRouter> 
  )
}

export const ProtectedRoute = ({ user, children }) => {
  if (user.token !== null && user.id !== null) {
    return children;
  } else {
    return <Navigate to={'/login'} replace />;
  }
};


export default App;
