var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    link: String,
    author: String,
    upvotes: {type: Number, default: 0},
    date: Date,
    message: String,
    color: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Post', PostSchema);
