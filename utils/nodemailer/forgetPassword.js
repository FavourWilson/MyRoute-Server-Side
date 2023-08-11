const { sendMail } = require("./config");

// export the request password reset function for email sending
exports.forgetPasswordMail = (email, subject, userPayload) => {
  console.log(userPayload.link)
  const payload = `<p>Hello ${userPayload.name} </p>
   <p>You requested to reset your password.</p>
   <p>Please, click the link below to reset your password</p>
   <a href="https://${userPayload.link}">Reset Password</a>
  `;

  sendMail(email, subject, payload);
};