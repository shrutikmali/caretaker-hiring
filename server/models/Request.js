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
  feedbackSent: {
    type: Boolean,
    default: false,
  },
  feedbackID: {
    type: String,
    default: '',
  },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;