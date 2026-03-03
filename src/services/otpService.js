const crypto = require('crypto');

class OTPService {
  static generateOTP() {
    const otp = crypto.randomInt(100000, 999999).toString();
    return otp;
  }

  static generateExpiryTime(minutes = 10) {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + minutes);
    return expiryDate.toISOString();
  }

  static isOTPExpired(expiryTime) {
    let timeStr = expiryTime;
    if (typeof timeStr === 'string' && !timeStr.endsWith('Z')) {
      timeStr += 'Z';
    }
    return new Date() > new Date(timeStr);
  }
}

module.exports = OTPService;