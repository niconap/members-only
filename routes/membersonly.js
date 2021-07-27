var express = require('express');
var router = express.Router();
var signupController = require('../controllers/signupController');
var joinController = require('../controllers/joinController');

router.get('/', function(req, res, next) {
  res.send('NOT IMPLEMENTED')
});

router.get('/signup', signupController.signup_get)

router.post('/signup', signupController.signup_post);

router.get('/join', joinController.join_get);

router.post('/join', joinController.join_post);

module.exports = router;
