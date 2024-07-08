const User = require('../models/userModel');
const createError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyAndDecodeIdFromJWT = require("../middleware/decodeToken");
const userValidationSchema = require('../models/userValidationSchema');
const updateValidationSchema = require('../models/userValidationSchema');
const mongoose = require('mongoose');
require("dotenv").config();


//REGISTER USER

exports.signup = async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message.replace(/["\[\]]/g, '');
    return res.status(400).json({
      message: "Bad request: " + errorMessage,
      dataFound: false,
      status: false,
    });
  }

  try {
    const existingUser = await User.findOne({ phonenumber: req.body.phonenumber });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists", dataFound: false, status: false });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, phone: newUser.phonenumber },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRESIN || "2hr",
      }
    );

    const refreshToken = jwt.sign(
      { id: newUser._id, phone: newUser.phonenumber },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN || "7d" }
    );

    const hashedRefreshToken = await newUser.hashToken(refreshToken);
    newUser.tokens.push(hashedRefreshToken);

    await newUser.save();

    res.status(201).json({
      status: true,
      message: 'User registered successfully',
      accessToken: token,
      refreshToken: refreshToken,
      dataFound: true
    });

  } catch (error) {
    next(error);
  }
};

//LOGIN
exports.login = async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message.replace(/["\[\]]/g, '');
    return res.status(400).json({
      message: "Bad request: " + errorMessage,
      dataFound: false,
      status: false,
    });
  }

  try {
      const { phonenumber, password } = req.body;

      const user = await User.findOne({ phonenumber });

      if (!user) {
          return res.status(404).json({ message: "User not found", dataFound: false, status: false });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid password", dataFound: false, status: false });
      }

      const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.TOKEN_EXPIRESIN || "2hr" }
      );

      const refreshToken = jwt.sign(
          { id: user._id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN || "7d" }
      );

      const hashedRefreshToken = await user.hashToken(refreshToken);
      user.tokens.push(hashedRefreshToken);

      await user.save();

      res.status(200).json({
          status: true,
          message: 'Logged in successfully',
          dataFound: true,
          user: {
              _id: user._id,
              phonenumber: user.phonenumber,
          },
          accessToken: token,
          refreshToken: refreshToken
      });
  } catch (error) {
      next(error);
  }
};

//GETALL
exports.getAllCustomer = async (req, res) => {
  try {
    const { skip, limit, fields, sort } = req.queryOptions;
    const users = await User.find({}, fields, { skip, limit, sort });
    const total = await User.countDocuments({});

    res.json({
      status: true,
      dataFound: true,
      data: users,
      total,
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};




//UPDATE
exports.updateCustomer = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  let customerId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    customerId = decoded.id;
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      dataFound: false,
      status: false,
    });
  }

  // // Validate request body
  // const { error } = updateValidationSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).json({
  //     message: error.details[0].message,
  //     dataFound: false,
  //     status: false,
  //   });
  // }

  try {
    const updateData = { ...req.body };

    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 12);
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(customerId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        dataFound: false,
        status: false,
      });
    }

    res.json({
      message: "User updated successfully",
      //data: updatedUser,
      dataFound: true,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      dataFound: false,
      status: false,
    });
  }
};




//REFRESH 
exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.token;

  try {
      const customerId = verifyAndDecodeIdFromJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(customerId);

      if (!user) {
          return res.status(404).json({ message: 'User not found', dataFound: false, status: false });
      }

      const validRefreshToken = await user.tokens.some(async (hashedToken) => {
          return await bcrypt.compare(refreshToken, hashedToken);
      });

      if (!validRefreshToken) {
          return res.status(401).json({ message: 'Invalid refresh token', dataFound: false, status: false });
      }

      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRESIN || '2hr' });

      res.json({
          message: 'Token refreshed!',
          dataFound: true,
          status: true,
          userId: user._id,
          accessToken: accessToken,
          refreshToken: refreshToken
      });
  } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(500).json({ message: 'Internal Server Error', dataFound: false, status: false });
  }
};


//LOGOUT

exports.logout = async (req, res) => {
  const refreshToken = req.body.token;

  try {
      const customerId = verifyAndDecodeIdFromJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(customerId);

      if (!user) {
          return res.status(404).json({ message: 'User not found', dataFound: false, status: false });
      }

      user.tokens = [];
      await user.save();

      res.status(200).json({
          message: 'Logged out Successfully',
          dataFound: true,
          status: true
      });
  } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({
          message: 'Internal server error',
          dataFound: false,
          status: false
      });
  }
};





  
  



