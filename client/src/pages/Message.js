// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useNumbers } from "../Context/number";
// // import { AdminPage } from "../pages/adminPage";

// export const Messages = () => {
// const [message, setMessage] = useState('');
// const [numbers,setNumbers] =useNumbers([]);
// const [success, setSuccess] =useState(false);

// const navigate=useNavigate();

//   const handleSendMessage = async () => {
//     try {
//           setSuccess(!success);
//           // <AdminPage Message={message}/>
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const { latitude, longitude } = position.coords;
//             const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
//             // setNumber(props.phoneNumber);
//              console.log(numbers);
//             {numbers.map((phoneNumber)=>{
//             //   {
//             //     // return <AdminPage key={i} message={message}/>
//             //   })}
//             // for (const phoneNumber of numbers) {
//             //   try {
//                  axios.post('http://localhost:3000/sendMessages', {
//                   location,
//                   phoneNumber,
//                   message,
//                 });
//                 console.log(`Location sent successfully to ${phoneNumber}.`);
                
//               // } catch (error) {
//               //   console.error(`Error sending location to ${phoneNumber}:`, error);
//               // }
//             }
//         )}navigate("/");
//           // },
//           (error) => {
//             console.error('Error getting location:', error);
//           }
//         // );
        
//       } else {
//         console.error('Geolocation is not supported.');
//       }
//     } catch (error) {
//       console.error('Error sending location:', error);
            
//    };  
// }
//   return (
//     <div>
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message here"
//         rows={4}
//         cols={50}
//       />
//       <br />
//       <button onClick={handleSendMessage}>Send Messages</button>
//       {
//         success && alert("Location sent successfully you will be receiving help within 5 minutes.")
//       }
//     </div>
//   );
// };


//=====================================================================================================

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNumbers } from "../Context/number";

export const Messages = () => {
  const [message, setMessage] = useState('');
  const [numbers, setNumbers] = useNumbers([]);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSendMessage = async () => {
    try {
      setSuccess(!success);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const location = `Latitude: ${latitude}, Longitude: ${longitude}`;

            await Promise.all(
              numbers.map(async (phoneNumber) => {
                console.log(phoneNumber);
                try {
                  await axios.post('http://localhost:3000/sendMessages', {
                    location,
                    phoneNumber,
                    message,
                  });
                  console.log(`Location sent successfully to ${phoneNumber}.`);
                } catch (error) {
                  console.error(`Error sending location to ${phoneNumber}:`, error);
                }
              })
            );

            navigate("/");
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
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleSendMessage}>Send Messages</button>
      {success && (
        // You may replace this with a modal or a more user-friendly component
        alert("Location sent successfully. You will be receiving help within 5 minutes.")
      )}
    </div>
  );
};


