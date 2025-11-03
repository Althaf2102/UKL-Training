const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Post untuk login
router.post('/login', authController.login);
// Post untuk register
router.post('/register', authController.register);
//Get authorize
router.get('/authorize', authController.authorize);
module.exports = router;