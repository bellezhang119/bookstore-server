import mongoose from "mongoose";
import uuid from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

// Register
// Function to generate a unique user ID
const generateUserId = async (firstName, lastName) => {
  while (true) {
    const randomUUID = uuid.v4();

    const lastFourUUID = randomUUID.slice(-4);
    const abbFirstName = firstName.substring(0, 2);
    const abbLastName = lastName.substring(0, 2);

    const userId = `${abbFirstName}${abbLastName}${lastFourUUID}`;

    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return userId;
    }
  }
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, birthday, email, password } =
      req.body;
    const userId = await generateUserId(firstName, lastName);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      _id: userId,
      firstName,
      lastName,
      phoneNumber,
      birthday,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
