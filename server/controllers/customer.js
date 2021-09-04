const Caretaker = require('../models/Caretaker.js');

const findCaretakers = async (req, res) => {
  const careTakers = await Caretaker.find({availability: 'Available'});
  res.status(200).send(careTakers);
}


module.exports = { findCaretakers };
