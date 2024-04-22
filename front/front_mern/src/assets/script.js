const eye = document.querySelector('.eye');
const upperLid = document.querySelector('.lid--upper');
const eyeBall = document.querySelector('.eye circle:nth-of-type(1)');
let timer;
let isHovered = false;
let isToggled = false;
let isBlinkingEnabled = true; // Control variable for blinking

// Function to control blinking
const toggleBlinking = (enableBlinking) => {
  isBlinkingEnabled = enableBlinking;
};

function addBlinkAnimation() {
  if (isBlinkingEnabled) {
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
  }, 5000); // 5 seconds
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
const passwordInput = document.getElementById('password');

eyeButton.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  isToggled = !isToggled;
  if (isToggled) {
    upperLid.classList.add('close-lid-animation'); // Apply the closing animation
    eyeBall.classList.add('blink-hide'); // Hide the eye ball during the closing animation
    eyeBall.style.display = 'none'; // Hide the eye ball when the toggle is on
    toggleBlinking(false); // Disable blinking when toggle is on
    setTimeout(() => {
      eyeBall.classList.remove('blink-hide'); // Show the eye ball after the closing animation
      eyeBall.style.display = 'none'; // Keep the eye ball hidden after animation completion
    }, 200); // Duration of closing animation (0.2 seconds)
  } else {
    upperLid.classList.remove('close-lid-animation'); // Remove the closing animation
    upperLid.classList.add('open-lid-animation'); // Apply the opening animation\
    eyeBall.style.display = 'block'; // Show the eye ball when the toggle is off
    toggleBlinking(true); // Enable blinking when toggle is off
    setTimeout(() => {
      upperLid.classList.remove('open-lid-animation'); // Remove the opening animation
    }, 200); // Duration of opening animation (0.2 seconds)
  }
});


window.onload = function () {
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
  let scrambledPassword = originalPassword.replace(/./g, '*');

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
};


const strengthIndicator = document.getElementById('password-strength');

// changes in the password 
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);
    updateStrengthIndicator(strength);
});

// reset color back to normal
document.body.addEventListener('click', (event) => {
    if (event.target !== passwordInput) {
        passwordInput.style.borderColor = 'white'; 
        strengthIndicator.textContent = '';
    } else {

      const password = passwordInput.value;
      const strength = calculatePasswordStrength(password);
      updateStrengthIndicator(strength);
    }
});

function calculatePasswordStrength(password) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+={}\[\]:;<>?|,.';

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
  }
  else if (password.length >= 8 &&
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

function containsChars(password, chars) {
  for (let char of chars) {
      if (password.includes(char)) {
          return true;
      }
  }
  return false;
}

function updateStrengthIndicator(strength) {
  switch (strength) {
      case 0:
          strengthIndicator.textContent = 'Very Weak';
          strengthIndicator.style.color = 'darkred';
          passwordInput.style.borderColor = 'darkred'; 
          break;
      case 1:
          strengthIndicator.textContent = 'Weak';
          strengthIndicator.style.color = 'lightcoral';
          passwordInput.style.borderColor = 'lightcoral'; 
          break;
      case 2:
          strengthIndicator.textContent = 'Fair';
          strengthIndicator.style.color = 'darkorange';
          passwordInput.style.borderColor = 'darkorange'; 
          break;
      case 3:
          strengthIndicator.textContent = 'Good';
          strengthIndicator.style.color = 'orange';
          passwordInput.style.borderColor = 'orange'; 
          break;
      case 4:
        strengthIndicator.textContent = 'Strong';
        strengthIndicator.style.color = 'lightgreen';
        passwordInput.style.borderColor = 'lightgreen';
        break;
      case 5:
          strengthIndicator.textContent = 'Very Strong';
          strengthIndicator.style.color = 'darkgreen';
          passwordInput.style.borderColor = 'darkgreen'; 
          break;
  }
}






