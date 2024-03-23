import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Admin } from "../models/adminModel.js";
dotenv.config();

// Import the service account key JSON file with an import assertion
const createToken = (adminId) => {
  return jwt.sign({ adminId }, 'jwtSecretKey', { expiresIn: '1h' });
};

export const createAdmin = async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    if (!firstName || !lastName || !email || !password) {
      return response.status(400).send({
        message: 'Please provide all required fields',
        alert: 'error'
      });
    }
    const existingAdminByEmail = await Admin.findOne({ email });
    if (existingAdminByEmail) {
      return response.status(400).send({
        message: 'Email is already registered',
        alert: 'email'
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    const createdAdmin = await Admin.create(newAdmin);
    return response.status(201).send({
      Admin: createdAdmin,
      message: 'Successfully signed up',
      alert: 'success'
    });

  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: 'Internal Server Error', alert: 'error' });
  }
};

export const adminLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const foundAdmin = await Admin.findOne({ email });
    if (!foundAdmin) {
      return response.status(401).json({
        message: 'Invalid email or password',
        alert: false,
      });
    }
    const passwordMatch = await bcrypt.compare(password, foundAdmin.password);
    if (!passwordMatch) {
      return response.status(401).json({
        message: 'Invalid email or password',
        alert: false,
      });
    }
    const token = createToken(foundAdmin._id);
    response.cookie('jwt', token, { httpOnly: true, maxAge: 360000});

    return response.status(200).json({
      Admin: foundAdmin,
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

export const logout = (request, response) => {
  const jwtToken = request.headers.authorization;

  if (!jwtToken) {
    return response.status(400).json({ message: 'Not logged in' });
  }
  response.cookie('jwt', '', { maxAge: 0 });
  response.status(200).json({ message: 'Admin logged out successfully' });
};

export const getAdminById = async (request, response) => {
  try {
    const adminId = request.params.id;

    const foundAdmin = await Admin.findById(adminId);

    if (!foundAdmin) {
      return response.status(404).json({
        message: "Admin not found",
        alert: false
      });
    }

    return response.status(200).json({
      Admin: foundAdmin,
      message: 'Admin found',
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

export const editAdmin = async (request, response) => {
  try {
    const adminId = request.params.id;

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, request.body, { new: true });

    if (!updatedAdmin) {
      return response.status(404).json({
        message: "Admin not found",
        alert: false
      });
    }
    return response.status(200).json({
      Admin: updatedAdmin,
      message: 'Admin updated successfully',
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

export const deleteAdmin = async (request, response) => {
  try {
    const adminId = request.params.id;

    const isAdminDeleted = await Admin.findByIdAndDelete(adminId);

    if (!isAdminDeleted) {
      return response.status(404).json({
        message: "Admin not found",
        alert: false
      });
    }

    return response.status(200).json({
      message: 'Admin deleted successfully',
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
