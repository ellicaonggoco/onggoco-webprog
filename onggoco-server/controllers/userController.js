const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    let {
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
      return res.status(400).json({ message: "Password required" });

    let fullName = req.body.name;
    if (!fullName && firstName && lastName)
      fullName = `${firstName} ${lastName}`;
    if (!fullName) return res.status(400).json({ message: "Name required" });

    // Auto‑generate username if missing
    if (!username) {
      const base = email.split("@")[0].replace(/[^a-z0-9]/gi, "");
      username = `${base}${Math.floor(Math.random() * 10000)}`;
    }

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.type === "viewer")
      return res
        .status(403)
        .json({ message: "Viewers cannot log in. Contact admin." });
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

const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password)
      updateData.password = await bcrypt.hash(updateData.password, 10);
    if (!updateData.name && updateData.firstName && updateData.lastName)
      updateData.name = `${updateData.firstName} ${updateData.lastName}`;
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
