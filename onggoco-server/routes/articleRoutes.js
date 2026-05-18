const express = require("express");
const {
  getArticles,
  getActiveArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/active", getActiveArticles);
router.get("/", protect, getArticles);
router.post("/", protect, upload.single("image"), createArticle);
router.put("/:id", protect, upload.single("image"), updateArticle);
router.delete("/:id", protect, deleteArticle);

module.exports = router;
