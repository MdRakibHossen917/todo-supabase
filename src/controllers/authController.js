const UserModel = require('../models/userModel');
const { statusCodes } = require('../utils/statusCodes');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;


      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(statusCodes.BAD_REQUEST).json({
          success: false,
          error: {
            code: 40005,
            message: 'This email is already registered.'
          }
        });
      }


      const user = await UserModel.create({ email, password, name });
      

      console.log('\n========== EMAIL VERIFICATION OTP ==========');
      console.log(`Email: ${email}`);
      console.log(`OTP: ${user.otp}`);
      console.log(`Expires: ${user.otp_expiry}`);
      console.log('===========================================\n');

      delete user.otp;
      delete user.otp_expiry;

      res.status(statusCodes.CREATED).json({
        success: true,
        message: 'User registered successfully. Please verify your email.',
        data: { user }
      });
    } catch (error) {
      console.error('Register error:', error);
      next(error);
    }
  }

  async verifyOTP(req, res, next) {
    try {
      const { email, otp } = req.body;

      const result = await UserModel.verifyOTP(email, otp);

      if (result.alreadyVerified) {
        return res.status(statusCodes.OK).json({
          success: true,
          message: 'Email already verified.',
          data: { user: result.user }
        });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Email verified successfully.',
        data: { user: result.user }
      });
    } catch (error) {
      next(error);
    }
  }

  async resendOTP(req, res, next) {
    try {
      const { email } = req.body;

      const result = await UserModel.resendOTP(email);

      if (result.alreadyVerified) {
        return res.status(statusCodes.OK).json({
          success: true,
          message: 'Email already verified.',
          data: { user: result.user }
        });
      }

      console.log('\n========== NEW OTP GENERATED ==========');
      console.log(`Email: ${email}`);
      console.log(`OTP: ${result.otp}`);
      console.log(`Expires: ${result.otp_expiry}`);
      console.log('======================================\n');

      delete result.otp;
      delete result.otp_expiry;

      res.status(statusCodes.OK).json({
        success: true,
        message: 'OTP resent successfully. Check terminal for OTP.',
        data: { user: result }
      });
    } catch (error) {
      console.error('Resend OTP error:', error);
      next(error);
    }
  }
}

module.exports = new AuthController();