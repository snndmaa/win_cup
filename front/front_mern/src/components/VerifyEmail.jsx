import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
  const { token } = useParams(); // Extract the token from route parameters

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const url = `https://teamakatsuki.maurice.webcup.hodi.host/api/auth/verify`;
        const response = await axios.get(url, {
          params: { token } // Pass token as a query parameter
        });

        console.log(response.data); // Handle the response data here

        if (response.data.status === 'success') {
          // Set isVerified to true in localStorage
          localStorage.setItem('isVerified', 'true');
          window.location.href = '/home';
        } else {
            // Redirect to the 404 page if verification fails
            window.location.href = '/404';
            
          }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        window.location.href = '/404';
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  return (
    <div>
      {/* You can add UI elements related to the verification process here */}
    </div>
  );
}

export default VerifyEmail;
