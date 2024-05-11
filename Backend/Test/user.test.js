import supertest from "supertest";
import createServer from "../utils/server";
import { User } from "../models/userModel.js";

const app = createServer();

describe("userController", () => {
  describe("POST /register", () => {
    it("should register a new user", async () => {
      const userInput = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "Password123",
      };

      const { body, statusCode } = await supertest(app)
        .post("/register")
        .send(userInput);

      expect(statusCode).toBe(201);
      expect(body.User.firstName).toBe(userInput.firstName);
      expect(body.User.lastName).toBe(userInput.lastName);
      expect(body.User.email).toBe(userInput.email);
    });

    it("should return 400 if required fields are missing", async () => {
      const userInput = {
        // Missing required fields
      };

      const { statusCode } = await supertest(app)
        .post("/register")
        .send(userInput);

      expect(statusCode).toBe(400);
    });

    // Add more test cases as needed
  });

  describe("POST /login", () => {
    it("should log in a user with correct credentials", async () => {
      const user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "Password123",
      });

      const loginInput = {
        email: user.email,
        password: "Password123",
      };

      const { body, statusCode } = await supertest(app)
        .post("/login")
        .send(loginInput);

      expect(statusCode).toBe(200);
      expect(body.User.email).toBe(user.email);
    });

    it("should return 401 for invalid credentials", async () => {
      const loginInput = {
        email: "nonexistent@example.com",
        password: "InvalidPassword",
      };

      const { statusCode } = await supertest(app)
        .post("/login")
        .send(loginInput);

      expect(statusCode).toBe(401);
    });

   
  });

 
});
