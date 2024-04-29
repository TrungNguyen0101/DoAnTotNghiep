const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = require("mongodb");

const Lessons = new Schema(
  {
    id: { type: ObjectId },
    image: { type: String, require: true },
    color: { type: String },
    text_image: { type: String, require: true },
    type: {
      type: String,
      require: true,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Lessons", Lessons);