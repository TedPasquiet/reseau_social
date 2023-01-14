import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { Jwt } = pkg;
import User from "../models/User.js";

/* Register User */
export const register = async (req, res) => {
  // Async when call database
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // Random number
      impressions: Math.floor(Math.random() * 10000), // Random numnber
    });
    const savedUSer = await newUser.save();
    res.status(201).json(savedUSer); // Send a User back if everything is correct
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
