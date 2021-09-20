const Caretaker = require('../models/Caretaker.js');

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
    const token = jwt.sign({id: existingCaretaker._id, name: existingCaretaker.name}, 'test');
    res.status(200).json({message: 'success', token: token, name: existingCaretaker.name});
  }
  catch (error) {
    res.status(404).json({message: error.message});
  }
}

module.exports = {
  signIn,
};