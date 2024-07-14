const Blog = require('../models/Blog');
const asyncHandler = require('express-async-handler');

// Get all blogs
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

// Get a single blog by ID
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// Create a new blog
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;
    const blog = new Blog({
        title,
        content,
        author: req.user._id
    });
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

// Update a blog
const updateBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// Blog silme fonksiyonu
const deleteBlog = asyncHandler(async (req, res) => {
    const result = await Blog.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
        res.json({ message: 'Blog removed' });
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// Add a comment to a blog
const addComment = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        const comment = {
            user: req.user._id,
            name: req.user.name,
            comment: req.body.comment
        };
        blog.comments.push(comment);
        await blog.save();
        res.status(201).json({ message: 'Comment added' });
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// Like a blog
const likeBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        const alreadyLiked = blog.likes.find(like => like.toString() === req.user._id.toString());
        if (alreadyLiked) {
            blog.likes = blog.likes.filter(like => like.toString() !== req.user._id.toString());
            res.json({ message: 'Blog unliked' });
        } else {
            blog.likes.push(req.user._id);
            res.json({ message: 'Blog liked' });
        }
        await blog.save();
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    addComment,
    likeBlog
};
