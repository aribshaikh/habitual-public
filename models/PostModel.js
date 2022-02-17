const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  private: { type: Boolean },
  usersLiked: [
    {
      username: { type: String, default: "" },
    },
  ],
  comments: [
    {
      username: { type: String, default: "" },
      comment: { type: String, default: "", trim: true },
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
