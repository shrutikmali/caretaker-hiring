const Caretaker = require('../models/Caretaker.js');
const Customer = require('../models/Customer.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const currentHires = async (req, res) => {
  const { customerID } = req.body;
  try {
    const { currentHires } = await Customer.findById(customerID);
    res.status(200).json(currentHires);
  }
  catch (error) {
    res.status(500).json(error);
  }
}

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingCustomer = await Customer.findOne({email: email});
    if(!existingCustomer) {
      throw new Error('User not found');
    }
    const matchingPassword = await bcrypt.compare(password, existingCustomer.password);
    if(!matchingPassword) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign({id: existingCustomer._id, name: existingCustomer.name}, 'salt');
    res.status(200).json({message: 'success', token: token, name: existingCustomer.name});
  }
  catch (error) {
    res.status(404).json({message: error.message});
  }
}

const signUp = async (req, res) => {
  const { name, age, email, password, address, phone, emergencyPhone, aboutMe } = req.body;
  try {
    const userExists = await Customer.findOne({email: email});
    if(userExists) {
      res.status(409).send("Duplicate email");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newCustomer = await Customer.create({name: name, age: age, email: email, password: hashedPassword, address: address, phonePrimary: phone, phoneEmergency: emergencyPhone, aboutMe: aboutMe});
    const token = jwt.sign({id: newCustomer._id, name: newCustomer.name}, 'salt');
    res.status(200).json({name: newCustomer.name, token: token});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = { 
  findCaretakers, 
  pendingRequests, 
  currentHires,
  signIn,
  signUp,
};
