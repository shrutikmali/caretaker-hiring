const Caretaker = require('../models/Caretaker.js');
const Customer = require('../models/Customer.js');
const Request = require('../models/Request.js');
const Feedback = require('../models/Feedback.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  const { name, age, email, password, address, phone, emergencyPhone, aboutMe, photo } = req.body;
  try {
    const userExists = await Customer.findOne({email: email});
    if(userExists) {
      res.status(409).send("Duplicate email");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newCustomer = await Customer.create({name: name, age: age, email: email, password: hashedPassword, address: address, phonePrimary: phone, phoneEmergency: emergencyPhone, aboutMe: aboutMe, photo: photo});
    const token = jwt.sign({id: newCustomer._id, name: newCustomer.name}, 'salt');
    res.status(200).json({name: newCustomer.name, token: token});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

const findCaretakers = async (req, res) => {
  try {
    const caretakers = await Caretaker.find({availability: 'Available'});
    const result = []
    for(let i=0;i<caretakers.length;i++) {
      const toAdd = {
        id: caretakers[i]._id,
        name: caretakers[i].name, 
        age: caretakers[i].age, 
        aboutMe: caretakers[i].aboutMe,
        preferredCustomer: caretakers[i].preferredCustomer,
        availability: caretakers[i].availability,
      };
      result.push(toAdd);
    }
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

const pendingRequests = async (req, res) => {
  const customerID = req.id;
  try {
    const { pendingRequests } = await Customer.findById(customerID);
    const pendingList = [];
    for(let i=0;i<pendingRequests.length;i++) {
      const request = await Request.findById(pendingRequests[i]);
      const { name, charge } = await Caretaker.findById(request.caretakerID);
      pendingList.push({id: request._id, caretakerName: name, charge: charge, startDate: request.startDate, endDate: request.endDate, additionalDetails: request.additionalDetails});
    }
    res.status(200).send(pendingList);
  }
  catch (error) {
    res.status(500).json(error);
  }
}

const currentHires = async (req, res) => {
  const customerID = req.id;
  try {
    const { currentHires } = await Customer.findById(customerID);
    const hireList = []
    for(let i=0;i<currentHires.length;i++) {
      const request = await Request.findById(currentHires[i]);
      const caretaker = await Caretaker.findById(request.caretakerID);
      hireList.push({id: currentHires[i], 
        caretakerName: caretaker.name, 
        caretakerPhone: caretaker.phone, 
        startDate: request.startDate, 
        endDate: request.endDate,
      });
    }
    res.status(200).send(hireList);
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

const sendRequest = async (req, res) => {
  const customerID = req.id;
  const { caretakerID, startDate, endDate, additionalDetails } = req.body;
  try {
    const newRequest = await Request.create({customerID: customerID, caretakerID: caretakerID, startDate: startDate, endDate: endDate, additionalDetails: additionalDetails});
    const { pendingRequests: caretakerPendingRequests } = await Caretaker.findById(caretakerID);
    const newCaretakerPendingRequests = [...caretakerPendingRequests, newRequest._id];
    await Caretaker.findByIdAndUpdate(caretakerID, {pendingRequests: newCaretakerPendingRequests});
    const { pendingRequests: customerPendingRequests } = await Customer.findById(customerID);
    const newCustomerPendingRequests = [...customerPendingRequests, newRequest._id];
    await Customer.findByIdAndUpdate(customerID, {pendingRequests: newCustomerPendingRequests});
    res.status(200).send("Success");
  }
  catch (error) {
    res.status(500).json(error);
  }
}

const cancelRequest = async (req, res) => {
  const { requestID } = req.body;
  try {
    const request = await Request.findById(requestID);
    const customer = await Customer.findById(request.customerID);
    const caretaker = await Caretaker.findById(request.caretakerID);
    const customerPendingRequests = customer.pendingRequests;
    const newCustomerPendingRequests = customerPendingRequests.filter(request => request !== requestID);
    await Customer.findByIdAndUpdate(request.customerID, {pendingRequests: newCustomerPendingRequests});
    const caretakerPendingRequests = caretaker.pendingRequests;
    const newCaretakerPendingRequests = caretakerPendingRequests.filter(request => request !== requestID);
    await Caretaker.findByIdAndUpdate(request.caretakerID, {pendingRequests: newCaretakerPendingRequests});
    res.status(200).send("Success");
  }
  catch (error) {
    res.status(500).send(error);
  }
  res.status(200).send();
}

const pastHires = async (req, res) => {
  const customerID = req.id;
  try {
    const { pastHires } = await Customer.findById(customerID);
    const pastList = [];
    for(let i=0;i<pastHires.length;i++) {
      const request = await Request.findById(pastHires[i]);
      const { name } = await Caretaker.findById(request.caretakerID);
      pastList.push({id: pastHires[i], caretakerName: name, startDate: request.startDate, endDate: request.endDate, feedback: request.feedbackSent});
    }
    res.status(200).send(pastList);
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

const markAsComplete = async (req, res) => {
  const { requestID } = req.body;
  const customerID = req.id;
  try {
    const { caretakerID } = await Request.findById(requestID);
    const { currentHires, pastHires } = await Customer.findById(customerID);
    const { currentActivities, pastActivities } = await Caretaker.findById(caretakerID);
    const newCurrentHires = currentHires.filter(current => current !== requestID);
    const newPastHires = [...pastHires, requestID];
    await Customer.findByIdAndUpdate(customerID, {pastHires: newPastHires});
    await Customer.findByIdAndUpdate(customerID, {currentHires: newCurrentHires});
    const newCurrentActivities = currentActivities.filter(activity => activity !== requestID);
    const newPastActivities = [...pastActivities, requestID];
    await Caretaker.findByIdAndUpdate(caretakerID, {currentActivities: newCurrentActivities});
    await Caretaker.findByIdAndUpdate(caretakerID, {pastActivities: newPastActivities});
    res.status(200).send("Success");
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

const sendFeedback = async (req, res) => {
  const customerID = req.id;
  const { requestID, rating, feedback } = req.body;
  try {
    const request = await Request.findById(requestID);
    const customer = await Customer.findById(customerID);
    const caretaker = await Caretaker.findById(request.caretakerID);
    const result = await Feedback.create({
      customerID: customerID, 
      caretakerID: request.caretakerID, 
      customerName: customer.name, 
      startDate: request.startDate, 
      endDate: request.endDate, 
      rating: rating,
      feedback: feedback,
    });
    const caretakerFeedbackList = caretaker.feedbackList;
    const newCaretakerFeedbackList = [...caretakerFeedbackList, result._id];
    const totalScore = caretaker.totalScore;
    const newTotalScore = totalScore + rating;
    let newRating = newTotalScore / newCaretakerFeedbackList.length;
    newRating = newRating.toFixed(1);
    await Caretaker.findByIdAndUpdate(request.caretakerID, {feedbackList: newCaretakerFeedbackList});
    await Caretaker.findByIdAndUpdate(request.caretakerID, {totalScore: newTotalScore});
    await Caretaker.findByIdAndUpdate(request.caretakerID, {rating: newRating});
    await Request.findByIdAndUpdate(requestID, {feedbackSent: true});
    await Request.findByIdAndUpdate(requestID, {feedbackID: result._id});
    res.status(200).send("Success");
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = { 
  findCaretakers, 
  pendingRequests, 
  currentHires,
  sendRequest,
  signIn,
  signUp,
  cancelRequest,
  currentHires,
  pastHires,
  markAsComplete,
  sendFeedback,
};
