const errorCodes = {
  40001: {
    reason: "ValidationInvalidField",
    message: "One or more fields contain invalid values.",
  },
  40002: {
    reason: "MissingRequiredField",
    message: "A required field is missing.",
  },
  40003: {
    reason: "InvalidRequestBody",
    message: "Request body format is invalid.",
  },
  40004: {
    reason: "InvalidEmailFormat",
    message: "Invalid email format. Please provide a valid email.",
  },
  40005: {
    reason: "DuplicateEmail",
    message: "This email is already registered. Please use a different email.",
  },
  40006: {
    reason: "InvalidOTP",
    message: "Invalid OTP. Please check and try again.",
  },
  40007: {
    reason: "OTPExpired",
    message: "OTP has expired. Please request a new one.",
  },
  40101: {
    reason: "UserNotFound",
    message: "User not found. Please check your email and try again.",
  },
  40102: {
    reason: "InvalidPassword",
    message: "Invalid password. Please check your password and try again.",
  },
  40110: {
    reason: "TokenExpired",
    message: "Authentication token has expired. Please login again.",
  },
  40111: {
    reason: "InvalidToken",
    message: "Invalid authentication token. Please login again.",
  },
  40113: {
    reason: "TokenMissing",
    message: "Authentication token is missing. Please provide a valid token.",
  },
  40301: {
    reason: "UnauthorizedAction",
    message: "You are not authorized to perform this action.",
  },
  40401: {
    reason: "UserNotFound",
    message: "User not found.",
  },
  50001: {
    reason: "EmailSendFailed",
    message: "Failed to send email. Please try again.",
  },
};

module.exports = { errorCodes };