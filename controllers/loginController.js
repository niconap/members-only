const { body, validationResult} = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');
var passport = require('passport');

// Render the login form
exports.login_get = function(req, res, next) {
  res.render('login_form', { title: "Log in" })
}

exports.login_post = passport.authenticate("local", {
  successRedirect: "/membersonly",
  failureRedirect: "/membersonly/login"
});

exports.logout = function(req, res, next) {
  req.logout();
  res.redirect('/');
}