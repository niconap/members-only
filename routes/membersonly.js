var express = require('express');
var router = express.Router();
var signupController = require('../controllers/signupController');
var joinController = require('../controllers/joinController');
var loginController = require('../controllers/loginController');
var async = require('async');
var Message = require('../models/message');

router.get('/', function(req, res, next) {
  async.parallel({
    messages: function(callback) {
      Message.find().exec(callback);
    }
  },
  function(err, results) {
    if (err) return next(err);
    res.render('index', { title: 'Welcome', user: req.user, messages: results.messages });
  })
});

router.get('/signup', signupController.signup_get)

router.post('/signup', signupController.signup_post);

router.get('/join', joinController.join_get);

router.post('/join', joinController.join_post);

router.get('/login', loginController.login_get);

router.post('/login', loginController.login_post);

router.get('/logout', loginController.logout);

module.exports = router;
