// const express = require('express');
// const cors = require('cors');
// const Helper = require('./Model/Helper');
// const mongoose = require("mongoose");
// const bodyParser = require('body-parser');

// const app = express();

// app.use(cors());
// app.use(express.json());

// var db= mongoose.connect("mongodb://127.0.0.1:27017/Sahayak1", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('MongoDB connected successfully');

//   // Define your schemas and models here (Helper model assumed)

//   app.post('/helper', async (req, res) => {
//     try {
//       const helper = new Helper(req.body);
//       const result = await helper.save();
//       res.send(result);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

//   app.get('/domesticOption', async (req, res) => {
//     try {
//       const specializations = await Helper.distinct('specialization');
//       res.json(specializations);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

//   app.get('/getPhoneNumbers/:specializations', async (req, res) => {
//     const specializations = req.params.specializations;
//       var query = await Helper.findMany(specializations).select('phone_no');
//         res.send(query);
//   });

//   app.listen(3000, () => {
//     console.log('Server is running on port 3000');
//   });
// })
// .catch((err) => {
//   console.error('MongoDB connection error:', err);
// });


const express = require('express');
const cors = require('cors');
const Helper = require('./Model/Helper');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Sahayak1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');

  // Define your schemas and models here (Helper model assumed)

  app.post('/helper', async (req, res) => {
    try {
      const helper = new Helper(req.body);
      const result = await helper.save();
      res.send(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/domesticOption', async (req, res) => {
    try {
      const specializations = await Helper.distinct('specialization');
      res.json(specializations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/getPhoneNumbers/:specialization', async (req, res) => {
    const { specialization } = req.params;
    try {
      const phoneNumbers = await Helper.find({specialization},'phone_no')
      res.json(phoneNumbers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
