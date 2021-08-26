const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  caretakerId: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;