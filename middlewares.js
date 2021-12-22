const joiValidation = require('./joiValidation')
const jwt = require('jsonwebtoken')
const ErrorResponse = require("./utils/ErrorResponse");
const User = require("./models/user");

const authLogin = async (req,res,next)=>{
      let token
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = await req.headers.authorization.split(" ")[1];
      }
      if (!token)
        return next(new ErrorResponse("Not authorized to access this route", 401))
        
      try {
        const decoded = await jwt.verify(token, process.env.AUTHLOGIN)
        const user = await User.findById(decoded.user._id);
        console.log(user);
        if (!user)
          return next(new ErrorResponse("No user found with this id", 404));

        req.user = user;

        next();
      } catch (err) {
        return next(
          new ErrorResponse("Not authorized to access this router", 401)
        );
      }
}

const validBodyData = (req,res,next)=>{
    const {error} = joiValidation(req.body, req.originalUrl)
    if (error) return next(new ErrorResponse(error.details[0].message, 400));
    next()
}


const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.log(error.message);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = {
  validBodyData,
  authLogin,
  errorHandler,
};