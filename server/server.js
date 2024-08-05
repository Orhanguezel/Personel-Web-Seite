const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB database connection established successfully');
}).catch((error) => {
    console.error('MongoDB connection error:', error.message);
});

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Kategoriler için eklenen rota

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes); // Kategoriler için eklenen rota

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
