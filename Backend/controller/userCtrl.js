// import bcrypt from "bcrypt";
// import dotenv from 'dotenv';
// import admin from 'firebase-admin';
// import jwt from 'jsonwebtoken';
// import { User } from "../models/userModel.js";
// dotenv.config();

// // Import the service account key JSON file with an import assertion
// import serviceAccount from "./service.json" assert { type: "json" };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const jwtSecretKey = process.env.JWT_TOKEN_KEY;

// const createToken = (userId) => {
//   return jwt.sign({ userId }, 'jwtSecretKey', { expiresIn: '1h' });
// };


// export const authenticateWithFirebase = async (request, response) => {
//   try {
//     const idToken = request.headers.authorization;
  
//     if (!idToken) {
//       return response.status(400).json({ message: 'No token provided' });
//     }
  
//     // Verify Firebase ID token
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const uid = decodedToken.uid;
  
//     // Check if the user's token is revoked
//     const userRecord = await admin.auth().getUser(uid);

//     // Get the current time in GMT (UTC) as a Date object
//     const currentTime = new Date().toUTCString();
    
//     // Convert tokensValidAfterTime to a Date object
//     const tokensValidAfterTime = new Date(userRecord.tokensValidAfterTime).toUTCString();

//     console.log("Current Time:", currentTime);
//     console.log("Tokens Valid After Time:", tokensValidAfterTime); 

//     // Check if the tokens are valid
//     if (userRecord && tokensValidAfterTime >= currentTime) {
//       // Token is revoked or not yet valid
//       return response.status(401).json({ message: 'Unauthorized' });
//     }

//     // Check if the user exists in the database
//     let user = await User.findOne({ uid: uid });

//     console.log("User:", user);

//     let userAdmin = false;
//     if(user && user.isAdmin){
//         userAdmin = true;
//     } 
  
//     // If user doesn't exist, create a new user
 
// if (!user) {    
//   const firebaseUser = decodedToken;
//   const { email, displayName } = firebaseUser;

//   console.log("Creating User in MongoDB:", email, uid);

//   try {
//     // Save the user to MongoDB
//     user = await User.create({ email: email, uid: uid });

//     console.log("User Created:", user);
//   } catch (error) {
//     console.error("Error creating user in MongoDB:", error);
//     return response.status(500).json({ message: 'Error creating user in MongoDB' });
//   }
// }

  
//     // If everything is valid, send authentication success response
//     return response.status(200).json({ message: 'Authentication successful' , isAdmin:userAdmin});
//   } catch (error) {
//     console.error('Error authenticating with Firebase:', error);
//     return response.status(401).json({ message: 'Unauthorized' });
//   }
// };


// export const revokeAccessToken = async (req, res) => {
//   try {
//     const { uid, refreshToken } = req.body;

//     if (!uid || !refreshToken) {
//       return res.status(400).json({ success: false, message: 'User UID and refresh token are required' });
//     }

//     await admin.auth().revokeAccessToken(uid);
//     await admin.auth().revokeRefreshTokens(uid);


//     return res.status(200).json({ success: true, message: 'Access token revoked successfully' });
//   } catch (error) {
//     console.error('Error revoking access token:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// }

// export const loginUserWithFirebase = async (request, response) => {
//   try {
//     const idToken = request.headers.authorization;

//     if (!idToken) {
//       return response.status(400).json({ message: 'No token provided' });
//     }

//     // Verify Firebase ID token
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const uid = decodedToken.uid;

//     // Check if the user exists in the database
//     const user = await User.findOne({ uid: uid });

//     if (!user) {
//       return response.status(404).json({ message: 'User not found' });
//     }

//     // Assuming the user is an admin if it exists in the database
//     const userAdmin = user.isAdmin || false;

//     // If everything is valid, send authentication success response
//     return response.status(200).json({ message: 'Authentication successful', isAdmin: userAdmin });
//   } catch (error) {
//     console.error('Error logging in with Firebase:', error);
//     return response.status(401).json({ message: 'Unauthorized' });
//   }
// };

