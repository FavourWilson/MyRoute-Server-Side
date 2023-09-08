const { sendMail } = require("../config/nodemailer-config");

// export the password reset function for email sending
const sendVerificationCode = (email, subject, userPayload) => {
  const payload = `<p>Hi ${userPayload.name},</p>
  <p>Your verification code is ${userPayload.verificationCode} </p>
 `;

  sendMail(email, subject, payload);
};

// export the request password reset function for email sending
const forgetPasswordMail = (email, subject, userPayload) => {
  const payload = `<p>Hello ${userPayload.name} </p>
   <p>You requested to reset your password.</p>
   <p>Please, click the link below to reset your password</p>
   <a href="https://${userPayload.link}">Reset Password</a>
  `;

  sendMail(email, subject, payload);
};

// export the password reset function for email sending
const resetPasswordMail = (email, subject, userPayload) => {
  const payload = `<p>Hi ${userPayload.name},</p>
  <p>Your password has been changed successfully</p>
 `;

  sendMail(email, subject, payload);
};

module.exports = {
  sendVerificationCode, forgetPasswordMail, resetPasswordMail
}

