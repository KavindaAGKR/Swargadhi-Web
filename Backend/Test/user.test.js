// import request from 'supertest';
// import express from 'express';
// import mongoose from 'mongoose';
// import { User } from '../models/userModel.js'; // Assuming this is the correct path to userModel.js
// import { createUser, userLogin } from '../controllers/userController.js'; // Assuming this is the correct path to userController.js

// // Create a new Express app
// const app = express();
// app.use(express.json());

// // Define base URL
// const baseURL = "http://localhost:5000/api"; // Update the URL with your actual server address

// // Connect to MongoDB
// beforeAll(async () => {
//   await mongoose.connect('mongodb://localhost:27017/testDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   });
// });

// // Disconnect from MongoDB
// afterAll(async () => {
//   await mongoose.disconnect();
// });

// // Test case for user registration
// describe('POST /register', () => {
//   beforeEach(async () => {
//     // Clear the User collection before each test
//     await User.deleteMany({});
//   });

//   it('should create a new user with valid data', async () => {
//     const userData = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       password: 'password123'
//     };

//     // Make a POST request to register a new user
//     const response = await request(app)
//       .post(`${baseURL}/register`)
//       .send(userData)
//       .expect(201);

//     // Check if the user was successfully created in the database
//     const createdUser = await User.findOne({ email: userData.email });
//     expect(createdUser).toBeTruthy();

//     // Check the response data
//     expect(response.body.User).toBeDefined();
//     expect(response.body.message).toBe('Successfully signed up');
//     expect(response.body.alert).toBe('success');
//   });

//   it('should return an error for missing required fields', async () => {
//     const incompleteUserData = {
//       firstName: 'John',
//       lastName: 'Doe',
//       // Missing email and password
//     };

//     // Make a POST request with incomplete data
//     const response = await request(app)
//       .post(`${baseURL}/register`)
//       .send(incompleteUserData)
//       .expect(400);

//     // Check the error message in the response
//     expect(response.body.message).toBe('Please provide all required fields');
//     expect(response.body.alert).toBe('error');
//   });

//   it('should return an error if email is already registered', async () => {
//     // Create a user with the same email
//     const existingUser = new User({
//       firstName: 'Existing',
//       lastName: 'User',
//       email: 'existing.user@example.com',
//       password: 'password123'
//     });
//     await existingUser.save();

//     // Try to register a new user with the same email
//     const newUser = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'existing.user@example.com', // Same email as existing user
//       password: 'password123'
//     };

//     // Make a POST request to register the new user
//     const response = await request(app)
//       .post(`${baseURL}/register`)
//       .send(newUser)
//       .expect(400);

//     // Check the error message in the response
//     expect(response.body.message).toBe('Email is already registered');
//     expect(response.body.alert).toBe('email');
//   });
// });

// // Test case for user login
// describe('POST /login', () => {
//   beforeAll(async () => {
//     // Create a user for testing login
//     const userForLogin = new User({
//       firstName: 'Test',
//       lastName: 'User',
//       email: 'test.user@example.com',
//       password: await bcrypt.hash('testpassword', 10) // Hashed password
//     });
//     await userForLogin.save();
//   });

//   it('should log in a user with valid credentials', async () => {
//     const loginData = {
//       email: 'test.user@example.com',
//       password: 'testpassword'
//     };

//     // Make a POST request to login
//     const response = await request(app)
//       .post(`${baseURL}/login`)
//       .send(loginData)
//       .expect(200);

//     // Check the response data
//     expect(response.body.User).toBeDefined();
//     expect(response.body.message).toBe('Login is successful');
//     expect(response.body.alert).toBe(true);
//     expect(response.body.token).toBeTruthy();
//   });

//   it('should return an error for invalid email', async () => {
//     const invalidEmailData = {
//       email: 'invalid@example.com', // Email not registered
//       password: 'testpassword'
//     };

//     // Make a POST request with invalid email
//     const response = await request(app)
//       .post(`${baseURL}/login`)
//       .send(invalidEmailData)
//       .expect(401);

//     // Check the error message in the response
//     expect(response.body.message).toBe('Invalid email or password');
//     expect(response.body.alert).toBe(false);
//   });

//   it('should return an error for invalid password', async () => {
//     const invalidPasswordData = {
//       email: 'test.user@example.com',
//       password: 'invalidpassword' // Incorrect password
//     };

//     // Make a POST request with invalid password
//     const response = await request(app)
//       .post(`${baseURL}/login`)
//       .send(invalidPasswordData)
//       .expect(401);

//     // Check the error message in the response
//     expect(response.body.message).toBe('Invalid email or password');
//     expect(response.body.alert).toBe(false);
//   });
// });
