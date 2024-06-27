import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
dotenv.config();
import multer from 'multer';
import upload from "../middleWare/singleFileUpload.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const createToken = (userId) => {
  return jwt.sign({ userId }, "jwtSecretKey", { expiresIn: "3600s" });
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        message: "Please provide all required fields",
        alert: "error",
      });
    }

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   return res.status(400).send({
    //     message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    //     alert: "error",
    //   });
    // }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).send({
        message: "Email is already registered",
        alert: "email",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser);
    return res.status(201).send({
      User: createdUser,
      message: "Successfully signed up",
      alert: "success",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error", alert: "error" });
  }
};


export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(401).json({
        message: "Invalid email or password",
        alert: false,
      });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        alert: false,
      });
    }

    const token = createToken(foundUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json({
      User: foundUser,
      message: "Login is successful",
      alert: true,
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "Internal server error",
      alert: false,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, mobileNumber, addressL1, addressL2, addressL3 } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        mobileNumber,
        deliveryAddress: { addressL1, addressL2, addressL3 },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      const usersWithFilteredDetails = users.map(user => ({
          _id:user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
      }));
      return res.status(200).json({
          count: usersWithFilteredDetails.length,
          data: usersWithFilteredDetails
      });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting user with id:', id); 
    if (!id) {
      return res.status(400).json({ message: 'Invalid user id', alert: false });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found', alert: false });
    }

    return res.status(200).json({ message: 'User deleted successfully', alert: 'success' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error', alert: false });
  }
};


export const uploadProfilePicture = async (req, res) => {
  upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
          console.error('Multer error:', err);
          return res.status(500).json({ message: 'Multer error', error: err });
      } else if (err) {
          console.error('Unknown error:', err);
          return res.status(500).json({ message: 'Unknown error', error: err });
      }

      if (!req.file) {
          console.error('No file uploaded');
          return res.status(400).json({ message: 'No file uploaded' });
      }

      const filePath = 'public/item/' + req.file.filename;
      const userId = req.body.userId;

      try {
          const user = await User.findById(userId);
          if (!user) {
              console.error('User not found');
              return res.status(404).json({ message: 'User not found' });
          }

          user.profilePicture = filePath;
          await user.save();

          res.status(200).json({ message: 'Profile picture uploaded successfully', user });
      } catch (error) {
          console.error('Error updating user profile picture:', error);
          res.status(500).json({ message: 'Internal server error', error: error.message });
      }
  });
};

export const getUserProfile = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findById(id).select('profilePicture firstName lastName');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const profilePictureUrl = user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : null;
      return res.status(200).json({ profilePicture: profilePictureUrl, firstName: user.firstName, lastName: user.lastName });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.profilePicture) {
      const filePath = path.join(__dirname, '../', user.profilePicture);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }

    user.profilePicture = null;
    await user.save();

    res.status(200).json({ message: 'Profile picture deleted successfully', user });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User with this email does not exist", alert: false });
    }
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

<<<<<<< HEAD
    const frontendUrl = 'https://www.swargadhi.lk';
=======
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
>>>>>>> 40b51e2700b4fb61dc1e34fd2025df3a9ca8cb86

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
             ${frontendUrl}/reset/${token}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).send({ message: "Error sending email", alert: false });
      }
      res.status(200).send({ message: "Password reset email sent", alert: true });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal server error", alert: false });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({ message: "Password reset token is invalid or has expired", alert: false });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send({ message: "Password has been reset", alert: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal server error", alert: false });
  }
};



































































