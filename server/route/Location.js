const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/Messages', async (req, res) => {
  const { location, phoneNumbers } = req.body;

  try {
    // Mock phone numbers stored in your database
    // const phoneNumbers = ['PHONE_NUMBER_1', 'PHONE_NUMBER_2']; // Replace with your actual phone numbers
    
    // Iterate through phoneNumbers and send location to each number
    for (const phoneNumber of phoneNumbers) {
      await sendLocationToPhoneNumber(location, phoneNumber);
    }

    res.status(200).send('Location sent successfully to all phone numbers.');
  } catch (error) {
    console.error('Error sending location:', error);
    res.status(500).send('Failed to send location to phone numbers.');
  }
});

async function sendLocationToPhoneNumber(location, phoneNumber) {
  try {
    // Here, you'd use an SMS service/API (e.g., Twilio) to send the location to the phoneNumber
    // This is an example using Axios to send the location to a mock endpoint
    await axios.post('http://localhost:3000/Messages', {
      location,
      phoneNumber,
    });

    console.log(`Location sent to ${phoneNumber} successfully.`);
  } catch (error) {
    console.error(`Error sending location to ${phoneNumber}:`, error);
    throw error; // Handle or log the error as needed
  }
}

module.exports=app;