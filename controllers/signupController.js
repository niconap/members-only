const User = require('../models/user');
const Message = require('../models/message')
const { body, validationResult} = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

exports.signup_get = function(req, res, next) {
  res.render('signup_form', { title: "Sign up" })
}

exports.signup_post = [
  (req, res, next) => {
    next();
  },

  // Check and sanitize all the fields
  body('first_name', 'Name must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  body('first_name', 'Name must not be longer than 100 characters.').trim().isLength({ max: 100 }).escape(),
  body('last_name', 'Last name must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  body('last_name', 'Last name must not be longer than 100 characters.').trim().isLength({ max: 100 }).escape(),
  body('user_name', 'Username must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  body('user_name', 'Username must not be longer than 100 characters.').trim().isLength({ max: 100 }).escape(),
  // Check if username is already in the database
  body('user_name', 'Username is already in use.').custom((value, { req }) => {
    return new Promise((resolve, reject) => {
      User.findOne({ username: req.body.user_name }, function(err, user) {
        if (err) return next(err);
        if(user.username == value) {
          reject(new Error('Username is already in use.'))
        }
        resolve(true);
      });
    });
  }),
  body('password', 'Password must be longer than 8 characters.').isLength({ min: 8 }),
  // Check if password and confirm_password are the same
  body('confirm_password', 'Passwords do not match.').if((value, { req }) => {
    value === req.body.password;
  }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        var user = new User({
          name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.user_name,
          password: hashedPassword,
          membership_status: false,
        }).save(err => {
          if (err) return next(err);
          res.redirect('/');
        })
      })
    } else {
      console.log(errors.array());
      res.render('signup_form', { title: "Sign up", errors: errors.array() });
    }
  }
]