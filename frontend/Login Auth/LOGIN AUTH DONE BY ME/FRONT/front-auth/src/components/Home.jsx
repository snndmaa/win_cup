// Home.jsx
import React from 'react';
import { isAuthenticated } from './auth';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Welcome to My App</h1>
      {isAuthenticated() ? (
        <div>
          <p>You are logged in!</p>
          <p>This is your dashboard.</p>
          {/* Add user-specific content here */}
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <p>Please login or register to access the full features of the app.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
