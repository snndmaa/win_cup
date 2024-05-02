import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [userName, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://teamakatsuki.maurice.webcup.hodi.host/api/auth/forgot-password', { userName });

      // Handle success, maybe show a message to the user
      console.log('Password reset request sent successfully');
      alert('A password reset link has been sent to your email.'); // Show alert
      window.location.href = '/login';
    } catch (error) {
      // Handle error response
      console.error('Failed to send password reset request:', error);
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <section className="bg-black">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
          {/* <img className="w-8 h-8 mr-2" src="" alt="logo" /> */}
          WIN_CUP
        </a>
        <div className="w-full p-6 rounded-lg shadow dark:border md:mt-0 sm:max-w-md bg-gray-900 border-gray-800 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
            <div>
               <input type="text" name="username" id="username" value={userName} onChange={handleChange} className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" placeholder="USERNAME" required />
            </div>
            <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-violet-600 hover:bg-violet-700 focus:ring-violet-800">Reset password</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
