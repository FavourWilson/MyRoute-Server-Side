const jwt = require("jsonwebtoken");

// create verification code
const OTP = () => {
 return Math.floor(Math.random() * (123456, 789012))
}

// send a token to the client
const createSendToken = (res, status, user) => {
  try {
    // create token in nodeJs
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRES,
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: false,
    };

    // send a cookie as a response
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("SESSIONID", token, cookieOptions);
    res.status(status).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error,
    });
  }
};

// create a function to send an Error message
const sendError = (message, code) => {
  const error = {
    status: "ERROR",
    code: code,
    message: message,
  };

  return error;
};

// create a function to send a success message
const sendSuccess = (message, code) => {
  const success = {
    status: "SUCCESS",
    code: code,
    message: message,
  };

  return success;
};

module.exports = {
  OTP,
  createSendToken,
  sendError,
  sendSuccess,
};
