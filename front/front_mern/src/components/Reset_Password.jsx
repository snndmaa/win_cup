import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const ResetPassword = () => {
    const { token } = useParams();
    console.log('Token:', token); // Log the token value
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (password !== confirmPassword) {
          // Handle password mismatch error
          console.error('Passwords do not match');
          return;
      }
  
      try {
         
          const url = `https://teamakatsuki.maurice.webcup.hodi.host/api/auth/reset-password/${token}`;
  
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json', // Example header
                  // Add any other headers if required
              },
              body: JSON.stringify({ password }),
          });
  
          if (!response.ok) {
            window.location.href = '/404_page';
          }
  
          // Handle success response
          const data = await response.json();
          console.log('Password reset successfully:', data);
          window.location.href = '/login';
      } catch (error) {
          // Handle error response
          console.error('Failed to reset password:', error);
      }
  };
  
    
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
  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen text-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex text-center items-center mb-6 text-2xl font-semibold text-white">
          {/* <img className="w-8 h-8 mr-2" src="" alt="logo" /> */}
          WIN_CUP
        </a>
        <div className="w-full p-6 rounded-lg shadow border md:mt-0 sm:max-w-md bg-gray-800 border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
            Reset Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
            <div>
              <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="PASSWORD" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 outline-none dark:focus:border-blue-500" required />
            </div>
            <div>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirm-password" id="confirm-password" placeholder="CONFIRM PASSWORD" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset password</button>
          </form>
          <div>
          <span className="text-red-600 text-sm" id="password-strength"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
