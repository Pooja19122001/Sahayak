import axios from 'axios';
import React, { useState } from 'react';

const SendMessageForm = () => {
  //const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    try {
      await axios.post('/send-sms', {
        //phoneNumber,
        message,
      });
      // Handle success
      console.log('Message sent!');
    } catch (error) {
      // Handle error
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      /> */}
      <input
        type="textarea"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
};

export default SendMessageForm;
