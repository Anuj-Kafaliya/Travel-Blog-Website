const express = require('express');
const postRouter = express.Router();
const { getAllPosts, addPost, getPostById, updatePost, deletePost } = require('../controllers/post-controller')

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);
postRouter.post('/', addPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

module.exports = postRouter