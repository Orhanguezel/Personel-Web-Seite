const express = require('express');
const { getBlogs, createBlog, updateBlog, deleteBlog, addComment, likeBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .put(protect, updateBlog)
  .delete(protect, admin, deleteBlog);

router.route('/:id/comment').post(protect, addComment);
router.route('/:id/like').put(protect, likeBlog);

module.exports = router;
