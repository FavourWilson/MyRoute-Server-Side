// Handle user authentication
exports.authProtect = async (req, res, next) => {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.SESSIONID) token = req.cookies.SESSIONID;
      if (!token)
        return next(
          new appError("you are not logged in, Please login to get access")
        );
  
      const validate = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const { id } = validate;
      const user = userRepository.getUserById(id);
      if (!user)
        return next(
          new appError(
            "The user belonging to this token does no longer exist",
            401
          )
        );
  
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ err });
    }
  };
  