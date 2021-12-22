const mongoose = require('mongoose')
const {Schema} = mongoose
const crypto = require('crypto')
const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    registerToken:String,
    resetPasswordToken:String
})

userSchema.methods.tokenToReset = function(){
    const resetToken = crypto.randomBytes(64).toString("hex");
    this.resetPasswordToken = resetToken;
    console.log({ resetToken }, this.resetPasswordToken);
    return resetToken;
}

module.exports = mongoose.model("User", userSchema)