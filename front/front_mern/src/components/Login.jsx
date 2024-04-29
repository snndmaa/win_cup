import React, { useEffect, useState } from 'react';
import '../assets/login.css';
import axios from 'axios';

const Login = () => {
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [scrambling, setScrambling] = useState(false);
  const [originalPassword, setOriginalPassword] = useState('');
  const [scrambledPassword, setScrambledPassword] = useState('');
  const [passwordCharacters] = useState([...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~,.<>?/;:][}{+_)(*&^%$#@!±=-§']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const solveMilliseconds = 100;
  const characterSelectionMilliseconds = 10;
  const delayMilliseconds = 100;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login API endpoint
      const response = await axios.post('http://localhost:3000/api/login', { username, password });

      // If login is successful, redirect or perform other actions
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error('Error logging in user:', error);

      // Handle specific error messages
      if (error.response && error.response.status === 400) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred while logging in');
      }
    }
  }
  const randomArrayElement = (arr) => {
    return arr[(arr.length * Math.random()) | 0];
  };

  const replaceCharacter = (str, index, chr) => {
    return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
  };
    const handlePasswordToggle = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

  useEffect(() => {

    const eye = document.querySelector('.eye');
    const upperLid = document.querySelector('.lid--upper');
    const eyeBall = document.querySelector('.eye circle:nth-of-type(1)');
    let timer;
    let isHovered = false;
    let isToggled = false;
    let isBlinkingEnabled = true; // Control variable for blinking
    // Function to control blinking

    const toggleButton = document.getElementById("toggleButton");
    const passwordInput = document.getElementById("password");
    const solveMilliseconds = 100;
    const characterSelectionMilliseconds = 10;
    const delayMilliseconds = 100;
    const characters = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~,.<>?/;:][}{+_)(*&^%$#@!±=-§"];
  
    const randomArrayElement = (arr) => {
      return arr[(arr.length * Math.random()) | 0];
    };
  
    let scrambling = false;
    let originalPassword = passwordInput.value;
    let scrambledPassword = originalPassword;
  
    passwordInput.value = scrambledPassword;
  
    toggleButton.addEventListener("click", () => {
      scrambling = !scrambling;
      if (scrambling) {
        passwordInput.type = "text";
        passwordInput.value = scrambledPassword;
        toggleButton.disabled = true;
        scramblePassword(passwordInput);
        passwordInput.value = scrambledPassword;
      } else {
    
          passwordInput.value = originalPassword;
          passwordInput.type = "password";
          
  
  
      }
    });
  
    passwordInput.addEventListener("input", () => {
      originalPassword = passwordInput.value;
    });
  
    
    function scramblePassword(input) {
      
  
      let delay = 0;
      const passwordCharacters = [...originalPassword];
      const lockMilliseconds =
        delayMilliseconds * passwordCharacters.length + solveMilliseconds;
  
      setTimeout(() => {
        input.value = originalPassword;
        toggleButton.disabled = false; 
      }, lockMilliseconds);
  
      passwordCharacters.forEach((character, index) => {
        setTimeout(
          () => {
            let intervalId = setInterval(() => {
              const randomCharacter = randomArrayElement(characters);
              input.value = replaceCharacter(
                input.value,
                index,
                randomCharacter
              );
  
              setTimeout(() => {
                clearInterval(intervalId);
                input.value = replaceCharacter(
                  input.value,
                  index,
                  originalPassword[index]
                );
              }, solveMilliseconds);
            }, characterSelectionMilliseconds);
          },
          delay === 0 ? (delay += 1) : (delay += delayMilliseconds)
        );
      });
    }
   
  
  function replaceCharacter(str, index, chr) {
    return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
  }
  
const toggleBlinking = (enableBlinking) => {
    isBlinkingEnabled = enableBlinking;
  };
  
  function addBlinkAnimation() {
    if (passwordInput.getAttribute('type') === 'password') {
      // First blink animation
      upperLid.classList.add('blink-animation');
      eyeBall.style.display = 'none'; // Hide the eye ball when the toggle is on
      setTimeout(() => {
        upperLid.classList.remove('blink-animation');
        eyeBall.style.display = 'block'; // Show the eye ball when the toggle is off
        
        // Second blink animation after a slight delay
        setTimeout(() => {
          upperLid.classList.add('blink-animation');
          eyeBall.style.display = 'none'; // Hide the eye ball when the toggle is on
          setTimeout(() => {
            upperLid.classList.remove('blink-animation');
            eyeBall.style.display = 'block'; // Show the eye ball when the toggle is off
          }, 200); // Duration of second blinking animation
        }, 95); // Delay between first and second blink
      }, 200); // Duration of first blinking animation
    }
  }
  // Call the addBlinkAnimation function every 5 seconds
  setInterval(addBlinkAnimation, 5000);
  
  const moveEye = (event) => {
    if (isHovered) return; // Return early if eye is hovered over
    const boundingBox = eye.getBoundingClientRect();
    const eyeCenterX = boundingBox.left + boundingBox.width / 2;
    const eyeCenterY = boundingBox.top + boundingBox.height / 2;
  
    const mouseX = event.clientX;
    const mouseY = event.clientY;
  
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
  
    const angle = Math.atan2(deltaY, deltaX);
    const radius = Math.min(boundingBox.width / 2, boundingBox.height / 2) * 0.5;
  
    const newX = Math.cos(angle) * radius;
    const newY = Math.sin(angle) * radius;
  
    eye.style.transform = `translate(${newX}px, ${newY}px)`;
  
    // Reset the timer
    clearTimeout(timer);
    timer = setTimeout(() => {
      eye.style.transform = 'translate(0, 0)';
      passwordInput.style.borderColor = '';
    }, 3000); // 3 seconds
  };
  
  const handleMouseEnter = () => {
    isHovered = true;
    eye.style.transform = 'translate(0, 0)'; // Center the eye when hovered
  };
  
  const handleMouseLeave = () => {
    isHovered = false;
  };
  
  eye.addEventListener('mouseenter', handleMouseEnter);
  eye.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('mousemove', moveEye);
  
  // Password reveal functionality
  const eyeButton = document.querySelector('button[title="Reveal Password"]');
  

  const handlePasswordToggle = () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  
    // // Update the state to reflect the toggled state
    // setPasswordVisibility(type === 'text');
    isToggled = !isToggled;
    if (isToggled) {
    toggleBlinking(true);
    upperLid.classList.add('close-lid-animation'); // Apply the closing animation
    eyeBall.style.display = 'none'; // Hide the eye ball when the toggle is on
      
      setTimeout(() => {
        eyeBall.classList.remove('blink-hide');
        eyeBall.style.display = 'none';
      }, 200);
    } else {
      upperLid.classList.remove('close-lid-animation'); // Remove the closing animation
      upperLid.classList.add('open-lid-animation'); // Apply the opening animation\
      eyeBall.style.display = 'block'; // Show the eye ball when the toggle is off
      toggleBlinking(false);
      setTimeout(() => {
        upperLid.classList.remove('open-lid-animation');
        eyeBall.style.display = 'block'; // Show the eye ball when the toggle is off
      }, 200);
    }
  };
  

  eyeButton.addEventListener('click', handlePasswordToggle);

    // Password strength indicator functionality
  }, []); // Empty dependency array for running only once



  return (
    <>
    <div >
      <div className="flex justify-center items-center min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-y-0 flex flex-col justify-center items-center h-screen w-300 gap-4">
          <h2 className=' text-center text-3xl font-extrabold text-gray-100'>Login</h2>
          <div className="input-container">
            <input type="text" placeholder="USERNAME" onChange={(e) => setUsername(e.target.value)} />
          </div>
         <form onSubmit={handleLogin}>
         <div className="input-container">
            <div className="form-group">
              <input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="PASSWORD"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                title="Reveal Password"
                id="toggleButton"
                aria-pressed={isPasswordVisible} // Update aria-pressed attribute
                onClick={handlePasswordToggle}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <mask id="eye-open">
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12V20H12H1V12Z"
                        fill="#D9D9D9"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </mask>
                    <mask id="eye-closed">
                      <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12V20H12H1V12Z" fill="#D9D9D9" />
                    </mask>
                  </defs>
                  <path
                    className="lid lid--upper"
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="lid lid--lower"
                    d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g mask="url(#eye-open)">
                    <g className="eye">
                      <circle cy="12" cx="12" r="4" fill="currentColor" />
                      <circle cy="11" cx="13" r="1" fill="black" />
                    </g>
                  </g>
                </svg>
                <span className="sr-only">Reveal</span>
              </button>
              
            </div>
            <div className='flex justify-end'>
              
            <div className='flex justify-end pt-2'><a href="/forget_password" className='text-white hover:underline'>Forget Password?</a></div>

            </div>
          </div> 
          <div className="w-full">
  <input type="submit" value="ACCESS" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full w-full"/>
</div>
          </form>     
         

          <div className="text-white flex">
           <p className='text-white'>Don't have an acoount yet?</p> 
           <div>

          <a href="/register"><div className='ml-2 hover:underline'>
           Sign up now!
            </div></a> 
           </div>
           
          </div>
        
          <span className='text-red-600 text-sm'>{error}</span>
         
        </div>
        
      </div>
      
    </div>
    
  </>
  );
};

export default Login