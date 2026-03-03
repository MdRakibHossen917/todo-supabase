const { errorCodes } = require("../utils/errorCodes");
const { statusCodes } = require("../utils/statusCodes");

class EmailService {
  constructor() {
    console.log("📧 Email service disabled - using console OTP");
  }

  async sendOTPEmail(email, otp) {
    console.log("\n========== EMAIL (DISABLED) ==========");
    console.log(`To: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log("=====================================\n");

    return { success: true, devMode: true };
  }
}

module.exports = new EmailService();
