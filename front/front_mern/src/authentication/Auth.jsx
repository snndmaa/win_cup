// Auth.jsx
import React, { useState, useEffect } from 'react';

export const Auth = ({ children }) => {
  const [user, setUser] = useState({ token: localStorage.getItem('token'), id: localStorage.getItem('id'), isVerified: localStorage.getItem('isVerified')  });

console.log(user)

  return children(user);
};

export default Auth
