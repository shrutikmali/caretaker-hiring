const Caretaker = require('../models/Caretaker.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingCaretaker = await Caretaker.findOne({email: email});
    if(!existingCaretaker) {
      throw new Error('User not found with given email');
    }
    const matchingPassword = await bcrypt.compare(password, existingCaretaker.password);
    if(!matchingPassword) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign({id: existingCaretaker._id, name: existingCaretaker.name}, 'salt');
    res.status(200).json({message: 'success', token: token, name: existingCaretaker.name});
  }
  catch (error) {
    res.status(404).json({message: error.message});
  }
}

const signUp = async (req, res) => {
  const { name, age, email, password, phone, preferredCustomer, address, aboutMe } = req.body;
  try {
    const existingCaretaker = await Caretaker.findOne({email: email});
    if(existingCaretaker) {
      res.status(409).send('User with email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newCaretaker = await Caretaker.create({
      name: name,
      age: age,
      email: email,
      password: hashedPassword,
      phone: phone,
      preferredCustomer: preferredCustomer,
      address: address,
      aboutMe: aboutMe,
    });
    const token = await jwt.sign({id: newCaretaker._id, name: newCaretaker.name}, 'salt');
    res.status(200).json({name: newCaretaker.name, token: token});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = {
  signIn,
  signUp,
};