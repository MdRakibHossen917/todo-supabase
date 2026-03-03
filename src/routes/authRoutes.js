const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  validateRegistration,
  validateOTP,
  validateEmail
} = require('../middlewares/validationMiddleware');

// @route   POST /api/auth/register

router.post('/register', validateRegistration, authController.register);

// @route   POST /api/auth/verify-otp

router.post('/verify-otp', validateOTP, authController.verifyOTP);

// @route   POST /api/auth/resend-otp

router.post('/resend-otp', validateEmail, authController.resendOTP);

module.exports = router;