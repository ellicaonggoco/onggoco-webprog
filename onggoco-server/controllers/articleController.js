const Article = require("../models/article");

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getActiveArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "active" });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { slug, title, paragraphs, preview, status } = req.body;
    let image = req.body.image || "";
    if (req.file) image = `/uploads/${req.file.filename}`;

    let parsedParagraphs = paragraphs;
    if (typeof paragraphs === "string") {
      try {
        parsedParagraphs = JSON.parse(paragraphs);
      } catch {
        parsedParagraphs = paragraphs
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p);
      }
    } else if (!Array.isArray(paragraphs)) {
      parsedParagraphs = [];
    }

    const article = await Article.create({
      slug,
      title,
      paragraphs: parsedParagraphs,
      preview,
      image,
      status: status || "active",
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;
    if (updateData.paragraphs && typeof updateData.paragraphs === "string") {
      try {
        updateData.paragraphs = JSON.parse(updateData.paragraphs);
      } catch {
        updateData.paragraphs = updateData.paragraphs
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p);
      }
    }
    const article = await Article.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getActiveArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};
