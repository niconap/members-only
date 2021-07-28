const User = require('../models/user');
const { body, validationResult} = require('express-validator');
const async = require('async');

// Render the join form
exports.join_get = function(req, res, next) {
  if (req.user) {
    res.render('join_form', { title: "Join the club", user: req.user })
  } else {
    res.redirect('/membersonly/login')
  }
}

exports.join_post = [
  // Check if the entered passcode is correct
  body('passcode', 'Passcode is incorrect.').equals(process.env.PASSCODE),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('join_form', { title: "Sign up", user: req.user, errors: errors.array() });
    } else {
      User.findOneAndUpdate({ username: req.user.username }, { membership_status: { member: true, admin: false } }, { new: true }, function(err, theuser) {
        if (err) return next(err);
        res.redirect('/');
      })
    }
  }
]