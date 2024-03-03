import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from "../models/userModel.js";

dotenv.config();
const jwtSecretKey = process.env.JWT_TOKEN_KEY;

// Function to create a JWT token
const createToken = (userId) => {
  return jwt.sign({ userId }, jwtSecretKey, { expiresIn: '1h' });
};

// Controller function for user registration
export const createUser = async (request, response) => {
  try {
    const { firstName, lastName, email, mobile, password } = request.body;

    if (!firstName || !lastName || !email || !mobile || !password) {
      return response.status(400).send({
        message: 'Please provide all required fields',
        alert: 'error'
      });
    }

    const existingUserByEmail = await User.findOne({ email });
    const existingUserByMobile = await User.findOne({ mobile });

    if (existingUserByEmail) {
      return response.status(400).send({
        message: 'Email is already registered',
        alert: 'email'
      });
    }

    if (existingUserByMobile) {
      return response.status(400).send({
        message: 'Mobile number is already registered',
        alert: 'mobile'
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    return response.status(201).send({
      user,
      message: 'Successfully signed up',
      alert: 'success'
    });

  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: 'Internal Server Error', alert: 'error' });
  }
};

// Controller function for user login
export const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(401).json({
        message: 'Invalid email or password',
        alert: false,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return response.status(401).json({
        message: 'Invalid email or password',
        alert: false,
      });
    }

    const token = createToken(user._id);
    response.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

    return response.status(200).json({
      user,
      message: 'Login is successful',
      alert: true,
      token,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({
      message: 'Internal server error',
      alert: false,
    });
  }
};

// Controller function for user logout
export const logout = (request, response) => {
  const jwtToken = request.headers.authorization;

  if (!jwtToken) {
    return response.status(400).json({ message: 'Not logged in' });
  }

  // You may want to add token verification logic here to ensure it's valid

  response.cookie('jwt', '', { maxAge: 0 });
  response.status(200).json({ message: 'User logged out successfully' });
};

// Controller function to get user by ID
export const getUserById = async (request, response) => {
  try {
    const userId = request.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
        alert: false
      });
    }

    return response.status(200).json({
      user,
      message: 'User found',
      alert: true
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
      alert: false
    });
  }
};

// Controller function to edit user by ID
export const editUser = async (request, response) => {
  try {
    const userId = request.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, request.body, { new: true });

    if (!updatedUser) {
      return response.status(404).json({
        message: "User not found",
        alert: false
      });
    }

    return response.status(200).json({
      user: updatedUser,
      message: 'User updated successfully',
      alert: true
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
      alert: false
    });
  }
};

// Controller function to delete user by ID
export const deleteUser = async (request, response) => {
  try {
    const userId = request.params.id;

    const isUserDeleted = await User.findByIdAndDelete(userId);

    if (!isUserDeleted) {
      return response.status(404).json({
        message: "User not found",
        alert: false
      });
    }

    return response.status(200).json({
      message: 'User deleted successfully',
      alert: true
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
      alert: false
    });
  }
};

// Controller function for password reset request
export const forgotPassword = async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    throw createHttpError(400, "Missing email address");
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw createHttpError(400, "User not found");
    }

    const token = createToken(user._id);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `You can reset your password by clicking the following link: http://localhost:3000/reset-password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw createHttpError(500, "Failed to send email");
      } else {
        console.log('Email sent: ' + info.response);
        res.send({ message: "Password reset link sent successfully", token });
      }
    });
  } catch (error) {
    next(error);
  }
};

// Controller function for resetting user password
export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const newPassword = req.body.password;

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    if (decoded.userId !== id) {
      throw createHttpError(400, "Invalid token");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    res.send({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
