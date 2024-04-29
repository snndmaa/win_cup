// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home_Page';
import Navbar from './components/NavBar';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/Reset_Password';
import ChangePassword from './components/ChangePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/change_password" element={<ChangePassword />} /> 
        <Route path="/reset_password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
