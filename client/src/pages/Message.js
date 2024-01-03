import axios from 'axios';
import React, { useState } from 'react';


export const Messages = () => {
  const [message, setMessage] = useState(''); // State to hold the message
  const [status, setStatus] = useState(''); // State to display status/messages

  const handleSendMessage = async () => {
    try {
      // Make a POST request to your backend endpoint with the dynamic message
      const response = await axios.post('/send-messages', { message });
      setStatus(response.data.message); // Set the status received from the backend
    } catch (error) {
      setStatus(`Error: ${error.response.data.error}`); // Display error message
    }
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleSendMessage}>Send Messages</button>
      {status && <p>{status}</p>}
    </div>
  );
};

