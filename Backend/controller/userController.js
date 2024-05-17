import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
dotenv.config();




const createToken = (userId) => {
  return jwt.sign({ userId }, "jwtSecretKey", { expiresIn: "5s" });
};

export const createUser = async (req, res) => {
  try {
    const { firstName,lastName, email, password } = req.body;

    if (!lastName||!firstName || !email || !password) {
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


export const getAllUsers = async (req, res) => {
  try {
      const users = await User.find();

      // Modify each user to include only firstName, lastName, and email
      const usersWithFilteredDetails = users.map(user => ({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
      }));

      // Return the modified users with filtered details
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
    console.log('Deleting user with id:', id); // Debugging line
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













// export const createUser = async (req, res) => {
//   if (req.body.googleAccessToken) {
//       const { googleAccessToken } = req.body;

//       axios
//           .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//               headers: {
//                   "Authorization": `Bearer ${googleAccessToken}`
//               }
//           })
//           .then(async response => {
//               const firstName = response.data.given_name;
//               const lastName = response.data.family_name;
//               const email = response.data.email;
//               const existingUser = await User.findOne({ email });

//               if (existingUser)
//                   return res.status(400).json({ message: "User already exists!" });

//               const result = await User.create({ verified: true, email, firstName, lastName });

//               const token = jwt.sign({
//                   email: result.email,
//                   id: result._id
//               }, process.env.JWT_SECRET, { expiresIn: "1h" });

//               res.status(200).json({ result, token });
//           })
//           .catch(err => {
//               res.status(400).json({ message: "Invalid access token!" });
//           });
//   } else {
//       // Normal form signup
//       const { email, password, confirmPassword, firstName, lastName } = req.body;

//       try {
//           if (email === "" || password === "" || firstName === "" || lastName === "" || password !== confirmPassword || password.length < 4)
//               return res.status(400).json({ message: "Invalid field!" });

//           const existingUser = await User.findOne({ email });

//           if (existingUser)
//               return res.status(400).json({ message: "User already exists!" });

//           const hashedPassword = await bcrypt.hash(password, 12);

//           const result = await User.create({ email, password: hashedPassword, firstName, lastName });

//           const token = jwt.sign({
//               email: result.email,
//               id: result._id
//           }, process.env.JWT_SECRET, { expiresIn: "1h" });

//           res.status(200).json({ result, token });
//       } catch (err) {
//           res.status(500).json({ message: "Something went wrong!" });
//       }
//   }
// };



















// export const loginUser = async(req, res) => {
//   if(req.body.googleAccessToken){
//       // gogole-auth
//       const {googleAccessToken} = req.body;

//       axios
//           .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//           headers: {
//               "Authorization": `Bearer ${googleAccessToken}`
//           }
//       })
//           .then(async response => {
//               const firstName = response.data.given_name;
//               const lastName = response.data.family_name;
//               const email = response.data.email;
//               const existingUser = await User.findOne({email})

//               if (!existingUser) 
//               return res.status(404).json({message: "User don't exist!"})

//               const token = jwt.sign({
//                   email: existingUser.email,
//                   id: existingUser._id
//               }, config.get("JWT_SECRET"), {expiresIn: "1h"})
      
//               res
//                   .status(200)
//                   .json({result: existingUser, token})
                  
//           })
//           .catch(err => {
//               res
//                   .status(400)
//                   .json({message: "Invalid access token!"})
//           })
//   }else{
//       // normal-auth
//       const {email, password} = req.body;
//       if (email === "" || password === "") 
//           return res.status(400).json({message: "Invalid field!"});
//       try {
//           const existingUser = await User.findOne({email})
  
//           if (!existingUser) 
//               return res.status(404).json({message: "User don't exist!"})
  
//           const isPasswordOk = await bcrypt.compare(password, existingUser.password);
  
//           if (!isPasswordOk) 
//               return res.status(400).json({message: "Invalid credintials!"})
  
//           const token = jwt.sign({
//               email: existingUser.email,
//               id: existingUser._id
//           }, config.get("JWT_SECRET"), {expiresIn: "1h"})
  
//           res
//               .status(200)
//               .json({result: existingUser, token})
//       } catch (err) {
//           res
//               .status(500)
//               .json({message: "Something went wrong!"})
//       }
//   }

// }



















































































