const Blog = require('../models/blog.model');

// Rate Blog
const rateBlog = async (req, res) => {
    const { rating } = req.body;

    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const existingRating = blog.ratings.find(r => r.user.toString() === req.user._id.toString());
        if (existingRating) {
            existingRating.rating = rating;
        } else {
            blog.ratings.push({ user: req.user._id, rating });
        }

        blog.calculateAverageRating();
        await blog.save();

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Comment
const addComment = async (req, res) => {
    const { comment } = req.body;

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const username = req.user.username || 'Gast';

        blog.comments.push({ user: req.user._id, comment, username });
        await blog.save();

        res.status(201).json(blog.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CRUD Operations
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username').populate('category', 'name');
        res.json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username')
            .populate('category', 'name')
            .populate('comments.user', 'username');
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
    const { title, summary, content, category } = req.body;
    const author = req.user._id;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = new Blog({ title, summary, content, category, author, image });

    try {
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    const { title, summary, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            blog.title = title;
            blog.summary = summary;
            blog.content = content;
            blog.category = category;
            blog.image = image;
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            await blog.remove();
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Son dört blogu almak için endpoint

const getLastFourBlogs = async (req, res) => {
  try {
      const blogs = await Blog.find().sort({ createdAt: -1 }).limit(4);
      res.json(blogs);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
    rateBlog,
    addComment,
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getLastFourBlogs
};
