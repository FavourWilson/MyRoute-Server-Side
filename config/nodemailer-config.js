const nodemailer = require("nodemailer");

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
        console.log({
          success: false, error
        });
      } else {
        console.log({
          success: true,
        });
      }
    });
  } catch (error) {
    console.log({ errorMessage: "Could not sent email"});
  }
};