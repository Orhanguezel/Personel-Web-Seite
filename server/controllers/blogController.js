const Blog = require('../models/blog.model');

// Bloglar için CRUD operasyonları
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');
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
  const { title, content, author } = req.body;
  const newBlog = new Blog({ title, content, author });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = title;
      blog.content = content;
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
