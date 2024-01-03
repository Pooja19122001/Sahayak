// // import axios from "axios";
// // import React, { useEffect, useState } from 'react';
// // import { Card } from 'react-bootstrap';
// // import { Link } from "react-router-dom";
// // import { Messages } from "../pages/Message";

// //  const DomesticOption = () => {
// //     const [specializations, setSpecializations] = useState([]);

// //   useEffect(() => {
// //     // Fetching distinct specializations from the backend API
// //     const fetchSpecializations = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:3000/domesticOption');
// //         setSpecializations(response.data);
// //       } catch (error) {
// //         console.error('Error fetching specializations:', error);
// //       }
// //     };

// //     fetchSpecializations();
// //   }, []); // Empty dependency array ensures the effect runs only once

// //   return (
// //     <div>
// //         <h1>Choose a Types of Specialization</h1>
// //         <div>
// //         <Link to="/Messages" element={<Messages />}>
// //         {specializations.map((spec, index) => (
// //           <Card key={index} style={{ margin: '10px', width: '300px' }}>
// //             <Card.Body>
// //              <Card.Text className="spec">{spec}</Card.Text>
// //             </Card.Body>
// //           </Card>
// //         ))}
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };
// // export default DomesticOption;


// import axios from "axios";
// import React, { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
// import { Link } from "react-router-dom";
// import { Messages } from "../pages/Message";

// const DomesticOption = () => {
//   const [specializations, setSpecializations] = useState([]);

//   useEffect(() => {
//     const fetchSpecializations = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/domesticOption');
//         setSpecializations(response.data);
//       } catch (error) {
//         console.error('Error fetching specializations:', error);
//       }
  
//     };
    
//     fetchSpecializations();

// }, []);

// const getPhoneNumbers = async (spec) => {
//   try {
//     const response = await axios.get(`http://localhost:3000/getPhoneNumbers/${spec}`);
//     // Handle the response here, maybe set it to a state or navigate to a different page
//     console.log(response.data); // Contains the phone numbers for the specialization
//   } catch (error) {
//     console.error('Error fetching phone numbers:', error);
//   }
// };


//   return (
//     <div>
//       <h1>Choose a Types of Specialization</h1>
//       <div>
//         {specializations.map((spec, index) => (
//           <Link to="/Messages" element={<Messages />} key={index} >
//             <Card style={{ margin: '10px', width: '300px' }}>
//               <Card.Body>
      
//                 <Card.Text className="spec" onClick={getPhoneNumbers}>{spec}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default DomesticOption;

// import axios from "axios";
// import React, { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
// import { Link } from "react-router-dom";
// import { Messages } from "../pages/Message";

// const DomesticOption = () => {
//   const [specialization, setSpecializations] = useState([]);
//   // const [phoneNumber,setPhoneNumber]=useState([]);

//   useEffect(() => {
//     if(specialization){
//       fetchSpecializations();
//     }
    
//   }, [specialization]);

//   const fetchSpecializations = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/domesticOption');
//       setSpecializations(response.data);
//     } catch (error) {
//       console.error('Error fetching specializations:', error);
//     }
//   };
//   const getPhoneNumbers = async (spec) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/getPhoneNumbers/${spec.specialization}`);
//       console.log(response.data); // Contains the phone numbers for the specialization
//     } catch (error) {
//       console.error('Error fetching phone numbers:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Choose a Types of Specialization</h1>
//       <div>
//         {specialization.map((spec, index) => (
//           <div key={index}>
//             <Link to="/Messages" element={<Messages />} key={index} >
//             <Card style={{ margin: '10px', width: '300px' }}>
//               <Card.Body>
//                 {/* Pass 'spec' value to 'getPhoneNumbers' */}
//                 <Card.Text className="spec"
//                 value={specialization} onClick={getPhoneNumbers(spec)}>{spec}</Card.Text>
//               </Card.Body>
//             </Card>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DomesticOption;

import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Messages } from "../pages/Message";

const DomesticOption = () => {
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/domesticOption');
      setSpecializations(response.data);
    } catch (error) {
      console.error('Error fetching specializations:', error);
    }
  };

  const getPhoneNumbers = async (spec) => {
    try {
      const response = await axios.get(`http://localhost:3000/getPhoneNumbers/${spec}`);
      console.log(response.data); // Contains the phone numbers for the specialization
    } catch (error) {
      console.error('Error fetching phone numbers:', error);
    }
  };

  return (
    <div>
      <h1>Choose a Types of Specialization</h1>
      <div>
        {specializations.map((spec, index) => (
          <div key={index}>
            <Link to="/Messages" element={<Messages />} key={index}>
            <Card style={{ margin: '10px', width: '300px' }}>
              <Card.Body>
                
                  <Card.Text className="spec" value={specializations} onClick={() => getPhoneNumbers(spec)}>
                    {spec}
                  </Card.Text>
                
              </Card.Body>
            </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomesticOption;