// export const signUpUserWithFirebase = async (request, response) => {
//   try {
//     const idToken = request.headers.authorization;

//     if (!idToken) {
//       return response.status(400).json({ message: 'No token provided' });
//     }

//     // Verify Firebase ID token
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const { uid, email } = decodedToken;

//     const userRecord = await admin.auth().getUser(uid);
//     const currentTime = new Date().toUTCString();
//     const tokensValidAfterTime = new Date(userRecord.tokensValidAfterTime).toUTCString();
//     console.log("Current Time:", currentTime);
//     console.log("Tokens Valid After Time:", tokensValidAfterTime); 
//     console.log("Current Time:", currentTime);
//     console.log("Tokens Valid After Time:", tokensValidAfterTime); 


//     if (userRecord && tokensValidAfterTime >= currentTime) {
//       // Token is revoked or not yet valid
//       return response.status(401).json({ message: 'Unauthorized' });
//     }


//     // Check if the user already exists in the database
//     let user = await User.findOne({ uid: uid });

//     console.log("User:", user);

//     let userAdmin = false;
//     if(user && user.isAdmin){
//         userAdmin = true;
//     } 
  
//     // If user doesn't exist, create a new user
 
//     if (!user) {    
//       const firebaseUser = decodedToken;
//       const { email, displayName } = firebaseUser;
  
//       console.log("Creating User in MongoDB:", email, uid);
  
//       try {
//           // Save the user to MongoDB
//           user = await User.create({ email: email, uid: uid });
  
//           console.log("User Created:", user);
//       } catch (error) {
//           console.error("Error creating user in MongoDB:", error);
//           return response.status(500).json({ message: 'Error creating user in MongoDB' });
//       }
//   }

  
//   // If everything is valid, send authentication success response
//     return response.status(200).json({ message: 'Authentication successful' , isAdmin:userAdmin});
//   } catch (error) {
//     console.error('Error authenticating with Firebase:', error);
//     return response.status(401).json({ message: 'Unauthorized' });
//   }
// };

// // export const deleteuser = async (request, response) => {
// //   try {
// //       const userId = request.params.id;

// //       const isUserDeleted = await User.findByIdAndDelete(userId);

// //       if (!isUserDeleted) {
// //           return response.status(404).json({
// //               message: "User not found",
// //               alert: false
// //           });
// //       }

// //       return response.status(200).json({
// //           message: 'User deleted successfully',
// //           alert: true
// //       });
// //   } catch (error) {
// //       console.log(error.message);
// //       response.status(500).send({
// //           message: error.message,
// //           alert: false
// //       });
// //   }
// // };



// // export const createUser = async (request, response) => {
// //     try {
// //         const {  email,  password } = request.body;

// //         if ( !email ||  !password) {
// //             return response.status(400).send({
// //                 message: 'Please provide all required fields',
// //                 alert: 'error'
// //             });
// //         }

        
// //         const existingUserByEmail = await User.findOne({ email });
// //         //const existingUserByMobile = await User.findOne({ mobile });
        


// //         if (existingUserByEmail) {
// //             return response.status(400).send({
// //                 message: 'Email is already registered',
// //                 alert: 'email'
// //             });
// //         }

// //         // if (existingUserByMobile) {
// //         //     return response.status(400).send({
// //         //         message: 'Mobile number is already registered',
// //         //         alert: 'mobile'
// //         //     });
// //         // }

        
        
// //         // const isPasswordUsed = await User.findOne({ password: { $exists: true } });
// //         // if (isPasswordUsed && await bcrypt.compare(password, isPasswordUsed.password)) {
// //         //     return response.status(400).send({
// //         //         message: 'Password is already used. Please choose a new one.',
// //         //         alert: 'password'
// //         //     });
// //         // }

