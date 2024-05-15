import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: false,
    },
    githubLink: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
