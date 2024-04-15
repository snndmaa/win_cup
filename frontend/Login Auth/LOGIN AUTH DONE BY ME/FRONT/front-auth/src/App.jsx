// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


const App = () => {
  const [redirectTo, setRedirectTo] = useState(null);

  return (
    <Router>
      <div>
        
        <Routes> {/* Use Routes instead of Route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={() => setRedirectTo('/')} />} />
          <Route path="/register" element={<Register />} />
          {/* Protected routes */}
      
          {redirectTo && <Route path={redirectTo} element={<Home />} />} {/* Redirect to Home if there's a redirect path */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
