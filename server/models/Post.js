const mongoose = require("mongoose");
const { Schema ,model} = mongoose;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    author:{type:Schema.Types.ObjectId,ref:'User'},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
