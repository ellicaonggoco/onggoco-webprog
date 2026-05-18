const express = require("express");
const {
  createUser, // ← changed from registerUser
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", protect, getUsers);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
