/**
* Model for mapping to database.
* - Framework-specific to Mongoosejs
* - Database-specific to MongoDB
*/

// TODO:
// - implement support for multiple refresh
//   tokens to enable sign in from multiple devices.

import { Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// In production, generate with `openssl rand -hex 32`
const testSecret = 'test+secret';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default:'USER',
  },
  tasks: [
    {
      type: Types.ObjectId,
      ref: 'Task',
    }
  ],
  refreshToken: String,
}, {
  timestamps: true, // This adds createdAt and updatedAt fields
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if the entered password is correct
userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET || testSecret,
    {
      expiresIn: "15m",
    }
  );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET || testSecret,
    {
      expiresIn: "1d",
    }
  );
};

// Compile the schema into a model
const User = model('User', userSchema);

// User.find({}).then(e=>{
//   console.log(e)
// })// 


// const userId = "65b8cf33194c34194eb49639";
// const newPassword = "user1pwd";
//arstonrealestatesr@gmail.com
// // Hash the new password
//  bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(newPassword, salt, async (err, hash) => {
//     if (err) throw err;

//     // Update the user's password in the database
//   let u = await  User.updateOne(
//       { _id: userId },
//       { $set: { password: hash } },
    
//     );
// console.log(u)
//   });
// });
module.exports = User;
