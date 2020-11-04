const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = require('./app/models/user')
const User = mongoose.model('User', userScheme);

