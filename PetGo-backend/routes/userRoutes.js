const express = require('express');
const router = express.Router();
const { 
  loginUser, 
  registerUser, 
  verifyOTP, 
  forgotPassword, 
  resetPassword 
} = require('../controllers/user.controller');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
