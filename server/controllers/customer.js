const Caretaker = require('../models/Caretaker.js');
const Customer = require('../models/Customer.js');

const findCaretakers = async (req, res) => {
  try {
    const careTakers = await Caretaker.find({availability: 'Available'});
    res.status(200).send(careTakers);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

const pendingRequests = async (req, res) => {
  const { customerID } = req.body;
  try {
    const { pendingRequests } = await Customer.findById(customerID);
    res.status(200).send(pendingRequests);
  }
  catch (error) {
    res.status(500).json(error);
  }
}


module.exports = { findCaretakers, pendingRequests };
