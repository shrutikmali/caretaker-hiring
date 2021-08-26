const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cors());


const PORT = process.env.PORT || 5000;
const MONGO_CONNECTION = 'mongodb://127.0.0.1:27017/CaretakerApp';

mongoose.connect(MONGO_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => console.log("MongoDB connected"))
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server listening on port ${PORT}`));

  mongoose.set('useFindAndModify', false);
