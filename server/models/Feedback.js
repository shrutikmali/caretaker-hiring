const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true,
  },
  caretakerID: {
    type: String,
    required: true,
  },
  customerName: {
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
  rating: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    trim: true,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;