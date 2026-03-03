const { statusCodes } = require('../utils/statusCodes');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.status && err.error) {
    return res.status(err.status).json({
      success: false,
      error: {
        code: err.error.code,
        message: err.message
      }
    });
  }

  if (err.code === '23505') {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      error: {
        code: 40005,
        message: 'This email is already registered.'
      }
    });
  }


  res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: 50000,
      message: 'An unexpected error occurred. Please try again later.'
    }
  });
};

module.exports = errorHandler;