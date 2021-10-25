const Caretaker = require('../models/Caretaker.js');
const Customer = require('../models/Customer.js');
const Request = require('../models/Request.js');
const Feedback = require('../models/Feedback.js');
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
    res.status(200).json({message: 'success', token: token, name: existingCaretaker.name, photo: existingCaretaker.photo});
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

const pendingRequests = async (req, res) => {
  const caretakerID = req.id;
  try {
    const { pendingRequests } = await Caretaker.findById(caretakerID);
    const requestList = [];
    for(let i=0;i<pendingRequests.length;i++) {
      const request = await Request.findById(pendingRequests[i]);
      const customer = await Customer.findById(request.customerID);
      requestList.push({
        id: request._id, 
        customerName: customer.name, 
        customerAge: customer.age, 
        startDate: request.startDate, 
        endDate: request.endDate, 
        additionalDetails: request.additionalDetails,
      });
    }
    res.status(200).json(requestList);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

const acceptRequest = async (req, res) => {
  const caretakerID = req.id;
  const { requestID } = req.body;
  try {
    const request = await Request.findById(requestID);
    const customer = await Customer.findById(request.customerID);
    const caretaker = await Caretaker.findById(caretakerID);
    const oldCurrentHires = customer.currentHires;
    const newCurrentHires = [...oldCurrentHires, requestID];
    const oldCustomerPendingRequests = customer.pendingRequests;
    const newCustomerPendingRequests = oldCustomerPendingRequests.filter(request => request !== requestID);
    await Customer.findByIdAndUpdate(request.customerID, {currentHires: newCurrentHires});
    await Customer.findByIdAndUpdate(request.customerID, {pendingRequests: newCustomerPendingRequests});
    const oldCurrentActivities = caretaker.currentActivities;
    const newCurrentActivities = [...oldCurrentActivities, requestID];
    const oldCaretakerPendingRequests = caretaker.pendingRequests;
    const newCaretakerPendingRequests = oldCaretakerPendingRequests.filter(request => request !== requestID);
    await Caretaker.findByIdAndUpdate(caretakerID, {currentActivities: newCurrentActivities});
    await Caretaker.findByIdAndUpdate(caretakerID, {pendingRequests: newCaretakerPendingRequests});
    res.status(200).send("Success");
  }
  catch (error) {
    res.status(500).json({error});
  }
}

const declineRequest = async (req, res) => {
  const caretakerID = req.id;
  const { requestID } = req.body;
  console.log(caretakerID);
  console.log(requestID);
  res.status(200).send("Success");
}

const currentActivities = async (req, res) => {
  const caretakerID = req.id;
  try {
    const { currentActivities } = await Caretaker.findById(caretakerID);
    const activities = [];
    for(let i=0;i<currentActivities.length;i++) {
      const request = await Request.findById(currentActivities[i]);
      const customer = await Customer.findById(request.customerID);
      activities.push({
        id: request._id,
        customerName: customer.name, 
        age: customer.age, 
        primaryPhone: customer.phonePrimary, 
        secondaryPhone: customer.phoneEmergency,
        address: customer.address,
        photo: customer.photo,
        startDate: request.startDate,
        endDate: request.endDate,
        additionalDetails: request.additionalDetails,
      });
    }
    res.status(200).json({message: "Success", activites: activities});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

const getPastActivities = async (req, res) => {
  const caretakerID = req.id;
  try {
    const { pastActivities } = await Caretaker.findById(caretakerID);
    const pastList = [];
    for(let i=0;i<pastActivities.length;i++) {
      const past = {};
      const request = await Request.findById(pastActivities[i]);
      const { name, photo } = await Customer.findById(request.customerID);
      past.id = request._id;
      past.customerName = name;
      past.startDate = request.startDate;
      past.endDate = request.endDate;
      past.rating = null;
      past.feedback = null;
      past.photo = photo;
      if(request.feedbackSent) {
        const feedback = await Feedback.findById(request.feedbackID);
        past.rating = feedback.rating;
        past.feedback = feedback.feedback;
      }
      pastList.push(past);
    }
    res.status(200).json({message: "Success", pastList: pastList})
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

const caretakerDetails = async (req, res) => {
  const caretakerID = req.id;
  try {
    const { name, age, address, phone, photo, aboutMe, availability, preferredCustomer, rating } = await Caretaker.findById(caretakerID);
    const details = {
      name,
      age,
      address,
      phone,
      photo,
      aboutMe,
      availability,
      preferredCustomer,
      rating,
    }
    res.status(200).json({message: "Success", details: details});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

const updateDetails = async (req, res) => {
  const caretakerID = req.id;
  const details = req.body.details;
  try {
    await Caretaker.findByIdAndUpdate(caretakerID, {...details});
    res.status(200).send("Success");
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = {
  signIn,
  signUp,
  pendingRequests,
  acceptRequest,
  declineRequest,
  currentActivities,
  getPastActivities,
  caretakerDetails,
  updateDetails,
};