const express = require('express');
const cors = require('cors');
const Helper = require('./Model/Helper');
const User = require('./Model/User');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRouter = require("./route/user");
const location = require("./route/Location");
const Admin =require("./route/admin");
const app = express();



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/auth",userRouter);
app.use("/admin",Admin);

mongoose.connect("mongodb://127.0.0.1:27017/Sahayak1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');

})
  //User Registration

  app.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json(result); // Indicate successful creation with status code 201
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

   //helper Registration

  app.post('/helper', async (req, res) => {
    try {
        const helper = new Helper(req.body);
        const result = await helper.save();
        res.status(201).json(result); // Indicate successful creation with status code 201
    } catch (err) {
        console.error('Error saving helper:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/domesticOption', async (req, res) => {
    try {
      const specializations = await Helper.distinct('specialization');
      // console.log(specializations);
      res.json(specializations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/getPhoneNumbers/:specialization', async (req, res) => {
    const { specialization } = req.params;
    try {
      const phoneNumbers = await Helper.find({specialization}).distinct('phone_no');
      console.log(phoneNumbers);
      res.json(phoneNumbers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/email', async (req, res) => {
    const { email } = req.body;
    // const user = await User.findOne({ email })
  
    // Assuming you want to send the email to the client as well
    res.json({ email: await userEmail(email) });
  });

  const userEmail = async (email) => {
    return email;
  };
  
  app.post('/sendMessages', async (req, res) => {
    const { location, numbers, message } = req.body;
    console.log(numbers);
  
    const email = userEmail();
    try {
      // Iterate through phoneNumbers and send location to each number
      await sendLocationToPhoneNumber(location, numbers, message, email);
  
      res.status(200).send('Location sent successfully to all phone numbers.');
    } catch (error) {
      console.error('Error sending location:', error);
      res.status(500).send('Failed to send location to phone numbers.');
    }
  });
  
  // Use distinct function names for each service
  async function sendLocationToPhoneNumber(location, numbers, message, email) {
    try {
      console.log(email);
      const TWILIO_User_Number = await User.findOne({ email }).select({ twilio_no });
      const TWILIO_ACCOUNT_SID = await User.findOne({ email }).select({ twilio_sid });
      const TWILIO_AUTH_TOKEN = await User.findOne({ email }).select({ twilio_auth_token });
  
      console.log(TWILIO_User_Number);
      // const phoneNumbers = await Helper.find({specialization}).distinct('phone_no');
    const TWILIO_Helper_Number = await Helper.findOne({ numbers }).select({ twilio_no });
  
      const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
      await twilio.messages.create({
        body: `${message}\nLocation= ${location}`,
        from: `${TWILIO_User_Number}`,
        // to: `${numbers}`,
        // to:'+919489872106',
        to: '+919148105639',
      });
  
      console.log(`Location sent to ${numbers} successfully.`);
    } catch (error) {
      console.error(`Error sending location to ${numbers}:`, error);
      throw error; // Handle or log the error as needed
    }
  }

  // app.post('/email', async (req, res) => {
  //   const { email} = req.body;
  //   // const user = await User.findOne({ email });
  //   const userEmail = async (email) => {
  //     return email;
  //   }

  //   module.exports= {userEmail}
  // })


  // app.post('/sendMessages', async (req, res) => {
  //   const { location, numbers, message} = req.body;
  //   console.log( numbers);

  //   const email =await userEmail(email);
  //   try {
  //     // Iterate through phoneNumbers and send location to each number
  //     // for (const phoneNumber of phoneNumbers) {
  //       await sendLocationToPhoneNumber(location, numbers, message, email);
  //     // }
  
  //     res.status(200).send('Location sent successfully to all phone numbers.');
  //   } catch (error) {
  //     console.error('Error sending location:', error);
  //     res.status(500).send('Failed to send location to phone numbers.');
  //   }
  // });


  //   async function sendLocationToPhoneNumber(location, numbers, message, email) {
  //     try {
  
  //         console.log(email)
  //         const TWILIO_User_Number = await User.findOne({ email }).select({twilio_no});
  //       const TWILIO_ACCOUNT_SID = await User.findOne({ email }).select({twilio_sid});
  //       const TWILIO_AUTH_TOKEN = await User.findOne({ email }).select({twilio_auth_token});
        
  
  //       console.log(TWILIO_User_Number)
  //       // const phoneNumbers = await Helper.find({specialization}).distinct('phone_no');
  //       const TWILIO_Helper_Number = await Helper.findOne({ numbers }).select({TWILIO_User_Number});
        
  //       const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    
  //       await twilio.messages.create({
  //         body: `${message}\nLocation= ${location}`,
  //         from: `${TWILIO_User_Number}`,
  //         // to: `${numbers}`,
  //         // to:'+919489872106',
  //         to:'+919148105639',
  //       });
     
  //       console.log(`Location sent to ${numbers} successfully.`);
  //     } catch (error) {
  //       console.error(`Error sending location to ${numbers}:`, error);
  //       throw error; // Handle or log the error as needed
  //     }
  //   }


  

  //MedicalService

  app.post('/medicalService', async (req, res) => {
    const { location } = req.body;
    // try {
      const phoneNumbers = await Helper.find({specialization:"medicalService"}).distinct('phone_no');
      console.log(phoneNumbers);
      // res.json(phoneNumbers);
    // } catch (err) {
    //   res.status(500).json({ error: err.message });
    // }
    // console.log(numbers);
    try {
      // Iterate through phoneNumbers and send location to each number
      // for (const phoneNumber of phoneNumbers) {
        await sendLocationToFireNumber(location, phoneNumbers);
      // }
  
      res.status(200).send('Location sent successfully to all phone numbers.');
    } catch (error) {
      console.error('Error sending location:', error);
      res.status(500).send('Failed to send location to phone numbers.');
    }
  });


  async function sendLocationToFireNumber(location, phoneNumbers) {
    try {
      const TWILIO_ACCOUNT_SID = 'AC2b4f0183e0f46f94e44e987d23714569';
      const TWILIO_AUTH_TOKEN = '6cfccbdef01e27af28d442c90a229549';
      const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
      await twilio.messages.create({
        body: `fire Emergency message please reach us. \nLocation= ${location}`,
        from: '+12018624715',
        // to: `${numbers}`,
        to:'+919489872106',
      });
  
      console.log(`Location sent to ${phoneNumbers} successfully.`);
    } catch (error) {
      console.error(`Error sending location to ${phoneNumbers}:`, error);
      throw error; // Handle or log the error as needed
    }
  }

  //FireService

  app.post('/fireService', async (req, res) => {
    const { location } = req.body;
    // try {
      const phoneNumbers = await Helper.find({specialization:"fireService"}).distinct('phone_no');
      console.log(phoneNumbers);
      // res.json(phoneNumbers);
    // } catch (err) {
    //   res.status(500).json({ error: err.message });
    // }
    // console.log(numbers);
    try {
      // Iterate through phoneNumbers and send location to each number
      // for (const phoneNumber of phoneNumbers) {
        await sendLocationToFireNumber(location, phoneNumbers);
      // }
  
      res.status(200).send('Location sent successfully to all phone numbers.');
    } catch (error) {
      console.error('Error sending location:', error);
      res.status(500).send('Failed to send location to phone numbers.');
    }
  });


  async function sendLocationToFireNumber(location, phoneNumbers) {
    try {
      const TWILIO_ACCOUNT_SID = 'AC2b4f0183e0f46f94e44e987d23714569';
      const TWILIO_AUTH_TOKEN = '6cfccbdef01e27af28d442c90a229549';
      const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
      await twilio.messages.create({
        body: `fire Emergency message please reach us. \nLocation= ${location}`,
        from: '+12018624715',
        // to: `${numbers}`,
        to:'+919489872106',
      });
  
      console.log(`Location sent to ${phoneNumbers} successfully.`);
    } catch (error) {
      console.error(`Error sending location to ${phoneNumbers}:`, error);
      throw error; // Handle or log the error as needed
    }
  }

  //PoliceService

  app.post('/policeService', async (req, res) => {
    const { location } = req.body;
    // try {
      const phoneNumbers = await Helper.find({specialization:"policeService"}).distinct('phone_no');
      console.log(phoneNumbers);
      // res.json(phoneNumbers);
    // } catch (err) {
    //   res.status(500).json({ error: err.message });
    // }
    // console.log(numbers);
    try {
      // Iterate through phoneNumbers and send location to each number
      // for (const phoneNumber of phoneNumbers) {
        await sendLocationToFireNumber(location, phoneNumbers);
      // }
  
      res.status(200).send('Location sent successfully to all phone numbers.');
    } catch (error) {
      console.error('Error sending location:', error);
      res.status(500).send('Failed to send location to phone numbers.');
    }
  });


  async function sendLocationToFireNumber(location, phoneNumbers) {
    try {
      const TWILIO_ACCOUNT_SID = 'AC2b4f0183e0f46f94e44e987d23714569';
      const TWILIO_AUTH_TOKEN = '6cfccbdef01e27af28d442c90a229549';
      const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
      await twilio.messages.create({
        body: `fire Emergency message please reach us. \nLocation= ${location}`,
        from: '+12018624715',
        // to: `${numbers}`,

        to:`${phoneNumbers}`,
        //to:'+919489872106',
      });
  
      console.log(`Location sent to ${phoneNumbers} successfully.`);
    } catch (error) {
      console.error(`Error sending location to ${phoneNumbers}:`, error);
      throw error; // Handle or log the error as needed
    }
  }

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });



