const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    comment: { type: String, required: true }
}, {
    timestamps: true
});

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true }
});

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String },
    comments: [commentSchema],
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 }
}, {
    timestamps: true
});

blogSchema.methods.calculateAverageRating = function() {
    if (this.ratings.length > 0) {
        const totalRating = this.ratings.reduce((acc, item) => acc + item.rating, 0);
        this.averageRating = totalRating / this.ratings.length;
    } else {
        this.averageRating = 0;
    }
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
