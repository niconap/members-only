const User = require('../models/user');
const Message = require('../models/message')
const { body, validationResult} = require('express-validator');
const async = require('async');

// Render the join form
exports.join_get = function(req, res, next) {
  res.render('join_form', { title: "Join the club" })
}

exports.join_post = [
  body('user_name', 'Username must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  body('user_name', 'Username must not be longer than 100 characters.').trim().isLength({ max: 100 }).escape(),
  // Check if username is in the database, if not: reject
  body('user_name', 'Username is already in use.').custom((value, { req }) => {
    return new Promise((resolve, reject) => {
      User.findOne({ username: req.body.user_name }, function(err, user) {
        if (err) return next(err);
        if(user) {
          resolve(true);
        }
        reject(new Error('Username is not in use.'))
      });
    });
  }),
  // Check if the entered passcode is correct
  body('passcode', 'Passcode is incorrect.').equals(process.env.PASSCODE),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('join_form', { title: "Sign up", errors: errors.array() });
    } else {
      User.findOneAndUpdate({ username: req.body.user_name }, { membership_status: { member: true, admin: false } }, { new: true }, function(err, theuser) {
        if (err) return next(err);
        res.redirect('/');
      })
    }
  }
]