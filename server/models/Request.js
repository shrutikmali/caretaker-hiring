const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true,
  },
  caretakerID: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  additionalDetails: {
    type: String,
  },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;