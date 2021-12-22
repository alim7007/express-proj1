const User = require('../models/user')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const ErrorResponse = require("../utils/ErrorResponse");

//SERVICES
const googleVerify = require('../service/google')
const SendMailJet = require('../service/mailjet');

//CONTROLS

//register
const register_user = async (req,res,next)=>{
  const {name, email, password} = req.body
  //check for user's existence
  const userExist = await User.findOne({email})
  if (userExist)
    return next(new ErrorResponse("This email already exists", 400));
  //hashing password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  //creating and saving user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    registerToken: salt + uuidv4(),
    resetPasswordToken: null,
  });
  const savedUser = await user.save()
  await SendMailJet(savedUser, "verify")
  res.send('Check your email for verifcation')
}

//google register
const google_register_user = async (req,res,next)=>{
const google_user = await googleVerify(req.body.token).catch(console.error);
  //check for user's existence
  const userExist = await User.findOne({email:google_user.email})
  if(userExist) 
    return next(new ErrorResponse("This email already exists", 400));
  //hashing password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(uuidv4(), salt)
  //creating and saving user
  const user = new User({
    name: google_user.name,
    email: google_user.email,
    password:hashedPassword,
    registerToken: null,
    resetPasswordToken:null
  })
  await user.save()
  const jwtHeaderToken = jwt.sign({ user: user }, process.env.AUTHLOGIN, {
    expiresIn: '10h',
  });
  res.status(200).json({ sucess: true, jwtHeaderToken });
}

//login
const login_user = async (req,res,next)=>{
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  //check for user existence
  if (!userExist)
    return next(new ErrorResponse("There is no user with this email", 400));
  //check for verified email
  if (userExist.registerToken)
    return next(new ErrorResponse("You didn't verify your account", 400));
  //check for password
  const validPass = await bcrypt.compare(password, userExist.password);
  if (!validPass) return next(new ErrorResponse("Invalid password", 400));
  //set header for auth
  const jwtHeaderToken = jwt.sign({ user: userExist }, process.env.AUTHLOGIN,{
    expiresIn: '10h'
  });
  res.status(200).json({ sucess: true, jwtHeaderToken });
}

//google login
const google_login_user = async (req,res,next)=>{
  const google_user = await googleVerify(req.body.token).catch(console.error);
  //check for user's existence
  const userExist = await User.findOne({ email: google_user.email });
  if (!userExist)
    return next(new ErrorResponse("There is no user with this email", 400));
  //check for verified email
  if (userExist.registerToken)
    return next(new ErrorResponse("You didn't verify your account", 400));
  //set header for auth
  const jwtHeaderToken = jwt.sign({ user: userExist }, process.env.AUTHLOGIN, {
    expiresIn: '10h',
  });
  res.status(200).json({ sucess: true, jwtHeaderToken });
}

//reset password
const reset_password = async (req,res,next)=>{
  //check for user's existence
  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist)
    return next(new ErrorResponse("There is no user with this email", 400));
  //check for verified email
  if (userExist.registerToken)
    return next(new ErrorResponse("You didn't verify your account", 400));
  userExist.tokenToReset();
  userExist.save()
  SendMailJet(userExist, "reset_password");
  res.send("Check your Email for Verify Reset Password")
}

//verify email
const verify_email = async (req,res,next)=>{
const user = await User.findOne({registerToken:req.query.token})
  if (!user)
    return next(new ErrorResponse("There is no user with this token", 400));
    user.registerToken = null
    await user.save()
//set header for auth
const jwtHeaderToken = jwt.sign({ user: user }, process.env.AUTHLOGIN, {
  expiresIn: '10h',
});
res.status(200).json({ sucess: true, jwtHeaderToken });
}
//verify reset password
const verify_reset_password = async (req, res, next) => {
  const { password } = req.body;
  const user = await User.findOne({ resetPasswordToken: req.query.token });
  if (!user)
    return next(new ErrorResponse("There is no user with this token", 400));
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  await user.save();
  //set header for auth
  const jwtHeaderToken = await jwt.sign({ user: user }, process.env.AUTHLOGIN, {
    expiresIn: '10h',
  });
  res.status(200).json({ sucess: true, jwtHeaderToken });
};

const checkAuth = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: JSON.stringify(req.user)
  });
};

//MODULES
module.exports = {
  //register
  register_user: register_user,
  google_register_user,
  //verify
  verify_email,
  verify_reset_password,
  //login
  login_user,
  google_login_user,
  //reset password
  reset_password,
  //checkAuth
  checkAuth
};
