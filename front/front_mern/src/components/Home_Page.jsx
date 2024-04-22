// Home.js

import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to the Home Page</h2>
        </div>
        <div className="mt-8">
          <p className="text-center text-lg text-gray-600">You can add your content for the home page here.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
