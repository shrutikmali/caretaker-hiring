const mongoose = require('mongoose');

const caretakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
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
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
  },
  aboutMe: {
    type: String,
    required: true,
    trim: true,
  },
  charge: {
    type: String,
    default: '0',
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  availability: {
    type: String,
    default: 'Available',
  },
  preferredCustomer: {
    type: String,
    default: '',
  },
  pendingRequests: {
    type: [String],
    default: [],
  },
  currentActivities: {
    type: [String],
    default: [],
  },
  pastActivities: {
    type: [String],
    default: [],
  },
  feedbackList: {
    type: [String],
    default: [],
  },
})

const Caretaker = mongoose.model('Caretaker', caretakerSchema);

module.exports = Caretaker;