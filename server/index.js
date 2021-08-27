const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customer.js');
const caretakerRoutes = require('./routes/caretaker.js');

const app = express();
app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use('/customer', customerRoutes);
app.use('/caretaker', caretakerRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_CONNECTION = 'mongodb://127.0.0.1:27017/CaretakerApp';

mongoose.connect(MONGO_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => console.log("MongoDB connected"))
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server listening on port ${PORT}`));

  mongoose.set('useFindAndModify', false);
