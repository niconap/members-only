const User = require('../models/user');
const Message = require('../models/message');
const { body, validationResult} = require('express-validator');
const async = require('async');

exports.user_get = function(req, res, next) {
  async.parallel({
    person: function(callback) {
      User.findById(req.params.id).exec(callback);
    },
    messages: function(callback) {
      Message.find({ user: req.params.id }).populate('user').exec(callback);
    }
  },
  function(err, results) {
    if (err) return next(err);
    res.render('user_detail', { person: results.person, messages: results.messages, user: req.user })
  })
}