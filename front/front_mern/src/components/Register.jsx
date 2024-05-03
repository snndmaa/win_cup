import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie-player';
import maleAnimationData from '../assets/man.json';
import femaleAnimationData from '../assets/woman.json';
const Register = () => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [gender, setSelectedAvatar] = useState('null');
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+={[}]|;:,.<>?/';


  useEffect(() => {
    const passwordInput = document.getElementById("password");

    // Password strength indicator functionality
    const calculatePasswordStrength = (password) => {
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const numberChars = '0123456789';
      const symbolChars = '!@#$%^&*()_+={[}]|;:,.<>?/';

      let strength = 0;

      if (password.length >= 8 &&
          containsChars(password, uppercaseChars) &&
          containsChars(password, lowercaseChars) &&
          containsChars(password, numberChars) &&
          containsChars(password, symbolChars)) {
          strength = 5; // Very Strong
      } else if (password.length >= 8 &&
          containsChars(password, uppercaseChars) &&
          containsChars(password, lowercaseChars) &&
          containsChars(password, numberChars)) {
          strength = 4; // Strong
      } else if (password.length >= 8 &&
          (containsChars(password, uppercaseChars))  &&
          (containsChars(password, lowercaseChars))){
          strength = 3; // Good
      } else if (password.length >= 8 &&
          (containsChars(password, lowercaseChars))) {
          strength = 2; // Fair
      } else if (password.length >= 8) {
        strength = 1; // Weak
      } else {
          strength = 0; // Very Weak
      }

      return strength;
    }

    // Function to check if password contains certain characters
    const containsChars = (password, chars) => {
      for (let char of chars) {
          if (password.includes(char)) {
              return true;
          }
      }
      return false;
    }
    const strengthIndicator = document.getElementById('password-strength');

    // Update password strength on input change
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      const strength = calculatePasswordStrength(password);
      updateStrengthIndicator(strength);
    });

    // Function to update the password strength indicator
    const updateStrengthIndicator = (strength) => {
      let strengthText = '';
      let strengthColor = '';

      switch (strength) {
        case 0:
          strengthText = 'Very Weak';
          strengthColor = 'darkred';
          break;
        case 1:
          strengthText = 'Weak';
          strengthColor = 'lightcoral';
          break;
        case 2:
          strengthText = 'Fair';
          strengthColor = 'darkorange';
          break;
        case 3:
          strengthText = 'Good';
          strengthColor = 'orange';
          break;
        case 4:
          strengthText = 'Strong';
          strengthColor = 'lightgreen';
          break;
        case 5:
          strengthText = 'Very Strong';
          strengthColor = 'darkgreen';
          break;
        default:
          break;
      }

      setPasswordStrength(strengthText); // Update the state
      strengthIndicator.textContent = strengthText; // Update the text content
      strengthIndicator.style.color = strengthColor; // Update the text color
      passwordInput.style.borderColor = strengthColor; // Update the input border color
    };
  }, []); // Empty dependency array for running only once


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
    } else if(gender !== 'male' && gender !== 'female'){
      setError("Please select your gender.");
      return;
    }
  
    try {
      // Make an HTTP POST request to register the user
      const response = await axios.post('https://teamakatsuki.maurice.webcup.hodi.host/api/auth/register', { userName, email, gender, password });
      setError("");
  
      // If registration is successful
      if (response.status === 200) {
        // Send verification email
        const verifyResponse = await axios.post('https://teamakatsuki.maurice.webcup.hodi.host/api/auth/send-mail', { email });
        
        // Check if verification email was sent successfully
        if (verifyResponse.data.status === 'success') {
          // Redirect to the login page
          alert('Please verify your email with the link which has been sent to your mail address.');
          window.location.href = '/login';
        } else {
          // Handle error if verification email was not sent
          setError('Failed to send verification email');
        }
      }
    } catch (error) {
      console.error('Error registering user:', error.response);
      if (error.response.status === 400 && error.response.data.message === 'Username already exists') {
        setError('Username already exists');
      } else {
        setError('An error occurred while registering user');
      }
    }
  };
  

  return (
    
     <>
      <div className='bg-black '>
      <section className="bg-black h-screen">
  <div className="flex flex-col items-center justify-center mx-auto h-screen" >
      <a href="#" className="flex items-center text-xl font-semibold text-white">
          {/* <img class="w-8 h-8 mr-2" src="" alt="logo"/> */}
          WIN_CUP    
      </a>
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900 border-gray-800 ">
          <div className="space-y-2 sm:p-4">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-white">
                  Create an account
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
              
              <div className='flex justify-center'>
              <div
    className={`w-10 h-10 p-1 mr-2 rounded-full ring-2 hover:ring-purple-700 ring-${gender === 'male' ? 'purple-700' : 'white'}`}
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
    className={`w-10 h-10 p-1 mr-2 rounded-full ring-2 hover:ring-purple-700 ring-${gender === 'female' ? 'purple-700' : 'white'}`}
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
                      <input type="text" name="username" 
                onChange={(e) => setUsername(e.target.value)} id="username" className="border  text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " placeholder="USERNAME" required/>
                  </div>
                  <div>
                        <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} name="email" id="email" className=" border  text-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " placeholder="EMAIL" required/>
                  </div>
                  <div>
                       <input type="password" 
                onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="PASSWORD" className="border border-transparent sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-gray-300  outline-none" required/>
                  </div>
                  <div>
                      <input type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} name="confirm-password" id="confirm-password" placeholder="CONFIRM PASSWORD" className=" border text-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " required/>
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
