const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phonePrimary: {
    type: Number,
    required: true,
  },
  phoneEmergency: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  pendingRequests: {
    type: [String],
    default: [],
  },
  currentHires: {
    type: [String],
    default: [],
  },
  pastHires: {
    type: [String],
    default: [],
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;