const { sendMail } = require("./config");

// export the password reset function for email sending
exports.sendVerificationCode = (email, subject, userPayload) => {
 const payload = `<p>Hi ${userPayload.name},</p>
  <p>Your verification code is ${userPayload.verificationCode} </p>
 `;

  sendMail(email, subject, payload);
};
  