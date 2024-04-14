const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Inventory Manager', 'Distributor Manager', 'Showroom Manager', 'Donation Manager', 'Export Manager', 'Supplier Manager', 'User Manager']
  }
});

// static signup method
userSchema.statics.signup = async function(email, password, employeeId, contactNumber, role) {

  // validation
  if (!email || !password || !employeeId || !contactNumber || !role) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }
  // Add any additional validation for employeeId and contactNumber if needed

  const exists = await this.findOne({ $or: [{ email }, { employeeId }] });

  if (exists) {
    throw Error('Email or Employee ID already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, employeeId, contactNumber, role });

  return user;
};

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
