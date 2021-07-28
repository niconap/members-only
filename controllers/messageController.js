const User = require('../models/user');
const Message = require('../models/message')
const { body, validationResult} = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');
var passport = require('passport');

exports.create_get = function(req, res, next) {
  res.render('message_form', { title: 'Post message', user: req.user });
}

exports.create_post = [
  // Check and sanitize the fields
  body('title', 'Your title must be at least 3 characters long.').trim().isLength({ min: 3 }).escape(),
  body('title', 'Your title must not be longer than 100 characters.').trim().isLength({ max: 100 }).escape(),
  body('text', 'Your message must be at least 3 characters long.').trim().isLength({ min: 3 }).escape(),
  body('text', 'Your message must not be longer than 250 characters.').trim().isLength({ max: 250 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    let message = new Message({
      title: req.body.title,
      text: req.body.text,
      timestamp: new Date(),
      user: req.user._id,
    })

    if (!errors.isEmpty()) {
      res.render('message_form', { title: 'Post message', user: req.user, errors: errors.array() });
      return;
    } else {
      message.save(function(err) {
        if (err) return next(err);
        res.redirect('/');
      })
    }
  }
]