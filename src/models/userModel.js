const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');
const OTPService = require('../services/otpService');
const { errorCodes } = require('../utils/errorCodes');
const { statusCodes } = require('../utils/statusCodes');

class UserModel {
  static async create(userData) {
    try {
      const { email, password, name } = userData;
      
    
      const hashedPassword = await bcrypt.hash(password, 10);
      
    
      const otp = OTPService.generateOTP().toString();
      const otpExpiry = OTPService.generateExpiryTime(10);
      
      console.log('Generated OTP (string):', otp);
      console.log('OTP Type:', typeof otp);
      
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            email,
            password: hashedPassword,
            name,
            otp: otp, 
            otp_expiry: otpExpiry,
            is_verified: false,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        if (error.code === '23505') {
          throw Object.assign(new Error(errorCodes[40005].message), {
            status: statusCodes.BAD_REQUEST,
            error: { code: 40005 }
          });
        }
        throw error;
      }

      console.log('Saved OTP in DB:', data.otp);
      console.log('Saved OTP Type:', typeof data.otp);
      
      
      return { ...data, otp: otp };
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Find by email error:', error);
      throw error;
    }
  }

  static async verifyOTP(email, otp) {
    try {
      const user = await this.findByEmail(email);
      
      if (!user) {
        throw Object.assign(new Error(errorCodes[40401].message), {
          status: statusCodes.NOT_FOUND,
          error: { code: 40401 }
        });
      }

      if (user.is_verified) {
        return { alreadyVerified: true, user };
      }

      const storedOTP = String(user.otp).trim();
      const receivedOTP = String(otp).trim();

      console.log('========== OTP COMPARISON ==========');
      console.log('Stored OTP:', storedOTP);
      console.log('Stored OTP Type:', typeof storedOTP);
      console.log('Received OTP:', receivedOTP);
      console.log('Received OTP Type:', typeof receivedOTP);
      console.log('Match:', storedOTP === receivedOTP);
      console.log('====================================');

      if (storedOTP !== receivedOTP) {
        throw Object.assign(new Error(errorCodes[40006].message), {
          status: statusCodes.BAD_REQUEST,
          error: { code: 40006 }
        });
      }

      if (OTPService.isOTPExpired(user.otp_expiry)) {
        throw Object.assign(new Error(errorCodes[40007].message), {
          status: statusCodes.BAD_REQUEST,
          error: { code: 40007 }
        });
      }

      const { data, error } = await supabase
        .from('users')
        .update({ 
          is_verified: true, 
          otp: null, 
          otp_expiry: null,
          verified_at: new Date().toISOString()
        })
        .eq('email', email)
        .select()
        .single();

      if (error) throw error;

      return { user: data };
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  }

  static async resendOTP(email) {
    try {
      const user = await this.findByEmail(email);
      
      if (!user) {
        throw Object.assign(new Error(errorCodes[40401].message), {
          status: statusCodes.NOT_FOUND,
          error: { code: 40401 }
        });
      }

      if (user.is_verified) {
        return { alreadyVerified: true, user };
      }

      const otp = OTPService.generateOTP().toString();
      const otpExpiry = OTPService.generateExpiryTime(10);

      console.log('New OTP generated (string):', otp);

      const { data, error } = await supabase
        .from('users')
        .update({ 
          otp: otp, 
          otp_expiry: otpExpiry 
        })
        .eq('email', email)
        .select()
        .single();

      if (error) throw error;

      console.log('Updated user with OTP:', data.otp);

      return { ...data, otp: otp };
    } catch (error) {
      console.error('Resend OTP error:', error);
      throw error;
    }
  }
}

module.exports = UserModel;