// //         const saltRounds = 10;
// //         const hashedPassword = await bcrypt.hash(password, saltRounds);

// //         const newUser = {
// //            // firstName,
// //             //lastName,
// //             email,
// //             //mobile,
// //             password: hashedPassword,
// //         };

// //         const user = await User.create(newUser);

// //         return response.status(201).send({
// //             user,
// //             message: 'Successfully signed up',
// //             alert: 'success'
// //         });

// //     } catch (error) {
// //         console.error(error.message);
// //         response.status(500).send({ message: 'Internal Server Error', alert: 'error' });
// //     }
// // };
// // User Login Controller

  
//   // export const login = async (request, response) => {
//   //   try {
//   //     const { email, password } = request.body;
  
//   //     const user = await User.findOne({ email });
  
//   //     if (!user) {
//   //       return response.status(401).json({
//   //         message: 'Invalid email or password',
//   //         alert: false,
//   //       });
//   //     }
  
//   //     const passwordMatch = await bcrypt.compare(password, user.password);
  
//   //     if (!passwordMatch) {
//   //       return response.status(401).json({
//   //         message: 'Invalid email or password',
//   //         alert: false,
//   //       });
//   //     }
  
//   //     const token = createToken(user._id);
//   //     response.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
  
//   //     return response.status(200).json({
//   //       user,
//   //       message: 'Login is successful',
//   //       alert: true,
//   //       token,
//   //     });
//   //   } catch (error) {
//   //     console.error(error.message);
//   //     response.status(500).send({
//   //       message: 'Internal server error',
//   //       alert: false,
//   //     });
//   //   }
//   // };

//   //import jwt from 'jsonwebtoken';

// //   export const logout = (request, response) => {
// //     const jwtToken = request.headers.authorization;
  
// //     if (!jwtToken) {
// //       return response.status(400).json({ message: 'Not logged in' });
// //     }
  
// //     // You may want to add token verification logic here to ensure it's valid
  
// //     response.cookie('jwt', '', { maxAge: 0 });
// //     response.status(200).json({ message: 'User logged out successfully' });
// //   };
  
  
// // // Get User by ID Controller
// // export const getUserById = async (request, response) => {
// //   try {
// //       const userId = request.params.id;

// //       const user = await User.findById(userId);

// //       if (!user) {
// //           return response.status(404).json({
// //               message: "User not found",
// //               alert: false
// //           });
// //       }

// //       return response.status(200).json({
// //           user,
// //           message: 'User found',
// //           alert: true
// //       });
// //   } catch (error) {
// //       console.log(error.message);
// //       response.status(500).send({
// //           message: error.message,
// //           alert: false
// //       });
// //   }
// // };

// // // Edit User by ID Controller
// // export const editUser = async (request, response) => {
// //   try {
// //       const userId = request.params.id;

// //       const updatedUser = await User.findByIdAndUpdate(userId, request.body, { new: true });

// //       if (!updatedUser) {
// //           return response.status(404).json({
// //               message: "User not found",
// //               alert: false
// //           });
// //       }

// //       return response.status(200).json({
// //           user: updatedUser,
// //           message: 'User updated successfully',
// //           alert: true
// //       });
// //   } catch (error) {
// //       console.log(error.message);
// //       response.status(500).send({
// //           message: error.message,
// //           alert: false
// //       });
// //   }
// // };

// // // Delete User by ID Controller
// // export const deleteUser = async (request, response) => {
// //   try {
// //       const userId = request.params.id;

// //       const isUserDeleted = await User.findByIdAndDelete(userId);

// //       if (!isUserDeleted) {
// //           return response.status(404).json({
// //               message: "User not found",
// //               alert: false
// //           });
// //       }

// //       return response.status(200).json({
// //           message: 'User deleted successfully',
// //           alert: true
// //       });
// //   } catch (error) {
// //       console.log(error.message);
// //       response.status(500).send({
// //           message: error.message,
// //           alert: false
// //       });
// //   }
// // };
