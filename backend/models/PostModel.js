import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
  like: {
    type: Array,
  },
  dislike: {
    type: Array,
  },
  comments: [{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    username:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
  }],

});

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
