const { sendMail } = require("./config");

// export the password reset function for email sending
exports.resetPasswordMail = (email, subject, userPayload) => {
 const payload = `<p>Hi ${userPayload.name},</p>
  <p>Your password has been changed successfully</p>
 `;

  sendMail(email, subject, payload);
};
  