const User = require('../models/user');
const Message = require('../models/message')
const { body, validationResult} = require('express-validator');
const async = require('async');

exports.signup_get = function(req, res, next) {
  res.render('signup_form', { title: "Sign up" })
}