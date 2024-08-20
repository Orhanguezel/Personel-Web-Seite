const express = require('express');
const {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    addComment,
    rateBlog,
    getLastFourBlogs, // Imported the new function
} = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

// Routes for blog collection
router.route('/')
    .get(getBlogs) // Public route to get all blogs
    .post(protect, upload.single('blogImage'), createBlog); // Protected route to create a blog with image upload

// Route to get the last four blogs
router.route('/last-four')
    .get(getLastFourBlogs); // Public route to get the last four blogs

// Routes for individual blog items
router.route('/:id')
    .get(getBlogById) // Public route to get a specific blog by ID
    .put(protect, upload.single('blogImage'), updateBlog) // Protected route to update a blog with image upload
    .delete(protect, admin, deleteBlog); // Admin route to delete a blog

// Routes for comments and ratings on a blog
router.route('/:id/comment')
    .post(protect, addComment); // Protected route to add a comment to a blog

router.route('/:id/rate')
    .put(protect, rateBlog); // Protected route to rate a blog

module.exports = router;
