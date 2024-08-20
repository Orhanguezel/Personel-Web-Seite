const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const upload = require('./middleware/uploadMiddleware');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
const connectWithRetry = () => {
    mongoose.connect(mongoUri)
        .then(() => {
            console.log('MongoDB database connection established successfully');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error.message);
            setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
        });
};

connectWithRetry();

// Contact form submission route
app.post('/api/contact', (req, res) => {
    const { name, email, phone, description } = req.body;

    // Bu alanda e-posta gönderme ya da veritabanına kaydetme işlemlerini yapabilirsiniz.
    res.json({ message: 'Contact form submitted successfully' });
});


// Diğer rotalar
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Root route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
