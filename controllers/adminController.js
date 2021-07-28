const User = require('../models/user');
const { body, validationResult} = require('express-validator');
const async = require('async');

// Render the admin form
exports.admin_get = function(req, res, next) {
  if (req.user) {
    res.render('admin_form', { title: "Become an admin", user: req.user })
  } else {
    res.redirect('/membersonly/login')
  }
}

exports.admin_post = [
  // Check if the entered passcode is correct
  body('passcode', 'Passcode is incorrect.').equals(process.env.ADMIN_PASSCODE),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('admin_form', { title: "Become an admin", user: req.user, errors: errors.array() });
    } else {
      User.findOneAndUpdate({ username: req.user.username }, { membership_status: { member: true, admin: true } }, { new: true }, function(err, theuser) {
        if (err) return next(err);
        res.redirect('/');
      })
    }
  }
]