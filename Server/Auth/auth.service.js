const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const User = require("../Auth/auth.model");

const jwtSecret = process.env.JWT_SECRET;

const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utils/email");

const generateJWT = (user) => {
  return jwt.sign({ userId: user._id, tokenVersion: user.tokenVersion || 0 }, jwtSecret, { expiresIn: '7d' });
};

const signup = async ({ name, email, password, phone }) => {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already in use!");

  const hashedPass = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();

  const user = await User.create({
    name,
    email,
    password: hashedPass,
    phone,
    verified: false,
    verificationToken,
  });

  await sendEmail(email, 'Verify your email', `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`);
  return { message: "Verification email sent. Please verify your email." };
};

const verifyEmail = async (token) => {
  const user = await User.findOne({ verificationToken: token });
  if (!user) throw new Error("Invalid or expired token.");

  user.verified = true;
  user.verificationToken = null;
  await user.save();

  return { message: "Email verified successfully." };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.verified)
    throw new Error("Invalid credentials or email not verified.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateJWT(user);
  return { user, token };
};

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

const updateUser = async (userId, updates) => {
  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  if (!user) throw new Error("User not found");
  return user;
};

module.exports = {
  signup,
  login,
  getUser,
  updateUser,
  verifyEmail,
  generateJWT,
};
// This code provides authentication services for a Node.js application using JWT and bcrypt.
