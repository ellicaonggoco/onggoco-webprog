const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    paragraphs: [{ type: String }],
    preview: { type: String, required: true },
    image: { type: String, default: "" },
    status: { type: String, enum: ["active", "disabled"], default: "active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Article", articleSchema);
