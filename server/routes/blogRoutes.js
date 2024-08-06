const express = require('express');
const {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    addComment,
    likeBlog
} = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, upload, createBlog);

router.route('/:id')
    .get(getBlogById)
    .put(protect, upload, updateBlog)
    .delete(protect, admin, deleteBlog);

router.route('/:id/comment').post(protect, addComment);
router.route('/:id/like').put(protect, likeBlog);

module.exports = router;
