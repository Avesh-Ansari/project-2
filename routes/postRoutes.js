// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');
const { createPost, getPostsByUser, updatePost, deletePost } = require('../controllers/postController');

// Create a new post
router.post('/',authenticateUser, createPost);

// Get posts by user
router.get('/', authenticateUser,getPostsByUser);

// Update a post by ID
router.put('/:id',authenticateUser, updatePost);

// Delete a post by ID
router.delete('/:id', authenticateUser,deletePost);

module.exports = router;
