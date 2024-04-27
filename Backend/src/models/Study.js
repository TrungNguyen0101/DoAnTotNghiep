const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = require("mongodb");

const Study = new Schema(
  {
    id: { type: ObjectId },
    image: { type: String },
    type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Study", Study);
