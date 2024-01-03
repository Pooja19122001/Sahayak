
const express = require('express');

const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB (replace connection string with your MongoDB URL)
mongoose.connect('mongodb://127.0.0.1:27017/Sahayak1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a model for PhoneNumbers collection
const PhoneNumber = mongoose.model('PhoneNumber', {
  number: String,
});

app.use(bodyParser.json());

// Endpoint to send dynamic messages to stored phone numbers
app.post('/send-messages', async (req, res) => {
  try {
    const { message } = req.body;

    // Fetch phone numbers from the database
    const phoneNumbers = await PhoneNumber.find().select('number');

    // Send messages to each phone number
    for (const { number } of phoneNumbers) {
      await sendMessage(number, message); // Use a function to send messages (e.g., using Twilio)
    }

    res.status(200).json({ message: 'Messages sent successfully' });
  } catch (error) {
    console.error('Error sending messages:', error);
    res.status(500).json({ error: 'Failed to send messages' });
  }
});

// Function to send messages using Twilio
async function sendMessage(to, message) {
  // Use your Twilio credentials and API here to send messages
  // Example:
  // const client = require('twilio')(accountSid, authToken);
  // await client.messages.create({ body: message, from: '+1234567890', to });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
