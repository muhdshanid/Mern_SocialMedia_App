import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  profile: {
    type: String,
  },
  verified:{
    type:Boolean,
    required:true,
    default:false
  }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
