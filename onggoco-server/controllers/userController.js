const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// GET all users (exclude passwords)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new user (admin or signup)
const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      type,
      gender,
      age,
      contactNumber,
    } = req.body;

    if (!password)
      return res.status(400).json({ message: "Password is required" });

    // Build full name
    let fullName = req.body.name;
    if (!fullName && firstName && lastName)
      fullName = `${firstName} ${lastName}`;
    if (!fullName) return res.status(400).json({ message: "Name is required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: fullName,
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      type: type || "viewer",
      gender,
      age,
      contactNumber,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN user (block viewers)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.type === "viewer") {
      return res
        .status(403)
        .json({ message: "Viewers cannot log in. Contact admin." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({
      token,
      type: user.type,
      firstName: user.name?.split(" ")[0] || "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE user (admin only)
const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    // If name not provided but firstName+lastName are, build name
    if (!updateData.name && updateData.firstName && updateData.lastName) {
      updateData.name = `${updateData.firstName} ${updateData.lastName}`;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE user (admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, loginUser, updateUser, deleteUser };
