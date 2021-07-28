var express = require('express');
var router = express.Router();
var signupController = require('../controllers/signupController');
var joinController = require('../controllers/joinController');
var loginController = require('../controllers/loginController');
var messageController = require('../controllers/messageController');
var async = require('async');
var Message = require('../models/message');

router.get('/', function(req, res, next) {
  async.parallel({
    messages: function(callback) {
      Message.find().populate('user').exec(callback);
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

router.get('/message/create', messageController.create_get);

router.post('/message/create', messageController.create_post);

router.get('/message/:id/delete/', messageController.delete_get);

router.post('/message/:id/delete/', messageController.delete_post);

module.exports = router;
