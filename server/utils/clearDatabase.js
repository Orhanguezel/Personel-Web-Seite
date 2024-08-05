require('dotenv').config({ path: __dirname + '/../.env' }); // .env dosyasının yolunu belirtin
const mongoose = require('mongoose');
const Blog = require('../models/blog.model');
const User = require('../models/User');
const Category = require('../models/Category');

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Blog.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});

    console.log('Database cleared');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};

clearDatabase();
