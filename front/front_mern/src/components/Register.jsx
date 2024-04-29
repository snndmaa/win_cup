import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie-player';
import maleAnimationData from '../assets/man.json';
import femaleAnimationData from '../assets/woman.json';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+={[}]|;:,.<>?/';
  const containsChars = (password, chars) => {
    for (let char of chars) {
        if (password.includes(char)) {
            return true;
        }
    }
    return false;
  }
 

  const handleAvatarSelect = (gender) => {
      setSelectedAvatar(gender);
      console.log(selectedAvatar);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify that password and confirmPassword match
    if (password !== confirmPassword) {
      setError('Oops! Passwords must match. Give it another shot.');
      return;
    } else if(!(password.length >= 8 &&
      containsChars(password, uppercaseChars) &&
      containsChars(password, lowercaseChars) &&
      containsChars(password, numberChars) &&
      containsChars(password, symbolChars))){
      setError("Weak password! Please strengthen it.");
      return;
      } else if(selectedAvatar !== 'male' && selectedAvatar !== 'female'){
        setError("Please select your gender.");
        return;
      }

    try {
           // Make an HTTP POST request to the register API
      const response = await axios.post('http://localhost:3000/api/register', { username, email, password });
      console.log(selectedAvatar);
      setError("");
      // If registration is successful, redirect to the login page
      window.location.href = '/login';
     
    } catch (error) {
      console.error('Error registering user:', error.response);
      if (error.response.status === 400 && error.response.data.message === 'Username already exists') {
        console.log(selectedAvatar);
        setError('Username already exists');
      }
      else {
        setError('An error occurred while registering user');
      }
    }
  };

  return (
    
     <>
      <div className='bg-black '>
      <section className="bg-black h-screen">
  <div className="flex flex-col items-center justify-center mx-auto h-screen" >
      <a href="#" className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
          {/* <img class="w-8 h-8 mr-2" src="" alt="logo"/> */}
          WIN_CUP    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-800 ">
          <div className="space-y-4 sm:p-4">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900  dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
              
              <div className='flex justify-center'>
            <div
                className={`w-10 h-10 p-1 mr-2 rounded-full ring-2 ring-${selectedAvatar === 'male' ? 'green' : 'gray'}-300 hover:ring-${selectedAvatar === 'male' ? 'green' : 'gray'}-100 dark:ring-${selectedAvatar === 'male' ? 'green' : 'gray'}-500 ${selectedAvatar === 'male' ? 'selected-avatar' : ''}`}
                onClick={() => setSelectedAvatar('male')}
            >
                <Lottie
                    loop
                    animationData={maleAnimationData}
                    play
                    style={{ width: 30, height: 30 }} // Adjust size as needed
                />
            </div>
            <div
                className={`w-10 h-10 p-1 ml-2 rounded-full ring-2 ring-${selectedAvatar === 'female' ? 'green' : 'gray'}-300 hover:ring-${selectedAvatar === 'female' ? 'green' : 'gray'}-100 dark:ring-${selectedAvatar === 'female' ? 'green' : 'gray'}-500 ${selectedAvatar === 'female' ? 'selected-avatar' : ''}`}
                onClick={() => setSelectedAvatar('female')}
            >
                <Lottie
                    loop
                    animationData={femaleAnimationData}
                    play
                    style={{ width: 30, height: 30 }} // Adjust size as needed
                />
            </div>
        </div>
              <div>
                      <input type="text" name="username" value={username}
                onChange={(e) => setUsername(e.target.value)} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="USERNAME" required/>
                  </div>
                  <div>
                        <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMAIL" required/>
                  </div>
                  <div>
                       <input type="password" 
                onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="PASSWORD" className="border border-transparent sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white outline-none" required/>
                  </div>
                  <div>
                      <input type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} name="confirm-password" id="confirm-password" placeholder="CONFIRM PASSWORD" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <div className='flex justify-between'>
                  <div>
<span id="password-strength"></span>
</div>               
               <div>
               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
               </div>

                  </div>
                  <span className='text-red-500 text-sm'>{error}</span>

              </form>
          </div>
      </div>
  </div>
  
</section>
      </div>
     </>
    
  );
};

export default Register;
