import PostModel from "../models/PostModel.js";

export const createPost = async (req, res) => {
  try {
    const { title, image, video } = req.body;
    let newPost = new PostModel({
      title,
      image,
      video,
      user: req.user.id,
    });
    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const myPosts = await PostModel.find({ user: id }).sort({title:-1});
    if (!myPosts) {
      return res.status(200).json("You dont have any post");
    }
    return res.status(200).json(myPosts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    let post = await PostModel.findById(id);
    if (!post) {
      return res.status(400).json("Post does not found");
    }
    post = await PostModel.findByIdAndUpdate(id, {
      $set: req.body,
    });
    let updatePost = await post.save();
    return res.status(200).json(updatePost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const post = await PostModel.findById(id);  
    if (!post.like.includes(user)) {
        if (post.dislike.includes(user)) {
            await post.updateOne({ $pull: { dislike: user } });
        }
        await post.updateOne({ $push: { like: user } });
        return res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { like: user } });
      return res.status(200).json("Post has been unlike");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
};

export const dislikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const post = await PostModel.findById(id);
    if (!post.dislike.includes(user)) {
      if (post.like.includes(user)) {
        await post.updateOne({ $pull: { like: user } });
    }
    await post.updateOne({ $push: { dislike: user } });
    return res.status(200).json("Post has been disliked");
    } else {
      await post.updateOne({ $pull: { dislike: user } });
      return res.status(200).json("Post has been unlike");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
};

export const commentPost = async (req, res) => {
  try {
    const { comment, postId ,profile} = req.body;
    const comments = {
      user: req.user.id,
      username: req.user.username,
      comment,
      profile
    };
    const post = await PostModel.findById(postId);
    post.comments.push(comments);
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    if (post.user === req.user.id) {
      const deletePost = await PostModel.findByIdAndDelete(id);
      return res.status(200).json("Your has been deleted");
    } else {
      return res.status(400).json("You are not allowed to delete post");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
};
