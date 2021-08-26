const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  caretakerId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;