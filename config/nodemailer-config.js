const nodemailer = require("nodemailer");
const helpers = require("../helpers")

exports.sendMail = async (email, subject, payload) => {

  try {
    // create reusable transporter object
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: payload,
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        helpers.newError("email was not successfully sent, check you network connection", 400)
      } else {
        console.log({
          success: true,
        });
      }
    });
  } catch (error) {
    helpers.newError("Could not sent email", 400)
    // console.log({ errorMessage: });
  }
};