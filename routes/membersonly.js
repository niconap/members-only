var express = require('express');
var router = express.Router();
var signupController = require('../controllers/signupController');
var joinController = require('../controllers/joinController');
var loginController = require('../controllers/loginController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome', user: req.user });
});

router.get('/signup', signupController.signup_get)

router.post('/signup', signupController.signup_post);

router.get('/join', joinController.join_get);

router.post('/join', joinController.join_post);

router.get('/login', loginController.login_get);

router.post('/login', loginController.login_post);

router.get('/logout', loginController.logout);

module.exports = router;
