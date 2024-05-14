// controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, body, active, latitude, longitude } = req.body;
    const createdBy = req.body.userId; 
    const newPost = new Post({ title, body, createdBy, active, latitude, longitude });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.userId });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const { title, body, active, latitude, longitude } = req.body;
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      { title, body, active, latitude, longitude },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
