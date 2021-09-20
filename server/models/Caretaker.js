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
  rating: {
    type: Number,
    default: 0,
  },
  availability: {
    type: String,
    default: 'Available',
  },
  customerPreference: {
    type: String,
    default: '',
  },
})

const Caretaker = mongoose.model('Caretaker', caretakerSchema);

module.exports = Caretaker;