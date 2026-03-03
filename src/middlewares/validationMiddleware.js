const { statusCodes } = require('../utils/statusCodes');
const { errorCodes } = require('../utils/errorCodes');

const validateRegistration = (req, res, next) => {
  const { email, password, name } = req.body;

 
  if (!email || !password || !name) {
    return next(Object.assign(new Error(errorCodes[40002].message), {
      status: statusCodes.BAD_REQUEST,
      error: { code: 40002 }
    }));
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(Object.assign(new Error(errorCodes[40004].message), {
      status: statusCodes.BAD_REQUEST,
      error: { code: 40004 }
    }));
  }

  if (password.length < 6) {
    return next(Object.assign(new Error('Password must be at least 6 characters long'), {
      status: statusCodes.BAD_REQUEST,
      error: { code: 40001, field: 'password' }
    }));
  }

  next();
};

const validateOTP = (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(Object.assign(new Error(errorCodes[40002].message), {
      status: statusCodes.BAD_REQUEST,
      error: { code: 40002 }
    }));
  }

  const otpRegex = /^\d{6}$/;
  if (!otpRegex.test(otp)) {
    return next(Object.assign(new Error('OTP must be 6 digits'), {
      status: statusCodes.BAD_REQUEST,
      error: { code: 40001, field: 'otp' }
    }));
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(Object.assign(new Error(errorCodes[40002].message), {
      status: statusCodes.BAD_REQUEST,
      error: { code: 40002 }
    }));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(Object.assign(new Error(errorCodes[40004].message), {
      status: statusCodes.BAD_REQUEST,
      error: { code: 40004 }
    }));
  }

  next();
};

module.exports = {
  validateRegistration,
  validateOTP,
  validateEmail
};