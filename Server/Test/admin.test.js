import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createAdmin,
  adminLogin,
  logout,
  getAdminById,
  editAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";
import { Admin } from "../models/adminModel.js";

// Mocking the necessary modules
jest.mock("../models/adminModel.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Admin Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createAdmin", () => {
    test("should create a new admin", async () => {
      const request = {
        body: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          password: "password123",
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const hashedPassword = "hashedPassword";

      bcrypt.hash.mockResolvedValue(hashedPassword);
      Admin.findOne.mockResolvedValue(null);
      Admin.create.mockResolvedValue(request.body);

      await createAdmin(request, response);

      expect(bcrypt.hash).toHaveBeenCalledWith(request.body.password, 10);
      expect(Admin.findOne).toHaveBeenCalledWith({ email: request.body.email });
      expect(Admin.create).toHaveBeenCalledWith({
        ...request.body,
        password: hashedPassword,
      });
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.send).toHaveBeenCalledWith({
        Admin: request.body,
        message: "Successfully signed up",
        alert: "success",
      });
    });

    // Additional test cases can be added for edge cases like missing fields, existing email, etc.
  });

  // Similarly, you can write tests for other controller functions like adminLogin, logout, getAdminById, editAdmin, deleteAdmin
});
