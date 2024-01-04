import axios from 'axios';
import React from 'react';

export const ShareLocation = (props) => {
  const shareLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
            const phoneNumbers = props.phoneNumber;// Fetch from your database

            // Iterate through phoneNumbers and send location to each number
            for (const phoneNumber of phoneNumbers) {
              await axios.post('http://localhost:3000/send-location', {
                location,
                phoneNumber,
              });
            }

            console.log('Location sent successfully.');
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported.');
      }
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  return (
    <div>
      {/* <button onClick={shareLocation}>Share Location</button> */}
    </div>
  );
};

