const Blog = require('../models/Blog');
const asyncHandler = require('express-async-handler');

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate('author', 'username');
  res.json(blogs);
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const blog = await Blog.create({
    title,
    content,
    category,
    author: req.user._id,
  });
  res.status(201).json(blog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.remove();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const comment = {
      user: req.user._id,
      text,
      date: Date.now(),
    };
    blog.comments.push(comment);
    await blog.save();
    res.status(201).json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const alreadyLiked = blog.likes.find((like) => like.toString() === req.user._id.toString());
    if (alreadyLiked) {
      blog.likes = blog.likes.filter((like) => like.toString() !== req.user._id.toString());
    } else {
      blog.likes.push(req.user._id);
    }
    await blog.save();
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog, addComment, likeBlog };
