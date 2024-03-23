import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();

const createToken = (userId) => {
  return jwt.sign({ userId }, "jwtSecretKey", { expiresIn: "1h" });
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Please provide all required fields",
        alert: "error",
      });
    }

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
      name,
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


