require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path'); // path modülü import edin
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
console.log("MONGO_URI:", mongoUri); // MONGO_URI'nin doğru tanımlandığını kontrol edin.

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB database connection established successfully');
}).catch((error) => {
    console.error('MongoDB connection error:', error.message);
});

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // Resimlerin servisi için gerekli olan satır


app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
