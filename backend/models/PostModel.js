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
  },
  image: {
    type: String,
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
    profile:{
        type:String,
    },
    comment:{
        type:String,
        required:true
    },
  }],

});

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
