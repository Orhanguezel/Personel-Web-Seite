// server/controllers/categoryController.js
const Category = require('../models/category.model');

// Kategoriler için CRUD operasyonları
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
