const sendMail = require("./config");

// export the request password reset function for email sending
exports.requestPasswordReset = (email, subject, userPayload) => {
  const payload = `<p>Hello ${userPayload.name} </p>
   <p>You requested to reset your password.</p>
   <p>Please, click the link below to reset your password</p>
   <a href="${userPayload.link}">Reset Password</a>
  `;

  sendMail(email, subject, payload);
};


// export the password reset function for email sending
exports.passwordReset = (email, subject, userPayload) => {
 const payload = `<p>Hi ${userPayload.name},</p>
  <p>Your password has been changed successfully</p>
 `;

  sendMail(email, subject, payload);
};
  