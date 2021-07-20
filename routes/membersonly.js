var express = require('express');
var router = express.Router();
var signupController = require('../controllers/signupController');

router.get('/', function(req, res, next) {
  res.send('NOT IMPLEMENTED')
});

router.get('/signup', signupController.signup_get)

module.exports = router;
