const Blog = require('../models/blog.model');
const path = require('path');

// Bloglar için CRUD operasyonları
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
    const blog = await Blog.findById(req.params.id).populate('author', 'username').populate('category', 'name');
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
  const image = req.file ? req.file.filename : null;

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
  const image = req.file ? req.file.filename : req.body.image;

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

const addComment = async (req, res) => {
  const { comment } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.comments.push({ user: req.user._id, name: req.user.username, comment });
      await blog.save();
      res.status(201).json(blog.comments);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      if (blog.likes.includes(req.user._id)) {
        blog.likes = blog.likes.filter((user) => user.toString() !== req.user._id.toString());
      } else {
        blog.likes.push(req.user._id);
      }
      await blog.save();
      res.status(200).json(blog.likes);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  likeBlog,
};
