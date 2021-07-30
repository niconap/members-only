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
  body('title', 'Your title must be at least 3 characters long.').trim().isLength({ min: 3 }),
  body('title', 'Your title must not be longer than 100 characters.').trim().isLength({ max: 100 }),
  body('text', 'Your message must be at least 3 characters long.').trim().isLength({ min: 3 }),
  body('text', 'Your message must not be longer than 250 characters.').trim().isLength({ max: 250 }),

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

exports.delete_get = function(req, res, next) {
  async.parallel({
    message: function(callback) {
      Message.findById(req.params.id).populate('user').exec(callback);
    }
  },
  function(err, results) {
    if (err) return next(err);
    if (results.message == null) {
      res.redirect('/');
    }
    res.render('message_delete', { title: 'Delete message: ', message: results.message, user: req.user })
  })
}

exports.delete_post = function(req, res, next) {
  Message.findByIdAndRemove(req.body.messageid, function deleteMessage(err) {
    if (err) return next(err);
    res.redirect('/');
  })
}